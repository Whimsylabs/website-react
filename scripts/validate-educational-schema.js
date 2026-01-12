/**
 * Educational Schema Validation
 * Validates Course and LearningResource schemas across all language versions
 */

const fs = require('fs');
const path = require('path');

// ANSI color codes for console output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

const buildDir = path.join(__dirname, '..', 'build');
let errorCount = 0;
let warningCount = 0;

console.log(`${colors.bold}${colors.blue}🎓 Validating Educational Schemas...${colors.reset}\n`);

/**
 * Extract schemas from HTML file
 */
function extractSchemas(filePath) {
  try {
    const html = fs.readFileSync(filePath, 'utf8');
    const schemas = [];
    const scriptRegex = /<script type="application\/ld\+json">(.*?)<\/script>/gs;
    let match;

    while ((match = scriptRegex.exec(html)) !== null) {
      try {
        const schema = JSON.parse(match[1]);
        schemas.push(schema);
      } catch (e) {
        // Skip invalid JSON
      }
    }

    return schemas;
  } catch (error) {
    return [];
  }
}

/**
 * Validate Course schema
 */
function validateCourseSchema(schema, language, filePath) {
  const errors = [];
  const warnings = [];

  // Required fields
  const requiredFields = ['name', 'description', 'provider', 'teaches', 'inLanguage'];
  requiredFields.forEach(field => {
    if (!schema[field]) {
      errors.push(`Missing required field: ${field}`);
    }
  });

  // Validate inLanguage matches expected language
  if (schema.inLanguage && schema.inLanguage !== language) {
    errors.push(`inLanguage mismatch: expected "${language}", got "${schema.inLanguage}"`);
  }

  // Validate teaches is an array with items
  if (schema.teaches && !Array.isArray(schema.teaches)) {
    errors.push('Field "teaches" must be an array');
  } else if (schema.teaches && schema.teaches.length === 0) {
    warnings.push('Field "teaches" is empty');
  }

  // Check for translation (name should not be English for non-English pages)
  if (language !== 'en' && schema.name && schema.name.includes('Interactive STEM Education')) {
    errors.push('Course name appears to be in English instead of translated');
  }

  // Check for Spanish translation markers
  if (language === 'es' && schema.name && !schema.name.includes('Educación')) {
    warnings.push('Spanish Course name may not be translated');
  }

  // Check for French translation markers
  if (language === 'fr' && schema.name && !schema.name.includes('Éducation')) {
    warnings.push('French Course name may not be translated');
  }

  // Check for German translation markers
  if (language === 'de' && schema.name && !schema.name.includes('Bildung')) {
    warnings.push('German Course name may not be translated');
  }

  // Check for Japanese translation markers
  if (language === 'ja' && schema.name && !schema.name.includes('教育')) {
    warnings.push('Japanese Course name may not be translated');
  }

  return { errors, warnings };
}

/**
 * Validate LearningResource schema
 */
function validateLearningResourceSchema(schema, language, filePath) {
  const errors = [];
  const warnings = [];

  // Required fields
  const requiredFields = ['name', 'description', 'url', 'educationalUse', 'inLanguage'];
  requiredFields.forEach(field => {
    if (!schema[field]) {
      errors.push(`Missing required field: ${field}`);
    }
  });

  // Validate inLanguage
  const expectedLang = language === 'en' ? 'en-GB' : language;
  if (schema.inLanguage && schema.inLanguage !== expectedLang) {
    errors.push(`inLanguage mismatch: expected "${expectedLang}", got "${schema.inLanguage}"`);
  }

  // Validate educationalUse is an array with items
  if (schema.educationalUse && !Array.isArray(schema.educationalUse)) {
    errors.push('Field "educationalUse" must be an array');
  } else if (schema.educationalUse && schema.educationalUse.length === 0) {
    warnings.push('Field "educationalUse" is empty');
  }

  // Check for translation of educationalUse
  if (schema.educationalUse && Array.isArray(schema.educationalUse)) {
    const firstItem = schema.educationalUse[0];

    // Check English has English values
    if (language === 'en' && firstItem && !firstItem.match(/^(Professional development|Self-study|Research|Teaching resource)$/)) {
      warnings.push('educationalUse may not be in English');
    }

    // Check Spanish has Spanish values
    if (language === 'es' && firstItem && !firstItem.match(/^(Desarrollo profesional|Autoestudio|Investigación|Recurso didáctico)$/)) {
      errors.push('educationalUse appears to be in English instead of Spanish');
    }

    // Check French has French values
    if (language === 'fr' && firstItem && !firstItem.match(/^(Développement professionnel|Auto-apprentissage|Recherche|Ressource pédagogique)$/)) {
      errors.push('educationalUse appears to be in English instead of French');
    }

    // Check German has German values
    if (language === 'de' && firstItem && !firstItem.match(/^(Berufliche Entwicklung|Selbststudium|Forschung|Lehrmittel)$/)) {
      errors.push('educationalUse appears to be in English instead of German');
    }

    // Check Japanese has Japanese values
    if (language === 'ja' && firstItem && !firstItem.match(/^(専門能力開発|自己学習|研究|教育リソース)$/)) {
      errors.push('educationalUse appears to be in English instead of Japanese');
    }
  }

  return { errors, warnings };
}

