#!/usr/bin/env node
/**
 * SEO/GEO Orchestrator
 *
 * Coordinates the entire SEO/GEO workflow:
 * 1. Data Collection - Fetch/import data from various sources
 * 2. Analysis - Run comprehensive analysis on the data
 * 3. Recommendations - Generate actionable optimization suggestions
 * 4. Execution - Apply changes with user approval
 *
 * Usage:
 *   node scripts/seo-automation/orchestrator.js [mode] [options]
 *
 * Modes:
 *   status   - Check data status and freshness
 *   collect  - Collect/import new data
 *   analyze  - Run analysis on existing data
 *   report   - Generate comprehensive report
 *   full     - Run full workflow (collect + analyze + report)
 */

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

// Import modules
const gscFetcher = require('./gsc-data-fetcher.js');
const csvImporter = require('./geo-csv-importer.js');
const analyzer = require('./analyze-opportunities.js');
const reporter = require('./generate-report.js');

// Data directories
const DATA_ROOT = path.join(__dirname, '../../data');
const GEO_IMPORTS_DIR = path.join(DATA_ROOT, 'geo-metrics/imports');
const GEO_NORMALIZED_DIR = path.join(DATA_ROOT, 'geo-metrics/normalized');
const REPORTS_DIR = path.join(DATA_ROOT, 'reports');

// Configuration
const CONFIG = {
  dataStaleThresholdDays: 7,
  siteUrl: 'https://whimsylabs.ai'
};

/**
 * Check data freshness and availability
 */
function checkDataStatus() {
  const status = {
    timestamp: new Date().toISOString(),
    geo: {
      available: false,
      fileCount: 0,
      latestDate: null,
      stale: true,
      sources: []
    },
    seo: {
      available: false,
      latestFetch: null,
      stale: true,
      queryCount: 0,
      pageCount: 0
    },
    recommendations: []
  };

  // Check GEO data
  if (fs.existsSync(GEO_NORMALIZED_DIR)) {
    const files = fs.readdirSync(GEO_NORMALIZED_DIR).filter(f => f.endsWith('.json'));
    status.geo.fileCount = files.length;

    if (files.length > 0) {
      const metrics = analyzer.loadGeoMetrics();
      status.geo.available = metrics.length > 0;
      status.geo.sources = [...new Set(metrics.map(m => m.source))];

      if (metrics.length > 0) {
        const dates = metrics.map(m => m.date).filter(Boolean).sort().reverse();
        status.geo.latestDate = dates[0];

        // Check staleness
        const latestDate = new Date(dates[0]);
        const daysSince = (Date.now() - latestDate) / (1000 * 60 * 60 * 24);
        status.geo.stale = daysSince > CONFIG.dataStaleThresholdDays;
      }
    }
  }

  // Check SEO data
  const gscQueries = analyzer.loadGSCData('queries');
  const gscPages = analyzer.loadGSCData('pages');

  if (gscQueries) {
    status.seo.available = true;
    status.seo.latestFetch = gscQueries.fetched_at;
    status.seo.queryCount = gscQueries.row_count || 0;

    const fetchDate = new Date(gscQueries.fetched_at);
    const daysSince = (Date.now() - fetchDate) / (1000 * 60 * 60 * 24);
    status.seo.stale = daysSince > CONFIG.dataStaleThresholdDays;
  }

  if (gscPages) {
    status.seo.pageCount = gscPages.row_count || 0;
  }

  // Generate recommendations based on status
  if (!status.geo.available) {
    status.recommendations.push({
      action: 'Import GEO data',
      command: 'npm run seo:import-geo <csv-file>',
      reason: 'No GEO data available'
    });
  } else if (status.geo.stale) {
    status.recommendations.push({
      action: 'Update GEO data',
      command: 'npm run seo:import-geo <csv-file>',
      reason: `GEO data is ${Math.floor((Date.now() - new Date(status.geo.latestDate)) / (1000 * 60 * 60 * 24))} days old`
    });
  }

  if (!status.seo.available) {
    status.recommendations.push({
      action: 'Generate sample GSC data (for testing)',
      command: 'node scripts/seo-automation/gsc-data-fetcher.js sample',
      reason: 'No GSC data available'
    });
    status.recommendations.push({
      action: 'Fetch real GSC data via MCP',
      command: 'Use GSC MCP tools in Claude Code',
      reason: 'No GSC data available'
    });
  } else if (status.seo.stale) {
    status.recommendations.push({
      action: 'Refresh GSC data',
      command: 'Use GSC MCP tools in Claude Code',
      reason: `GSC data is ${Math.floor((Date.now() - new Date(status.seo.latestFetch)) / (1000 * 60 * 60 * 24))} days old`
    });
  }

  return status;
}

