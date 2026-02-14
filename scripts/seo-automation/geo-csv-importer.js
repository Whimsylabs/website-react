#!/usr/bin/env node
/**
 * GEO CSV Importer
 *
 * Imports CSV exports from GEO tools (Answer Socrates, etc.) and normalizes
 * them to the standard GEO metrics schema.
 *
 * Usage:
 *   node scripts/seo-automation/geo-csv-importer.js <csv-file>
 *   node scripts/seo-automation/geo-csv-importer.js --watch
 */

const fs = require('fs');
const path = require('path');

// Paths
const DATA_DIR = path.join(__dirname, '../../data/geo-metrics');
const IMPORTS_DIR = path.join(DATA_DIR, 'imports');
const NORMALIZED_DIR = path.join(DATA_DIR, 'normalized');
const SCHEMA_PATH = path.join(DATA_DIR, 'schema.js');

// Load schema
const schema = require(SCHEMA_PATH);

/**
 * Parse a CSV string into an array of objects
 * @param {string} csvContent - Raw CSV content
 * @returns {Object[]} Array of row objects
 */
function parseCSV(csvContent) {
  const lines = csvContent.split(/\r?\n/).filter(line => line.trim());
  if (lines.length < 2) {
    throw new Error('CSV must have at least a header row and one data row');
  }

  // Parse header
  const headers = parseCSVLine(lines[0]);

  // Parse data rows
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length === 0) continue;

    const row = {};
    headers.forEach((header, index) => {
      // Normalize header names
      const key = normalizeHeaderName(header);
      row[key] = values[index] || '';
    });
    rows.push(row);
  }

  return rows;
}

/**
 * Parse a single CSV line, handling quoted values
 */
function parseCSVLine(line) {
  const values = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];

    if (char === '"' && !inQuotes) {
      inQuotes = true;
    } else if (char === '"' && inQuotes) {
      if (nextChar === '"') {
        current += '"';
        i++; // Skip next quote
      } else {
        inQuotes = false;
      }
    } else if (char === ',' && !inQuotes) {
      values.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  values.push(current.trim());

  return values;
}

/**
 * Normalize header names to match schema fields
 */
function normalizeHeaderName(header) {
  const normalized = header.toLowerCase().trim()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');

  // Common mappings from GEO tools
  const mappings = {
    'date': 'date',
    'timestamp': 'date',
    'created_at': 'date',
    'source': 'source',
    'platform': 'source',
    'ai_platform': 'source',
    'engine': 'source',
    'query': 'query',
    'keyword': 'query',
    'search_term': 'query',
    'prompt': 'query',
    'question': 'query',
    'mentioned': 'brand_mentioned',
    'brand_mentioned': 'brand_mentioned',
    'visibility': 'brand_mentioned',
    'visible': 'brand_mentioned',
    'found': 'brand_mentioned',
    'citation_type': 'citation_type',
    'mention_type': 'citation_type',
    'type': 'citation_type',
    'url': 'url_cited',
    'url_cited': 'url_cited',
    'link': 'url_cited',
    'cited_url': 'url_cited',
    'position': 'position',
    'rank': 'position',
    'ranking': 'position',
    'competitors': 'competitors_mentioned',
    'competitors_mentioned': 'competitors_mentioned',
    'other_brands': 'competitors_mentioned',
    'sentiment': 'sentiment',
    'tone': 'sentiment'
  };

  return mappings[normalized] || normalized;
}

/**
 * Convert raw CSV row to GEO metric
 */
function rowToGeoMetric(row, source = null) {
  // Determine date
  let date = row.date;
  if (!date || date === '') {
    date = new Date().toISOString().split('T')[0];
  } else {
    // Try to parse various date formats
    const parsedDate = parseDate(date);
    date = parsedDate || new Date().toISOString().split('T')[0];
  }

  // Determine if brand was mentioned
  let brandMentioned = false;
  if (row.brand_mentioned !== undefined) {
    brandMentioned = parseBool(row.brand_mentioned);
  } else if (row.visibility !== undefined) {
    brandMentioned = parseBool(row.visibility) || parseFloat(row.visibility) > 0;
  }

  return schema.createGeoMetric({
    date,
    source: source || row.source,
    query: row.query,
    brand_mentioned: brandMentioned,
    citation_type: row.citation_type,
    url_cited: row.url_cited,
    position: row.position,
    competitors_mentioned: row.competitors_mentioned,
    sentiment: row.sentiment,
    ...row  // Include all original fields in raw_data
  });
}

/**
 * Parse various date formats
 */
function parseDate(dateStr) {
  if (!dateStr) return null;

  // Already in YYYY-MM-DD format
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return dateStr;
  }

  // MM/DD/YYYY or M/D/YYYY
  const usFormat = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
  const usMatch = dateStr.match(usFormat);
  if (usMatch) {
    const [, month, day, year] = usMatch;
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }

  // DD/MM/YYYY
  const euFormat = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
  const euMatch = dateStr.match(euFormat);
  if (euMatch) {
    const [, day, month, year] = euMatch;
    // Assume EU format if day > 12
    if (parseInt(day) > 12) {
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
  }

  // Try Date.parse as fallback
  const parsed = new Date(dateStr);
  if (!isNaN(parsed.getTime())) {
    return parsed.toISOString().split('T')[0];
  }

  return null;
}

/**
 * Parse boolean-like values
 */
