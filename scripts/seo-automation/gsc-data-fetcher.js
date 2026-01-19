#!/usr/bin/env node
/**
 * Google Search Console Data Fetcher
 *
 * Fetches search analytics data from GSC and stores it locally.
 * Can be used standalone or in conjunction with GSC MCP server.
 *
 * Usage:
 *   node scripts/seo-automation/gsc-data-fetcher.js [options]
 *
 * Note: This script provides utilities for working with GSC data.
 * For live GSC API calls, use the GSC MCP server (mcp-server-gsc).
 */

const fs = require('fs');
const path = require('path');

// Paths
const DATA_DIR = path.join(__dirname, '../../data/seo-metrics');
const QUERIES_DIR = path.join(DATA_DIR, 'queries');
const PAGES_DIR = path.join(DATA_DIR, 'pages');

// Site URL for WhimsyLabs
const SITE_URL = 'https://whimsylabs.ai';

/**
 * GSC metric types
 */
const METRIC_TYPES = {
  QUERIES: 'queries',
  PAGES: 'pages',
  COUNTRIES: 'countries',
  DEVICES: 'devices',
  SEARCH_APPEARANCE: 'search_appearance'
};

/**
 * Date range presets
 */
const DATE_RANGES = {
  LAST_7_DAYS: 7,
  LAST_28_DAYS: 28,
  LAST_90_DAYS: 90,
  LAST_16_MONTHS: 480  // GSC max retention
};

/**
 * Calculate date range
 */
function getDateRange(days = 28) {
  const endDate = new Date();
  endDate.setDate(endDate.getDate() - 1);  // Yesterday (latest available data)

  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - days + 1);

  return {
    startDate: startDate.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0]
  };
}

/**
 * Format GSC response data for storage
 */
function formatGSCData(rawData, metricType, dateRange) {
  return {
    fetched_at: new Date().toISOString(),
    site_url: SITE_URL,
    metric_type: metricType,
    date_range: dateRange,
    row_count: rawData.rows ? rawData.rows.length : 0,
    rows: rawData.rows || []
  };
}

/**
 * Save GSC data to local storage
 */
function saveGSCData(data, metricType) {
  const dir = metricType === METRIC_TYPES.QUERIES ? QUERIES_DIR : PAGES_DIR;
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `${metricType}_${data.date_range.startDate}_${data.date_range.endDate}_${timestamp}.json`;
  const filepath = path.join(dir, filename);

  fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
  console.log(`Saved: ${filepath}`);

  return filepath;
}

/**
 * Load most recent GSC data file
 */
function loadLatestGSCData(metricType) {
  const dir = metricType === METRIC_TYPES.QUERIES ? QUERIES_DIR : PAGES_DIR;

  if (!fs.existsSync(dir)) {
    return null;
  }

  const files = fs.readdirSync(dir)
    .filter(f => f.startsWith(metricType) && f.endsWith('.json'))
    .sort()
    .reverse();

  if (files.length === 0) {
    return null;
  }

  const filepath = path.join(dir, files[0]);
  return JSON.parse(fs.readFileSync(filepath, 'utf8'));
}

/**
 * Load all GSC data for a metric type within a date range
 */
function loadGSCDataRange(metricType, startDate, endDate) {
  const dir = metricType === METRIC_TYPES.QUERIES ? QUERIES_DIR : PAGES_DIR;

  if (!fs.existsSync(dir)) {
    return [];
  }

  const allData = [];
  const files = fs.readdirSync(dir)
    .filter(f => f.startsWith(metricType) && f.endsWith('.json'));

  for (const file of files) {
    const data = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'));

    // Check if data overlaps with requested range
    if (data.date_range) {
      if (data.date_range.endDate >= startDate && data.date_range.startDate <= endDate) {
        allData.push(data);
      }
    }
  }

  return allData;
}

/**
 * Process MCP server response and save locally
 * Call this with data returned from GSC MCP tools
 */
function processGSCMCPResponse(mcpResponse, metricType = METRIC_TYPES.QUERIES) {
  // Extract date range from the response if available
  const dateRange = mcpResponse.date_range || getDateRange(28);

  const formattedData = formatGSCData(mcpResponse, metricType, dateRange);
  const filepath = saveGSCData(formattedData, metricType);

  return {
    saved: true,
    filepath,
    rowCount: formattedData.row_count
  };
}

