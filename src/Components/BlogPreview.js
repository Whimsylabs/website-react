import React from 'react';
// Removed React Router - using direct HTML links
import './Blog.css';

// Function to extract the first image from content
const extractFirstImage = (content) => {
  try {
    // Handle string content (from mock data)
    if (typeof content === 'string') {
      return null;
    }
    
    // Check if content exists and is a valid React element
    if (!content || !React.isValidElement(content)) {
      return null;
    }
    
    // Check if it has props and children
    if (!content.props || !content.props.children) {
      return null;
    }
    
    // Get the children of the content div
    const children = React.Children.toArray(content.props.children);
    
    // Find the first image element
    let firstImage = null;

    // First check for direct img elements
    for (const child of children) {
      if (React.isValidElement(child) && child.type === 'img') {
        firstImage = child;
        break;
      }
      // Also check inside figure elements
      if (React.isValidElement(child) && child.type === 'figure') {
        const figureChildren = React.Children.toArray(child.props?.children || []);
        for (const figChild of figureChildren) {
          if (React.isValidElement(figChild) && figChild.type === 'img') {
            firstImage = figChild;
            break;
          }
        }
        if (firstImage) break;
      }
    }
    
    // If we found an image, return it styled as a header
    if (firstImage && firstImage.props) {
      return (
        <div className="post-header-image">
          <img 
            src={firstImage.props.src} 
            alt={firstImage.props.alt || "Blog post header"} 
          />
        </div>
      );
    }
    
    return null;
  } catch (error) {
    console.error("Error extracting image:", error);
    return null;
  }
};

// Function to extract preview content from a blog post
const extractPreview = (content) => {
  try {
    // Handle string content (from mock data)
    if (typeof content === 'string') {
      return (
        <div className="post-preview-content">
          <p className="post-description">{content.substring(0, 150)}...</p>
          <div className="preview-fade"></div>
        </div>
      );
    }
    
    // Check if content exists and is a valid React element
    if (!content || !React.isValidElement(content)) {
      return (
        <div className="post-preview-content">
          <p className="post-description">Read the full article...</p>
          <div className="preview-fade"></div>
        </div>
      );
    }
    
    // Check if it has props and children
    if (!content.props || !content.props.children) {
      return (
        <div className="post-preview-content">
          <p className="post-description">Read the full article...</p>
          <div className="preview-fade"></div>
        </div>
      );
    }
    
    // Get the children of the content div
    const children = React.Children.toArray(content.props.children);
    
    // Get first few paragraphs for preview
    const previewContent = children
      .slice(0, 2)
      .filter(child => React.isValidElement(child) && child.type === 'p');
    
    // Return the preview content
    return (
      <div className="post-preview-content">
        {previewContent.length > 0 ? previewContent.map((child, index) => 
          React.cloneElement(child, { key: `preview-${index}` })
        ) : (
          <p className="post-description">Read the full article...</p>
        )}
        <div className="preview-fade"></div>
      </div>
    );
  } catch (error) {
    // Fallback if there's an error processing the content
    return (
      <div className="post-preview-content">
        <p className="post-description">Read the full article...</p>
        <div className="preview-fade"></div>
      </div>
    );
  }
};

const BlogPreview = ({ post, languagePrefix = '' }) => {
  // Format the date in a more readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Create a short title for the read more link (first 50 chars)
  const shortTitle = post.title.length > 50 
    ? post.title.substring(0, 47) + '...' 
    : post.title;

  return (
    <article className="blog-preview-article">
      <a href={`${languagePrefix}/blog/${post.id}/`} className="blog-preview-link">
        <div className="post-box post-preview" id={`post-${post.id}`}>
          {/* Extract and display the first image as a header */}
          {extractFirstImage(post.content)}
          
          <h3 className="post-heading">
            <span className="post-title">{post.title}</span>
          </h3>
          <time className="post-date" dateTime={post.date}>{formatDate(post.date)}</time>
          
          {/* Description for SEO - shows meta description if available */}
          {post.description && (
            <p className="post-description-text">{post.description}</p>
          )}
          
          {extractPreview(post.content)}
          
          <span className="read-more-link" aria-label={`Read full article: ${shortTitle}`}>
            Continue reading "{shortTitle}" →
          </span>
          
        </div>
      </a>
    </article>
  );
};

export default BlogPreview;