function parseBool(value) {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'number') return value > 0;
  if (typeof value === 'string') {
    const lower = value.toLowerCase().trim();
    return ['true', 'yes', '1', 'y', 'mentioned', 'visible'].includes(lower);
  }
  return false;
}

/**
 * Import a CSV file and save normalized data
 */
async function importCSV(csvPath, options = {}) {
  const { source = null, dryRun = false } = options;

  console.log(`\nImporting: ${csvPath}`);

  // Read CSV
  if (!fs.existsSync(csvPath)) {
    throw new Error(`File not found: ${csvPath}`);
  }

  const csvContent = fs.readFileSync(csvPath, 'utf8');
  const rows = parseCSV(csvContent);

  console.log(`  Parsed ${rows.length} rows`);

  // Convert to GEO metrics
  const metrics = [];
  const errors = [];

  for (let i = 0; i < rows.length; i++) {
    try {
      const metric = rowToGeoMetric(rows[i], source);
      const validation = schema.validateGeoMetric(metric);

      if (validation.valid) {
        metrics.push(metric);
      } else {
        errors.push({ row: i + 2, errors: validation.errors, data: rows[i] });
      }
    } catch (err) {
      errors.push({ row: i + 2, errors: [err.message], data: rows[i] });
    }
  }

  console.log(`  Valid metrics: ${metrics.length}`);
  if (errors.length > 0) {
    console.log(`  Errors: ${errors.length}`);
    errors.slice(0, 5).forEach(e => {
      console.log(`    Row ${e.row}: ${e.errors.join(', ')}`);
    });
    if (errors.length > 5) {
      console.log(`    ... and ${errors.length - 5} more`);
    }
  }

  if (dryRun) {
    console.log('\n  Dry run - not saving');
    return { metrics, errors, saved: false };
  }

  // Save normalized data
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const baseName = path.basename(csvPath, path.extname(csvPath));
  const outputPath = path.join(NORMALIZED_DIR, `${baseName}_${timestamp}.json`);

  const outputData = {
    imported_at: new Date().toISOString(),
    source_file: csvPath,
    total_rows: rows.length,
    valid_metrics: metrics.length,
    error_count: errors.length,
    metrics
  };

  fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2));
  console.log(`  Saved to: ${outputPath}`);

  // Copy original to imports dir
  const importCopy = path.join(IMPORTS_DIR, `${baseName}_${timestamp}.csv`);
  fs.copyFileSync(csvPath, importCopy);
  console.log(`  Archived to: ${importCopy}`);

  return { metrics, errors, saved: true, outputPath };
}

/**
 * Watch imports directory for new files
 */
function watchImports() {
  console.log(`Watching for new CSV files in: ${IMPORTS_DIR}`);

  const processed = new Set();

  // Check for existing files
  const existing = fs.readdirSync(IMPORTS_DIR).filter(f => f.endsWith('.csv'));
  existing.forEach(f => processed.add(f));
  console.log(`  Found ${existing.length} existing files (skipping)`);

  // Watch for changes
  fs.watch(IMPORTS_DIR, (eventType, filename) => {
    if (!filename || !filename.endsWith('.csv')) return;
    if (processed.has(filename)) return;

    processed.add(filename);
    const fullPath = path.join(IMPORTS_DIR, filename);

    // Wait a bit for file to finish writing
    setTimeout(async () => {
      try {
        await importCSV(fullPath);
      } catch (err) {
        console.error(`  Error importing ${filename}: ${err.message}`);
      }
    }, 1000);
  });
}

/**
 * Get all normalized metrics from a date range
 */
function getMetrics(options = {}) {
  const { startDate, endDate, source } = options;

  const metrics = [];
  const files = fs.readdirSync(NORMALIZED_DIR).filter(f => f.endsWith('.json'));

  for (const file of files) {
    const data = JSON.parse(fs.readFileSync(path.join(NORMALIZED_DIR, file), 'utf8'));
    for (const metric of data.metrics) {
      // Filter by date
      if (startDate && metric.date < startDate) continue;
      if (endDate && metric.date > endDate) continue;

      // Filter by source
      if (source && metric.source !== source) continue;

      metrics.push(metric);
    }
  }

  return metrics;
}

/**
 * Main CLI handler
 */
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    console.log(`
GEO CSV Importer - Import and normalize GEO tool exports

Usage:
  node geo-csv-importer.js <csv-file> [options]
  node geo-csv-importer.js --watch

Options:
  --source <name>    Override the source/platform name
  --dry-run          Parse and validate without saving
  --watch            Watch imports directory for new files
  --help             Show this help message

Examples:
  node geo-csv-importer.js answer-socrates-export.csv
  node geo-csv-importer.js data.csv --source perplexity --dry-run
  node geo-csv-importer.js --watch
`);
    return;
  }

  if (args.includes('--watch')) {
    watchImports();
    return;
  }

  // Import specified files
  const csvFiles = args.filter(a => !a.startsWith('--'));
  const source = args.includes('--source') ? args[args.indexOf('--source') + 1] : null;
  const dryRun = args.includes('--dry-run');

  for (const csvPath of csvFiles) {
    try {
      await importCSV(csvPath, { source, dryRun });
    } catch (err) {
      console.error(`Error: ${err.message}`);
      process.exit(1);
    }
  }
}

// Export for use as module
module.exports = {
  parseCSV,
  importCSV,
  getMetrics,
  rowToGeoMetric
};

// Run CLI if executed directly
if (require.main === module) {
  main();
}
