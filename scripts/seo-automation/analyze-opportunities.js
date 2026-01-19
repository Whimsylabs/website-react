#!/usr/bin/env node
/**
 * SEO/GEO Opportunity Analyzer
 *
 * Analyzes SEO and GEO data to identify optimization opportunities,
 * content gaps, and competitive insights.
 *
 * Usage:
 *   node scripts/seo-automation/analyze-opportunities.js [options]
 */

const fs = require('fs');
const path = require('path');

// Data directories
const DATA_ROOT = path.join(__dirname, '../../data');
const GEO_NORMALIZED_DIR = path.join(DATA_ROOT, 'geo-metrics/normalized');
const SEO_QUERIES_DIR = path.join(DATA_ROOT, 'seo-metrics/queries');
const SEO_PAGES_DIR = path.join(DATA_ROOT, 'seo-metrics/pages');
const REPORTS_DIR = path.join(DATA_ROOT, 'reports');

// Load schema
const schema = require(path.join(DATA_ROOT, 'geo-metrics/schema.js'));

/**
 * Load all GEO metrics
 */
function loadGeoMetrics() {
  const metrics = [];

  if (!fs.existsSync(GEO_NORMALIZED_DIR)) {
    return metrics;
  }

  const files = fs.readdirSync(GEO_NORMALIZED_DIR).filter(f => f.endsWith('.json'));
  for (const file of files) {
    try {
      const data = JSON.parse(fs.readFileSync(path.join(GEO_NORMALIZED_DIR, file), 'utf8'));
      metrics.push(...(data.metrics || []));
    } catch (e) {
      console.error(`Error reading ${file}: ${e.message}`);
    }
  }

  return metrics;
}

/**
 * Load latest GSC data
 */
function loadGSCData(type = 'queries') {
  const dir = type === 'queries' ? SEO_QUERIES_DIR : SEO_PAGES_DIR;

  if (!fs.existsSync(dir)) {
    return null;
  }

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json')).sort().reverse();
  if (files.length === 0) return null;

  try {
    return JSON.parse(fs.readFileSync(path.join(dir, files[0]), 'utf8'));
  } catch (e) {
    return null;
  }
}

/**
 * Analyze GEO performance by AI source
 */
function analyzeGeoBySource(metrics) {
  const bySource = {};

  for (const metric of metrics) {
    if (!bySource[metric.source]) {
      bySource[metric.source] = {
        total: 0,
        mentioned: 0,
        queries: [],
        sentiment: { positive: 0, neutral: 0, negative: 0, mixed: 0 }
      };
    }

    const src = bySource[metric.source];
    src.total++;
    if (metric.brand_mentioned) {
      src.mentioned++;
      src.queries.push(metric.query);
    }
    if (metric.sentiment) {
      src.sentiment[metric.sentiment]++;
    }
  }

  // Calculate rates
  const analysis = {};
  for (const [source, data] of Object.entries(bySource)) {
    analysis[source] = {
      total: data.total,
      mentioned: data.mentioned,
      mentionRate: ((data.mentioned / data.total) * 100).toFixed(1) + '%',
      sentiment: data.sentiment,
      topQueries: [...new Set(data.queries)].slice(0, 10)
    };
  }

  return analysis;
}

/**
 * Analyze competitor presence in AI responses
 */
function analyzeCompetitors(metrics) {
  const competitorCounts = {};

  for (const metric of metrics) {
    if (metric.competitors_mentioned) {
      for (const comp of metric.competitors_mentioned) {
        competitorCounts[comp] = (competitorCounts[comp] || 0) + 1;
      }
    }
  }

  // Sort by frequency
  const sorted = Object.entries(competitorCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({
      competitor: name,
      mentions: count,
      isKnown: schema.KNOWN_COMPETITORS.includes(name)
    }));

  return {
    total: sorted.reduce((sum, c) => sum + c.mentions, 0),
    unique: sorted.length,
    competitors: sorted
  };
}

/**
 * Analyze query themes and clusters
 */
