# SEO/GEO Optimization Skill

When the user runs `/seo-geo` or asks about SEO/GEO optimization for WhimsyLabs:

## Overview

This skill provides tools for analyzing and optimizing both traditional SEO (Google Search) and GEO (Generative Engine Optimization - AI visibility) for the WhimsyLabs website.

## Available Commands

### Quick Status Check
```bash
node scripts/seo-automation/orchestrator.js status
```
Shows current data availability and freshness.

### Full Analysis
```bash
node scripts/seo-automation/orchestrator.js full
```
Runs complete workflow: data check, analysis, and report generation.

### Import GEO Data
```bash
node scripts/seo-automation/orchestrator.js collect --csv <path-to-csv>
```
Import data from GEO tools like Answer Socrates.

### Generate Sample Data (Testing)
```bash
node scripts/seo-automation/orchestrator.js collect --sample
```
Creates sample data for testing the system.

### Generate Report
```bash
node scripts/seo-automation/orchestrator.js report --format markdown
```
Formats: json, markdown, html

## MCP Server

The custom GEO MCP server provides these tools:
- `get_geo_metrics` - Query AI visibility data
- `get_gsc_performance` - Query Google Search Console data
- `compare_seo_geo` - Find gaps between SEO and GEO performance
- `get_recommendations` - Get optimization suggestions
- `get_data_status` - Check data availability

To use MCP tools, ensure the server is configured in `.claude/settings.local.json`.

## Workflow

1. **Check Status First**
   ```bash
   node scripts/seo-automation/orchestrator.js status
   ```

2. **If data is stale or missing:**
   - For GEO: Export CSV from Answer Socrates and import
   - For SEO: Use GSC MCP tools to fetch fresh data

3. **Run Analysis**
   ```bash
   node scripts/seo-automation/orchestrator.js analyze
   ```

4. **Review Recommendations**
   The analysis output includes prioritized recommendations:
   - HIGH priority: Address immediately
   - MEDIUM priority: Schedule for next sprint
   - LOW priority: Nice to have

5. **Generate Report**
   ```bash
   node scripts/seo-automation/orchestrator.js report --format html
   ```
   Reports are saved to `data/reports/`

## Key Metrics

### GEO (AI Visibility)
- **Mention Rate**: % of tracked queries where WhimsyLabs is mentioned
- **Source Coverage**: Which AI platforms mention us (ChatGPT, Claude, Perplexity, etc.)
- **Citation Type**: How we're mentioned (recommendation, direct link, contextual)
- **Competitor Presence**: Which competitors appear in AI responses

### SEO (Google Search)
- **Clicks/Impressions**: Traffic volume
- **CTR**: Click-through rate (target >3% for most queries)
- **Position**: Average ranking position
- **Page Performance**: Which pages drive traffic

## Common Optimizations

### Improve GEO Visibility
1. Add structured FAQ sections (AI systems prefer Q&A format)
2. Include authoritative citations and references
3. Make key information easily extractable
4. Use clear headings and bullet points

### Improve SEO Performance
1. Optimize meta titles for better CTR
2. Add internal links to underperforming pages
3. Expand content on high-potential queries
4. Fix technical SEO issues

### Bridge SEO/GEO Gaps
1. For high-SEO/low-GEO queries: Add AI-friendly content
2. For high-GEO/low-SEO queries: Improve traditional ranking

## File Locations

- **Data**: `data/seo-metrics/`, `data/geo-metrics/`
- **Reports**: `data/reports/`
- **Scripts**: `scripts/seo-automation/`
- **MCP Server**: `mcp-servers/geo-mcp/`
- **Schema**: `data/geo-metrics/schema.js`

## npm Scripts

```bash
npm run seo:fetch        # Fetch GSC data
npm run seo:import-geo   # Import GEO CSV
npm run seo:analyze      # Run analysis
npm run seo:report       # Generate report
npm run seo:full         # Full workflow
npm run mcp:geo          # Start GEO MCP server
```

## Tracking Terms

### Brand Terms (always track)
- WhimsyLabs
- WhimsyCat
- whimsylabs.ai

### Product Terms (track for market visibility)
- virtual laboratory software
- virtual science lab for schools
- AI tutor for STEM
- online chemistry lab
- virtual physics lab

### Known Competitors
- Labster
- PhET
- ChemCollective
- Beyond Labz
- CloudLabs
