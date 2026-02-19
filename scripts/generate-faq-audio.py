#!/usr/bin/env python3
"""
FAQ TTS Audio Generator for WhimsyLabs Website
Generates individual MP3 files for each FAQ answer in each language.

Uses faqData.js as the source of truth (40 questions).
Falls back to English if translation missing.

Usage:
    pip install edge-tts
    python scripts/generate-faq-audio.py

Output:
    public/audio/faq/{lang}/q{index}.mp3
    public/audio/faq/manifest.json
"""

import asyncio
import json
import os
import re
import subprocess
from pathlib import Path
from html import unescape

try:
    import edge_tts
except ImportError:
    print("Error: edge-tts not installed. Run: pip install edge-tts")
    exit(1)

# Voice configuration per language
VOICES = {
    'en': 'en-GB-SoniaNeural',
    'es': 'es-ES-ElviraNeural',
    'fr': 'fr-FR-DeniseNeural',
    'de': 'de-DE-KatjaNeural',
    'jp': 'ja-JP-NanamiNeural',
}

LANGUAGES = ['en', 'es', 'fr', 'de', 'jp']


def strip_html(text: str) -> str:
    """Remove HTML tags and decode entities."""
    text = re.sub(r'<[^>]+>', ' ', text)
    text = unescape(text)
    text = re.sub(r'\s+', ' ', text)
    text = re.sub(r'https?://\S+', '', text)
    return text.strip()


def clean_for_tts(text: str) -> str:
    """Clean text for better TTS output."""
    text = strip_html(text)
    text = text.replace('e.g.', 'for example')
    text = text.replace('i.e.', 'that is')
    text = text.replace('etc.', 'and so on')
    text = text.replace('vs.', 'versus')
    text = text.replace('%', ' percent')
    text = text.replace('&', ' and ')
    text = re.sub(r'\(\d{4}\)', '', text)
    text = re.sub(r'\([^)]*University[^)]*\)', '', text)
    text = re.sub(r'\([^)]*Journal[^)]*\)', '', text)
    text = re.sub(r'\s+', ' ', text)
    return text.strip()


def load_faq_data_js(project_root: Path) -> list:
    """Load all FAQs from faqData.js by parsing the file directly."""
    faq_file = project_root / 'src' / 'data' / 'faqData.js'
    
    if not faq_file.exists():
        print(f"FAQ file not found: {faq_file}")
        return []
    
    content = faq_file.read_text(encoding='utf-8')
    faqs = []
    
    # Find all category blocks
    # Pattern: "Category Name": [ ... ]
    category_pattern = r'"([^"]+)":\s*\['
    categories = list(re.finditer(category_pattern, content))
    
    for i, cat_match in enumerate(categories):
        category_name = cat_match.group(1)
        start = cat_match.end()
        
        # Find the end of this category's array (next category or end of faqCategories)
        if i + 1 < len(categories):
            end = categories[i + 1].start()
        else:
            end = len(content)
        
        category_content = content[start:end]
        
        # Find all question/answer pairs in this category
        # Match: { question: "...", answer: "..." }
        qa_pattern = r'\{\s*question:\s*\n?\s*"((?:[^"\\]|\\.)*)"\s*,\s*\n?\s*answer:\s*\n?\s*"((?:[^"\\]|\\.)*)"'
        
        for match in re.finditer(qa_pattern, category_content, re.DOTALL):
            try:
                question = match.group(1).encode().decode('unicode_escape')
                answer = match.group(2).encode().decode('unicode_escape')
                faqs.append({
                    'question': question,
                    'answer': answer,
                    'category': category_name
                })
            except Exception as e:
                continue
    
    print(f"  Parsed {len(faqs)} FAQs from faqData.js")
    return faqs


def generate_faq_key(question: str) -> str:
    """Generate the same key used in translation files."""
    key = question.lower()
    key = re.sub(r'[^a-z0-9\s]', '', key)
    key = re.sub(r'\s+', '-', key)
    return key[:50]


def load_translations(i18n_dir: Path, lang: str) -> dict:
    """Load FAQ translations for a language. Returns dict of key->answer."""
    file_lang = 'ja' if lang == 'jp' else lang
    faq_file = i18n_dir / 'faq' / f'{file_lang}.js'
    
    if not faq_file.exists():
        return {}
    
    content = faq_file.read_text(encoding='utf-8')
    translations = {}
    
    # Extract FAQ entries - now capturing the key (slug) as well
    # Pattern matches: "key-slug": { "question": "...", "answer": "..." }
    pattern = r'"([a-z0-9-]+)":\s*\{\s*"question":\s*"([^"]*(?:\\.[^"]*)*)",\s*"answer":\s*"([^"]*(?:\\.[^"]*)*)"'
    
    for match in re.finditer(pattern, content, re.DOTALL):
        try:
            key = match.group(1)  # The slug key like "how-does-whimsylabs-protect-student-data"
            answer = match.group(3).encode().decode('unicode_escape')
            translations[key] = answer
        except:
            continue
    
    return translations