function analyzeQueryThemes(metrics) {
  const themes = {
    brand: [],      // Brand-related queries
    product: [],    // Product-related queries
    educational: [], // Educational/how-to queries
    comparison: [], // Comparison queries
    other: []
  };

  for (const metric of metrics) {
    const q = metric.query.toLowerCase();

    if (schema.BRAND_TERMS.some(t => q.includes(t.toLowerCase()))) {
      themes.brand.push(metric);
    } else if (schema.PRODUCT_TERMS.some(t => q.includes(t.toLowerCase()))) {
      themes.product.push(metric);
    } else if (q.includes('how') || q.includes('what') || q.includes('why') || q.includes('tutorial')) {
      themes.educational.push(metric);
    } else if (q.includes('vs') || q.includes('versus') || q.includes('compare') || q.includes('alternative')) {
      themes.comparison.push(metric);
    } else {
      themes.other.push(metric);
    }
  }

  const analysis = {};
  for (const [theme, items] of Object.entries(themes)) {
    const mentioned = items.filter(m => m.brand_mentioned).length;
    analysis[theme] = {
      total: items.length,
      mentioned,
      mentionRate: items.length > 0 ? ((mentioned / items.length) * 100).toFixed(1) + '%' : '0%',
      sampleQueries: [...new Set(items.map(m => m.query))].slice(0, 5)
    };
  }

  return analysis;
}

/**
 * Find SEO vs GEO gaps
 */
function findGaps(geoMetrics, gscQueries) {
  const gaps = {
    highSeoLowGeo: [],
    highGeoLowSeo: [],
    missingFromBoth: []
  };

  if (!gscQueries || !gscQueries.rows) {
    return gaps;
  }

  // Build lookup maps
  const geoByQuery = new Map();
  for (const metric of geoMetrics) {
    const key = metric.query.toLowerCase().trim();
    if (!geoByQuery.has(key)) {
      geoByQuery.set(key, []);
    }
    geoByQuery.get(key).push(metric);
  }

  const seoByQuery = new Map();
  for (const row of gscQueries.rows) {
    const key = row.keys[0].toLowerCase().trim();
    seoByQuery.set(key, row);
  }

  // High SEO, Low GEO
  for (const [query, seoData] of seoByQuery) {
    const geoData = geoByQuery.get(query) || [];
    const hasMention = geoData.some(g => g.brand_mentioned);

    if (seoData.clicks > 10 && seoData.position < 15 && !hasMention) {
      gaps.highSeoLowGeo.push({
        query,
        seo: {
          clicks: seoData.clicks,
          impressions: seoData.impressions,
          ctr: (seoData.ctr * 100).toFixed(2) + '%',
          position: seoData.position.toFixed(1)
        },
        geo: {
          tracked: geoData.length > 0,
          mentioned: false
        },
        priority: seoData.clicks > 50 ? 'high' : 'medium',
        recommendation: 'Optimize content for AI citation'
      });
    }
  }

  // High GEO, Low SEO
  for (const [query, geoData] of geoByQuery) {
    const mentioned = geoData.filter(g => g.brand_mentioned);
    if (mentioned.length === 0) continue;

    const seoData = seoByQuery.get(query);
    if (!seoData || seoData.position > 20) {
      gaps.highGeoLowSeo.push({
        query,
        geo: {
          mentions: mentioned.length,
          sources: [...new Set(mentioned.map(g => g.source))]
        },
        seo: seoData ? {
          clicks: seoData.clicks,
          impressions: seoData.impressions,
          position: seoData.position.toFixed(1)
        } : null,
        priority: mentioned.length > 3 ? 'high' : 'medium',
        recommendation: 'Improve traditional SEO for this query'
      });
    }
  }

  // Sort by priority
  gaps.highSeoLowGeo.sort((a, b) =>
    (a.priority === 'high' ? 0 : 1) - (b.priority === 'high' ? 0 : 1)
  );
  gaps.highGeoLowSeo.sort((a, b) =>
    (a.priority === 'high' ? 0 : 1) - (b.priority === 'high' ? 0 : 1)
  );

  return gaps;
}