/**
 * Validate homepage files
 */
function validateHomepages() {
  console.log(`${colors.bold}Validating Course schemas on homepages...${colors.reset}`);

  const homepages = [
    { path: 'index.html', language: 'en' },
    { path: 'es/index.html', language: 'es' },
    { path: 'fr/index.html', language: 'fr' },
    { path: 'de/index.html', language: 'de' },
    { path: 'jp/index.html', language: 'ja' }
  ];

  homepages.forEach(({ path: htmlPath, language }) => {
    const filePath = path.join(buildDir, htmlPath);

    if (!fs.existsSync(filePath)) {
      console.log(`${colors.yellow}⚠️  ${htmlPath}: File not found${colors.reset}`);
      warningCount++;
      return;
    }

    const schemas = extractSchemas(filePath);
    const courseSchema = schemas.find(s => s['@type'] === 'Course');

    if (!courseSchema) {
      console.log(`${colors.red}❌ ${htmlPath}: Missing Course schema${colors.reset}`);
      errorCount++;
      return;
    }

    const { errors, warnings } = validateCourseSchema(courseSchema, language, htmlPath);

    if (errors.length > 0) {
      console.log(`${colors.red}❌ ${htmlPath}:${colors.reset}`);
      errors.forEach(error => {
        console.log(`   ${colors.red}ERROR: ${error}${colors.reset}`);
        errorCount++;
      });
    }

    if (warnings.length > 0) {
      warnings.forEach(warning => {
        console.log(`${colors.yellow}⚠️  ${htmlPath}: ${warning}${colors.reset}`);
        warningCount++;
      });
    }

    if (errors.length === 0 && warnings.length === 0) {
      console.log(`${colors.green}✓ ${htmlPath}${colors.reset}`);
    }
  });

  console.log('');
}

/**
 * Validate blog post files
 */
function validateBlogPosts() {
  console.log(`${colors.bold}Validating LearningResource schemas on blog posts...${colors.reset}`);

  const languages = [
    { prefix: '', language: 'en' },
    { prefix: 'es', language: 'es' },
    { prefix: 'fr', language: 'fr' },
    { prefix: 'de', language: 'de' },
    { prefix: 'jp', language: 'ja' }
  ];

  let blogPostsChecked = 0;
  let blogPostsValid = 0;

  languages.forEach(({ prefix, language }) => {
    const blogDir = prefix ? path.join(buildDir, prefix, 'blog') : path.join(buildDir, 'blog');

    if (!fs.existsSync(blogDir)) {
      return;
    }

    const posts = fs.readdirSync(blogDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    posts.forEach(postSlug => {
      const htmlPath = prefix
        ? path.join(prefix, 'blog', postSlug, 'index.html')
        : path.join('blog', postSlug, 'index.html');
      const filePath = path.join(buildDir, htmlPath);

      if (!fs.existsSync(filePath)) {
        return;
      }

      blogPostsChecked++;

      const schemas = extractSchemas(filePath);
      const learningResourceSchema = schemas.find(s => s['@type'] === 'LearningResource');

      if (!learningResourceSchema) {
        console.log(`${colors.red}❌ ${htmlPath}: Missing LearningResource schema${colors.reset}`);
        errorCount++;
        return;
      }

      const { errors, warnings } = validateLearningResourceSchema(learningResourceSchema, language, htmlPath);

      if (errors.length > 0) {
        console.log(`${colors.red}❌ ${htmlPath}:${colors.reset}`);
        errors.forEach(error => {
          console.log(`   ${colors.red}ERROR: ${error}${colors.reset}`);
          errorCount++;
        });
      }

      if (warnings.length > 0) {
        warnings.forEach(warning => {
          console.log(`${colors.yellow}⚠️  ${htmlPath}: ${warning}${colors.reset}`);
          warningCount++;
        });
      }

      if (errors.length === 0 && warnings.length === 0) {
        blogPostsValid++;
      }
    });
  });

  console.log(`${colors.green}✓ ${blogPostsValid}/${blogPostsChecked} blog posts have valid LearningResource schemas${colors.reset}`);
  console.log('');
}

// Run validations
validateHomepages();
validateBlogPosts();

// Summary
console.log(`${colors.bold}📊 Summary:${colors.reset}`);
if (errorCount === 0 && warningCount === 0) {
  console.log(`${colors.green}${colors.bold}✅ All educational schemas are valid!${colors.reset}\n`);
  process.exit(0);
} else {
  console.log(`${colors.red}❌ ${errorCount} errors${colors.reset}`);
  console.log(`${colors.yellow}⚠️  ${warningCount} warnings${colors.reset}\n`);

  if (errorCount > 0) {
    console.log(`${colors.red}💡 Fix these errors to ensure proper educational schema markup.${colors.reset}\n`);
    process.exit(1);
  } else {
    console.log(`${colors.yellow}💡 Review warnings to improve educational schema quality.${colors.reset}\n`);
    process.exit(0);
  }
}
