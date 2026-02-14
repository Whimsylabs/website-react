#!/usr/bin/env node
/**
 * WhimsyLabs GEO MCP Server
 *
 * Provides Claude Code with tools to query and analyze SEO/GEO metrics data.
 *
 * Tools:
 *   - get_geo_metrics: Query AI visibility data
 *   - get_gsc_performance: Query GSC data for pages/queries
 *   - compare_seo_geo: Find gaps between traditional SEO and AI visibility
 *   - get_recommendations: Get AI-powered optimization suggestions
 *   - import_geo_data: Trigger CSV import from GEO tools
 *   - get_data_status: Check status of available data
 */

const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const {
  CallToolRequestSchema,
  ListToolsRequestSchema
} = require('@modelcontextprotocol/sdk/types.js');

const fs = require('fs');
const path = require('path');

// Data directories
const DATA_ROOT = path.join(__dirname, '../../data');
const GEO_METRICS_DIR = path.join(DATA_ROOT, 'geo-metrics');
const SEO_METRICS_DIR = path.join(DATA_ROOT, 'seo-metrics');
const NORMALIZED_DIR = path.join(GEO_METRICS_DIR, 'normalized');
const QUERIES_DIR = path.join(SEO_METRICS_DIR, 'queries');
const PAGES_DIR = path.join(SEO_METRICS_DIR, 'pages');

// Load schema for validation
const schemaPath = path.join(GEO_METRICS_DIR, 'schema.js');
let schema = null;
try {
  schema = require(schemaPath);
} catch (e) {
  console.error('Warning: Could not load schema:', e.message);
}

/**
 * Load all GEO metrics from normalized files
 */
function loadAllGeoMetrics(options = {}) {
  const { startDate, endDate, source, query } = options;
  const metrics = [];

  if (!fs.existsSync(NORMALIZED_DIR)) {
    return metrics;
  }

  const files = fs.readdirSync(NORMALIZED_DIR).filter(f => f.endsWith('.json'));

  for (const file of files) {
    try {
      const data = JSON.parse(fs.readFileSync(path.join(NORMALIZED_DIR, file), 'utf8'));
      for (const metric of data.metrics || []) {
        // Apply filters
        if (startDate && metric.date < startDate) continue;
        if (endDate && metric.date > endDate) continue;
        if (source && metric.source !== source) continue;
        if (query && !metric.query.toLowerCase().includes(query.toLowerCase())) continue;

        metrics.push(metric);
      }
    } catch (e) {
      console.error(`Error reading ${file}:`, e.message);
    }
  }

  return metrics;
}

/**
 * Load GSC data from local files
 */
function loadGSCData(type = 'queries') {
  const dir = type === 'queries' ? QUERIES_DIR : PAGES_DIR;

  if (!fs.existsSync(dir)) {
    return null;
  }

  const files = fs.readdirSync(dir)
    .filter(f => f.endsWith('.json'))
    .sort()
    .reverse();

  if (files.length === 0) {
    return null;
  }

  try {
    return JSON.parse(fs.readFileSync(path.join(dir, files[0]), 'utf8'));
  } catch (e) {
    console.error(`Error reading GSC data:`, e.message);
    return null;
  }
}

/**
 * Find gaps between SEO and GEO performance
 */
