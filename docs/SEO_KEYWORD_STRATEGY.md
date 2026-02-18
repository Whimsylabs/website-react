# WhimsyLabs SEO Keyword Strategy

> Last Updated: 2026-02-18
> Status: Active Implementation

## Overview

This document outlines the target SEO keywords for each page of the WhimsyLabs website across all supported languages (EN, DE, ES, FR, JP). Keywords should appear in:
- **Page titles** (`<title>` tag) - Primary ranking factor
- **H1 headings** - Secondary ranking factor, user-facing
- **Meta descriptions** - Not a direct ranking factor but affects CTR
- **First 100 words of content** - Supports keyword relevance

---

## Primary Keywords by Language

### English (EN) - Primary Market

| Page | Primary Keyword | Secondary Keywords |
|------|-----------------|-------------------|
| **Homepage** | Virtual Laboratory Software | virtual science lab, virtual lab software, STEM education |
| **Features** | AI Science Tutor | virtual lab features, physics simulation, VR education |
| **Services** | Virtual Lab for Schools | K-12 lab software, classroom lab solutions, school science software |
| **FAQ** | Virtual Science Lab FAQ | online lab simulation, virtual lab questions |
| **Blog** | STEM Education Blog | AI in science education, virtual lab insights |

### German (DE)

| Page | Primary Keyword | Secondary Keywords |
|------|-----------------|-------------------|
| **Homepage** | Virtuelles Labor | virtuelle Labore für Schulen, Labor-Software |
| **Features** | Virtuelles Labor Software | Physiksimulation, KI-Tutor |
| **Services** | Virtuelles Labor für Schulen | Unterrichtssoftware, Labor für Schulen |
| **FAQ** | Virtuelles Labor FAQ | Online-Laborsimulation, virtuelle Experimente |
| **Blog** | Virtuelles Labor Blog | MINT-Bildung, Naturwissenschaften digital |

### Spanish (ES)

| Page | Primary Keyword | Secondary Keywords |
|------|-----------------|-------------------|
| **Homepage** | Laboratorio Virtual | laboratorios virtuales, software de laboratorio |
| **Features** | Laboratorio Virtual | simulación física, tutor de ciencias IA |
| **Services** | Laboratorio Virtual para Escuelas | software educativo, laboratorio escolar |
| **FAQ** | Laboratorio Virtual FAQ | simulación de laboratorio online |
| **Blog** | Laboratorio Virtual Blog | educación STEM, ciencias virtuales |

### French (FR)

| Page | Primary Keyword | Secondary Keywords |
|------|-----------------|-------------------|
| **Homepage** | Laboratoire Virtuel | laboratoires virtuels, logiciel de laboratoire |
| **Features** | Laboratoire Virtuel | simulation physique, tuteur IA sciences |
| **Services** | Laboratoire Virtuel pour Écoles | logiciel éducatif, laboratoire scolaire |
| **FAQ** | Laboratoire Virtuel FAQ | simulation de labo en ligne |
| **Blog** | Laboratoire Virtuel Blog | éducation STEM, sciences virtuelles |

### Japanese (JP)

| Page | Primary Keyword | Secondary Keywords |
|------|-----------------|-------------------|
| **Homepage** | 仮想実験室 | バーチャルラボ, 実験室ソフトウェア |
| **Features** | 仮想実験室 | 物理シミュレーション, AI理科チューター |
| **Services** | 学校向け仮想実験室 | 教育ソフトウェア, 学校用ラボ |
| **FAQ** | 仮想実験室 FAQ | オンライン実験シミュレーション |
| **Blog** | 仮想実験室ブログ | STEM教育, 理科教育 |

---

## Title Tag Guidelines

### Format
```
[Primary Keyword] | [Secondary Context] | WhimsyLabs
```

### Length
- **Ideal:** 50-60 characters
- **Maximum:** 70 characters (Google truncates after this)
- Japanese can be slightly longer due to character density

### Examples

**English:**
- ✅ `Virtual Laboratory Software for STEM Education | WhimsyLabs`
- ✅ `AI Science Tutor & Virtual Lab Features | WhimsyLabs`
- ❌ `WhimsyLabs - The Best Virtual Laboratory Software for Schools and Education` (too long)

