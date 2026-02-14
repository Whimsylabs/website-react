/**
 * GEO (Generative Engine Optimization) Data Schema
 *
 * This module defines the data structures for tracking AI visibility metrics
 * across different AI platforms (ChatGPT, Claude, Perplexity, Gemini, etc.)
 */

/**
 * @typedef {Object} GeoMetric
 * @property {string} date - ISO date string (YYYY-MM-DD)
 * @property {string} source - AI platform source
 * @property {string} query - The search/prompt query
 * @property {boolean} brand_mentioned - Whether WhimsyLabs was mentioned
 * @property {string|null} citation_type - Type of citation if mentioned
 * @property {string|null} url_cited - URL that was cited
 * @property {number|null} position - Position in AI response (if applicable)
 * @property {string[]} competitors_mentioned - Competitor brands mentioned
 * @property {string} sentiment - Sentiment of the mention
 * @property {Object} raw_data - Original data from source
 */

const AI_SOURCES = {
  CHATGPT: 'chatgpt',
  CLAUDE: 'claude',
  PERPLEXITY: 'perplexity',
  GEMINI: 'gemini',
  AI_OVERVIEW: 'ai_overview',  // Google AI Overviews
  COPILOT: 'copilot',          // Microsoft Copilot
  OTHER: 'other'
};

const CITATION_TYPES = {
  RECOMMENDATION: 'recommendation',  // Direct product recommendation
  DIRECT: 'direct',                   // Direct link/citation
  CONTEXTUAL: 'contextual',           // Mentioned in context
  COMPARISON: 'comparison',           // Mentioned in comparison
  NONE: null
};

const SENTIMENT_TYPES = {
  POSITIVE: 'positive',
  NEUTRAL: 'neutral',
  NEGATIVE: 'negative',
  MIXED: 'mixed'
};

/**
 * Validates a GEO metric object against the schema
 * @param {Object} metric - The metric to validate
 * @returns {Object} - { valid: boolean, errors: string[] }
 */
