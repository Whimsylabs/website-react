# SEO Curriculum Strategy for WhimsyLabs

This document outlines the SEO strategy for improving WhimsyLabs' search rankings through curriculum-aligned content and technical optimizations.

## Executive Summary

WhimsyLabs needs to shift from generic "edtech SEO" to **curriculum-aligned content** that captures teachers searching for specific experiments they need to teach. The current site has strong foundational content but lacks the targeted landing pages that competitors use to dominate search results.

---

## Current State Analysis

### Strengths

| Area | Status | Notes |
|------|--------|-------|
| Sandbox differentiation | Strong | "10,000+ equipment permutations" messaging prominent |
| FAQ content | Excellent | 35+ comprehensive FAQs with citations |
| SEND coverage | Good | Blog post + FAQ coverage |
| Schema markup | Good | Organization, SoftwareApplication, Course schemas |
| Curriculum mentions | Partial | GCSE/A-Level mentioned in FAQ but buried |

### Weaknesses

| Area | Status | Notes |
|------|--------|-------|
| Experiment landing pages | Missing | No pages for specific practicals |
| Video/media embeds | Missing | No video previews of simulations |
| Competitor comparisons | Minimal | Only one "vs physical labs" post |
| Teacher resources | Missing | No downloadable PDFs |
| Homeschool targeting | Missing | Untapped market |
| Features page | Incomplete | Shows "WIP" notice |

---

## Strategy 1: Curriculum-Mapped Experiment Pages (Highest Impact)

### The Problem

Teachers don't search for "virtual lab software"—they search for the **specific experiment** they need to teach next week:
- "virtual titration GCSE chemistry"
- "A-level physics SHM simulation"
- "osmosis practical virtual lab"

Currently, these searches land on Labster, PhET, or Gizmos—not WhimsyLabs.

### Recommended URL Structure

```
/experiments/
├── gcse-chemistry/
│   ├── titration/
│   ├── electrolysis/
│   ├── neutralisation/
│   ├── chromatography/
│   └── rates-of-reaction/
├── gcse-biology/
│   ├── osmosis/
│   ├── photosynthesis/
│   ├── enzymes/
│   └── microscopy/
├── gcse-physics/
│   ├── circuits/
│   ├── waves/
│   ├── forces/
│   └── radiation/
├── a-level-chemistry/
│   ├── titration-calculations/
│   ├── enthalpy/
│   └── electrochemistry/
├── a-level-biology/
│   ├── gel-electrophoresis/
│   ├── dissection/
│   └── cell-biology/
└── a-level-physics/
    ├── simple-harmonic-motion/
    ├── young-modulus/
    └── circuits-analysis/
```

### Page Template for Each Experiment

Each experiment landing page should include:

1. **SEO-optimized title**: "Virtual Titration Experiment - GCSE Chemistry Required Practical | WhimsyLabs"

2. **Exam board alignment section**:
   - AQA: Specification reference 4.4.2.1
   - Edexcel: Topic 8, Core Practical 4
   - OCR: Module 4, PAG 6

3. **Video/GIF preview**: 15-30 second loop showing the simulation in action

4. **Learning objectives**: What students will learn

5. **Sandbox advantages**: How WhimsyLabs' open-ended approach differs from rigid competitors

6. **Downloadable resources**:
   - Lesson plan PDF
   - Student worksheet PDF
   - Risk assessment comparison (physical vs virtual)

7. **CTA**: "Try this experiment free" or "Request school demo"

### Priority Experiments to Create First

Based on search volume and curriculum requirements:

| Experiment | Level | Priority | Rationale |
|------------|-------|----------|-----------|
| Titration | GCSE/A-Level | High | Required practical, high search volume |
| Osmosis | GCSE | High | Core practical, commonly searched |
| Electrolysis | GCSE | High | Required practical |
| Simple Harmonic Motion | A-Level | High | Difficult to demonstrate physically |
| Gel Electrophoresis | A-Level | Medium | Advanced practical, safety concerns |
| Dissection | GCSE/A-Level | Medium | Ethics/safety alternative |

---

## Strategy 2: Video/Media Embeds for WebGL SEO

### The Problem

Google cannot "play" WebGL simulations. Without visual content describing your simulations, Google sees your pages as text-only, missing the core value proposition.

### Current State

