#!/usr/bin/env node
/**
 * DIY GEO (Generative Engine Optimization) Tracker
 *
 * Queries AI platforms directly to track brand visibility:
 * - Perplexity AI (search-focused, best for GEO)
 * - OpenAI ChatGPT
 * - Anthropic Claude
 *
 * Usage:
 *   node scripts/seo-automation/geo-tracker.js [options]
 *
 * Environment variables:
 *   PERPLEXITY_API_KEY - Perplexity API key
 *   OPENAI_API_KEY - OpenAI API key
 *   ANTHROPIC_API_KEY - Anthropic API key
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Paths
const DATA_DIR = path.join(__dirname, '../../data/geo-metrics');
const NORMALIZED_DIR = path.join(DATA_DIR, 'normalized');
const CONFIG_PATH = path.join(__dirname, '../../secret/geo-tracker-config.json');

// Load schema
const schema = require(path.join(DATA_DIR, 'schema.js'));

// Default tracking queries
const DEFAULT_QUERIES = [
  // Product/category queries
  "What is the best virtual lab software for schools?",
  "What are the top virtual science lab platforms?",
  "Best online chemistry lab for students",
  "Virtual physics lab software recommendations",
  "AI tutor for STEM education",
  "Interactive lab simulations for education",

  // Comparison queries
  "What are alternatives to Labster?",
  "Labster vs other virtual lab software",
  "Best Labster alternatives for schools",
  "PhET alternatives for virtual labs",

  // Brand queries
  "What is WhimsyLabs?",
  "WhimsyLabs virtual lab review",
  "WhimsyCat AI tutor",

  // Educational queries
  "How to teach chemistry online with simulations",
  "Virtual dissection software for biology class",
  "Best STEM education technology 2026"
];

// Brand terms to detect
const BRAND_TERMS = [
  'whimsylabs',
  'whimsy labs',
  'whimsycat',
  'whimsy cat',
  'whimsylabs.ai',
  'whimsylabs.io'
];

// Competitor terms to detect
const COMPETITORS = [
  'labster',
  'phet',
  'chemcollective',
  'late nite labs',
  'beyond labz',
  'cloudlabs',
  'praxilabs',
  'labby',
  'simpad',
  'virtulab',
  'gizmos',
  'explorelearning'
];

/**
 * Load configuration (API keys, custom queries)
 */
function loadConfig() {
  const config = {
    perplexityApiKey: process.env.PERPLEXITY_API_KEY || null,
    openaiApiKey: process.env.OPENAI_API_KEY || null,
    anthropicApiKey: process.env.ANTHROPIC_API_KEY || null,
    queries: DEFAULT_QUERIES
  };

  // Try to load from config file
  if (fs.existsSync(CONFIG_PATH)) {
    try {
      const fileConfig = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
      Object.assign(config, fileConfig);
    } catch (e) {
      console.error('Warning: Could not load config file:', e.message);
    }
  }

  return config;
}

/**
 * Make HTTPS request
 */
function httpsRequest(options, body = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, data });
        }
      });
    });

    req.on('error', reject);
    req.setTimeout(60000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

/**
 * Query Perplexity AI
 */
async function queryPerplexity(query, apiKey) {
  const body = {
    model: 'llama-3.1-sonar-small-128k-online',
    messages: [
      {
        role: 'user',
        content: query
      }
    ],
    max_tokens: 1000,
    return_citations: true
  };

  const response = await httpsRequest({
    hostname: 'api.perplexity.ai',
    path: '/chat/completions',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    }
  }, body);

  if (response.status !== 200) {
    throw new Error(`Perplexity API error: ${response.status} - ${JSON.stringify(response.data)}`);
  }

  return {
    content: response.data.choices?.[0]?.message?.content || '',
    citations: response.data.citations || []
  };
}

/**
 * Query OpenAI ChatGPT
 */
async function queryOpenAI(query, apiKey) {
  const body = {
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'user',
        content: query
      }
    ],
    max_tokens: 1000
  };

  const response = await httpsRequest({
    hostname: 'api.openai.com',
    path: '/v1/chat/completions',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    }
  }, body);

  if (response.status !== 200) {
    throw new Error(`OpenAI API error: ${response.status} - ${JSON.stringify(response.data)}`);
  }

  return {
    content: response.data.choices?.[0]?.message?.content || '',
    citations: []
  };
}

