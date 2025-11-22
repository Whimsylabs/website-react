#!/usr/bin/env node

/**
 * Script to generate the complete blog translation file structure
 */

const fs = require('fs-extra');
const path = require('path');

/**
 * Dynamically discover all blog posts from components
 */
async function discoverBlogPosts() {
  const fs = require('fs-extra');
  const path = require('path');
  
  const blogComponentsDir = path.join(__dirname, '..', 'src', 'Components', 'blog');
  const posts = [];
  
  try {
    const files = await fs.readdir(blogComponentsDir);
    
    // Filter for Post*.js files and extract metadata
    for (const file of files) {
      if (file.match(/^Post\d+\.js$/)) {
        const postNumber = file.match(/Post(\d+)\.js$/)[1];
        const postId = `post${postNumber}`;
        const filePath = path.join(blogComponentsDir, file);
        
        try {
          // Read file as text and extract metadata using regex
          const fileContent = await fs.readFile(filePath, 'utf8');
          
          const titleMatch = fileContent.match(/export const title\s*=\s*["'`](.*?)["'`];/s);
          const slugMatch = fileContent.match(/export const slug\s*=\s*["'`](.*?)["'`];/s);
          const descriptionMatch = fileContent.match(/export const description\s*=\s*["'`](.*?)["'`];/s);
          const dateMatch = fileContent.match(/export const date\s*=\s*["'`](.*?)["'`];/s);
          
          const title = titleMatch ? titleMatch[1] : null;
          const slug = slugMatch ? slugMatch[1] : null;
          const description = descriptionMatch ? descriptionMatch[1] : 'Blog post description';
          const date = dateMatch ? dateMatch[1] : null;
          
          if (slug && date && title) {
            posts.push({
              id: postId,
              slug: slug,
              titles: {
                en: title,
                de: `[DE] ${title}`, // Placeholder - needs translation
                fr: `[FR] ${title}`, // Placeholder - needs translation
                es: `[ES] ${title}`  // Placeholder - needs translation
              },
              descriptions: {
                en: description,
                de: `[DE] ${description}`, // Placeholder
                fr: `[FR] ${description}`, // Placeholder
                es: `[ES] ${description}`  // Placeholder
              }
            });
            
            console.log(`📝 Discovered ${postId}: ${title?.substring(0, 50)}...`);
          } else {
            console.warn(`⚠️ ${file} missing required exports (slug: ${!!slug}, date: ${!!date}, title: ${!!title})`);
          }
        } catch (error) {
          console.warn(`⚠️ Could not load ${file}:`, error.message);
        }
      }
    }
    
    // Sort posts by ID for consistent ordering
    posts.sort((a, b) => {
      const numA = parseInt(a.id.replace('post', ''));
      const numB = parseInt(b.id.replace('post', ''));
      return numA - numB;
    });
    
    console.log(`✅ Discovered ${posts.length} blog posts for translation structure generation`);
    return posts;
  } catch (error) {
    console.error('❌ Error discovering blog posts:', error);
    throw error;
  }
}

// Use dynamic discovery instead of hardcoded posts
let posts = [];

const languages = ['en', 'de', 'fr', 'es'];

async function generateBlogStructure() {
  console.log('🏗️  Generating blog translation structure...\n');
  
  // Dynamically discover all blog posts
  const posts = await discoverBlogPosts();
  
  for (const post of posts) {
    for (const lang of languages) {
      const postDir = `./src/i18n/blog/${post.id}`;
      const filePath = path.join(postDir, `${lang}.js`);
      
      // Create directory if it doesn't exist
      await fs.ensureDir(postDir);
      
      // Skip if file already exists
      if (await fs.pathExists(filePath)) {
        console.log(`⏭️  Skipping ${post.id}/${lang}.js (already exists)`);
        continue;
      }
      
      const langName = {
        en: 'English',
        de: 'German', 
        fr: 'French',
        es: 'Spanish'
      }[lang];
      
      const fileContent = `// ${langName} - ${post.id}: ${post.titles[lang]}
import React from "react";

export const title = "${post.titles[lang]}";
export const description = "${post.descriptions[lang]}";

// TODO: ${lang === 'en' ? 'Extract full content from src/Components/blog/Post*.js' : 'Translate full content'}
export const content = null;`;
      
      await fs.writeFile(filePath, fileContent);
      console.log(`✅ Created ${post.id}/${lang}.js`);
    }
  }
  
  console.log('\n🎉 Blog translation structure generated!');
  console.log('📁 Files created in: src/i18n/blog/post*/');
  console.log('🔍 Run "npm run validate-blog-translations" to check status');
}

generateBlogStructure().catch(error => {
  console.error('❌ Error generating blog structure:', error);
  process.exit(1);
});