From live site analysis:
> "No embedded videos detected. Only static images referenced"

### Implementation Plan

#### Homepage
- Add hero video (15-30 seconds) showing lab environment
- Auto-play, muted, looping
- Alt text: "Student performing virtual chemistry titration in WhimsyLabs 3D environment"

#### Features Page
- Add video/GIF for each feature:
  - Sandbox Freedom: Student freely combining equipment
  - Physics Engine: Liquid pouring with realistic physics
  - AI Tutoring: WhimsyCat providing feedback
  - Hand Representation: VR hand interactions

#### Experiment Pages
- Each experiment page needs a preview video
- Optimize for dwell time (ranking factor)

### Video Specifications

- Format: MP4 (with WebM fallback)
- Length: 15-30 seconds
- Size: Under 5MB for fast loading
- Aspect ratio: 16:9
- Include captions/subtitles

---

## Strategy 3: Competitor Differentiation Content

### Target Keywords

| Keyword | Search Intent | Competition |
|---------|---------------|-------------|
| "Labster alternative" | High intent, switching | Medium |
| "PhET simulations alternative" | High intent | Low |
| "best virtual labs for schools 2026" | Research phase | High |
| "sandbox virtual lab" | Feature-specific | Low |
| "inquiry-based virtual labs" | Pedagogical | Low |

### Recommended Blog Posts

#### Post 1: "WhimsyLabs vs Labster: Sandbox Freedom vs Guided Simulations"
- Objective comparison of approaches
- Highlight pedagogical differences
- Include teacher testimonials
- Target: Teachers evaluating options

#### Post 2: "Best Virtual Lab Platforms for UK Schools 2026"
- Comprehensive comparison (including WhimsyLabs)
- Criteria: Price, curriculum alignment, features
- Position WhimsyLabs fairly but highlight strengths
- Target: School procurement decision-makers

#### Post 3: "Why 'Click-Next' Virtual Labs Aren't Teaching Real Science"
- Thought leadership piece
- Cite educational research on inquiry-based learning
- Position sandbox approach as pedagogically superior
- Target: Science department heads

#### Post 4: "From PhET to Full Labs: When Free Simulations Aren't Enough"
- Acknowledge PhET's value for basics
- Explain when schools need more comprehensive solutions
- Target: Schools outgrowing free tools

---

## Strategy 4: Teacher Resource Hub

### The Problem

Teachers share resources. Downloadable PDFs get:
- Shared on school intranets (backlinks)
- Saved and reused (brand awareness)
- Indexed by Google (additional ranking opportunities)

### Recommended Structure

```
/resources/
├── lesson-plans/
│   ├── gcse-chemistry-titration-lesson-plan.pdf
│   ├── gcse-biology-osmosis-lesson-plan.pdf
│   ├── a-level-physics-shm-lesson-plan.pdf
│   └── ...
├── worksheets/
│   ├── titration-student-worksheet.pdf
│   ├── osmosis-investigation-sheet.pdf
│   └── ...
├── risk-assessments/
│   ├── virtual-lab-risk-assessment-template.pdf
│   └── physical-vs-virtual-risk-comparison.pdf
└── guides/
    ├── getting-started-with-whimsylabs.pdf
    ├── integrating-virtual-labs-curriculum.pdf
    └── whimsylabs-for-send-students.pdf
```

### PDF SEO Best Practices

- Include keywords in filename: `gcse-chemistry-titration-lesson-plan.pdf`
- Add metadata (title, author, description) to PDF properties
- Link to PDFs from relevant pages
- Create an index page listing all resources

---

## Strategy 5: Niche Market Expansion

### Homeschool Market

#### Why Target Homeschoolers?

- Lower competition than institutional market
- High intent (parents actively seeking resources)
- Word-of-mouth driven (high sharing)
- Growing market post-COVID

#### Recommended: `/homeschool/` Landing Page

Content should address:
- Safety (no chemicals in home)
- Flexibility (self-paced learning)
- Curriculum alignment (GCSE/IGCSE options)
- Cost comparison (vs buying lab equipment)
- Testimonials from homeschool families

#### Outreach Targets

- Homeschool curriculum blogs
- "Best homeschool science curriculum" listicles
- Homeschool Facebook groups
- Homeschool conventions/conferences

### SEND/Accessibility Market

#### Why Target SEND?