/**
 * Generate actionable recommendations
 */
function generateRecommendations(analysis) {
  const recommendations = [];

  // Source-specific recommendations
  if (analysis.bySource) {
    for (const [source, data] of Object.entries(analysis.bySource)) {
      const rate = parseFloat(data.mentionRate);
      if (rate < 30 && data.total >= 5) {
        recommendations.push({
          category: 'geo',
          priority: rate < 10 ? 'high' : 'medium',
          target: source,
          issue: `Low mention rate on ${source}: ${data.mentionRate}`,
          actions: [
            `Research how ${source} formats and presents information`,
            'Add structured data and clear headings',
            'Include authoritative citations in content'
          ]
        });
      }
    }
  }

  // Competitor-based recommendations
  if (analysis.competitors && analysis.competitors.competitors.length > 0) {
    const topCompetitors = analysis.competitors.competitors.slice(0, 3);
    recommendations.push({
      category: 'competitive',
      priority: 'medium',
      target: 'content strategy',
      issue: `Top competitors in AI responses: ${topCompetitors.map(c => c.competitor).join(', ')}`,
      actions: [
        'Create comparison content addressing these competitors',
        'Highlight unique differentiators',
        'Target "vs" and "alternative to" queries'
      ]
    });
  }

  // Theme-based recommendations
  if (analysis.themes) {
    if (analysis.themes.comparison && parseFloat(analysis.themes.comparison.mentionRate) < 50) {
      recommendations.push({
        category: 'content',
        priority: 'high',
        target: 'comparison queries',
        issue: 'Low visibility in comparison queries',
        actions: [
          'Create dedicated comparison pages',
          'Add competitor comparison tables',
          'Target "best X" and "X alternatives" queries'
        ]
      });
    }

    if (analysis.themes.educational && parseFloat(analysis.themes.educational.mentionRate) < 30) {
      recommendations.push({
        category: 'content',
        priority: 'medium',
        target: 'educational content',
        issue: 'Low visibility in educational/how-to queries',
        actions: [
          'Create tutorial and guide content',
          'Add FAQ sections to key pages',
          'Produce how-to videos and walkthroughs'
        ]
      });
    }
  }

  // Gap-based recommendations
  if (analysis.gaps) {
    if (analysis.gaps.highSeoLowGeo.length > 5) {
      recommendations.push({
        category: 'geo',
        priority: 'high',
        target: 'content optimization',
        issue: `${analysis.gaps.highSeoLowGeo.length} high-SEO queries missing from AI responses`,
        actions: [
          'Add structured data markup',
          'Make key points more extractable',
          'Include direct answers to common questions'
        ],
        queries: analysis.gaps.highSeoLowGeo.slice(0, 5).map(g => g.query)
      });
    }

    if (analysis.gaps.highGeoLowSeo.length > 3) {
      recommendations.push({
        category: 'seo',
        priority: 'medium',
        target: 'traditional SEO',
        issue: `${analysis.gaps.highGeoLowSeo.length} AI-visible queries with poor Google rankings`,
        actions: [
          'Create dedicated pages for these queries',
          'Build internal links to these topics',
          'Add relevant backlinks'
        ],
        queries: analysis.gaps.highGeoLowSeo.slice(0, 5).map(g => g.query)
      });
    }
  }

  // Sort by priority
  recommendations.sort((a, b) =>
    (a.priority === 'high' ? 0 : a.priority === 'medium' ? 1 : 2) -
    (b.priority === 'high' ? 0 : b.priority === 'medium' ? 1 : 2)
  );

  return recommendations;
}

/**
 * Run full analysis
 */
