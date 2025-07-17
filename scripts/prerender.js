require('@babel/register');
const React = require('react');
const { renderToString } = require('react-dom/server');
const { StaticRouter } = require('react-router-dom/server');
const { HelmetProvider } = require('react-helmet-async');

// Import React components
const App = require('../src/App.js').default;
const MainContent = require('../src/Components/MainContent.js').default;
const Blog = require('../src/Components/Blog.js').default;
const Services = require('../src/Components/Services.js').default;
const Features = require('../src/Components/FeaturesPage.js').default;
const FAQPage = require('../src/Components/FAQPage.js').default;
const ContactPage = require('../src/Components/ContactPage.js').default;

/**
 * Pre-render a React component to HTML string
 * @param {React.Component} Component - The React component to render
 * @param {Object} props - Props to pass to the component
 * @param {string} location - The current route location
 * @returns {Object} - Object containing HTML string and helmet context
 */
function prerenderComponent(Component, props = {}, location = '/') {
  const helmetContext = {};
  
  try {
    const html = renderToString(
      React.createElement(HelmetProvider, { context: helmetContext },
        React.createElement(StaticRouter, { location },
          React.createElement(Component, props)
        )
      )
    );
    
    return {
      html,
      helmet: helmetContext.helmet
    };
  } catch (error) {
    console.error(`Error pre-rendering component for ${location}:`, error);
    return {
      html: `<div>Error rendering component: ${error.message}</div>`,
      helmet: null
    };
  }
}

/**
 * Get the appropriate React component for a given route
 * @param {string} route - The route path
 * @returns {React.Component} - The React component for the route
 */
function getComponentForRoute(route) {
  const routeMap = {
    '/': MainContent,
    '/blog': Blog,
    '/services': Services,
    '/features': Features,
    '/faq': FAQPage,
    '/contact': ContactPage
  };
  
  // Handle blog post routes
  if (route.startsWith('/blog/') && route !== '/blog') {
    const BlogPost = require('../src/Components/BlogPost.js').default;
    return BlogPost;
  }
  
  return routeMap[route] || MainContent;
}

module.exports = {
  prerenderComponent,
  getComponentForRoute
};