import React from "react";
import { HelmetProvider } from "react-helmet-async";
import MetaTags from "./Components/MetaTags";
import SchemaMarkup from "./Components/SchemaMarkup";
import MainContent from "./Components/MainContent";
import Blog from "./Components/Blog";
import Services from "./Components/Services";
import Features from "./Components/FeaturesPage";
import FAQPage from "./Components/FAQPage";
import ContactPage from "./Components/ContactPage";
import BlogPost from "./Components/BlogPost";

function App() {
    // Determine which component to render based on the current path
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';
    
    const getComponentForPath = (path) => {
        if (path === '/') return <MainContent />;
        if (path === '/blog/' || path === '/blog') return <Blog />;
        if (path === '/services/' || path === '/services') return <Services />;
        if (path === '/features/' || path === '/features') return <Features />;
        if (path === '/faq/' || path === '/faq') return <FAQPage />;
        if (path === '/contact/' || path === '/contact') return <ContactPage />;
        
        // Handle blog posts
        if (path.startsWith('/blog/') && path !== '/blog/' && path !== '/blog') {
            const slug = path.replace('/blog/', '').replace('/', '');
            return <BlogPost slug={slug} />;
        }
        
        // Default to MainContent
        return <MainContent />;
    };

    return (
        <HelmetProvider>
            <MetaTags />
            <SchemaMarkup />
            {getComponentForPath(currentPath)}
        </HelmetProvider>
    );
}

export default App;
