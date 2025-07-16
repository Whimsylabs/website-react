# WhimsyLabs Website

This is the official website for WhimsyLabs, a company that provides virtual laboratory simulations for educational purposes. The website showcases the company's products, services, blog, and contact information.

## Project Overview

WhimsyLabs offers award-winning virtual labs for Biology, Chemistry, Physics, and more. This website serves as the primary online presence for the company, highlighting its innovative approach to STEM education through virtual simulations.

## Key Features

- **Interactive Design**: Animated elements including bubbles, waves, and text effects
- **Responsive Layout**: Optimized for all device sizes
- **Blog System**: Dynamic blog with multiple posts
- **Service Showcase**: Information about custom simulation development
- **Partner Showcase**: Display of educational and business partners

## Technology Stack

- React.js
- React Router for navigation
- CSS3 with animations and responsive design
- GitHub Pages for deployment

## Development Setup

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/whimsylabs-website.git
   cd whimsylabs-website
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the development server
   ```
   npm start
   ```

The app will run in development mode at [http://localhost:3000](http://localhost:3000).

## SEO and Search Engine Optimization

This website includes automated SEO functionality to ensure search engines can discover and index all content effectively.

### SEO Script Usage

The `scripts/generate-seo.js` script automatically:
- Scans the static build output for all HTML files
- Generates `sitemap.xml` with all discoverable pages
- Generates `robots.txt` allowing crawlers and referencing the sitemap
- Runs automatically after each build via the `postbuild` npm script

#### Manual SEO Generation

To manually run the SEO generation:

```bash
# Ensure you have built the site first
npm run build

# Run SEO generation
node scripts/generate-seo.js
```

#### Configuration

Edit the configuration at the top of `scripts/generate-seo.js` to customize:

- **Site URL**: Change `siteUrl` to match your domain
- **Output Directory**: Modify `outputDir` if using a different build folder
- **Crawl Settings**: Adjust `crawlDelay` and route priorities
- **Route Configuration**: Add/modify main routes and their SEO settings

Example configuration:

```javascript
const CONFIG = {
  siteUrl: 'https://your-domain.com',
  outputDir: 'build',
  crawlDelay: 1,
  mainRoutes: [
    { path: '/', changefreq: 'daily', priority: '1.0' },
    { path: '/about', changefreq: 'weekly', priority: '0.8' }
  ]
};
```

### SEO Meta Tags and Best Practices

#### Required Meta Tags

Each page should include these essential SEO meta tags in the `<head>` section:

```html
<!-- Page Title -->
<title>Page Title - Your Site Name</title>

<!-- Meta Description -->
<meta name="description" content="Brief description of the page content (150-160 characters)">

<!-- Open Graph Tags for Social Media -->
<meta property="og:title" content="Page Title">
<meta property="og:description" content="Page description for social sharing">
<meta property="og:url" content="https://your-domain.com/page-path">
<meta property="og:type" content="website">
<meta property="og:image" content="https://your-domain.com/social-image.jpg">

<!-- Twitter Card Tags -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Page Title">
<meta name="twitter:description" content="Page description">
<meta name="twitter:image" content="https://your-domain.com/social-image.jpg">

<!-- Canonical URL -->
<link rel="canonical" href="https://your-domain.com/page-path">
```

#### Integrating SEO Meta Tags in React

For React components, use React Helmet to dynamically set meta tags:

```jsx
import { Helmet } from 'react-helmet-async';

function MyPage() {
  return (
    <>
      <Helmet>
        <title>Page Title - WhimsyLabs</title>
        <meta name="description" content="Page description here" />
        <meta property="og:title" content="Page Title" />
        <meta property="og:description" content="Page description here" />
        <meta property="og:url" content="https://whimsylabs.ai/page-path" />
        <link rel="canonical" href="https://whimsylabs.ai/page-path" />
      </Helmet>
      <div>
        {/* Page content */}
      </div>
    </>
  );
}
```

#### Blog Post SEO

For blog posts, include additional structured data:

```html
<!-- Article specific meta tags -->
<meta property="og:type" content="article">
<meta property="article:published_time" content="2025-01-01T00:00:00Z">
<meta property="article:author" content="Author Name">
<meta property="article:section" content="Education">

<!-- JSON-LD Structured Data -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Article Title",
  "description": "Article description",
  "author": {
    "@type": "Person",
    "name": "Author Name"
  },
  "datePublished": "2025-01-01",
  "publisher": {
    "@type": "Organization",
    "name": "WhimsyLabs"
  }
}
</script>
```

### Verifying SEO Implementation

After deployment, verify your SEO setup:

#### 1. Google Search Console

1. Add your site to [Google Search Console](https://search.google.com/search-console)
2. Submit your sitemap: `https://your-domain.com/sitemap.xml`
3. Monitor indexing status and search performance

#### 2. SEO Testing Tools

Use these tools to verify your implementation:

- **Google Rich Results Test**: Test structured data
- **Facebook Sharing Debugger**: Test Open Graph tags  
- **Twitter Card Validator**: Test Twitter meta tags
- **Lighthouse**: Comprehensive SEO audit
- **Screaming Frog**: Crawl your site like a search engine

#### 3. Manual Verification

Check these URLs are accessible:
- `https://your-domain.com/sitemap.xml`
- `https://your-domain.com/robots.txt`

#### 4. SEO Crawler Testing

Use crawlers to verify discoverability:

```bash
# Install and use screaming frog or similar tools
# Check that all important pages are discoverable
# Verify meta tags are properly set
# Ensure no broken internal links
```

### GitHub Pages Deployment

This SEO setup is fully compatible with GitHub Pages:

1. The `postbuild` script automatically generates SEO files
2. Files are placed in the build directory for deployment
3. No server-side configuration required
4. Works with custom domains and HTTPS

### Troubleshooting

**Sitemap not generating**: Ensure you've run `npm run build` first

**Missing pages in sitemap**: Check that HTML files exist in the build directory

**Robots.txt issues**: Verify the configuration in `scripts/generate-seo.js`

**Search engines not crawling**: Check robots.txt allows your content and submit sitemap to search consoles

## Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run deploy`: Deploys the built app to GitHub Pages

## Deployment

The website is deployed on GitHub Pages. To deploy updates:

1. Make your changes and test them locally
2. Run `npm run deploy` to build and deploy to GitHub Pages
3. The site will be available at [https://whimsylabs.ai](https://whimsylabs.ai)

### Multi-Page Application Structure

This website uses a hybrid approach that combines React with static HTML generation:

- Each main route (`/`, `/blog`, `/services`, `/features`) has its own HTML file
- The `generate-html-pages.js` script creates these files during the build process
- This approach improves SEO and allows direct access to URLs like [https://whimsylabs.ai/blog](https://whimsylabs.ai/blog)

For more details on how this works, see [MPA-CONVERSION.md](MPA-CONVERSION.md).

## Project Structure

- `src/Components/`: React components for the website
- `src/Components/blog/`: Blog post components
- `src/Components/images/`: Image assets
- `src/Components/videos/`: Video assets
- `public/`: Static assets and HTML template

## Design Guidelines

- **Color Palette**: Purple (#1f1968), light blue (#95CEF6), and lavender (#dabeff)
- **Typography**: Primarily uses Poppins font family
- **Animations**: Subtle animations for enhanced user experience
- **Component Structure**: Each component has its own CSS file for maintainability

## Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add some amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## License

Proprietary - All rights reserved by WhimsyLabs.