def find_translation(question: str, answer: str, translations: dict) -> str:
    """Find translation for a question using the FAQ key, fall back to original."""
    # Generate the key from the English question (same algorithm as faqDataGenerator.js)
    key = generate_faq_key(question)
    
    # Try exact match
    if key in translations:
        return translations[key]
    
    # Try partial match (key might be truncated differently)
    for trans_key, trans_answer in translations.items():
        if key[:30] in trans_key or trans_key[:30] in key:
            return trans_answer
    
    # Fall back to original (English)
    return answer


async def generate_audio(text: str, voice: str, output_path: Path) -> bool:
    """Generate MP3 audio file using Edge TTS."""
    try:
        communicate = edge_tts.Communicate(text, voice)
        await communicate.save(str(output_path))
        return True
    except Exception as e:
        print(f"    ✗ Error: {e}")
        return False


async def main():
    import sys
    dry_run = '--dry-run' in sys.argv
    
    script_dir = Path(__file__).parent
    project_root = script_dir.parent
    i18n_dir = project_root / 'src' / 'i18n'
    output_dir = project_root / 'public' / 'audio' / 'faq'
    
    print("🎙️  FAQ TTS Audio Generator")
    print("=" * 50)
    if dry_run:
        print("DRY RUN - no files will be created")
    print()
    
    # Load FAQs from source of truth (faqData.js)
    faqs = load_faq_data_js(project_root)
    
    if not faqs:
        print("Error: Could not load FAQs from faqData.js")
        return
    
    print(f"Found {len(faqs)} FAQ questions (from faqData.js)")
    print(f"Languages: {', '.join(LANGUAGES)}")
    print(f"Total files: {len(faqs) * len(LANGUAGES)}")
    print()
    
    # Create manifest
    manifest = {
        'generated': '',
        'voices': VOICES,
        'languages': LANGUAGES,
        'totalQuestions': len(faqs),
        'questions': []
    }
    
    # Pre-load all translations
    all_translations = {}
    for lang in LANGUAGES:
        all_translations[lang] = load_translations(i18n_dir, lang)
        print(f"  Loaded {len(all_translations[lang])} {lang.upper()} translations")
    print()
    
    total_files = len(faqs) * len(LANGUAGES)
    generated = 0
    failed = 0
    
    for lang in LANGUAGES:
        voice = VOICES[lang]
        translations = all_translations[lang]
        
        print(f"📁 {lang.upper()}")
        
        # Create output directory
        lang_dir = output_dir / lang
        if not dry_run:
            lang_dir.mkdir(parents=True, exist_ok=True)
        
        for idx, faq in enumerate(faqs):
            # Get translated answer or fall back to English
            # For English, always use the original answer from faqData.js
            if lang == 'en':
                answer = faq['answer']
            else:
                answer = find_translation(faq['question'], faq['answer'], translations)
            
            # Clean for TTS
            answer_text = clean_for_tts(answer)
            
            if len(answer_text) < 20:
                print(f"  ⚠️  q{idx}: Answer too short, skipping")
                continue
            
            output_path = lang_dir / f'q{idx}.mp3'
            
            # Build manifest entry
            if idx >= len(manifest['questions']):
                manifest['questions'].append({
                    'index': idx,
                    'question': faq['question'],
                    'category': faq['category'],
                    'audio': {}
                })
            manifest['questions'][idx]['audio'][lang] = f'/audio/faq/{lang}/q{idx}.mp3'
            
            if dry_run:
                is_fallback = answer == faq['answer'] and lang != 'en'
                flag = " (EN fallback)" if is_fallback else ""
                print(f"  📝 q{idx}: {faq['question'][:40]}...{flag}")
                generated += 1
            else:
                success = await generate_audio(answer_text, voice, output_path)
                if success:
                    print(f"  ✓ q{idx}: {faq['question'][:40]}...")
                    generated += 1
                else:
                    failed += 1
    
    # Save manifest
    from datetime import datetime
    manifest['generated'] = datetime.now().isoformat()
    
    if not dry_run:
        manifest_path = output_dir / 'manifest.json'
        output_dir.mkdir(parents=True, exist_ok=True)
        with open(manifest_path, 'w', encoding='utf-8') as f:
            json.dump(manifest, f, indent=2, ensure_ascii=False)
        print()
        print(f"📋 Manifest: {manifest_path}")
    
    print()
    print("=" * 50)
    print(f"✅ Generated: {generated}/{total_files}")
    if failed:
        print(f"❌ Failed: {failed}")
    if dry_run:
        print("\nRun without --dry-run to generate files")


if __name__ == '__main__':
    asyncio.run(main())