function findSeoGeoGaps() {
  const geoMetrics = loadAllGeoMetrics();
  const gscQueries = loadGSCData('queries');

  const gaps = {
    highSeoLowGeo: [],   // Ranking well in Google but not mentioned by AI
    highGeoLowSeo: [],   // Mentioned by AI but not ranking in Google
    opportunities: []     // Areas for improvement
  };

  // Build lookup maps
  const geoByQuery = new Map();
  for (const metric of geoMetrics) {
    const key = metric.query.toLowerCase();
    if (!geoByQuery.has(key)) {
      geoByQuery.set(key, []);
    }
    geoByQuery.get(key).push(metric);
  }

  const seoByQuery = new Map();
  if (gscQueries && gscQueries.rows) {
    for (const row of gscQueries.rows) {
      const key = row.keys[0].toLowerCase();
      seoByQuery.set(key, row);
    }
  }

  // Find queries with good SEO but no AI mentions
  for (const [query, seoData] of seoByQuery) {
    const geoData = geoByQuery.get(query) || [];
    const hasMention = geoData.some(g => g.brand_mentioned);

    if (seoData.clicks > 10 && seoData.position < 10 && !hasMention) {
      gaps.highSeoLowGeo.push({
        query,
        seo: {
          clicks: seoData.clicks,
          impressions: seoData.impressions,
          position: seoData.position.toFixed(1)
        },
        geo: { mentions: 0 },
        recommendation: 'Create AI-friendly content for this query'
      });
    }
  }

  // Find queries with AI mentions but poor SEO
  for (const [query, geoData] of geoByQuery) {
    const mentions = geoData.filter(g => g.brand_mentioned).length;
    const seoData = seoByQuery.get(query);

    if (mentions > 0 && (!seoData || seoData.position > 20)) {
      gaps.highGeoLowSeo.push({
        query,
        geo: {
          mentions,
          sources: [...new Set(geoData.map(g => g.source))]
        },
        seo: seoData ? {
          clicks: seoData.clicks,
          impressions: seoData.impressions,
          position: seoData.position.toFixed(1)
        } : { clicks: 0, impressions: 0, position: 'Not ranking' },
        recommendation: 'Optimize traditional SEO for this AI-visible query'
      });
    }
  }

  return gaps;
}

/**
 * Generate optimization recommendations
 */
function generateRecommendations() {
  const geoMetrics = loadAllGeoMetrics();
  const gscQueries = loadGSCData('queries');
  const gscPages = loadGSCData('pages');

  const recommendations = [];

  // Analyze GEO data
  const sourceStats = {};
  const queryStats = {};
  let totalMentions = 0;
  let totalQueries = 0;

  for (const metric of geoMetrics) {
    totalQueries++;
    if (metric.brand_mentioned) totalMentions++;

    // Track by source
    if (!sourceStats[metric.source]) {
      sourceStats[metric.source] = { total: 0, mentions: 0 };
    }
    sourceStats[metric.source].total++;
    if (metric.brand_mentioned) sourceStats[metric.source].mentions++;

    // Track competitor mentions
    if (metric.competitors_mentioned) {
      for (const comp of metric.competitors_mentioned) {
        queryStats[comp] = (queryStats[comp] || 0) + 1;
      }
    }
  }

  // GEO recommendations
  if (totalQueries > 0) {
    const mentionRate = (totalMentions / totalQueries * 100).toFixed(1);

    if (mentionRate < 30) {
      recommendations.push({
        type: 'geo',
        priority: 'high',
        title: 'Improve AI Visibility',
        description: `Current AI mention rate is ${mentionRate}%. Target 50%+ for competitive visibility.`,
        actions: [
          'Add more authoritative citations and references',
          'Create FAQ-style content that AI systems prefer',
          'Ensure key information is easily extractable'
        ]
      });
    }

    // Source-specific recommendations
    for (const [source, stats] of Object.entries(sourceStats)) {
      const rate = (stats.mentions / stats.total * 100).toFixed(1);
      if (rate < 20 && stats.total >= 5) {
        recommendations.push({
          type: 'geo',
          priority: 'medium',
          title: `Improve ${source.toUpperCase()} Visibility`,
          description: `Only ${rate}% mention rate on ${source} (${stats.mentions}/${stats.total})`,
          actions: [
            `Optimize content structure for ${source}'s preferences`,
            'Ensure brand mentions are natural and contextual'
          ]
        });
      }
    }
  }

  // GSC recommendations
  if (gscQueries && gscQueries.rows) {
    // Find high-impression, low-CTR queries
    const lowCTR = gscQueries.rows
      .filter(r => r.impressions > 500 && r.ctr < 0.03)
      .slice(0, 5);

    if (lowCTR.length > 0) {
      recommendations.push({
        type: 'seo',
        priority: 'high',
        title: 'Improve Click-Through Rates',
        description: `${lowCTR.length} queries have high impressions but low CTR`,
        queries: lowCTR.map(r => ({
          query: r.keys[0],
          impressions: r.impressions,
          ctr: (r.ctr * 100).toFixed(2) + '%'
        })),
        actions: [
          'Rewrite meta titles to be more compelling',
          'Add power words and clear value propositions',
          'Ensure descriptions match search intent'
        ]
      });
    }

    // Find close-to-first-page queries
    const almostThere = gscQueries.rows
      .filter(r => r.position > 10 && r.position < 15 && r.impressions > 100)
      .slice(0, 5);

    if (almostThere.length > 0) {
      recommendations.push({
        type: 'seo',
        priority: 'medium',
        title: 'Push to First Page',
        description: `${almostThere.length} queries are close to first page`,
        queries: almostThere.map(r => ({
          query: r.keys[0],
          position: r.position.toFixed(1),
          impressions: r.impressions
        })),
        actions: [
          'Add internal links to these pages',
          'Expand content depth on these topics',
          'Build backlinks targeting these keywords'
        ]
      });
    }
  }

  return recommendations;
}

