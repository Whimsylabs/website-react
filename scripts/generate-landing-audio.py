#!/usr/bin/env python3
"""
Landing Page TTS Audio Generator for WhimsyLabs Website
Generates MP3 files for each landing page section in each language.

Usage:
    pip install edge-tts
    python scripts/generate-landing-audio.py

Output:
    public/audio/landing/{lang}/{section}.mp3
    public/audio/landing/manifest.json
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

# Landing page sections to generate audio for
# Each section combines multiple text fields into one audio
SECTIONS = {
    'hero': {
        'name': 'Hero Section',
        'fields': ['heroTitle', 'heroTagline', 'heroDescription']
    },
    'what-is': {
        'name': 'What is WhimsyLabs',
        'fields': ['whatIsTitle', 'whatIsText']
    },
    'physics': {
        'name': 'Real Physics Engines',
        'fields': ['muscleMemoryTitle', 'muscleMemoryText1', 'muscleMemoryHighlight', 'muscleMemoryText2']
    },
    'assessment': {
        'name': 'AI Assessment',
        'fields': ['assessmentTitle', 'assessmentText1', 'assessmentText2']
    },
    'time-saving': {
        'name': 'Time Saving',
        'fields': ['timeSavingTitle', 'timeSavingText']
    },
    'curriculum': {
        'name': 'Curriculum Customization',
        'fields': ['curriculumTitle', 'curriculumText1', 'curriculumText2', 'curriculumText3', 'curriculumText4']
    },
    'dashboard': {
        'name': 'Student Analytics',
        'fields': ['dashboardTitle', 'dashboardText1', 'dashboardText2']
    },
    'freedom': {
        'name': 'Freedom to Explore',
        'fields': ['freedomToExplore', 'freedomToExploreText']
    },
    'send': {
        'name': 'SEND Support',
        'fields': ['scienceForEveryone', 'scienceForEveryoneText']
    },
    'gamification': {
        'name': 'Gamification',
        'fields': ['rewardingMastery', 'rewardingMasteryText']
    },
    'pioneer': {
        'name': 'Pioneer Program',
        'fields': ['pioneerTitle', 'pioneerIntro', 'pioneerCtaText', 'pioneerBenefit1', 'pioneerBenefit2', 'pioneerBenefit3']
    }
}


def strip_html(text: str) -> str:
    """Remove HTML tags and decode entities."""
    text = re.sub(r'<[^>]+>', ' ', text)
    text = unescape(text)
    text = re.sub(r'\s+', ' ', text)
    return text.strip()


def clean_for_tts(text: str) -> str:
    """Clean text for better TTS output."""
    text = strip_html(text)
    text = text.replace('💡', '')
    text = text.replace('•', ', ')
    text = re.sub(r'\s+', ' ', text)
    return text.strip()


def load_home_translations(i18n_dir: Path, lang: str) -> dict:
    """Load home translations for a language using Node.js."""
    file_lang = 'ja' if lang == 'jp' else lang
    
    script = f"""
    try {{
        const home = require('./src/i18n/home/{file_lang}.js');
        const data = home.default || home;
        console.log(JSON.stringify(data));
    }} catch(e) {{
        console.log('{{}}');
    }}
    """
    
    try:
        result = subprocess.run(
            ['node', '-e', script],
            cwd=str(i18n_dir.parent.parent),
            capture_output=True,
            text=True,
            timeout=10
        )
        if result.returncode == 0 and result.stdout.strip():
            return json.loads(result.stdout)
    except Exception as e:
        print(f"  Warning: Could not load {lang} translations: {e}")
    
    return {}


def get_section_text(translations: dict, section_id: str) -> str:
    """Extract and combine text for a section."""
    section = SECTIONS.get(section_id)
    if not section:
        return ""
    
    texts = []
    demo = translations.get('demo', {})
    
    for field in section['fields']:
        # Try demo object first, then root
        text = demo.get(field) or translations.get(field, '')
        if text:
            texts.append(clean_for_tts(text))
    
    return ' '.join(texts)


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
    output_dir = project_root / 'public' / 'audio' / 'landing'
    
    print("🎙️  Landing Page TTS Audio Generator")
    print("=" * 50)
    if dry_run:
        print("DRY RUN - no files will be created")
    print()
    
    print(f"Sections: {len(SECTIONS)}")
    print(f"Languages: {', '.join(LANGUAGES)}")
    print(f"Total files: {len(SECTIONS) * len(LANGUAGES)}")
    print()
    
    # Create manifest
    manifest = {
        'generated': '',
        'voices': VOICES,
        'languages': LANGUAGES,
        'sections': {}
    }
    
    total_files = len(SECTIONS) * len(LANGUAGES)
    generated = 0
    failed = 0
    
    for lang in LANGUAGES:
        voice = VOICES[lang]
        
        print(f"📁 {lang.upper()}")
        
        # Create output directory
        lang_dir = output_dir / lang
        if not dry_run:
            lang_dir.mkdir(parents=True, exist_ok=True)
        
        # Load translations
        translations = load_home_translations(i18n_dir, lang)
        
        if not translations:
            print(f"  ⚠️  No translations found, using English")
            translations = load_home_translations(i18n_dir, 'en')
        
        for section_id, section_info in SECTIONS.items():
            text = get_section_text(translations, section_id)
            
            if len(text) < 20:
                print(f"  ⚠️  {section_id}: Text too short, skipping")
                continue
            
            output_path = lang_dir / f'{section_id}.mp3'
            
            # Add to manifest
            if section_id not in manifest['sections']:
                manifest['sections'][section_id] = {
                    'name': section_info['name'],
                    'audio': {}
                }
            manifest['sections'][section_id]['audio'][lang] = f'/audio/landing/{lang}/{section_id}.mp3'
            
            if dry_run:
                print(f"  📝 {section_id}: {section_info['name']} ({len(text)} chars)")
                generated += 1
            else:
                success = await generate_audio(text, voice, output_path)
                if success:
                    print(f"  ✓ {section_id}: {section_info['name']}")
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