/**
 * Collect new data (interactive mode)
 */
async function collectData(options = {}) {
  const { csvFile, generateSample } = options;
  const results = {
    geo: { imported: false, count: 0 },
    seo: { generated: false, count: 0 }
  };

  // Import GEO CSV if provided
  if (csvFile) {
    console.log(`\nImporting GEO data from: ${csvFile}`);
    try {
      const result = await csvImporter.importCSV(csvFile);
      results.geo.imported = result.saved;
      results.geo.count = result.metrics.length;
      console.log(`  Imported ${result.metrics.length} metrics`);
    } catch (err) {
      console.error(`  Error: ${err.message}`);
    }
  }

  // Generate sample GSC data if requested
  if (generateSample) {
    console.log('\nGenerating sample GSC data...');
    const sample = gscFetcher.generateSampleData();
    gscFetcher.saveGSCData(sample.queries, gscFetcher.METRIC_TYPES.QUERIES);
    gscFetcher.saveGSCData(sample.pages, gscFetcher.METRIC_TYPES.PAGES);
    results.seo.generated = true;
    results.seo.count = sample.queries.rows.length;
    console.log(`  Generated ${sample.queries.rows.length} sample queries`);
  }

  return results;
}

/**
 * Run analysis and display results
 */
function runAnalysis(options = {}) {
  const { verbose = false } = options;

  console.log('\n=== Running SEO/GEO Analysis ===\n');

  const analysis = analyzer.runAnalysis();

  if (!analysis) {
    console.log('No data available for analysis.');
    return null;
  }

  // Display summary
  console.log('\n--- Analysis Results ---\n');

  // Overall metrics
  console.log('Data Status:');
  console.log(`  GEO metrics: ${analysis.dataStats.geoMetrics}`);
  console.log(`  GSC queries: ${analysis.dataStats.gscQueries}`);
  console.log(`  GSC pages: ${analysis.dataStats.gscPages}`);

  // Source breakdown
  if (analysis.bySource && Object.keys(analysis.bySource).length > 0) {
    console.log('\nAI Source Performance:');
    for (const [source, data] of Object.entries(analysis.bySource)) {
      console.log(`  ${source}: ${data.mentionRate} mention rate`);
    }
  }

  // Gaps
  if (analysis.gaps) {
    console.log('\nOpportunity Gaps:');
    console.log(`  High SEO / Low GEO: ${analysis.gaps.highSeoLowGeo.length} queries`);
    console.log(`  High GEO / Low SEO: ${analysis.gaps.highGeoLowSeo.length} queries`);
  }

  // Top recommendations
  if (analysis.recommendations && analysis.recommendations.length > 0) {
    console.log('\nTop Recommendations:');
    for (const rec of analysis.recommendations.slice(0, 3)) {
      console.log(`  [${rec.priority.toUpperCase()}] ${rec.issue}`);
      if (verbose) {
        for (const action of rec.actions.slice(0, 2)) {
          console.log(`    - ${action}`);
        }
      }
    }
  }

  return analysis;
}

/**
 * Generate and save report
 */
function generateReport(options = {}) {
  const { format = 'markdown' } = options;

  console.log('\n=== Generating Report ===\n');

  const data = reporter.generateReportData();
  const filepath = reporter.saveReport(data, format);

  console.log(`Report saved: ${filepath}`);

  // Summary
  console.log('\nReport Summary:');
  console.log(`  GEO Mention Rate: ${data.overview.geo.mentionRate}%`);
  console.log(`  GSC Total Clicks: ${data.overview.seo.totalClicks.toLocaleString()}`);
  console.log(`  Recommendations: ${data.recommendations.length}`);
  console.log(`  High Priority: ${data.recommendations.filter(r => r.priority === 'high').length}`);

  return { filepath, data };
}

/**
 * Run full workflow
 */
