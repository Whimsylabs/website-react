# SEO/GEO Automation System

A comprehensive system for tracking, analyzing, and optimizing both traditional SEO (Google Search) and GEO (Generative Engine Optimization - AI visibility) for WhimsyLabs.

## Table of Contents

- [Overview](#overview)
- [Quick Start](#quick-start)
- [Directory Structure](#directory-structure)
- [npm Scripts](#npm-scripts)
- [Components](#components)
- [MCP Server Setup](#mcp-server-setup)
- [Google Search Console Setup](#google-search-console-setup)
- [GEO Tool Setup](#geo-tool-setup)
- [Workflows](#workflows)
- [Data Schema](#data-schema)
- [Troubleshooting](#troubleshooting)

## Overview

This system combines:

1. **Google Search Console (GSC) Integration** - Traditional SEO metrics
2. **GEO Tool Integration** - AI visibility tracking via CSV imports
3. **Custom MCP Server** - Query data directly from Claude Code
4. **Orchestrator** - Coordinate all components for analysis and reporting

### Why Both SEO and GEO?

- **SEO** tracks how well you rank in traditional Google Search
- **GEO** tracks how often AI systems (ChatGPT, Claude, Perplexity, etc.) mention your brand
- Together they provide a complete picture of your online visibility

## Quick Start

### 1. Generate Sample Data (Testing)

```bash
npm run seo:full -- --sample
```

This generates sample data and runs a full analysis.

### 2. Check Status

```bash
npm run seo:status
```

### 3. Import Real GEO Data

```bash
npm run seo:import-geo path/to/export.csv
```

### 4. Run Analysis

```bash
npm run seo:analyze
```

### 5. Generate Report

```bash
npm run seo:report
```

## Directory Structure

```
website-react/
├── data/
│   ├── seo-metrics/
│   │   ├── queries/          # GSC query performance data
│   │   ├── pages/            # Page-level metrics
│   │   └── .gitkeep
│   ├── geo-metrics/
│   │   ├── imports/          # Raw CSV imports
│   │   ├── normalized/       # Processed JSON data
│   │   ├── schema.js         # Data schema definitions
│   │   └── .gitkeep
│   └── reports/              # Generated reports
│       └── .gitkeep
├── scripts/seo-automation/
│   ├── gsc-data-fetcher.js   # GSC data utilities
│   ├── geo-csv-importer.js   # CSV import and normalization
│   ├── analyze-opportunities.js  # Analysis engine
│   ├── generate-report.js    # Report generator
│   └── orchestrator.js       # Main coordinator
├── mcp-servers/
│   └── geo-mcp/
│       ├── package.json
│       ├── index.js          # MCP server
│       └── tools/            # Tool handlers
└── .claude/
    └── skills/
        └── seo-geo-optimize.md  # Claude Code skill
```

## npm Scripts

| Script | Description |
|--------|-------------|
| `npm run seo:status` | Check data availability and freshness |
| `npm run seo:fetch` | GSC data utilities (see help for options) |
| `npm run seo:import-geo <csv>` | Import GEO data from CSV |
| `npm run seo:analyze` | Run analysis on existing data |
| `npm run seo:report` | Generate comprehensive report |
| `npm run seo:full` | Run full workflow |
| `npm run mcp:geo` | Start the GEO MCP server |

## Components

### 1. GEO CSV Importer (`geo-csv-importer.js`)

Imports and normalizes CSV exports from GEO tracking tools.

```bash
# Import a CSV file
node scripts/seo-automation/geo-csv-importer.js export.csv

# With options
node scripts/seo-automation/geo-csv-importer.js export.csv --source perplexity

# Dry run (validate only)
node scripts/seo-automation/geo-csv-importer.js export.csv --dry-run

# Watch mode
node scripts/seo-automation/geo-csv-importer.js --watch
```

### 2. GSC Data Fetcher (`gsc-data-fetcher.js`)

Utilities for working with Google Search Console data.

```bash
# View summary of existing data
node scripts/seo-automation/gsc-data-fetcher.js summary

# View top queries
node scripts/seo-automation/gsc-data-fetcher.js top-queries

# View top pages
node scripts/seo-automation/gsc-data-fetcher.js top-pages

# Find opportunities
node scripts/seo-automation/gsc-data-fetcher.js opportunities

# Generate sample data
node scripts/seo-automation/gsc-data-fetcher.js sample
```

### 3. Analysis Engine (`analyze-opportunities.js`)

Analyzes SEO and GEO data to find optimization opportunities.

```bash
# Run analysis
node scripts/seo-automation/analyze-opportunities.js

# Save results
node scripts/seo-automation/analyze-opportunities.js --save

# JSON output
node scripts/seo-automation/analyze-opportunities.js --json
```

### 4. Report Generator (`generate-report.js`)

Generates comprehensive reports in multiple formats.

```bash
# Generate markdown report
node scripts/seo-automation/generate-report.js --format markdown

# Generate HTML report
node scripts/seo-automation/generate-report.js --format html

# Output to stdout
node scripts/seo-automation/generate-report.js --format json --stdout
```

### 5. Orchestrator (`orchestrator.js`)

Coordinates all components for end-to-end workflows.

```bash
# Check status
node scripts/seo-automation/orchestrator.js status

# Collect new data
node scripts/seo-automation/orchestrator.js collect --csv export.csv
node scripts/seo-automation/orchestrator.js collect --sample

# Run analysis
node scripts/seo-automation/orchestrator.js analyze

# Generate report
node scripts/seo-automation/orchestrator.js report --format html

# Full workflow
node scripts/seo-automation/orchestrator.js full

# Interactive mode
node scripts/seo-automation/orchestrator.js interactive
```

## MCP Server Setup

### 1. Install Dependencies

```bash
cd mcp-servers/geo-mcp
npm install
```

### 2. Configure in Claude Code

Create or update `.claude/settings.local.json`:

```json
{
  "mcpServers": {
    "whimsylabs-geo": {
      "command": "node",
      "args": ["./mcp-servers/geo-mcp/index.js"]
    }
  }
}
```

### 3. Available MCP Tools

| Tool | Description |
|------|-------------|
| `get_geo_metrics` | Query AI visibility data by date/source |
| `get_gsc_performance` | Query GSC data for pages/queries |
| `compare_seo_geo` | Find gaps between SEO and GEO |
| `get_recommendations` | Get optimization suggestions |
| `get_data_status` | Check data availability |

## Google Search Console Setup

### Option 1: Use GSC MCP Server

1. **Install:**
   ```bash
   npx -y @smithery/cli install mcp-server-gsc --client claude
   ```

2. **Google Cloud Console Setup:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing
   - Enable "Search Console API"
   - Create OAuth 2.0 credentials (Desktop application)
   - Download the credentials JSON

3. **Configure in `.claude/settings.local.json`:**
   ```json
   {
     "mcpServers": {
       "gsc": {
         "command": "npx",
         "args": ["-y", "mcp-server-gsc"],
         "env": {
           "GOOGLE_APPLICATION_CREDENTIALS": "path/to/credentials.json"
         }
       }
     }
   }
   ```

### Option 2: Manual Data Export

1. Go to [Google Search Console](https://search.google.com/search-console/)
2. Select your property
3. Go to Performance > Search Results
4. Export to CSV or Google Sheets
5. Convert to the expected format and save to `data/seo-metrics/`

## GEO Tool Setup

### Recommended: Answer Socrates

1. Sign up at [Answer Socrates](https://answersocrates.com/) (free tier available)
2. Add tracking for your brand terms and product keywords
3. Export CSV weekly
4. Import using: `npm run seo:import-geo export.csv`

### Tracking Terms

**Brand Terms:**
- WhimsyLabs
- WhimsyCat
- whimsylabs.ai

**Product Terms:**
- virtual laboratory software
- virtual science lab for schools
- AI tutor for STEM
- online chemistry lab
- virtual physics lab

## Workflows

### Weekly Analysis Workflow

```bash
# 1. Check current status
npm run seo:status

# 2. Import new GEO data (if available)
npm run seo:import-geo ~/Downloads/answer-socrates-export.csv

# 3. Run full analysis
npm run seo:full

# 4. Review report
# Reports are saved to data/reports/
```

### Using MCP Tools in Claude Code

```
# Check data status
Use the get_data_status tool to check available data

# Get recommendations
Use the get_recommendations tool with priority: "high"

# Compare SEO vs GEO
Use the compare_seo_geo tool to find gaps
```

### Optimization Workflow

1. **Identify Gaps:** Run `compare_seo_geo` to find mismatches
2. **Prioritize:** Focus on high-SEO/low-GEO queries first
3. **Optimize Content:** Add structured FAQ sections, citations
4. **Verify:** Re-run analysis after changes

## Data Schema

### GEO Metric Schema

```javascript
{
  date: "2026-01-19",              // YYYY-MM-DD
  source: "chatgpt",               // AI platform
  query: "best virtual lab",       // Search/prompt query
  brand_mentioned: true,           // Was WhimsyLabs mentioned?
  citation_type: "recommendation", // How was it mentioned?
  url_cited: "https://...",        // URL if cited
  position: 1,                     // Position in response
  competitors_mentioned: ["Labster"], // Other brands mentioned
  sentiment: "positive"            // Sentiment of mention
}
```

### GSC Data Schema

```javascript
{
  keys: ["virtual lab software"],  // Query or page URL
  clicks: 150,                     // Total clicks
  impressions: 2500,               // Total impressions
  ctr: 0.06,                       // Click-through rate
  position: 4.2                    // Average position
}
```

### AI Sources

- `chatgpt` - OpenAI ChatGPT
- `claude` - Anthropic Claude
- `perplexity` - Perplexity AI
- `gemini` - Google Gemini
- `ai_overview` - Google AI Overviews
- `copilot` - Microsoft Copilot

### Citation Types

- `recommendation` - Direct product recommendation
- `direct` - Direct link/citation
- `contextual` - Mentioned in context
- `comparison` - Mentioned in comparison

## Troubleshooting

### "No data available"

1. Generate sample data: `npm run seo:full -- --sample`
2. Or import real data from GEO tools

### CSV Import Errors

1. Check CSV format - should have headers
2. Try with `--dry-run` to validate: `npm run seo:import-geo file.csv -- --dry-run`

### MCP Server Not Working

1. Check if dependencies are installed: `cd mcp-servers/geo-mcp && npm install`
2. Verify config in `.claude/settings.local.json`
3. Test manually: `node mcp-servers/geo-mcp/index.js`

### Stale Data Warnings

Data is considered stale after 7 days. Update by:
1. Importing new GEO CSV exports
2. Fetching fresh GSC data via MCP

## Security Notes

- **Never commit credentials:** GSC credentials should stay in `.gitignore`
- **Data files are gitignored:** Raw data files are not committed to repo
- **Schema and scripts are versioned:** Structure is tracked, data is not

## Future Enhancements

- [ ] Automated weekly data collection via GitHub Actions
- [ ] Slack/email alerts for metric changes
- [ ] Trend analysis over time
- [ ] Competitor tracking expansion
- [ ] API integration with more GEO tools
