const fs = require('fs').promises;
const path = require('path');
const glob = require('glob');

class MetaTagValidator {
  constructor(buildPath) {
    this.buildPath = buildPath;
    this.errors = [];
    this.warnings = [];
  }

  async validateAllFiles() {
    console.log('🔍 Validating meta tags in build files...');
    
    const htmlFiles = glob.sync('**/*.html', { 
      cwd: this.buildPath,
      absolute: true 
    });

    console.log(`📄 Found ${htmlFiles.length} HTML files to validate`);

    for (const filePath of htmlFiles) {
      await this.validateFile(filePath);
    }

    this.printReport();
    return this.errors.length === 0;
  }

  async validateFile(filePath) {
    try {
      const content = await fs.readFile(filePath, 'utf8');
      const relativePath = path.relative(this.buildPath, filePath);

      // Check for duplicate meta descriptions
      const metaDescriptions = content.match(/<meta[^>]+name=['"]description['"][^>]*>/gi) || [];
      if (metaDescriptions.length > 1) {
        this.errors.push({
          type: 'duplicate_meta_description',
          file: relativePath,
          count: metaDescriptions.length,
          tags: metaDescriptions
        });
      }
      // Check for duplicate viewport tags
      const metaViewports = content.match(/<meta[^>]+name=['"']viewport['"'][^>]*>/gi) || [];
      if (metaViewports.length > 1) {
        this.errors.push({
          type: 'duplicate_meta_viewport',
          file: relativePath,
          count: metaViewports.length,
          tags: metaViewports
        });
      }

      // Check for duplicate hreflang tags (same lang attribute)
      const hreflangs = content.match(/<link[^>]+rel=['"']alternate['"'][^>]+hreflang=['"'][^'"]+['"'][^>]*>/gi) || [];
      const hreflangLangs = {};
      hreflangs.forEach(tag => {
        const langMatch = tag.match(/hreflang=['"']([^'"]+)['"]/);
        if (langMatch) {
          const lang = langMatch[1];
          if (!hreflangLangs[lang]) hreflangLangs[lang] = [];
          hreflangLangs[lang].push(tag);
        }
      });
      Object.keys(hreflangLangs).forEach(lang => {
        if (hreflangLangs[lang].length > 1) {
          this.errors.push({
            type: 'duplicate_hreflang',
            file: relativePath,
            language: lang,
            count: hreflangLangs[lang].length,
            tags: hreflangLangs[lang]
          });
        }
      });
      // Check for duplicate meta keywords (also bad practice)
      const metaKeywords = content.match(/<meta[^>]+name=['"]keywords['"][^>]*>/gi) || [];
      if (metaKeywords.length > 1) {
        this.warnings.push({
          type: 'duplicate_meta_keywords',
          file: relativePath,
          count: metaKeywords.length
        });
      }

      // Check for duplicate title tags
      const titleTags = content.match(/<title[^>]*>.*?<\/title>/gi) || [];
      if (titleTags.length > 1) {
        this.errors.push({
          type: 'duplicate_title',
          file: relativePath,
          count: titleTags.length,
          tags: titleTags
        });
      }

    } catch (error) {
      console.error(`❌ Error reading ${filePath}:`, error.message);
    }
  }

  printReport() {
    console.log('\n📊 Meta Tag Validation Report');
    console.log('==============================');

    if (this.errors.length === 0 && this.warnings.length === 0) {
      console.log('✅ All meta tags are valid!');
      return;
    }

    if (this.errors.length > 0) {
      console.log('\n❌ ERRORS:');
      this.errors.forEach(error => {
        switch (error.type) {
          case 'duplicate_meta_description':
            console.log(`   ${error.file}: ${error.count} meta description tags found`);
            error.tags.forEach((tag, index) => {
              console.log(`     ${index + 1}. ${tag}`);
            });
            break;
          case 'duplicate_meta_viewport':
            console.log(`   ${error.file}: ${error.count} meta viewport tags found`);
            error.tags.forEach((tag, index) => {
              console.log(`     ${index + 1}. ${tag}`);
            });
            break;
          case 'duplicate_hreflang':
            console.log(`   ${error.file}: ${error.count} hreflang tags for '${error.language}' found`);
            error.tags.forEach((tag, index) => {
              console.log(`     ${index + 1}. ${tag}`);
            });
            break;
          case 'duplicate_title':
            console.log(`   ${error.file}: ${error.count} title tags found`);
            error.tags.forEach((tag, index) => {
              console.log(`     ${index + 1}. ${tag}`);
            });
            break;
        }
      });
    }

    if (this.warnings.length > 0) {
      console.log('\n⚠️  WARNINGS:');
      this.warnings.forEach(warning => {
        if (warning.type === 'duplicate_meta_keywords') {
          console.log(`   ${warning.file}: ${warning.count} meta keywords tags found`);
        }
      });
    }

    console.log(`\n🔢 Summary: ${this.errors.length} errors, ${this.warnings.length} warnings`);
  }
}

// Run validation
async function main() {
  const buildPath = path.join(__dirname, '../build');
  const validator = new MetaTagValidator(buildPath);
  
  const isValid = await validator.validateAllFiles();
  
  if (!isValid) {
    console.log('\n💡 Fix these issues to improve SEO compliance.');
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = MetaTagValidator;