/**
 * Generate sample data structure for testing
 * (Use this to understand the expected data format)
 */
function generateSampleData() {
  return {
    queries: {
      fetched_at: new Date().toISOString(),
      site_url: SITE_URL,
      metric_type: METRIC_TYPES.QUERIES,
      date_range: getDateRange(28),
      row_count: 3,
      rows: [
        {
          keys: ['virtual lab software'],
          clicks: 150,
          impressions: 2500,
          ctr: 0.06,
          position: 4.2
        },
        {
          keys: ['online chemistry lab'],
          clicks: 89,
          impressions: 1800,
          ctr: 0.049,
          position: 6.1
        },
        {
          keys: ['whimsylabs'],
          clicks: 234,
          impressions: 450,
          ctr: 0.52,
          position: 1.2
        }
      ]
    },
    pages: {
      fetched_at: new Date().toISOString(),
      site_url: SITE_URL,
      metric_type: METRIC_TYPES.PAGES,
      date_range: getDateRange(28),
      row_count: 3,
      rows: [
        {
          keys: ['https://whimsylabs.ai/'],
          clicks: 450,
          impressions: 8500,
          ctr: 0.053,
          position: 8.4
        },
        {
          keys: ['https://whimsylabs.ai/features/'],
          clicks: 120,
          impressions: 2100,
          ctr: 0.057,
          position: 12.3
        },
        {
          keys: ['https://whimsylabs.ai/blog/ai-safety-labs/'],
          clicks: 85,
          impressions: 1400,
          ctr: 0.061,
          position: 7.8
        }
      ]
    }
  };
}

/**
 * Get top performing queries
 */
function getTopQueries(options = {}) {
  const { limit = 20, sortBy = 'clicks', minImpressions = 10 } = options;

  const data = loadLatestGSCData(METRIC_TYPES.QUERIES);
  if (!data || !data.rows) {
    return [];
  }

  return data.rows
    .filter(row => row.impressions >= minImpressions)
    .sort((a, b) => b[sortBy] - a[sortBy])
    .slice(0, limit)
    .map(row => ({
      query: row.keys[0],
      clicks: row.clicks,
      impressions: row.impressions,
      ctr: (row.ctr * 100).toFixed(2) + '%',
      position: row.position.toFixed(1)
    }));
}

/**
 * Get top performing pages
 */
function getTopPages(options = {}) {
  const { limit = 20, sortBy = 'clicks', minImpressions = 10 } = options;

  const data = loadLatestGSCData(METRIC_TYPES.PAGES);
  if (!data || !data.rows) {
    return [];
  }

  return data.rows
    .filter(row => row.impressions >= minImpressions)
    .sort((a, b) => b[sortBy] - a[sortBy])
    .slice(0, limit)
    .map(row => ({
      page: row.keys[0].replace(SITE_URL, ''),
      clicks: row.clicks,
      impressions: row.impressions,
      ctr: (row.ctr * 100).toFixed(2) + '%',
      position: row.position.toFixed(1)
    }));
}

/**
 * Find optimization opportunities
 */
function findOpportunities() {
  const queries = loadLatestGSCData(METRIC_TYPES.QUERIES);
  const pages = loadLatestGSCData(METRIC_TYPES.PAGES);

  const opportunities = {
    highImpressionsLowClicks: [],
    highCTRLowPosition: [],
    lowCTRHighPosition: []
  };

  if (queries && queries.rows) {
    for (const row of queries.rows) {
      // High impressions but low CTR - title/description needs improvement
      if (row.impressions > 500 && row.ctr < 0.03) {
        opportunities.highImpressionsLowClicks.push({
          query: row.keys[0],
          impressions: row.impressions,
          ctr: (row.ctr * 100).toFixed(2) + '%',
          position: row.position.toFixed(1),
          suggestion: 'Improve title/description to increase CTR'
        });
      }

      // High CTR but low position - content is good, needs SEO boost
      if (row.ctr > 0.05 && row.position > 10) {
        opportunities.highCTRLowPosition.push({
          query: row.keys[0],
          impressions: row.impressions,
          ctr: (row.ctr * 100).toFixed(2) + '%',
          position: row.position.toFixed(1),
          suggestion: 'Content resonates well - optimize for better ranking'
        });
      }

      // Top position but low CTR - title/description mismatch
      if (row.position < 5 && row.ctr < 0.04 && row.impressions > 100) {
        opportunities.lowCTRHighPosition.push({
          query: row.keys[0],
          impressions: row.impressions,
          ctr: (row.ctr * 100).toFixed(2) + '%',
          position: row.position.toFixed(1),
          suggestion: 'Good ranking but low engagement - check search intent match'
        });
      }
    }
  }

  return opportunities;
}

