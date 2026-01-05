const fs = require('fs').promises;
const path = require('path');
const glob = require('glob');

class TitleLengthValidator {
  constructor(buildPath) {
    this.buildPath = buildPath;
    this.errors = [];
    this.warnings = [];
    this.maxTitleLength = 70;
  }

  async validateAllFiles() {
    console.log('📏 Validating title lengths in build files...');
    
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

      // Extract title content
      const titleMatch = content.match(/<title[^>]*>(.*?)<\/title>/i);
      if (titleMatch) {
        const titleText = titleMatch[1].trim();
        const titleLength = titleText.length;

        if (titleLength > this.maxTitleLength) {
          this.errors.push({
            type: 'title_too_long',
            file: relativePath,
            title: titleText,
            length: titleLength,
            excess: titleLength - this.maxTitleLength
          });
        }

        // Also check for very short titles (less than 30 characters)
        if (titleLength < 30) {
          this.warnings.push({
            type: 'title_too_short',
            file: relativePath,
            title: titleText,
            length: titleLength
          });
        }
      } else {
        // Missing title tag
        this.errors.push({
          type: 'missing_title',
          file: relativePath
        });
      }

    } catch (error) {
      console.error(`❌ Error reading ${filePath}:`, error.message);
    }
  }

  printReport() {
    console.log('\n📊 Title Length Validation Report');
    console.log('==================================');

    if (this.errors.length === 0 && this.warnings.length === 0) {
      console.log('✅ All title lengths are optimal!');
      return;
    }

    if (this.errors.length > 0) {
      console.log('\n❌ ERRORS (Titles > 70 characters):');
      this.errors.forEach(error => {
        switch (error.type) {
          case 'title_too_long':
            console.log(`   ${error.file}: ${error.length} chars (+${error.excess} over limit)`);
            console.log(`     "${error.title}"`);
            break;
          case 'missing_title':
            console.log(`   ${error.file}: Missing title tag`);
            break;
        }
      });
    }

    if (this.warnings.length > 0) {
      console.log('\n⚠️  WARNINGS:');
      this.warnings.forEach(warning => {
        switch (warning.type) {
          case 'title_too_short':
            console.log(`   ${warning.file}: ${warning.length} chars (may be too short)`);
            console.log(`     "${warning.title}"`);
            break;
        }
      });
    }

    console.log(`\n🔢 Summary: ${this.errors.length} errors, ${this.warnings.length} warnings`);
    console.log(`📏 Recommendation: Keep titles between 30-70 characters for optimal SEO`);
  }
}

// Run validation
async function main() {
  const buildPath = path.join(__dirname, '../build');
  const validator = new TitleLengthValidator(buildPath);
  
  const isValid = await validator.validateAllFiles();
  
  if (!isValid) {
    console.log('\n💡 Fix these title length issues to improve SEO compliance.');
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = TitleLengthValidator;