const fs = require('fs-extra');
const path = require('path');
const ejs = require('ejs');
const { glob } = require('glob');
const grayMatter = require('gray-matter');
const chokidar = require('chokidar');

// Configuration
const config = {
    templatesDir: './templates',
    contentDir: './content',
    staticDir: './src/Components',
    distDir: './dist',
    watch: process.argv.includes('--watch'),
    siteUrl: 'https://whimsylabs.ai',
    siteName: 'WhimsyLabs',
    siteDescription: 'WhimsyLabs provides award-winning virtual laboratory software for science education'
};

// Site data
const siteData = {
    title: config.siteName,
    description: config.siteDescription,
    url: config.siteUrl,
    author: 'WhimsyLabs Team',
    year: new Date().getFullYear()
};

// Page metadata
const pageMetadata = {
    '/': {
        title: 'WhimsyLabs - Award-Winning Virtual Lab Software for STEM Education',
        description: 'WhimsyLabs provides interactive virtual lab software for Biology, Chemistry, and Physics. Our online lab simulations enhance STEM education in schools across the EU.',
        keywords: 'virtual lab software, online lab simulations, STEM virtual labs for schools, science education technology'
    },
    '/blog': {
        title: 'WhimsyLabs Blog - Latest Virtual Laboratory Innovations & Teaching Resources',
        description: 'Stay updated with WhimsyLabs\' latest developments in virtual laboratory technology, teaching strategies, and STEM education resources for educators.',
        keywords: 'virtual laboratory technology, STEM education resources, science teaching tools, online lab teaching'
    },
    '/services': {
        title: 'WhimsyLabs Services - Custom Virtual Lab Solutions for Education & Industry',
        description: 'Discover WhimsyLabs\' customizable virtual lab solutions for enhancing science education through AI-driven simulations, remote learning, and interactive experiments.',
        keywords: 'custom virtual labs, educational simulations, STEM lab development, virtual lab consulting'
    },
    '/features': {
        title: 'WhimsyLabs Features - Cutting-Edge Virtual Laboratory Technology',
        description: 'Explore WhimsyLabs\' powerful features including realistic physics simulations, AI-driven assessment, cross-platform accessibility, and immersive STEM experiments.',
        keywords: 'virtual lab features, physics simulations, AI assessment, cross-platform labs'
    },
    '/faq': {
        title: 'Frequently Asked Questions | WhimsyLabs Virtual Lab Software',
        description: 'Get answers to common questions about WhimsyLabs virtual lab software, online lab simulations, and how our STEM virtual labs help students and educators.',
        keywords: 'virtual lab FAQ, lab software questions, STEM education help'
    },
    '/contact': {
        title: 'Contact Us | WhimsyLabs Virtual Lab Software',
        description: 'Get in touch with WhimsyLabs to request a trial for your school or ask questions about our virtual lab software for STEM education.',
        keywords: 'contact WhimsyLabs, virtual lab trial, STEM education contact'
    }
};

// Clean and create dist directory
async function setupDist() {
    await fs.remove(config.distDir);
    await fs.ensureDir(config.distDir);
    console.log('✅ Cleaned and created dist directory');
}

// Copy static assets
async function copyAssets() {
    try {
        // Copy assets from multiple directories
        const assetSources = ['./public', './src', './Old images'];
        for (const source of assetSources) {
            if (await fs.pathExists(source)) {
                await fs.copy(source, `${config.distDir}/static`, {
                    filter: (src) => {
                        return src.endsWith('.css') || 
                               src.endsWith('.js') || 
                               src.endsWith('.png') || 
                               src.endsWith('.jpg') || 
                               src.endsWith('.webp') || 
                               src.endsWith('.svg');
                    }
                });
            }
        }
        
        // Copy React build files
        const reactBuildDir = './build/static/js';
        const reactDistDir = `${config.distDir}/static/js`;
        if (await fs.pathExists(reactBuildDir)) {
            await fs.copy(reactBuildDir, reactDistDir);
            console.log('✅ Copied React build files');
        } else {
            console.warn('⚠️ React build files not found');
        }
        
        console.log('✅ Copied static assets');
    } catch (error) {
        console.error('❌ Error copying assets:', error);
    }
}

