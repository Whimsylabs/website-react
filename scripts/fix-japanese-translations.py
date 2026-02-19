#!/usr/bin/env python3
"""
Japanese Translation Fixer for WhimsyLabs Website
Fixes common translation issues to be more culturally appropriate.

Run: python scripts/fix-japanese-translations.py
"""

import os
import re
from pathlib import Path

# Define replacements: (pattern, replacement, description)
# Using tuples of (old, new) for simple replacements
# Using (regex_pattern, replacement, is_regex) for regex replacements

REPLACEMENTS = [
    # === MUSCLE MEMORY - the biggest offender ===
    # Context-aware replacements for 筋肉記憶
    # Using 実技スキル (practical skills) or 体で覚える技術 (skills learned through the body)
    ("本物の筋肉記憶", "確かな実技スキル", "muscle memory (authentic)"),
    ("真の筋肉記憶", "本格的な実技スキル", "muscle memory (true)"),
    ("筋肉記憶を構築", "実技スキルを習得", "build muscle memory"),
    ("筋肉記憶を育成", "実技スキルを育成", "develop muscle memory"),
    ("筋肉記憶と手順", "実技スキルと手順", "muscle memory and procedures"),
    ("筋肉記憶の育成", "実技スキルの習得", "muscle memory development"),
    ("筋肉記憶、", "実技スキル、", "muscle memory comma"),
    ("筋肉記憶を", "実技スキルを", "muscle memory wo"),
    ("筋肉記憶が", "実技スキルが", "muscle memory ga"),
    ("筋肉記憶の", "実技スキルの", "muscle memory no"),
    ("筋肉記憶", "実技スキル", "muscle memory (fallback)"),
    
    # === OVERLY DIRECT CTAs - soften them ===
    ("準備はできていますか？", "いかがでしょうか？", "ready? -> how about?"),
    ("理科部門を変革する準備はできていますか", "理科教育の改善をお考えですか", "transform ready -> considering improvement"),
    ("始めましょう。", "始めてみませんか。", "let's start -> why not start"),
    ("科学を始めましょう", "科学を体験しましょう", "start science -> experience science"),
    ("教え始めましょう", "指導に集中できます", "start teaching -> can focus on teaching"),
    
    # === UNNATURAL DIRECT TRANSLATIONS ===
    ("「次へ」をクリックするのをやめて、", "「次へ」をクリックするだけの学習ではなく、", "stop clicking next"),
    ("チェックボックスにチェックを入れるのをやめて、", "チェックボックスを埋めるだけの作業から解放され、", "stop checking boxes"),
    
    # === OVERLY EMPHATIC ===
    ("。絶対に。", "。", "remove emphatic period"),
    ("絶対に。広告", "広告", "remove emphatic before ads"),
    
    # === SPECIFIC PHRASE IMPROVEMENTS ===
    ("私たちのチームがニーズに合わせた", "お客様のニーズに合わせた", "our team -> customer needs"),
    ("私たちのチームが", "弊社が", "our team (formal)"),
    ("プロジェクトについてお聞かせください — 私たちのチーム", "プロジェクトについてお聞かせください。弊社", "project tellus - our team"),
]

# Additional context-specific fixes that need manual review flags
REVIEW_FLAGS = [
    "絶対に",  # Too emphatic
    "！！",    # Double exclamation
    "あなた",  # Might need to be お客様
]

def fix_file(filepath: Path, dry_run: bool = False) -> tuple[int, list[str]]:
    """Fix a single file. Returns (changes_made, list of changes)."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        return 0, [f"Error reading: {e}"]
    
    original = content
    changes = []
    
    for replacement in REPLACEMENTS:
        old, new, desc = replacement
        if old in content and old != new:
            count = content.count(old)
            content = content.replace(old, new)
            changes.append(f"  {desc}: {count}x")
    
    # Check for review flags
    flags_found = []
    for flag in REVIEW_FLAGS:
        if flag in content:
            flags_found.append(flag)
    
    if flags_found:
        changes.append(f"  ⚠️  Review needed: {', '.join(flags_found)}")
    
    if content != original:
        if not dry_run:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
        return len(changes), changes
    
    return 0, []


def main():
    import sys
    dry_run = '--dry-run' in sys.argv
    
    script_dir = Path(__file__).parent
    project_root = script_dir.parent
    i18n_dir = project_root / 'src' / 'i18n'
    
    print("🇯🇵 Japanese Translation Fixer")
    print("=" * 50)
    if dry_run:
        print("DRY RUN - no changes will be made")
    print()
    
    # Find all Japanese files
    ja_files = list(i18n_dir.rglob('ja.js'))
    ja_files.extend(i18n_dir.rglob('**/ja.js'))
    
    # Also check translations.js for jp: sections
    translations_file = i18n_dir / 'translations.js'
    
    # Deduplicate
    ja_files = list(set(ja_files))
    if translations_file.exists():
        ja_files.append(translations_file)
    
    print(f"Found {len(ja_files)} files to check")
    print()
    
    total_changes = 0
    files_changed = 0
    
    for filepath in sorted(ja_files):
        rel_path = filepath.relative_to(project_root)
        changes_count, changes = fix_file(filepath, dry_run)
        
        if changes_count > 0:
            files_changed += 1
            total_changes += changes_count
            print(f"📝 {rel_path}")
            for change in changes:
                print(change)
            print()
    
    print("=" * 50)
    print(f"✅ {total_changes} changes in {files_changed} files")
    if dry_run:
        print("Run without --dry-run to apply changes")


if __name__ == '__main__':
    main()