/**
 * Get summary statistics
 */
function getSummary() {
  const queries = loadLatestGSCData(METRIC_TYPES.QUERIES);
  const pages = loadLatestGSCData(METRIC_TYPES.PAGES);

  const summary = {
    lastUpdated: null,
    dateRange: null,
    totals: {
      clicks: 0,
      impressions: 0,
      avgCTR: 0,
      avgPosition: 0
    },
    queryCount: 0,
    pageCount: 0
  };

  if (queries) {
    summary.lastUpdated = queries.fetched_at;
    summary.dateRange = queries.date_range;
    summary.queryCount = queries.row_count;

    if (queries.rows && queries.rows.length > 0) {
      summary.totals.clicks = queries.rows.reduce((sum, r) => sum + r.clicks, 0);
      summary.totals.impressions = queries.rows.reduce((sum, r) => sum + r.impressions, 0);
      summary.totals.avgCTR = summary.totals.impressions > 0
        ? (summary.totals.clicks / summary.totals.impressions * 100).toFixed(2) + '%'
        : '0%';

      const positionSum = queries.rows.reduce((sum, r) => sum + (r.position * r.impressions), 0);
      summary.totals.avgPosition = summary.totals.impressions > 0
        ? (positionSum / summary.totals.impressions).toFixed(1)
        : 0;
    }
  }

  if (pages) {
    summary.pageCount = pages.row_count;
  }

  return summary;
}

/**
 * CLI handler
 */
function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'help';

  switch (command) {
    case 'summary':
      console.log('\nGSC Data Summary');
      console.log('================');
      console.log(JSON.stringify(getSummary(), null, 2));
      break;

    case 'top-queries':
      console.log('\nTop Queries');
      console.log('===========');
      console.log(JSON.stringify(getTopQueries({ limit: 20 }), null, 2));
      break;

    case 'top-pages':
      console.log('\nTop Pages');
      console.log('=========');
      console.log(JSON.stringify(getTopPages({ limit: 20 }), null, 2));
      break;

    case 'opportunities':
      console.log('\nOptimization Opportunities');
      console.log('==========================');
      console.log(JSON.stringify(findOpportunities(), null, 2));
      break;

    case 'sample':
      console.log('\nGenerating sample data for testing...');
      const sample = generateSampleData();

      // Save sample data
      const queriesPath = saveGSCData(sample.queries, METRIC_TYPES.QUERIES);
      const pagesPath = saveGSCData(sample.pages, METRIC_TYPES.PAGES);

      console.log('\nSample data saved:');
      console.log(`  Queries: ${queriesPath}`);
      console.log(`  Pages: ${pagesPath}`);
      break;

    case 'help':
    default:
      console.log(`
GSC Data Fetcher - Work with Google Search Console data

Usage:
  node gsc-data-fetcher.js <command>

Commands:
  summary        Show summary of latest GSC data
  top-queries    Show top performing queries
  top-pages      Show top performing pages
  opportunities  Find optimization opportunities
  sample         Generate sample data for testing
  help           Show this help message

Note: This script works with locally stored GSC data.
To fetch fresh data from GSC, use the GSC MCP server:

  1. Install: npx -y @smithery/cli install mcp-server-gsc --client claude
  2. Configure credentials in .claude/settings.local.json
  3. Use MCP tools in Claude Code to fetch data
  4. Run: node gsc-data-fetcher.js process-mcp <response.json>
`);
  }
}

// Exports
module.exports = {
  METRIC_TYPES,
  DATE_RANGES,
  SITE_URL,
  getDateRange,
  formatGSCData,
  saveGSCData,
  loadLatestGSCData,
  loadGSCDataRange,
  processGSCMCPResponse,
  generateSampleData,
  getTopQueries,
  getTopPages,
  findOpportunities,
  getSummary
};

// Run CLI if executed directly
if (require.main === module) {
  main();
}