// Convert React blog posts to markdown
async function convertBlogPosts() {
    const blogDir = './src/Components/blog';
    const outputDir = './content/blog';
    
    await fs.ensureDir(outputDir);
    
    const files = await fs.readdir(blogDir);
    const postFiles = files.filter(file => /^Post\d+\.js$/.test(file));
    
    for (const file of postFiles) {
        const filePath = path.join(blogDir, file);
        const content = await fs.readFile(filePath, 'utf8');
        
        // Extract metadata using regex
        const titleMatch = content.match(/export const title = ["'](.+?)["'];/);
        const dateMatch = content.match(/export const date = ["'](.+?)["'];/);
        const slugMatch = content.match(/export const slug = ["'](.+?)["'];/);
        const descriptionMatch = content.match(/export const description =\s*["'](.+?)["'];/);
        
        if (titleMatch && dateMatch && slugMatch && descriptionMatch) {
            // Extract JSX content (simplified)
            const contentMatch = content.match(/export const content = \(\s*<div[^>]*>([\s\S]*?)<\/div>\s*\);/);
            
            let markdownContent = '';
            if (contentMatch) {
                // Enhanced JSX to HTML conversion
                markdownContent = contentMatch[1]
                    .replace(/<h1[^>]*>/g, '<h1>')
                    .replace(/<h2[^>]*>/g, '<h2>')
                    .replace(/<h3[^>]*>/g, '<h3>')
                    .replace(/<p[^>]*>/g, '<p>')
                    .replace(/<div[^>]*>/g, '<div>')
                    .replace(/<span[^>]*>/g, '<span>')
                    .replace(/<img[^>]*src=['"]([^'"]+)['"][^>]*>/g, '<img src="$1">')
                    .replace(/\s*className=['"][^'"]*['"]/g, '')
                    .replace(/\s{3,}/g, ' ')
                    .trim();
            }
            
            const frontMatter = `---
title: "${titleMatch[1]}"
date: "${dateMatch[1]}"
slug: "${slugMatch[1]}"
description: "${descriptionMatch[1]}"
---

${markdownContent}
`;
            
            const outputFile = path.join(outputDir, `${slugMatch[1]}.md`);
            await fs.writeFile(outputFile, frontMatter);
        }
    }
    
    console.log('✅ Converted blog posts to markdown');
}

// Get blog posts
async function getBlogPosts() {
    const posts = [];
    const blogFiles = await glob('./content/blog/*.md');
    
    for (const file of blogFiles) {
        const content = await fs.readFile(file, 'utf8');
        const { data, content: markdownContent } = grayMatter(content);
        
        posts.push({
            ...data,
            content: markdownContent,
            path: `/blog/${data.slug}`
        });
    }
    
    return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Render page with layout
async function renderPage(templatePath, data = {}) {
    try {
        const pageContent = await ejs.renderFile(templatePath, data);
        
        const layoutData = {
            ...siteData,
            ...data,
            content: pageContent
        };
        
        // Ensure redirection script is added to the head section
        const redirectionScript = `<script>
            if (window.location.pathname === '/') {
                window.location.href = '/spa/index.html';
            }
        </script>`;
        layoutData.headContent = layoutData.headContent ? layoutData.headContent + redirectionScript : redirectionScript;
        
        return await ejs.renderFile('./templates/layouts/base.ejs', layoutData);
    } catch (error) {
        console.error(`❌ Error rendering ${templatePath}:`, error);
        throw error;
    }
}

// Generate individual pages
async function generatePages() {
    const pages = [
        { path: '/', template: 'home', output: 'index.html' },
        { path: '/blog', template: 'blog', output: 'blog/index.html' },
        { path: '/services', template: 'services', output: 'services/index.html' },
        { path: '/features', template: 'features', output: 'features/index.html' },
        { path: '/faq', template: 'faq', output: 'faq/index.html' },
        { path: '/contact', template: 'contact', output: 'contact/index.html' }
    ];
    
    for (const page of pages) {
        const metadata = pageMetadata[page.path] || {};
        const templatePath = `./templates/pages/${page.template}.ejs`;
        
        // Check if template exists, if not create a basic one
        if (!await fs.pathExists(templatePath)) {
            await createBasicPageTemplate(page.template, page.path);
        }
        
        const data = {
            ...metadata,
            currentPath: page.path,
            url: page.path,
            site: siteData
        };
        
        const html = await renderPage(templatePath, data);
        const outputPath = `${config.distDir}/${page.output}`;
        
        await fs.ensureDir(path.dirname(outputPath));
        await fs.writeFile(outputPath, html);
        
        console.log(`✅ Generated ${page.output}`);
    }
}

// Generate blog post pages
async function generateBlogPages() {
    const posts = await getBlogPosts();
    
    // Generate individual blog post pages
    for (const post of posts) {
        const data = {
            ...post,
            title: `${post.title} | WhimsyLabs Blog`,
            currentPath: post.path,
            url: post.path,
            ogType: 'article',
            keywords: post.keywords || '',
            site: siteData,
            posts: posts // For navigation
        };
        
        const templatePath = './templates/pages/blog-post.ejs';
        if (!await fs.pathExists(templatePath)) {
            await createBasicBlogPostTemplate();
        }
        
        const html = await renderPage(templatePath, data);
        const outputPath = `${config.distDir}/blog/${post.slug}/index.html`;
        
        await fs.ensureDir(path.dirname(outputPath));
        await fs.writeFile(outputPath, html);
        
        console.log(`✅ Generated blog/${post.slug}/index.html`);
    }
    
    // Add posts to blog page data for the next build
    return posts;
}

// Generate spa/index.html
async function generateSpaIndex() {
    const spaContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>React SPA - WhimsyLabs</title>
    <link rel="stylesheet" href="/static/css/main.css">
</head>
<body>
    <div id="root"></div>
    <script src="/static/js/main.js"></script>
</body>
</html>`;
    await fs.ensureDir(`${config.distDir}/spa`);
    await fs.writeFile(`${config.distDir}/spa/index.html`, spaContent);
}

// Generate sitemap
async function generateSitemap() {
    const posts = await getBlogPosts();
    
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // Add main pages
    const mainPages = ['/', '/blog', '/services', '/features', '/faq', '/contact'];
    for (const page of mainPages) {
        sitemap += `
    <url>
        <loc>${config.siteUrl}${page}</loc>
        <changefreq>weekly</changefreq>
        <priority>${page === '/' ? '1.0' : '0.8'}</priority>
    </url>`;
    }
    
    // Add blog posts
    for (const post of posts) {
        const lastmod = new Date(post.date).toISOString().split('T')[0];
        sitemap += `
    <url>
        <loc>${config.siteUrl}/blog/${post.slug}</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>`;
    }
    
    sitemap += `
</urlset>`;

    await fs.writeFile(`${config.distDir}/sitemap.xml`, sitemap);
    console.log('✅ Generated sitemap.xml');
}

// Generate 404.html
async function generate404Page() {
    const notFoundContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 - Page Not Found</title>
    <link rel="stylesheet" href="/static/css/main.css">
</head>
<body>
    <div class="container text-center">
        <h1>404 - Page Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
        <a href="/" class="btn btn-primary">Go to Home</a>
    </div>
</body>
</html>`;
    await fs.writeFile(`${config.distDir}/404.html`, notFoundContent);
}

// Main build function
async function build() {
    try {
        console.log('🚀 Starting static site generation...');
        
        await setupDist();
        await copyAssets();
        await convertBlogPosts();
        await generatePages();
        await generateBlogPages();
        await generateSpaIndex();
        await generateSitemap();
        await generate404Page();
        
        console.log('✅ Static site generation complete!');
    } catch (error) {
        console.error('❌ Build failed:', error);
        process.exit(1);
    }
}

// Watch mode
function startWatcher() {
    console.log('👀 Watching for changes...');
    
    const watcher = chokidar.watch([
        './templates/**/*',
        './content/**/*',
        './src/**/*.css',
        './src/**/*.js'
    ], {
        ignored: /node_modules/,
        persistent: true
    });
    
    watcher.on('change', async (path) => {
        console.log(`📝 File changed: ${path}`);
        await build();
    });
}

// Run build
if (require.main === module) {
    build().then(() => {
        if (config.watch) {
            startWatcher();
        }
    });
}

module.exports = { build, config };
