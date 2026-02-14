#!/usr/bin/env node

/**
 * Validation script to ensure all blog translation files exist and are complete
 */

const fs = require('fs-extra');
const path = require('path');

async function validateBlogTranslations() {
  const blogDir = './src/i18n/blog';
  const languages = ['en', 'de', 'fr', 'es', 'ja'];
  const posts = ['post1', 'post2', 'post3', 'post4', 'post5', 'post6', 'post7', 'post8', 'post9', 'post10', 'post11', 'post12', 'post13', 'post14', 'post15'];
  
  console.log('🔍 Validating blog translations...\n');
  
  const results = {};
  
  for (const lang of languages) {
    results[lang] = {
      totalPosts: posts.length,
      existingFiles: 0,
      withContent: 0,
      missingFiles: [],
      contentStatus: {}
    };
    
    for (const post of posts) {
      const filePath = path.join(blogDir, post, `${lang}.js`);
      
      if (await fs.pathExists(filePath)) {
        results[lang].existingFiles++;
        
        const content = await fs.readFile(filePath, 'utf8');
        
        // Check if content exists (not null and not just a placeholder)
        const hasContent = !content.includes('export const content = null') && 
                          !content.includes('// TODO: Translate full content') &&
                          content.includes('export const content = (');
        
        if (hasContent) {
          results[lang].withContent++;
          results[lang].contentStatus[post] = '✅';
        } else {
          results[lang].contentStatus[post] = '📝';
        }
      } else {
        results[lang].missingFiles.push(post);
        results[lang].contentStatus[post] = '❌';
      }
    }
    
    const completionPercent = Math.round((results[lang].withContent / results[lang].totalPosts) * 100);
    const status = results[lang].withContent === results[lang].totalPosts ? '✅' : 
                   results[lang].existingFiles === results[lang].totalPosts ? '🔄' : '❌';
    
    console.log(`${status} ${lang.toUpperCase()}: ${results[lang].existingFiles}/${results[lang].totalPosts} files, ${results[lang].withContent} with content (${completionPercent}% complete)`);
    
    if (results[lang].missingFiles.length > 0) {
      console.log(`   Missing files: ${results[lang].missingFiles.join(', ')}`);
    }
  }
  
  // Detailed breakdown
  console.log('\n📋 Detailed Status by Post:');
  console.log('   Post    | EN | DE | FR | ES |');
  console.log('   --------|----|----|----|----|');
  
  for (const post of posts) {
    const row = `   ${post.padEnd(7)} |`;
    const statuses = languages.map(lang => 
      (results[lang].contentStatus[post] || '❌').padEnd(3)
    ).join('|');
    console.log(`${row} ${statuses}|`);
  }
  
  console.log('\n📊 Legend:');
  console.log('   ✅ = Full content translated');
  console.log('   📝 = File exists, content needs translation');
  console.log('   ❌ = File missing');
  
  // Summary
  console.log('\n🎯 Summary:');
  console.log(`   Total Posts: ${posts.length}`);
  console.log(`   Languages: ${languages.length}`);
  console.log(`   Translation files: src/i18n/blog/post*/`);
  
  const totalPossible = posts.length * languages.length;
  const totalWithContent = Object.values(results).reduce((sum, lang) => sum + lang.withContent, 0);
  const overallPercent = Math.round((totalWithContent / totalPossible) * 100);
  
  console.log(`   Overall completion: ${totalWithContent}/${totalPossible} (${overallPercent}%)`);
}

validateBlogTranslations().catch(error => {
  console.error('❌ Error validating blog translations:', error);
  process.exit(1);
});