- Underserved market
- High-value institutional sales
- Strong alignment with WhimsyLabs features
- Fewer competitors targeting this niche

#### Recommended: `/accessibility/` or `/send-support/` Landing Page

Content should address:
- Multisensory learning benefits
- Self-paced experimentation
- Speech-to-Action feature (in development)
- WCAG 2.1 compliance
- Case studies from SEND schools

#### Outreach Targets

- SEND education blogs
- Accessibility-focused EdTech reviews
- Special education conferences
- NASEN (National Association for Special Educational Needs)

---

## Strategy 6: US Market Expansion (Future)

### NGSS-Aligned Content

If expanding to US market, create pages targeting:

```
/experiments/ngss/
├── hs-ps1-2-reaction-rates/
├── hs-ps2-1-newtons-laws/
├── hs-ls1-2-cell-function/
└── ...
```

### Target Keywords

- "NGSS virtual labs"
- "Next Generation Science Standards simulations"
- "virtual lab for middle school science"
- "AP Chemistry virtual lab"

---

## Technical SEO Checklist

### Immediate Actions

- [ ] Run Lighthouse audit on homepage
- [ ] Check Core Web Vitals (LCP, FID, CLS)
- [ ] Ensure WebGL doesn't block initial content paint
- [ ] Add video schema markup to pages with videos
- [ ] Complete Features page (remove WIP notice)

### Ongoing Monitoring

- [ ] Track rankings for target keywords
- [ ] Monitor Core Web Vitals in Search Console
- [ ] Review crawl errors monthly
- [ ] Update sitemap when adding experiment pages

---

## Implementation Priority

### Phase 1: Quick Wins (1-2 weeks)

1. Complete Features page (remove WIP)
2. Add video/GIF to homepage hero
3. Write first competitor comparison blog post
4. Create `/resources/` page structure

### Phase 2: Curriculum Pages (2-4 weeks)

5. Create 5 high-priority experiment landing pages
6. Add exam board specifications to each
7. Create downloadable lesson plan PDFs
8. Add video previews to experiment pages

### Phase 3: Niche Expansion (4-6 weeks)

9. Create `/homeschool/` landing page
10. Create `/send-support/` landing page
11. Begin outreach to niche bloggers
12. Submit for inclusion in resource lists

### Phase 4: Scale & Optimize (Ongoing)

13. Expand to 20+ experiment pages
14. Create teacher resource library
15. Monitor rankings and adjust
16. Consider US/NGSS expansion

---

## Backlink Strategy

### High-Value Targets

| Target Type | Examples | Action |
|-------------|----------|--------|
| .ac.uk / .edu domains | University partnerships | Request case study links |
| Education blogs | TeacherToolkit, TES | Submit for reviews |
| Homeschool resources | HSLDA, homeschool blogs | Request inclusion |
| SEND resources | NASEN, Autism Education Trust | Request reviews |
| EdTech directories | EdSurge, Common Sense Media | Submit for listing |

### Content for Link Building

- Original research/surveys (e.g., "UK Teacher Survey on Virtual Labs 2026")
- Infographics comparing physical vs virtual lab costs
- Free downloadable resources (lesson plans, risk assessments)
- Guest posts on education blogs

---

## Metrics to Track

| Metric | Tool | Target |
|--------|------|--------|
| Organic traffic to experiment pages | Google Analytics | 500+ sessions/month per page |
| Rankings for curriculum keywords | Search Console | Top 10 for priority terms |
| PDF downloads | Analytics events | 100+ downloads/month |
| Backlinks from .edu/.ac.uk | Ahrefs/Moz | 10+ new links/quarter |
| Demo requests from organic | CRM | 20% increase |

---

## Appendix: Keyword Research Template

For each new experiment page, research:

1. **Primary keyword**: "virtual titration GCSE"
2. **Secondary keywords**: "titration simulation", "chemistry titration practice"
3. **Long-tail**: "how to do titration experiment online", "virtual acid base titration"
4. **Questions**: "can I do titration online?", "virtual titration for GCSE chemistry"

Use tools:
- Google Search Console (existing queries)
- Google Keyword Planner
- AnswerThePublic (questions)
- Also Asked (related questions)

---

*Last updated: January 2026*
*Strategy based on competitive analysis of Labster, PhET, and Gizmos*
