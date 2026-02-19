#!/usr/bin/env python3
"""
Blog Post TTS Audio Generator for WhimsyLabs Website
Generates MP3 files for each blog post in each language.

33 posts × 5 languages = 165 audio files

Usage:
    pip install edge-tts
    python scripts/generate-blog-audio.py
    python scripts/generate-blog-audio.py --post 1  # Generate single post

Output:
    public/audio/blog/{lang}/post{n}.mp3
    public/audio/blog/manifest.json
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
TOTAL_POSTS = 33


def strip_html(text: str) -> str:
    """Remove HTML tags and decode entities."""
    # Remove script and style content
    text = re.sub(r'<script[^>]*>.*?</script>', '', text, flags=re.DOTALL | re.IGNORECASE)
    text = re.sub(r'<style[^>]*>.*?</style>', '', text, flags=re.DOTALL | re.IGNORECASE)
    # Remove HTML tags
    text = re.sub(r'<[^>]+>', ' ', text)
    # Decode HTML entities
    text = unescape(text)
    # Remove URLs
    text = re.sub(r'https?://\S+', '', text)
    # Clean up whitespace
    text = re.sub(r'\s+', ' ', text)
    return text.strip()


def clean_for_tts(text: str) -> str:
    """Clean text for better TTS output."""
    text = strip_html(text)
    
    # Remove "Further Reading:" sections and everything after
    text = re.sub(r'Further Reading:.*$', '', text, flags=re.IGNORECASE | re.DOTALL)
    text = re.sub(r'References:.*$', '', text, flags=re.IGNORECASE | re.DOTALL)
    text = re.sub(r'Related Articles:.*$', '', text, flags=re.IGNORECASE | re.DOTALL)
    
    # Remove citation markers like [1], [2], [1,2], [1-3]
    text = re.sub(r'\[\d+(?:[,\-]\d+)*\]', '', text)
    
    # Remove parenthetical citations - various formats
    text = re.sub(r'\(\d{4}\)', '', text)  # (2024)
    text = re.sub(r'\([^)]*et al\.?[^)]*\)', '', text)  # (Smith et al., 2023)
    text = re.sub(r'\([A-Z][a-z]+(?:\s+(?:&|and)\s+[A-Z][a-z]+)?,?\s*\d{4}\)', '', text)  # (Smith, 2023) or (Smith & Jones, 2023)
    text = re.sub(r'\([^)]*\d{4}[^)]*\)', '', text)  # Any remaining (... 2023 ...)
    
    # Remove DOI and journal references
    text = re.sub(r'doi:[^\s]+', '', text, flags=re.IGNORECASE)
    text = re.sub(r'DOI:[^\s]+', '', text)
    
    # Common abbreviations
    text = text.replace('e.g.', 'for example')
    text = text.replace('i.e.', 'that is')
    text = text.replace('etc.', 'and so on')
    text = text.replace('vs.', 'versus')
    text = text.replace('%', ' percent')
    text = text.replace('&', ' and ')
    text = text.replace('Dr.', 'Doctor')
    text = text.replace('Dr ', 'Doctor ')
    
    # Clean emojis that don't speak well
    text = re.sub(r'[💡🔬🧪🎓📊✅❌⚠️🎯🌍🌱♻️📈]', '', text)
    
    # Clean up whitespace
    text = re.sub(r'\s+', ' ', text)
    return text.strip()


def load_blog_post(i18n_dir: Path, post_num: int, lang: str) -> dict | None:
    """Load a blog post translation using Node.js to extract JSX content."""
    file_lang = 'ja' if lang == 'jp' else lang
    post_dir = i18n_dir / 'blog' / f'post{post_num}'
    post_file = post_dir / f'{file_lang}.js'
    
    if not post_file.exists():
        # Try English fallback
        if lang != 'en':
            return load_blog_post(i18n_dir, post_num, 'en')
        return None
    
    # Use Node.js to extract content from JSX
    script = f"""
    const React = require('react');
    const ReactDOMServer = require('react-dom/server');
    try {{
        const post = require('./src/i18n/blog/post{post_num}/{file_lang}.js');
        const title = post.title || 'Post {post_num}';
        let content = '';
        if (post.content) {{
            if (typeof post.content === 'string') {{
                content = post.content;
            }} else {{
                // Render JSX to HTML string
                content = ReactDOMServer.renderToStaticMarkup(post.content);
            }}
        }}
        console.log(JSON.stringify({{ title, content }}));
    }} catch(e) {{
        console.log(JSON.stringify({{ title: 'Post {post_num}', content: '', error: e.message }}));
    }}
    """
    
    try:
        result = subprocess.run(
            ['node', '-e', script],
            cwd=str(i18n_dir.parent.parent),
            capture_output=True,
            text=True,
            timeout=30
        )
        if result.returncode == 0 and result.stdout.strip():
            data = json.loads(result.stdout)
            if data.get('content'):
                return data
    except Exception as e:
        pass
    
    # Fallback: try regex extraction for simple string content
    content = post_file.read_text(encoding='utf-8')
    
    # Extract title
    title_match = re.search(r'export\s+const\s+title\s*=\s*["\']([^"\']+)["\']', content)
    if not title_match:
        title_match = re.search(r'export\s+const\s+title\s*=\s*\n?\s*["\']([^"\']+)["\']', content, re.MULTILINE)
    
    title = title_match.group(1) if title_match else f"Post {post_num}"
    
    # For JSX content, extract text between > and <
    # This is a rough extraction but works for simple cases
    jsx_text = re.findall(r'>([^<]+)<', content)
    post_content = ' '.join(jsx_text)
    
    if post_content.strip():
        return {'title': title, 'content': post_content}
    
    return None


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
    
    # Check for single post mode
    single_post = None
    for i, arg in enumerate(sys.argv):
        if arg == '--post' and i + 1 < len(sys.argv):
            single_post = int(sys.argv[i + 1])
    
    script_dir = Path(__file__).parent
    project_root = script_dir.parent
    i18n_dir = project_root / 'src' / 'i18n'
    output_dir = project_root / 'public' / 'audio' / 'blog'
    
    print("🎙️  Blog Post TTS Audio Generator")
    print("=" * 50)
    if dry_run:
        print("DRY RUN - no files will be created")
    if single_post:
        print(f"Single post mode: Post {single_post}")
    print()
    
    post_range = [single_post] if single_post else range(1, TOTAL_POSTS + 1)
    total_posts = len(post_range)
    
    print(f"Posts: {total_posts}")
    print(f"Languages: {', '.join(LANGUAGES)}")
    print(f"Total files: {total_posts * len(LANGUAGES)}")
    print()
    
    # Load existing manifest or create new
    manifest_path = output_dir / 'manifest.json'
    if manifest_path.exists() and not single_post:
        with open(manifest_path, 'r') as f:
            manifest = json.load(f)
    else:
        manifest = {
            'generated': '',
            'voices': VOICES,
            'languages': LANGUAGES,
            'posts': {}
        }
    
    total_files = total_posts * len(LANGUAGES)
    generated = 0
    failed = 0
    skipped = 0
    
    for post_num in post_range:
        print(f"📄 Post {post_num}")
        
        for lang in LANGUAGES:
            voice = VOICES[lang]
            
            # Create output directory
            lang_dir = output_dir / lang
            if not dry_run:
                lang_dir.mkdir(parents=True, exist_ok=True)
            
            output_path = lang_dir / f'post{post_num}.mp3'
            
            # Skip if already exists (unless single post mode)
            if output_path.exists() and not single_post and not dry_run:
                skipped += 1
                continue
            
            # Load post
            post = load_blog_post(i18n_dir, post_num, lang)
            
            if not post or not post['content']:
                print(f"  ⚠️  {lang.upper()}: No content found")
                failed += 1
                continue
            
            # Combine title and content for audio
            full_text = f"{post['title']}. {clean_for_tts(post['content'])}"
            
            # Update manifest
            post_key = f'post{post_num}'
            if post_key not in manifest['posts']:
                manifest['posts'][post_key] = {
                    'title': post['title'],
                    'audio': {}
                }
            manifest['posts'][post_key]['audio'][lang] = f'/audio/blog/{lang}/post{post_num}.mp3'
            
            if dry_run:
                print(f"  📝 {lang.upper()}: {len(full_text)} chars")
                generated += 1
            else:
                success = await generate_audio(full_text, voice, output_path)
                if success:
                    # Get file size
                    size_kb = output_path.stat().st_size / 1024
                    print(f"  ✓ {lang.upper()}: {size_kb:.0f}KB")
                    generated += 1
                else:
                    failed += 1
    
    # Save manifest
    from datetime import datetime
    manifest['generated'] = datetime.now().isoformat()
    manifest['totalPosts'] = TOTAL_POSTS
    
    if not dry_run:
        output_dir.mkdir(parents=True, exist_ok=True)
        with open(manifest_path, 'w', encoding='utf-8') as f:
            json.dump(manifest, f, indent=2, ensure_ascii=False)
        print()
        print(f"📋 Manifest: {manifest_path}")
    
    print()
    print("=" * 50)
    print(f"✅ Generated: {generated}")
    if skipped:
        print(f"⏭️  Skipped (existing): {skipped}")
    if failed:
        print(f"❌ Failed: {failed}")
    if dry_run:
        print("\nRun without --dry-run to generate files")


if __name__ == '__main__':
    asyncio.run(main())