function validateGeoMetric(metric) {
  const errors = [];

  // Required fields
  if (!metric.date) {
    errors.push('date is required');
  } else if (!/^\d{4}-\d{2}-\d{2}$/.test(metric.date)) {
    errors.push('date must be in YYYY-MM-DD format');
  }

  if (!metric.source) {
    errors.push('source is required');
  } else if (!Object.values(AI_SOURCES).includes(metric.source)) {
    errors.push(`source must be one of: ${Object.values(AI_SOURCES).join(', ')}`);
  }

  if (!metric.query) {
    errors.push('query is required');
  }

  if (typeof metric.brand_mentioned !== 'boolean') {
    errors.push('brand_mentioned must be a boolean');
  }

  // Optional but validated fields
  if (metric.citation_type !== undefined && metric.citation_type !== null) {
    if (!Object.values(CITATION_TYPES).includes(metric.citation_type)) {
      errors.push(`citation_type must be one of: ${Object.values(CITATION_TYPES).filter(v => v !== null).join(', ')}`);
    }
  }

  if (metric.position !== undefined && metric.position !== null) {
    if (typeof metric.position !== 'number' || metric.position < 1) {
      errors.push('position must be a positive number');
    }
  }

  if (metric.competitors_mentioned !== undefined) {
    if (!Array.isArray(metric.competitors_mentioned)) {
      errors.push('competitors_mentioned must be an array');
    }
  }

  if (metric.sentiment !== undefined) {
    if (!Object.values(SENTIMENT_TYPES).includes(metric.sentiment)) {
      errors.push(`sentiment must be one of: ${Object.values(SENTIMENT_TYPES).join(', ')}`);
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Creates a normalized GEO metric from raw data
 * @param {Object} rawData - Raw data from GEO tool export
 * @returns {GeoMetric}
 */
function createGeoMetric(rawData) {
  return {
    date: rawData.date || new Date().toISOString().split('T')[0],
    source: normalizeSource(rawData.source || rawData.platform),
    query: rawData.query || rawData.keyword || rawData.prompt || '',
    brand_mentioned: Boolean(rawData.brand_mentioned || rawData.mentioned || rawData.visibility),
    citation_type: normalizeCitationType(rawData.citation_type || rawData.mention_type),
    url_cited: rawData.url_cited || rawData.url || rawData.link || null,
    position: rawData.position ? parseInt(rawData.position, 10) : null,
    competitors_mentioned: parseCompetitors(rawData.competitors_mentioned || rawData.competitors),
    sentiment: normalizeSentiment(rawData.sentiment),
    raw_data: rawData
  };
}

/**
 * Normalize source name to standard format
 */
function normalizeSource(source) {
  if (!source) return AI_SOURCES.OTHER;

  const normalized = source.toLowerCase().trim();

  if (normalized.includes('chatgpt') || normalized.includes('openai')) {
    return AI_SOURCES.CHATGPT;
  }
  if (normalized.includes('claude') || normalized.includes('anthropic')) {
    return AI_SOURCES.CLAUDE;
  }
  if (normalized.includes('perplexity')) {
    return AI_SOURCES.PERPLEXITY;
  }
  if (normalized.includes('gemini') || normalized.includes('bard')) {
    return AI_SOURCES.GEMINI;
  }
  if (normalized.includes('ai overview') || normalized.includes('sge')) {
    return AI_SOURCES.AI_OVERVIEW;
  }
  if (normalized.includes('copilot') || normalized.includes('bing')) {
    return AI_SOURCES.COPILOT;
  }

  return AI_SOURCES.OTHER;
}

/**
 * Normalize citation type
 */
function normalizeCitationType(type) {
  if (!type) return CITATION_TYPES.NONE;

  const normalized = type.toLowerCase().trim();

  if (normalized.includes('recommend')) return CITATION_TYPES.RECOMMENDATION;
  if (normalized.includes('direct')) return CITATION_TYPES.DIRECT;
  if (normalized.includes('context')) return CITATION_TYPES.CONTEXTUAL;
  if (normalized.includes('compar')) return CITATION_TYPES.COMPARISON;

  return CITATION_TYPES.CONTEXTUAL;
}

/**
 * Normalize sentiment
 */
function normalizeSentiment(sentiment) {
  if (!sentiment) return SENTIMENT_TYPES.NEUTRAL;

  const normalized = sentiment.toLowerCase().trim();

  if (normalized.includes('positive') || normalized.includes('good')) {
    return SENTIMENT_TYPES.POSITIVE;
  }
  if (normalized.includes('negative') || normalized.includes('bad')) {
    return SENTIMENT_TYPES.NEGATIVE;
  }
  if (normalized.includes('mixed')) {
    return SENTIMENT_TYPES.MIXED;
  }

  return SENTIMENT_TYPES.NEUTRAL;
}

/**
 * Parse competitors from various formats
 */
function parseCompetitors(competitors) {
  if (!competitors) return [];
  if (Array.isArray(competitors)) return competitors;
  if (typeof competitors === 'string') {
    return competitors.split(/[,;|]/).map(c => c.trim()).filter(Boolean);
  }
  return [];
}

/**
 * Known competitors for WhimsyLabs in the virtual lab space
 */
const KNOWN_COMPETITORS = [
  'Labster',
  'PhET',
  'ChemCollective',
  'Late Nite Labs',
  'Beyond Labz',
  'CloudLabs',
  'Praxilabs',
  'Labby',
  'SimPad',
  'Virtulab'
];

/**
 * Brand terms to track
 */
const BRAND_TERMS = [
  'WhimsyLabs',
  'Whimsy Labs',
  'WhimsyCat',
  'whimsylabs.ai',
  'whimsylabs.io'
];

/**
 * Product/service terms to track
 */
const PRODUCT_TERMS = [
  'virtual laboratory software',
  'virtual science lab for schools',
  'AI tutor for STEM',
  'online chemistry lab',
  'virtual physics lab',
  'STEM education software',
  'interactive lab simulations',
  'virtual biology lab',
  'educational lab software',
  'AI science tutor'
];

module.exports = {
  AI_SOURCES,
  CITATION_TYPES,
  SENTIMENT_TYPES,
  KNOWN_COMPETITORS,
  BRAND_TERMS,
  PRODUCT_TERMS,
  validateGeoMetric,
  createGeoMetric,
  normalizeSource,
  normalizeCitationType,
  normalizeSentiment,
  parseCompetitors
};
