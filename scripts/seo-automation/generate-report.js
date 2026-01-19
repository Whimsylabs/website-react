#!/usr/bin/env node
/**
 * SEO/GEO Report Generator
 *
 * Generates comprehensive reports combining SEO and GEO metrics.
 * Supports multiple output formats: JSON, Markdown, HTML.
 *
 * Usage:
 *   node scripts/seo-automation/generate-report.js [options]
 */

const fs = require('fs');
const path = require('path');

// Data directories
const DATA_ROOT = path.join(__dirname, '../../data');
const REPORTS_DIR = path.join(DATA_ROOT, 'reports');

// Import analysis module
const analyzer = require('./analyze-opportunities.js');

/**
 * Generate report data structure
 */
function generateReportData() {
  const geoMetrics = analyzer.loadGeoMetrics();
  const gscQueries = analyzer.loadGSCData('queries');
  const gscPages = analyzer.loadGSCData('pages');

  // Calculate overall metrics
  const overallGeo = {
    totalTracked: geoMetrics.length,
    mentioned: geoMetrics.filter(m => m.brand_mentioned).length,
    mentionRate: geoMetrics.length > 0
      ? ((geoMetrics.filter(m => m.brand_mentioned).length / geoMetrics.length) * 100).toFixed(1)
      : 0,
    sources: [...new Set(geoMetrics.map(m => m.source))],
    dateRange: getDateRange(geoMetrics)
  };

  const overallSeo = {
    totalQueries: gscQueries?.rows?.length || 0,
    totalPages: gscPages?.rows?.length || 0,
    totalClicks: gscQueries?.rows?.reduce((sum, r) => sum + r.clicks, 0) || 0,
    totalImpressions: gscQueries?.rows?.reduce((sum, r) => sum + r.impressions, 0) || 0,
    avgPosition: calculateAvgPosition(gscQueries?.rows),
    dateRange: gscQueries?.date_range || null
  };

  // Get analysis data
  const bySource = analyzer.analyzeGeoBySource(geoMetrics);
  const competitors = analyzer.analyzeCompetitors(geoMetrics);
  const themes = analyzer.analyzeQueryThemes(geoMetrics);
  const gaps = analyzer.findGaps(geoMetrics, gscQueries);
  const recommendations = analyzer.generateRecommendations({
    bySource, competitors, themes, gaps
  });

  // Top performers
  const topQueries = gscQueries?.rows
    ?.filter(r => r.impressions >= 10)
    ?.sort((a, b) => b.clicks - a.clicks)
    ?.slice(0, 10)
    ?.map(r => ({
      query: r.keys[0],
      clicks: r.clicks,
      impressions: r.impressions,
      ctr: (r.ctr * 100).toFixed(2) + '%',
      position: r.position.toFixed(1)
    })) || [];

  const topPages = gscPages?.rows
    ?.filter(r => r.impressions >= 10)
    ?.sort((a, b) => b.clicks - a.clicks)
    ?.slice(0, 10)
    ?.map(r => ({
      page: r.keys[0].replace('https://whimsylabs.ai', ''),
      clicks: r.clicks,
      impressions: r.impressions,
      ctr: (r.ctr * 100).toFixed(2) + '%',
      position: r.position.toFixed(1)
    })) || [];

  return {
    generatedAt: new Date().toISOString(),
    overview: {
      geo: overallGeo,
      seo: overallSeo
    },
    geoBySource: bySource,
    competitors: competitors.competitors.slice(0, 10),
    queryThemes: themes,
    gaps: {
      highSeoLowGeo: gaps.highSeoLowGeo.slice(0, 10),
      highGeoLowSeo: gaps.highGeoLowSeo.slice(0, 10)
    },
    topPerformers: {
      queries: topQueries,
      pages: topPages
    },
    recommendations
  };
}

/**
 * Get date range from metrics
 */
function getDateRange(metrics) {
  if (metrics.length === 0) return null;

  const dates = metrics.map(m => m.date).filter(Boolean).sort();
  return {
    start: dates[0],
    end: dates[dates.length - 1]
  };
}

/**
 * Calculate weighted average position
 */
function calculateAvgPosition(rows) {
  if (!rows || rows.length === 0) return 0;

  const totalImpressions = rows.reduce((sum, r) => sum + r.impressions, 0);
  if (totalImpressions === 0) return 0;

  const weightedSum = rows.reduce((sum, r) => sum + (r.position * r.impressions), 0);
  return (weightedSum / totalImpressions).toFixed(1);
}

/**
 * Format report as Markdown
 */