/**
 * Query Anthropic Claude
 */
async function queryClaude(query, apiKey) {
  const body = {
    model: 'claude-3-haiku-20240307',
    max_tokens: 1000,
    messages: [
      {
        role: 'user',
        content: query
      }
    ]
  };

  const response = await httpsRequest({
    hostname: 'api.anthropic.com',
    path: '/v1/messages',
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'Content-Type': 'application/json'
    }
  }, body);

  if (response.status !== 200) {
    throw new Error(`Anthropic API error: ${response.status} - ${JSON.stringify(response.data)}`);
  }

  return {
    content: response.data.content?.[0]?.text || '',
    citations: []
  };
}

/**
 * Analyze response for brand mentions
 */
function analyzeResponse(content, citations = []) {
  const contentLower = content.toLowerCase();

  // Check for brand mentions
  const brandMentioned = BRAND_TERMS.some(term => contentLower.includes(term.toLowerCase()));

  // Find which brand term was mentioned
  let brandTermFound = null;
  for (const term of BRAND_TERMS) {
    if (contentLower.includes(term.toLowerCase())) {
      brandTermFound = term;
      break;
    }
  }

  // Check for competitor mentions
  const competitorsMentioned = COMPETITORS.filter(comp =>
    contentLower.includes(comp.toLowerCase())
  );

  // Determine citation type
  let citationType = null;
  let urlCited = null;

  if (brandMentioned) {
    // Check citations for our URLs
    for (const citation of citations) {
      const citationStr = typeof citation === 'string' ? citation : citation.url || '';
      if (citationStr.includes('whimsylabs')) {
        citationType = 'direct';
        urlCited = citationStr;
        break;
      }
    }

    // If no direct citation, determine type from context
    if (!citationType) {
      if (contentLower.includes('recommend') || contentLower.includes('suggest')) {
        citationType = 'recommendation';
      } else if (contentLower.includes('vs') || contentLower.includes('compar') || contentLower.includes('alternative')) {
        citationType = 'comparison';
      } else {
        citationType = 'contextual';
      }
    }
  }

  // Analyze sentiment (simple heuristic)
  let sentiment = 'neutral';
  if (brandMentioned) {
    const positiveWords = ['great', 'excellent', 'best', 'top', 'leading', 'innovative', 'powerful', 'recommended', 'popular'];
    const negativeWords = ['poor', 'bad', 'worst', 'lacking', 'limited', 'expensive', 'difficult'];

    const hasPositive = positiveWords.some(word => contentLower.includes(word));
    const hasNegative = negativeWords.some(word => contentLower.includes(word));

    if (hasPositive && !hasNegative) sentiment = 'positive';
    else if (hasNegative && !hasPositive) sentiment = 'negative';
    else if (hasPositive && hasNegative) sentiment = 'mixed';
  }

  // Find position (if mentioned in a list)
  let position = null;
  if (brandMentioned) {
    // Look for numbered list patterns
    const listPatterns = [
      /(\d+)\.\s*(?:whimsylabs|whimsy\s*labs|whimsycat)/i,
      /(?:whimsylabs|whimsy\s*labs|whimsycat).*?(?:#|number|rank)\s*(\d+)/i
    ];

    for (const pattern of listPatterns) {
      const match = content.match(pattern);
      if (match) {
        position = parseInt(match[1]);
        break;
      }
    }
  }

  return {
    brandMentioned,
    brandTermFound,
    citationType,
    urlCited,
    competitorsMentioned,
    sentiment,
    position,
    contentLength: content.length,
    citationCount: citations.length
  };
}

/**
 * Run a single query against a provider
 */
async function runQuery(query, provider, apiKey) {
  let response;

  switch (provider) {
    case 'perplexity':
      response = await queryPerplexity(query, apiKey);
      break;
    case 'chatgpt':
      response = await queryOpenAI(query, apiKey);
      break;
    case 'claude':
      response = await queryClaude(query, apiKey);
      break;
    default:
      throw new Error(`Unknown provider: ${provider}`);
  }

  const analysis = analyzeResponse(response.content, response.citations);

  return {
    date: new Date().toISOString().split('T')[0],
    source: provider,
    query: query,
    brand_mentioned: analysis.brandMentioned,
    citation_type: analysis.citationType,
    url_cited: analysis.urlCited,
    position: analysis.position,
    competitors_mentioned: analysis.competitorsMentioned,
    sentiment: analysis.sentiment,
    raw_data: {
      content_preview: response.content.substring(0, 500),
      content_length: analysis.contentLength,
      citation_count: analysis.citationCount,
      citations: response.citations.slice(0, 5)
    }
  };
}

/**
 * Run all queries against available providers
 */
async function runAllQueries(config, options = {}) {
  const { providers = null, queries = null, verbose = false } = options;

  const results = [];
  const errors = [];

  // Determine which providers to use
  const availableProviders = [];
  if (config.perplexityApiKey && (!providers || providers.includes('perplexity'))) {
    availableProviders.push({ name: 'perplexity', key: config.perplexityApiKey });
  }
  if (config.openaiApiKey && (!providers || providers.includes('chatgpt'))) {
    availableProviders.push({ name: 'chatgpt', key: config.openaiApiKey });
  }
  if (config.anthropicApiKey && (!providers || providers.includes('claude'))) {
    availableProviders.push({ name: 'claude', key: config.anthropicApiKey });
  }

  if (availableProviders.length === 0) {
    throw new Error('No API keys configured. Set PERPLEXITY_API_KEY, OPENAI_API_KEY, or ANTHROPIC_API_KEY');
  }

  const queriesToRun = queries || config.queries;
  const total = queriesToRun.length * availableProviders.length;
  let completed = 0;

  console.log(`Running ${queriesToRun.length} queries across ${availableProviders.length} provider(s)...`);
  console.log(`Providers: ${availableProviders.map(p => p.name).join(', ')}\n`);

  for (const provider of availableProviders) {
    console.log(`\n--- ${provider.name.toUpperCase()} ---`);

    for (const query of queriesToRun) {
      completed++;
      const progress = `[${completed}/${total}]`;

      try {
        if (verbose) {
          console.log(`${progress} Querying: "${query.substring(0, 50)}..."`);
        } else {
          process.stdout.write(`\r${progress} Processing...`);
        }

        const result = await runQuery(query, provider.name, provider.key);
        results.push(result);

        if (verbose) {
          const status = result.brand_mentioned ? '✓ MENTIONED' : '✗ Not mentioned';
          console.log(`       ${status}`);
          if (result.competitors_mentioned.length > 0) {
            console.log(`       Competitors: ${result.competitors_mentioned.join(', ')}`);
          }
        }

        // Rate limiting - wait between requests
        await new Promise(resolve => setTimeout(resolve, 1000));

      } catch (err) {
        errors.push({ provider: provider.name, query, error: err.message });
        if (verbose) {
          console.log(`       ERROR: ${err.message}`);
        }
      }
    }
  }

  console.log('\n');
  return { results, errors };
}

/**
 * Save results to normalized format
 */
function saveResults(results) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `geo-tracker_${timestamp}.json`;
  const filepath = path.join(NORMALIZED_DIR, filename);

  const data = {
    imported_at: new Date().toISOString(),
    source_file: 'geo-tracker (DIY)',
    total_rows: results.length,
    valid_metrics: results.length,
    error_count: 0,
    metrics: results
  };

  fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
  console.log(`Saved: ${filepath}`);

  return filepath;
}