async function runFullWorkflow(options = {}) {
  console.log('='.repeat(60));
  console.log('       SEO/GEO Orchestrator - Full Workflow');
  console.log('='.repeat(60));

  // Step 1: Check status
  console.log('\n[1/4] Checking data status...');
  const status = checkDataStatus();

  console.log(`  GEO data: ${status.geo.available ? 'Available' : 'Not available'}`);
  if (status.geo.available) {
    console.log(`    Latest: ${status.geo.latestDate} ${status.geo.stale ? '(STALE)' : ''}`);
  }

  console.log(`  SEO data: ${status.seo.available ? 'Available' : 'Not available'}`);
  if (status.seo.available) {
    console.log(`    Latest fetch: ${status.seo.latestFetch?.split('T')[0]} ${status.seo.stale ? '(STALE)' : ''}`);
  }

  // Step 2: Collect if needed
  if (options.csvFile || options.generateSample) {
    console.log('\n[2/4] Collecting new data...');
    await collectData(options);
  } else if (!status.geo.available && !status.seo.available) {
    console.log('\n[2/4] No data available. Generating sample data for demonstration...');
    await collectData({ generateSample: true });
  } else {
    console.log('\n[2/4] Using existing data (pass --csv or --sample to import new data)');
  }

  // Step 3: Analyze
  console.log('\n[3/4] Running analysis...');
  const analysis = runAnalysis({ verbose: true });

  // Step 4: Generate report
  console.log('\n[4/4] Generating report...');
  const { filepath } = generateReport({ format: options.format || 'markdown' });

  // Final summary
  console.log('\n' + '='.repeat(60));
  console.log('                    Workflow Complete');
  console.log('='.repeat(60));

  if (status.recommendations.length > 0) {
    console.log('\nNext Steps:');
    for (const rec of status.recommendations) {
      console.log(`  - ${rec.action}: ${rec.command}`);
    }
  }

  console.log(`\nFull report available at: ${filepath}`);

  return { status, analysis, reportPath: filepath };
}

/**
 * Interactive CLI
 */
async function runInteractive() {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const question = (prompt) => new Promise(resolve => rl.question(prompt, resolve));

  console.log('\n=== SEO/GEO Orchestrator - Interactive Mode ===\n');

  // Check status
  const status = checkDataStatus();

  console.log('Current Data Status:');
  console.log(`  GEO: ${status.geo.available ? `${status.geo.fileCount} files` : 'No data'}`);
  console.log(`  SEO: ${status.seo.available ? `${status.seo.queryCount} queries` : 'No data'}`);

  console.log('\nOptions:');
  console.log('  1. Run full analysis and generate report');
  console.log('  2. Import GEO CSV file');
  console.log('  3. Generate sample data (for testing)');
  console.log('  4. Check detailed status');
  console.log('  5. Exit');

  const choice = await question('\nSelect option (1-5): ');

  switch (choice.trim()) {
    case '1':
      await runFullWorkflow();
      break;

    case '2':
      const csvPath = await question('Enter CSV file path: ');
      if (csvPath.trim()) {
        await collectData({ csvFile: csvPath.trim() });
      }
      break;

    case '3':
      await collectData({ generateSample: true });
      console.log('Sample data generated. Run option 1 to analyze.');
      break;

    case '4':
      console.log('\nDetailed Status:');
      console.log(JSON.stringify(status, null, 2));
      break;

    case '5':
      console.log('Goodbye!');
      break;

    default:
      console.log('Invalid option');
  }

  rl.close();
}

/**
 * CLI handler
 */
async function main() {
  const args = process.argv.slice(2);
  const mode = args[0] || 'help';

  // Parse options
  const options = {
    csvFile: null,
    generateSample: args.includes('--sample'),
    format: 'markdown',
    verbose: args.includes('--verbose') || args.includes('-v')
  };

  const csvIdx = args.indexOf('--csv');
  if (csvIdx !== -1 && args[csvIdx + 1]) {
    options.csvFile = args[csvIdx + 1];
  }

  const formatIdx = args.indexOf('--format');
  if (formatIdx !== -1 && args[formatIdx + 1]) {
    options.format = args[formatIdx + 1];
  }

  switch (mode) {
    case 'status':
      const status = checkDataStatus();
      console.log('\nData Status:');
      console.log(JSON.stringify(status, null, 2));
      break;

    case 'collect':
      await collectData(options);
      break;

    case 'analyze':
      runAnalysis(options);
      break;

    case 'report':
      generateReport(options);
      break;

    case 'full':
      await runFullWorkflow(options);
      break;

    case 'interactive':
    case '-i':
      await runInteractive();
      break;

    case 'help':
    case '--help':
    case '-h':
    default:
      console.log(`
SEO/GEO Orchestrator

Usage:
  node orchestrator.js <mode> [options]

Modes:
  status       Check data status and freshness
  collect      Collect/import new data
  analyze      Run analysis on existing data
  report       Generate comprehensive report
  full         Run full workflow (collect + analyze + report)
  interactive  Run in interactive mode

Options:
  --csv <file>     Import GEO data from CSV file
  --sample         Generate sample data for testing
  --format <type>  Report format: json, markdown, html (default: markdown)
  --verbose, -v    Show more details

Examples:
  node orchestrator.js status
  node orchestrator.js collect --csv geo-export.csv
  node orchestrator.js full --sample
  node orchestrator.js report --format html
  node orchestrator.js interactive
`);
  }
}

// Exports
module.exports = {
  checkDataStatus,
  collectData,
  runAnalysis,
  generateReport,
  runFullWorkflow
};

// Run if executed directly
if (require.main === module) {
  main().catch(console.error);
}