/**
 * Get data status
 */
function getDataStatus() {
  const status = {
    geo: {
      hasData: false,
      fileCount: 0,
      metricCount: 0,
      latestDate: null,
      sources: []
    },
    seo: {
      hasData: false,
      queryFileCount: 0,
      pageFileCount: 0,
      latestFetch: null
    }
  };

  // Check GEO data
  if (fs.existsSync(NORMALIZED_DIR)) {
    const files = fs.readdirSync(NORMALIZED_DIR).filter(f => f.endsWith('.json'));
    status.geo.fileCount = files.length;

    const metrics = loadAllGeoMetrics();
    status.geo.metricCount = metrics.length;
    status.geo.hasData = metrics.length > 0;

    if (metrics.length > 0) {
      const sources = new Set(metrics.map(m => m.source));
      status.geo.sources = [...sources];
      status.geo.latestDate = metrics
        .map(m => m.date)
        .sort()
        .reverse()[0];
    }
  }

  // Check SEO data
  if (fs.existsSync(QUERIES_DIR)) {
    const files = fs.readdirSync(QUERIES_DIR).filter(f => f.endsWith('.json'));
    status.seo.queryFileCount = files.length;
  }

  if (fs.existsSync(PAGES_DIR)) {
    const files = fs.readdirSync(PAGES_DIR).filter(f => f.endsWith('.json'));
    status.seo.pageFileCount = files.length;
  }

  const gscData = loadGSCData('queries');
  if (gscData) {
    status.seo.hasData = true;
    status.seo.latestFetch = gscData.fetched_at;
  }

  return status;
}

// Create MCP server
const server = new Server(
  {
    name: 'whimsylabs-geo-mcp',
    version: '1.0.0'
  },
  {
    capabilities: {
      tools: {}
    }
  }
);