/**
 * Print summary of results
 */
function printSummary(results, errors) {
  console.log('=== GEO Tracking Summary ===\n');

  // Overall stats
  const totalQueries = results.length;
  const mentions = results.filter(r => r.brand_mentioned).length;
  const mentionRate = totalQueries > 0 ? ((mentions / totalQueries) * 100).toFixed(1) : 0;

  console.log(`Total queries: ${totalQueries}`);
  console.log(`Brand mentions: ${mentions} (${mentionRate}%)`);
  console.log(`Errors: ${errors.length}`);

  // By provider
  console.log('\nBy Provider:');
  const byProvider = {};
  for (const r of results) {
    if (!byProvider[r.source]) {
      byProvider[r.source] = { total: 0, mentions: 0 };
    }
    byProvider[r.source].total++;
    if (r.brand_mentioned) byProvider[r.source].mentions++;
  }

  for (const [provider, stats] of Object.entries(byProvider)) {
    const rate = ((stats.mentions / stats.total) * 100).toFixed(1);
    console.log(`  ${provider}: ${stats.mentions}/${stats.total} (${rate}%)`);
  }

  // Competitor analysis
  const competitorCounts = {};
  for (const r of results) {
    for (const comp of r.competitors_mentioned) {
      competitorCounts[comp] = (competitorCounts[comp] || 0) + 1;
    }
  }

  if (Object.keys(competitorCounts).length > 0) {
    console.log('\nCompetitor Mentions:');
    const sorted = Object.entries(competitorCounts).sort((a, b) => b[1] - a[1]);
    for (const [comp, count] of sorted.slice(0, 10)) {
      console.log(`  ${comp}: ${count}`);
    }
  }

  // Queries where brand was mentioned
  const mentionedQueries = results.filter(r => r.brand_mentioned);
  if (mentionedQueries.length > 0) {
    console.log('\nQueries with Brand Mentions:');
    for (const r of mentionedQueries) {
      console.log(`  [${r.source}] "${r.query.substring(0, 50)}..." (${r.sentiment})`);
    }
  }
}