**German:**
- ✅ `Virtuelles Labor für Schulen | MINT-Software | WhimsyLabs`
- ✅ `Virtuelles Labor Software & Physiksimulation | WhimsyLabs`

---

## H1 Heading Guidelines

### Rules
1. **One H1 per page** - Never multiple H1s
2. **Include primary keyword** - But make it natural/compelling
3. **Different from title** - Slight variation is good for SEO
4. **User-focused** - H1 is what users see, make it engaging

### Examples

**Homepage:**
- Title: `Virtual Laboratory Software for STEM Education | WhimsyLabs`
- H1: `WhimsyLabs: The Virtual Lab for Real Science`

**Features:**
- Title: `AI Science Tutor & Virtual Lab Features | WhimsyLabs`
- H1: `AI Science Tutor & Virtual Lab Features`

---

## Competitor Keyword Analysis

### Primary Competitors
| Competitor | Primary Keywords They Target |
|------------|------------------------------|
| **Labster** | virtual labs, science simulations, VR lab |
| **PhET** | interactive simulations, physics simulations |
| **ChemCollective** | virtual chemistry lab, chemistry simulations |
| **Praxilabs** | virtual science labs, online lab experiments |

### Our Differentiation Keywords
- "physics-first virtual lab" (unique positioning)
- "AI-powered assessment" (unique feature)
- "muscle memory" (unique benefit)
- "cheat-proof practicals" (unique selling point)

---

## Search Intent Mapping

| Search Intent | Keywords | Target Page |
|--------------|----------|-------------|
| **Informational** | "what is a virtual lab", "how do virtual labs work" | Blog, FAQ |
| **Commercial** | "best virtual lab software", "virtual lab comparison" | Features, Services |
| **Transactional** | "virtual lab for schools pricing", "buy virtual lab software" | Services, Contact |
| **Navigational** | "WhimsyLabs login", "WhimsyLabs demo" | Direct pages |

---

## Implementation Checklist

### For Each Page Update:
- [ ] Title includes primary keyword
- [ ] Title is under 60 characters
- [ ] H1 includes primary keyword
- [ ] H1 is different from (but related to) title
- [ ] Meta description includes primary keyword
- [ ] First paragraph mentions primary keyword naturally
- [ ] Alt text on images includes relevant keywords

### Files to Update:
| Language | File |
|----------|------|
| English | `/src/i18n/translations.js` (en section) + `/src/i18n/home/en.js` |
| German | `/src/i18n/translations.js` (de section) + `/src/i18n/home/de.js` |
| Spanish | `/src/i18n/translations.js` (es section) + `/src/i18n/home/es.js` |
| French | `/src/i18n/translations.js` (fr section) + `/src/i18n/home/fr.js` |
| Japanese | `/src/i18n/translations.js` (jp section) + `/src/i18n/home/ja.js` |

---

## Monitoring & Iteration

### Tools
- **Google Search Console** - Track keyword rankings and impressions
- **SEO audit script** - `/scripts/seo-audit.js` - Run before each deployment

### Review Cadence
- **Weekly:** Check GSC for ranking changes
- **Monthly:** Review keyword performance, adjust strategy
- **Quarterly:** Full SEO audit with competitor analysis

### Success Metrics
| Metric | Current | Target |
|--------|---------|--------|
| Keyword targeting score (avg) | ~20/100 | 70+/100 |
| Pages with keywords in title | 40% | 100% |
| Pages with keywords in H1 | 30% | 100% |

---

## Appendix: Keyword Research Sources

### English
- Google Keyword Planner
- SEMrush education keywords database
- Competitor title analysis (Labster, PhET)

### German
- lehrer-online.de terminology
- schule-bw.de educational resources
- e-teaching.org vocabulary

### Spanish
- educacion.gob.es terminology
- Ministry of Education (Spain) vocabulary
- Latin American education portals

### French
- education.gouv.fr terminology
- pedagogie.ac-reims.fr vocabulary
- Swiss/Belgian education resources

### Japanese
- 文部科学省 (MEXT) terminology
- Japanese education technology blogs
- Japanese virtual lab competitors

---

*Document maintained by: Whimsycat 🐱*
*Next review date: 2026-03-18*