function formatMarkdown(data) {
  let md = `# SEO/GEO Performance Report\n\n`;
  md += `*Generated: ${new Date(data.generatedAt).toLocaleString()}*\n\n`;

  // Overview
  md += `## Overview\n\n`;
  md += `### AI Visibility (GEO)\n\n`;
  md += `| Metric | Value |\n|--------|-------|\n`;
  md += `| Total Queries Tracked | ${data.overview.geo.totalTracked} |\n`;
  md += `| Brand Mentions | ${data.overview.geo.mentioned} |\n`;
  md += `| Mention Rate | ${data.overview.geo.mentionRate}% |\n`;
  md += `| AI Sources | ${data.overview.geo.sources.join(', ') || 'None'} |\n\n`;

  md += `### Traditional SEO (GSC)\n\n`;
  md += `| Metric | Value |\n|--------|-------|\n`;
  md += `| Total Queries | ${data.overview.seo.totalQueries} |\n`;
  md += `| Total Clicks | ${data.overview.seo.totalClicks.toLocaleString()} |\n`;
  md += `| Total Impressions | ${data.overview.seo.totalImpressions.toLocaleString()} |\n`;
  md += `| Average Position | ${data.overview.seo.avgPosition} |\n\n`;

  // GEO by Source
  if (Object.keys(data.geoBySource).length > 0) {
    md += `## AI Visibility by Source\n\n`;
    md += `| Source | Tracked | Mentioned | Rate |\n|--------|---------|-----------|------|\n`;
    for (const [source, stats] of Object.entries(data.geoBySource)) {
      md += `| ${source} | ${stats.total} | ${stats.mentioned} | ${stats.mentionRate} |\n`;
    }
    md += `\n`;
  }

  // Competitors
  if (data.competitors.length > 0) {
    md += `## Competitor Visibility in AI\n\n`;
    md += `| Competitor | Mentions |\n|------------|----------|\n`;
    for (const comp of data.competitors) {
      md += `| ${comp.competitor} | ${comp.mentions} |\n`;
    }
    md += `\n`;
  }

  // Gaps
  if (data.gaps.highSeoLowGeo.length > 0 || data.gaps.highGeoLowSeo.length > 0) {
    md += `## SEO/GEO Gaps\n\n`;

    if (data.gaps.highSeoLowGeo.length > 0) {
      md += `### High SEO Performance, Low AI Visibility\n\n`;
      md += `These queries perform well in Google but aren't mentioned by AI:\n\n`;
      md += `| Query | Clicks | Position | Recommendation |\n|-------|--------|----------|----------------|\n`;
      for (const gap of data.gaps.highSeoLowGeo.slice(0, 5)) {
        md += `| ${gap.query} | ${gap.seo.clicks} | ${gap.seo.position} | ${gap.recommendation} |\n`;
      }
      md += `\n`;
    }

    if (data.gaps.highGeoLowSeo.length > 0) {
      md += `### High AI Visibility, Low SEO Performance\n\n`;
      md += `These queries are mentioned by AI but don't rank well in Google:\n\n`;
      md += `| Query | AI Mentions | SEO Position | Recommendation |\n|-------|-------------|--------------|----------------|\n`;
      for (const gap of data.gaps.highGeoLowSeo.slice(0, 5)) {
        const pos = gap.seo ? gap.seo.position : 'Not ranked';
        md += `| ${gap.query} | ${gap.geo.mentions} | ${pos} | ${gap.recommendation} |\n`;
      }
      md += `\n`;
    }
  }

  // Top Performers
  if (data.topPerformers.queries.length > 0) {
    md += `## Top Performing Queries\n\n`;
    md += `| Query | Clicks | Impressions | CTR | Position |\n|-------|--------|-------------|-----|----------|\n`;
    for (const q of data.topPerformers.queries.slice(0, 10)) {
      md += `| ${q.query} | ${q.clicks} | ${q.impressions} | ${q.ctr} | ${q.position} |\n`;
    }
    md += `\n`;
  }

  if (data.topPerformers.pages.length > 0) {
    md += `## Top Performing Pages\n\n`;
    md += `| Page | Clicks | Impressions | CTR | Position |\n|------|--------|-------------|-----|----------|\n`;
    for (const p of data.topPerformers.pages.slice(0, 10)) {
      md += `| ${p.page} | ${p.clicks} | ${p.impressions} | ${p.ctr} | ${p.position} |\n`;
    }
    md += `\n`;
  }

  // Recommendations
  if (data.recommendations.length > 0) {
    md += `## Recommendations\n\n`;
    for (const rec of data.recommendations) {
      md += `### [${rec.priority.toUpperCase()}] ${rec.category}: ${rec.target}\n\n`;
      md += `**Issue:** ${rec.issue}\n\n`;
      md += `**Actions:**\n`;
      for (const action of rec.actions) {
        md += `- ${action}\n`;
      }
      if (rec.queries) {
        md += `\n**Related queries:** ${rec.queries.join(', ')}\n`;
      }
      md += `\n`;
    }
  }

  return md;
}