/**
 * CLI handler
 */
async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
DIY GEO Tracker - Track brand visibility across AI platforms

Usage:
  node geo-tracker.js [options]

Options:
  --providers <list>  Comma-separated providers (perplexity,chatgpt,claude)
  --queries <file>    JSON file with custom queries
  --verbose, -v       Show detailed output
  --dry-run           Show what would be run without executing
  --save              Save results (default: true)
  --help              Show this help

Environment Variables:
  PERPLEXITY_API_KEY  Perplexity API key (recommended for GEO)
  OPENAI_API_KEY      OpenAI API key
  ANTHROPIC_API_KEY   Anthropic API key

Examples:
  # Run with Perplexity only
  PERPLEXITY_API_KEY=pplx-xxx node geo-tracker.js --providers perplexity

  # Run all providers with verbose output
  node geo-tracker.js -v

  # Use custom queries
  node geo-tracker.js --queries my-queries.json
`);
    return;
  }

  const config = loadConfig();

  // Parse options
  const verbose = args.includes('--verbose') || args.includes('-v');
  const dryRun = args.includes('--dry-run');
  const noSave = args.includes('--no-save');

  let providers = null;
  const providersIdx = args.indexOf('--providers');
  if (providersIdx !== -1 && args[providersIdx + 1]) {
    providers = args[providersIdx + 1].split(',').map(p => p.trim());
  }

  let queries = null;
  const queriesIdx = args.indexOf('--queries');
  if (queriesIdx !== -1 && args[queriesIdx + 1]) {
    const queriesFile = args[queriesIdx + 1];
    queries = JSON.parse(fs.readFileSync(queriesFile, 'utf8'));
  }

  if (dryRun) {
    console.log('DRY RUN - Would execute:');
    console.log(`  Providers: ${providers || 'all available'}`);
    console.log(`  Queries: ${(queries || config.queries).length}`);
    console.log('\nConfigured API keys:');
    console.log(`  Perplexity: ${config.perplexityApiKey ? 'Yes' : 'No'}`);
    console.log(`  OpenAI: ${config.openaiApiKey ? 'Yes' : 'No'}`);
    console.log(`  Anthropic: ${config.anthropicApiKey ? 'Yes' : 'No'}`);
    return;
  }

  try {
    const { results, errors } = await runAllQueries(config, { providers, queries, verbose });

    if (results.length > 0) {
      printSummary(results, errors);

      if (!noSave) {
        console.log('\n');
        saveResults(results);
      }
    } else {
      console.log('No results collected.');
    }

    if (errors.length > 0) {
      console.log('\nErrors:');
      for (const err of errors) {
        console.log(`  [${err.provider}] ${err.query.substring(0, 30)}...: ${err.error}`);
      }
    }

  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

// Exports
module.exports = {
  loadConfig,
  runQuery,
  runAllQueries,
  analyzeResponse,
  saveResults,
  DEFAULT_QUERIES,
  BRAND_TERMS,
  COMPETITORS
};

// Run if executed directly
if (require.main === module) {
  main();
}
