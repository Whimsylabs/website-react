# FAQ Translation Desync Issue

**Date Identified:** 2026-02-19  
**Status:** Needs Fix

## Problem

The FAQ content exists in two places that are out of sync:

| Source | Questions | Location |
|--------|-----------|----------|
| **faqData.js** (source of truth) | 40 | `src/data/faqData.js` |
| **i18n/faq/en.js** | 34 | Missing 9 questions |
| **i18n/faq/es.js** | 39 | Missing 4 questions |
| **i18n/faq/fr.js** | 39 | Missing 4 questions |
| **i18n/faq/de.js** | 39 | Missing 4 questions |
| **i18n/faq/ja.js** | 39 | Missing 4 questions |

## Missing Questions

### Missing from ALL translation files (6 questions):

These are from the **"Getting Started"** category:

1. "Is WhimsyLabs free?"
2. "Do I need VR headsets to use WhimsyLabs?"
3. "How much does WhimsyLabs cost per student?"
4. "How do I get started with WhimsyLabs?"
5. "What subjects does WhimsyLabs cover?"

Plus one from Technical Features:
6. "How does Whimsylabs protect student data?"

### Missing from en.js only:

The English translation file is missing all 6 above, while other languages have translations for the data protection question but are missing the "Getting Started" category (5 questions).

## Impact

- **TTS Audio Generation:** Falls back to English for missing translations (acceptable)
- **SEO:** Pages may show English text even on localized URLs
- **Consistency:** User experience varies by language

## Root Cause

The "Getting Started" category appears to have been added to `faqData.js` after the translation files were created, and the sync was never completed.

## Recommended Fix

### Option 1: Manual Sync (Quick)
Add the missing questions to each translation file manually.

### Option 2: Automated Sync Script (Better)
Create a script that:
1. Reads all questions from `faqData.js`
2. Checks each translation file for missing entries
3. Adds placeholders or copies English text for missing entries
4. Flags items needing human translation

### Option 3: Single Source of Truth (Best)
Restructure to have translations reference `faqData.js` structure directly, with only the translated text in i18n files (not duplicating question structure).

## Files Involved

```
src/data/faqData.js              # Source of truth (40 questions)
src/i18n/faq/en.js               # 34 questions
src/i18n/faq/es.js               # 39 questions  
src/i18n/faq/fr.js               # 39 questions
src/i18n/faq/de.js               # 39 questions
src/i18n/faq/ja.js               # 39 questions
src/i18n/faqDataGenerator.js     # Generates localized FAQ data
```

## Sync Script Location

A sync script should be added at: `scripts/sync-faq-translations.js`