/**
 * Format report as HTML
 */
function formatHTML(data) {
  const md = formatMarkdown(data);

  // Simple markdown to HTML conversion
  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SEO/GEO Performance Report</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 1200px; margin: 0 auto; padding: 20px; line-height: 1.6; }
    h1 { color: #1f1968; border-bottom: 3px solid #dabeff; padding-bottom: 10px; }
    h2 { color: #1f1968; margin-top: 40px; }
    h3 { color: #444; }
    table { border-collapse: collapse; width: 100%; margin: 20px 0; }
    th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
    th { background: #f5f5f5; font-weight: 600; }
    tr:nth-child(even) { background: #fafafa; }
    .priority-high { color: #d32f2f; font-weight: bold; }
    .priority-medium { color: #f57c00; }
    .priority-low { color: #388e3c; }
    code { background: #f5f5f5; padding: 2px 6px; border-radius: 3px; }
  </style>
</head>
<body>
`;

  // Convert markdown to HTML (basic conversion)
  html += md
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
    .replace(/\[HIGH\]/g, '<span class="priority-high">[HIGH]</span>')
    .replace(/\[MEDIUM\]/g, '<span class="priority-medium">[MEDIUM]</span>')
    .replace(/\[LOW\]/g, '<span class="priority-low">[LOW]</span>')
    // Convert tables
    .replace(/\|(.+)\|\n\|[-|]+\|\n((?:\|.+\|\n)+)/g, (match, header, body) => {
      const headers = header.split('|').filter(Boolean).map(h => `<th>${h.trim()}</th>`).join('');
      const rows = body.trim().split('\n').map(row => {
        const cells = row.split('|').filter(Boolean).map(c => `<td>${c.trim()}</td>`).join('');
        return `<tr>${cells}</tr>`;
      }).join('\n');
      return `<table><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table>`;
    });

  html += `
</body>
</html>`;

  return html;
}

/**
 * Save report to file
 */
function saveReport(data, format = 'json') {
  const timestamp = new Date().toISOString().split('T')[0];
  let filename, content;

  switch (format) {
    case 'markdown':
    case 'md':
      filename = `seo-geo-report_${timestamp}.md`;
      content = formatMarkdown(data);
      break;
    case 'html':
      filename = `seo-geo-report_${timestamp}.html`;
      content = formatHTML(data);
      break;
    case 'json':
    default:
      filename = `seo-geo-report_${timestamp}.json`;
      content = JSON.stringify(data, null, 2);
  }

  const filepath = path.join(REPORTS_DIR, filename);
  fs.writeFileSync(filepath, content);

  return filepath;
}

/**
 * CLI handler
 */
function main() {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
SEO/GEO Report Generator

Usage:
  node generate-report.js [options]

Options:
  --format <type>  Output format: json, markdown, html (default: json)
  --output <file>  Custom output file path
  --stdout         Print to stdout instead of saving
  --help           Show this help message

Examples:
  node generate-report.js
  node generate-report.js --format markdown
  node generate-report.js --format html --stdout
`);
    return;
  }

  console.log('Generating SEO/GEO report...\n');

  const data = generateReportData();

  // Determine format
  let format = 'json';
  const formatIdx = args.indexOf('--format');
  if (formatIdx !== -1 && args[formatIdx + 1]) {
    format = args[formatIdx + 1].toLowerCase();
  }

  if (args.includes('--stdout')) {
    switch (format) {
      case 'markdown':
      case 'md':
        console.log(formatMarkdown(data));
        break;
      case 'html':
        console.log(formatHTML(data));
        break;
      default:
        console.log(JSON.stringify(data, null, 2));
    }
  } else {
    // Check for custom output path
    const outputIdx = args.indexOf('--output');
    let filepath;

    if (outputIdx !== -1 && args[outputIdx + 1]) {
      filepath = args[outputIdx + 1];
      let content;
      switch (format) {
        case 'markdown':
        case 'md':
          content = formatMarkdown(data);
          break;
        case 'html':
          content = formatHTML(data);
          break;
        default:
          content = JSON.stringify(data, null, 2);
      }
      fs.writeFileSync(filepath, content);
    } else {
      filepath = saveReport(data, format);
    }

    console.log(`Report saved to: ${filepath}`);

    // Print summary
    console.log('\n=== Report Summary ===');
    console.log(`GEO Mention Rate: ${data.overview.geo.mentionRate}%`);
    console.log(`GSC Total Clicks: ${data.overview.seo.totalClicks.toLocaleString()}`);
    console.log(`Recommendations: ${data.recommendations.length}`);
  }
}

// Exports
module.exports = {
  generateReportData,
  formatMarkdown,
  formatHTML,
  saveReport
};

// Run if executed directly
if (require.main === module) {
  main();
}
