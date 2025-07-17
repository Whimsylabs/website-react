require('@babel/register');
const React = require('react');
const { renderToString } = require('react-dom/server');
const { HelmetProvider } = require('react-helmet-async');

// Create a mock router context for server-side rendering
const RouterContext = React.createContext();

// Mock Router Provider for server-side rendering
const MockRouterProvider = ({ location, children }) => {
  const mockContext = {
    location: location || { pathname: '/', search: '', hash: '', state: null },
    navigate: () => {},
    params: {}
  };

  return React.createElement(RouterContext.Provider, { value: mockContext }, children);
};

// Mock the react-router-dom hooks for server-side rendering
const mockUseLocation = (location) => {
  return location || { pathname: '/', search: '', hash: '', state: null };
};

const mockUseNavigate = () => {
  return () => {};
};

const mockUseParams = () => {
  return {};
};

/**
 * Component Renderer - Converts React components to HTML strings
 */
class ComponentRenderer {
  constructor() {
    this.helmetContext = {};
  }

  /**
   * Render a React component to HTML string with proper context
   * @param {React.Component} Component - The React component to render
   * @param {Object} props - Props to pass to the component
   * @param {string} location - The current route location
   * @returns {Object} - Object containing HTML, helmet data, and any errors
   */
  renderComponent(Component, props = {}, location = '/') {
    // Reset helmet context for each render
    this.helmetContext = {};
    
    try {
      // Create a mock router context for server-side rendering
      const mockRouterContext = {
        location: { pathname: location, search: '', hash: '', state: null },
        navigate: () => {},
        params: {}
      };

      // Create the component tree with HelmetProvider
      // Pass location as a prop to avoid router context issues
      const componentTree = React.createElement(
        HelmetProvider, 
        { context: this.helmetContext },
        React.createElement(Component, { ...props, location, currentPath: location })
      );

      // Render to HTML string
      const html = renderToString(componentTree);
      
      // Extract helmet data
      const helmet = this.helmetContext.helmet || {};
      
      return {
        html,
        helmet,
        error: null
      };
    } catch (error) {
      console.error(`Error rendering component for ${location}:`, error);
      
      // Return fallback content on error
      return {
        html: this.getFallbackContent(location, error),
        helmet: null,
        error: error.message
      };
    }
  }

  /**
   * Render a complete page with layout
   * @param {React.Component} Component - The React component to render
   * @param {Object} pageData - Page data including props, metadata, etc.
   * @returns {Object} - Complete page render result
   */
  renderPage(Component, pageData = {}) {
    const { props = {}, location = '/', metadata = {} } = pageData;
    
    const result = this.renderComponent(Component, props, location);
    
    return {
      ...result,
      metadata,
      location
    };
  }

  /**
   * Get fallback content when component rendering fails
   * @param {string} location - The route location
   * @param {Error} error - The error that occurred
   * @returns {string} - Fallback HTML content
   */
  getFallbackContent(location, error) {
    const pageTitle = this.getPageTitle(location);
    
    return `
      <div style="max-width: 1200px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
        <h1>${pageTitle}</h1>
        <p>This page is temporarily unavailable. Please enable JavaScript for the full experience.</p>
        <p><a href="/">← Back to Home</a></p>
        <!-- Error: ${error.message} -->
      </div>
    `;
  }

  /**
   * Get appropriate page title for a route
   * @param {string} location - The route location
   * @returns {string} - Page title
   */
  getPageTitle(location) {
    const titles = {
      '/': 'WhimsyLabs - Virtual Lab Software',
      '/blog': 'WhimsyLabs Blog',
      '/services': 'WhimsyLabs Services',
      '/features': 'WhimsyLabs Features',
      '/faq': 'WhimsyLabs FAQ',
      '/contact': 'Contact WhimsyLabs'
    };
    
    if (location.startsWith('/blog/')) {
      return 'WhimsyLabs Blog Post';
    }
    
    return titles[location] || 'WhimsyLabs';
  }

  /**
   * Extract error boundary information for debugging
   * @param {Error} error - The error that occurred
   * @returns {Object} - Error information
   */
  getErrorInfo(error) {
    return {
      message: error.message,
      stack: error.stack,
      name: error.name,
      timestamp: new Date().toISOString()
    };
  }
}

module.exports = ComponentRenderer;