function runAnalysis() {
  console.log('\n=== SEO/GEO Opportunity Analysis ===\n');

  // Load data
  const geoMetrics = loadGeoMetrics();
  const gscQueries = loadGSCData('queries');
  const gscPages = loadGSCData('pages');

  console.log(`Loaded ${geoMetrics.length} GEO metrics`);
  console.log(`Loaded ${gscQueries?.rows?.length || 0} GSC queries`);
  console.log(`Loaded ${gscPages?.rows?.length || 0} GSC pages`);

  if (geoMetrics.length === 0 && !gscQueries) {
    console.log('\nNo data available. Run:');
    console.log('  - npm run seo:import-geo <csv-file> to import GEO data');
    console.log('  - node scripts/seo-automation/gsc-data-fetcher.js sample to generate test data');
    return null;
  }

  // Run analyses
  const analysis = {
    timestamp: new Date().toISOString(),
    dataStats: {
      geoMetrics: geoMetrics.length,
      gscQueries: gscQueries?.rows?.length || 0,
      gscPages: gscPages?.rows?.length || 0
    }
  };

  if (geoMetrics.length > 0) {
    console.log('\nAnalyzing GEO by source...');
    analysis.bySource = analyzeGeoBySource(geoMetrics);

    console.log('Analyzing competitors...');
    analysis.competitors = analyzeCompetitors(geoMetrics);

    console.log('Analyzing query themes...');
    analysis.themes = analyzeQueryThemes(geoMetrics);
  }

  if (geoMetrics.length > 0 || gscQueries) {
    console.log('Finding SEO/GEO gaps...');
    analysis.gaps = findGaps(geoMetrics, gscQueries);
  }

  console.log('Generating recommendations...');
  analysis.recommendations = generateRecommendations(analysis);

  return analysis;
}

/**
 * Save analysis to file
 */
function saveAnalysis(analysis) {
  if (!analysis) return null;

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `analysis_${timestamp}.json`;
  const filepath = path.join(REPORTS_DIR, filename);

  fs.writeFileSync(filepath, JSON.stringify(analysis, null, 2));
  console.log(`\nAnalysis saved to: ${filepath}`);

  return filepath;
}

/**
 * Print summary to console
 */
function printSummary(analysis) {
  if (!analysis) return;

  console.log('\n=== Summary ===\n');

  if (analysis.bySource) {
    console.log('GEO Performance by Source:');
    for (const [source, data] of Object.entries(analysis.bySource)) {
      console.log(`  ${source}: ${data.mentionRate} mention rate (${data.mentioned}/${data.total})`);
    }
  }

  if (analysis.competitors && analysis.competitors.competitors.length > 0) {
    console.log('\nTop Competitors in AI Responses:');
    for (const comp of analysis.competitors.competitors.slice(0, 5)) {
      console.log(`  ${comp.competitor}: ${comp.mentions} mentions`);
    }
  }

  if (analysis.gaps) {
    console.log('\nGaps Identified:');
    console.log(`  High SEO / Low GEO: ${analysis.gaps.highSeoLowGeo.length} queries`);
    console.log(`  High GEO / Low SEO: ${analysis.gaps.highGeoLowSeo.length} queries`);
  }

  if (analysis.recommendations && analysis.recommendations.length > 0) {
    console.log('\nTop Recommendations:');
    for (const rec of analysis.recommendations.slice(0, 5)) {
      console.log(`  [${rec.priority.toUpperCase()}] ${rec.issue}`);
    }
  }
}

/**
 * CLI handler
 */
function main() {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
SEO/GEO Opportunity Analyzer

Usage:
  node analyze-opportunities.js [options]

Options:
  --save      Save analysis to reports directory
  --json      Output raw JSON instead of formatted summary
  --help      Show this help message

Examples:
  node analyze-opportunities.js
  node analyze-opportunities.js --save
  node analyze-opportunities.js --json | jq '.recommendations'
`);
    return;
  }

  const analysis = runAnalysis();

  if (args.includes('--json')) {
    console.log(JSON.stringify(analysis, null, 2));
  } else {
    printSummary(analysis);
  }

  if (args.includes('--save')) {
    saveAnalysis(analysis);
  }
}

// Exports
module.exports = {
  loadGeoMetrics,
  loadGSCData,
  analyzeGeoBySource,
  analyzeCompetitors,
  analyzeQueryThemes,
  findGaps,
  generateRecommendations,
  runAnalysis
};

// Run if executed directly
if (require.main === module) {
  main();
}
