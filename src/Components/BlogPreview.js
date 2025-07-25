import React from 'react';
import { Link } from 'react-router-dom';
import './Blog.css';

// Function to extract the first image from content
const extractFirstImage = (content) => {
  try {
    // Clone the content element to avoid modifying the original
    const contentClone = React.cloneElement(content);
    
    // Get the children of the content div
    const children = React.Children.toArray(contentClone.props.children);
    
    // Find the first image element
    let firstImage = null;
    
    // First check for direct img elements
    for (const child of children) {
      if (child && child.type === 'img') {
        firstImage = child;
        break;
      }
    }
    
    // If no direct image found, check for images in containers like div.video-container
    if (!firstImage) {
      for (const child of children) {
        if (child && child.props && child.props.children) {
          const nestedChildren = React.Children.toArray(child.props.children);
          const nestedImage = nestedChildren.find(nestedChild => 
            nestedChild && nestedChild.type === 'img'
          );
          
          if (nestedImage) {
            firstImage = nestedImage;
            break;
          }
          
          // Check one level deeper (for video containers, etc.)
          for (const nestedChild of nestedChildren) {
            if (nestedChild && nestedChild.props && nestedChild.props.children) {
              const deepNestedChildren = React.Children.toArray(nestedChild.props.children);
              const deepNestedImage = deepNestedChildren.find(deepNestedChild => 
                deepNestedChild && deepNestedChild.type === 'img'
              );
              
              if (deepNestedImage) {
                firstImage = deepNestedImage;
                break;
              }
            }
          }
          
          if (firstImage) break;
        }
      }
    }
    
    // If we found an image, return it styled as a header
    if (firstImage) {
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
    // Clone the content element to avoid modifying the original
    const contentClone = React.cloneElement(content);
    
    // Get the children of the content div
    const children = React.Children.toArray(contentClone.props.children);
    
    // Find the index of the first image
    const firstImageIndex = children.findIndex(child => {
      // Direct image element
      if (child && child.type === 'img') {
        return true;
      }
      
      // Image inside paragraph or other element
      if (child && child.props && child.props.children) {
        const nestedChildren = React.Children.toArray(child.props.children);
        return nestedChildren.some(nestedChild => 
          nestedChild && nestedChild.type === 'img'
        );
      }
      
      return false;
    });
    
    // If no image is found or it's too deep in the content, show first 2-3 paragraphs
    const previewLength = firstImageIndex > 0 && firstImageIndex < 4 
      ? firstImageIndex 
      : Math.min(2, children.length);
    
    // Get only text paragraphs for preview (no captions, etc.)
    const previewContent = children
      .slice(0, previewLength)
      .filter(child => child && child.type === 'p' && (!child.props.className || !child.props.className.includes('caption')));
    
    // Return the preview content
    return (
      <div className="post-preview-content">
        {previewContent.length > 0 ? previewContent : children.slice(0, 1)}
        <div className="preview-fade"></div>
      </div>
    );
  } catch (error) {
    // Fallback if there's an error processing the content
    return (
      <div className="post-preview-content">
        <p className="post-description">{content.props.children[0]?.props?.children || "Read the full article..."}</p>
        <div className="preview-fade"></div>
      </div>
    );
  }
};

const BlogPreview = ({ post }) => {
  // Format the date in a more readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Link to={`/blog/${post.id}`} className="blog-preview-link">
      <div className="post-box post-preview" id={`post-${post.id}`}>
        {/* Extract and display the first image as a header */}
        {extractFirstImage(post.content)}
        
        <h2>
          <span className="post-title">{post.title}</span>
        </h2>
        <span className="post-date">{formatDate(post.date)}</span>
        
        {extractPreview(post.content)}
        
        
        <span className="read-more-link">
          Read More
        </span>
        
      </div>
    </Link>
  );
};

export default BlogPreview;