// Define tools
const tools = [
  {
    name: 'get_geo_metrics',
    description: 'Query AI visibility (GEO) metrics data. Returns metrics about how WhimsyLabs appears in AI responses.',
    inputSchema: {
      type: 'object',
      properties: {
        startDate: {
          type: 'string',
          description: 'Start date in YYYY-MM-DD format'
        },
        endDate: {
          type: 'string',
          description: 'End date in YYYY-MM-DD format'
        },
        source: {
          type: 'string',
          enum: ['chatgpt', 'claude', 'perplexity', 'gemini', 'ai_overview', 'copilot', 'other'],
          description: 'Filter by AI source'
        },
        query: {
          type: 'string',
          description: 'Filter by query text (partial match)'
        },
        limit: {
          type: 'number',
          description: 'Maximum number of results (default: 100)'
        }
      }
    }
  },
  {
    name: 'get_gsc_performance',
    description: 'Query Google Search Console performance data for queries and pages.',
    inputSchema: {
      type: 'object',
      properties: {
        type: {
          type: 'string',
          enum: ['queries', 'pages'],
          description: 'Type of data to retrieve'
        },
        limit: {
          type: 'number',
          description: 'Maximum number of results (default: 50)'
        },
        sortBy: {
          type: 'string',
          enum: ['clicks', 'impressions', 'ctr', 'position'],
          description: 'Sort results by metric'
        },
        minImpressions: {
          type: 'number',
          description: 'Minimum impressions filter'
        }
      }
    }
  },
  {
    name: 'compare_seo_geo',
    description: 'Compare SEO (Google Search) and GEO (AI visibility) performance to find gaps and opportunities.',
    inputSchema: {
      type: 'object',
      properties: {}
    }
  },
  {
    name: 'get_recommendations',
    description: 'Get AI-powered recommendations for improving SEO and GEO performance.',
    inputSchema: {
      type: 'object',
      properties: {
        priority: {
          type: 'string',
          enum: ['high', 'medium', 'low', 'all'],
          description: 'Filter by priority level'
        }
      }
    }
  },
  {
    name: 'get_data_status',
    description: 'Check the status of available SEO and GEO data, including file counts and latest dates.',
    inputSchema: {
      type: 'object',
      properties: {}
    }
  }
];

// Handle list_tools request
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'get_geo_metrics': {
        const metrics = loadAllGeoMetrics({
          startDate: args?.startDate,
          endDate: args?.endDate,
          source: args?.source,
          query: args?.query
        });

        const limit = args?.limit || 100;
        const limited = metrics.slice(0, limit);

        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              total: metrics.length,
              returned: limited.length,
              metrics: limited
            }, null, 2)
          }]
        };
      }

      case 'get_gsc_performance': {
        const type = args?.type || 'queries';
        const data = loadGSCData(type);

        if (!data) {
          return {
            content: [{
              type: 'text',
              text: JSON.stringify({
                error: 'No GSC data available',
                suggestion: 'Run gsc-data-fetcher.js sample to generate test data, or fetch real data via GSC MCP'
              }, null, 2)
            }]
          };
        }

        let rows = data.rows || [];
        const minImpressions = args?.minImpressions || 0;
        rows = rows.filter(r => r.impressions >= minImpressions);

        const sortBy = args?.sortBy || 'clicks';
        rows.sort((a, b) => b[sortBy] - a[sortBy]);

        const limit = args?.limit || 50;
        rows = rows.slice(0, limit);

        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              dateRange: data.date_range,
              fetchedAt: data.fetched_at,
              total: data.row_count,
              returned: rows.length,
              rows: rows.map(r => ({
                key: r.keys[0],
                clicks: r.clicks,
                impressions: r.impressions,
                ctr: (r.ctr * 100).toFixed(2) + '%',
                position: r.position.toFixed(1)
              }))
            }, null, 2)
          }]
        };
      }

      case 'compare_seo_geo': {
        const gaps = findSeoGeoGaps();

        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              summary: {
                highSeoLowGeo: gaps.highSeoLowGeo.length,
                highGeoLowSeo: gaps.highGeoLowSeo.length
              },
              gaps
            }, null, 2)
          }]
        };
      }

      case 'get_recommendations': {
        let recommendations = generateRecommendations();

        if (args?.priority && args.priority !== 'all') {
          recommendations = recommendations.filter(r => r.priority === args.priority);
        }

        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              count: recommendations.length,
              recommendations
            }, null, 2)
          }]
        };
      }

      case 'get_data_status': {
        const status = getDataStatus();

        return {
          content: [{
            type: 'text',
            text: JSON.stringify(status, null, 2)
          }]
        };
      }

      default:
        return {
          content: [{
            type: 'text',
            text: JSON.stringify({ error: `Unknown tool: ${name}` }, null, 2)
          }],
          isError: true
        };
    }
  } catch (error) {
    return {
      content: [{
        type: 'text',
        text: JSON.stringify({ error: error.message }, null, 2)
      }],
      isError: true
    };
  }
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('WhimsyLabs GEO MCP Server running on stdio');
}

main().catch(console.error);
