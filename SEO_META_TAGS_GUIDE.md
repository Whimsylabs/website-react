# SEO Meta Tag Template and Examples

## Complete SEO Meta Tag Template

Copy this template and customize it for each page:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Basic Meta Tags -->
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  
  <!-- Page Title (50-60 characters) -->
  <title>Your Page Title - WhimsyLabs Virtual Laboratory</title>
  
  <!-- Meta Description (150-160 characters) -->
  <meta name="description" content="Brief description of your page content that will appear in search results. Keep it under 160 characters for best display." />
  
  <!-- Keywords (Optional - modern SEO doesn't rely heavily on this) -->
  <meta name="keywords" content="virtual lab, STEM education, science simulation" />
  
  <!-- Author -->
  <meta name="author" content="WhimsyLabs" />
  
  <!-- Canonical URL -->
  <link rel="canonical" href="https://whimsylabs.ai/your-page-path" />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://whimsylabs.ai/your-page-path" />
  <meta property="og:title" content="Your Page Title" />
  <meta property="og:description" content="Description for social media sharing" />
  <meta property="og:image" content="https://whimsylabs.ai/social-image.jpg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:site_name" content="WhimsyLabs" />
  
  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content="https://whimsylabs.ai/your-page-path" />
  <meta property="twitter:title" content="Your Page Title" />
  <meta property="twitter:description" content="Description for Twitter sharing" />
  <meta property="twitter:image" content="https://whimsylabs.ai/social-image.jpg" />
  
  <!-- For Blog Articles -->
  <meta property="article:published_time" content="2025-01-01T00:00:00Z" />
  <meta property="article:modified_time" content="2025-01-01T00:00:00Z" />
  <meta property="article:author" content="Author Name" />
  <meta property="article:section" content="Education" />
  <meta property="article:tag" content="virtual labs, STEM" />
  
  <!-- Favicon -->
  <link rel="icon" href="/favicon.ico" />
  <link rel="apple-touch-icon" href="/logo192.png" />
  
  <!-- Manifest -->
  <link rel="manifest" href="/manifest.json" />
  
  <!-- Additional SEO Tags -->
  <meta name="robots" content="index, follow" />
  <meta name="language" content="English" />
  <meta name="revisit-after" content="7 days" />
</head>
<body>
  <!-- Your page content -->
</body>
</html>
```

## React Helmet Examples

### Basic Page Component

```jsx
import React from 'react';
import { Helmet } from 'react-helmet-async';

function HomePage() {
  return (
    <>
      <Helmet>
        <title>WhimsyLabs - Virtual Laboratory Software for STEM Education</title>
        <meta name="description" content="Discover WhimsyLabs' innovative virtual laboratory software that provides immersive STEM education through realistic science simulations and experiments." />
        <meta property="og:title" content="WhimsyLabs - Virtual Laboratory Software" />
        <meta property="og:description" content="Innovative virtual lab software for STEM education" />
        <meta property="og:url" content="https://whimsylabs.ai/" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://whimsylabs.ai/" />
      </Helmet>
      
      <div>
        {/* Your page content */}
      </div>
    </>
  );
}

export default HomePage;
```

### Blog Post Component

```jsx
import React from 'react';
import { Helmet } from 'react-helmet-async';

function BlogPost({ title, description, slug, publishDate, author }) {
  const url = `https://whimsylabs.ai/blog/${slug}`;
  const imageUrl = `https://whimsylabs.ai/images/blog/${slug}-cover.jpg`;
  
  return (
    <>
      <Helmet>
        <title>{title} | WhimsyLabs Blog</title>
        <meta name="description" content={description} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={imageUrl} />
        
        {/* Article specific */}
        <meta property="article:published_time" content={publishDate} />
        <meta property="article:author" content={author} />
        <meta property="article:section" content="Education" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={imageUrl} />
        
        <link rel="canonical" href={url} />
        
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": title,
            "description": description,
            "author": {
              "@type": "Person",
              "name": author
            },
            "datePublished": publishDate,
            "publisher": {
              "@type": "Organization",
              "name": "WhimsyLabs",
              "logo": {
                "@type": "ImageObject",
                "url": "https://whimsylabs.ai/logo.png"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": url
            }
          })}
        </script>
      </Helmet>
      
      <article>
        {/* Your blog post content */}
      </article>
    </>
  );
}

export default BlogPost;
```

### Dynamic SEO Hook

```jsx
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

function useSEO({ title, description, url, image, type = 'website' }) {
  const siteTitle = 'WhimsyLabs';
  const fullTitle = title ? `${title} - ${siteTitle}` : siteTitle;
  const fullUrl = url ? `https://whimsylabs.ai${url}` : 'https://whimsylabs.ai';
  const defaultImage = 'https://whimsylabs.ai/logo.png';
  
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title || siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={image || defaultImage} />
      <meta name="twitter:title" content={title || siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image || defaultImage} />
      <link rel="canonical" href={fullUrl} />
    </Helmet>
  );
}

// Usage in component
function MyPage() {
  const seoProps = useSEO({
    title: 'My Page Title',
    description: 'Description of my page',
    url: '/my-page',
    image: 'https://whimsylabs.ai/my-page-image.jpg'
  });
  
  return (
    <>
      {seoProps}
      <div>My page content</div>
    </>
  );
}
```

## Image Optimization for SEO

### Social Media Image Specifications

- **Open Graph**: 1200 x 630 pixels (1.91:1 ratio)
- **Twitter Card**: 1200 x 600 pixels (2:1 ratio)
- **Format**: JPG or PNG, under 8MB
- **Alt text**: Always include descriptive alt text

### Example Image Setup

```jsx
<Helmet>
  <meta property="og:image" content="https://whimsylabs.ai/images/social/page-preview.jpg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="WhimsyLabs virtual laboratory interface showing chemistry simulation" />
  
  <meta name="twitter:image" content="https://whimsylabs.ai/images/social/page-preview.jpg" />
  <meta name="twitter:image:alt" content="WhimsyLabs virtual laboratory interface" />
</Helmet>
```

## Best Practices

1. **Title Tags**: 50-60 characters, include primary keyword
2. **Meta Descriptions**: 150-160 characters, compelling and descriptive
3. **URLs**: Keep them clean, descriptive, and consistent
4. **Images**: Always include alt text and optimize file sizes
5. **Structured Data**: Use JSON-LD for rich snippets
6. **Mobile**: Ensure all meta tags work on mobile devices
7. **Testing**: Always test meta tags before deployment

## Testing Your SEO Implementation

### Tools to Use

1. **Facebook Sharing Debugger**: https://developers.facebook.com/tools/debug/
2. **Twitter Card Validator**: https://cards-dev.twitter.com/validator
3. **Google Rich Results Test**: https://search.google.com/test/rich-results
4. **OpenGraph.xyz**: https://www.opengraph.xyz/
5. **SEO Meta in 1 Click** (Chrome Extension)

### Manual Testing Checklist

- [ ] Page title appears correctly in browser tab
- [ ] Meta description shows in search results preview
- [ ] Social media preview looks correct when sharing
- [ ] Images load properly and are optimized
- [ ] Canonical URLs are correct
- [ ] No duplicate meta tags
- [ ] All required meta tags are present
- [ ] Structured data validates without errors