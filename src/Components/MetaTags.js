import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const MetaTags = () => {
    const location = useLocation();

    // Define meta information based on the current route with optimized SEO keywords
    const metaInfo = {
        "/": {
            title: "WhimsyLabs - Award-Winning Virtual Lab Software for STEM Education",
            description: "WhimsyLabs provides interactive virtual lab software for Biology, Chemistry, and Physics. Our online lab simulations enhance STEM education in schools across the EU.",
            keywords: "virtual lab software, online lab simulations, STEM virtual labs for schools, science education technology",
        },
        "/blog": {
            title: "WhimsyLabs Blog - Latest Virtual Laboratory Innovations & Teaching Resources",
            description: "Stay updated with WhimsyLabs' latest developments in virtual laboratory technology, teaching strategies, and STEM education resources for educators.",
            keywords: "virtual laboratory technology, STEM education resources, science teaching tools, online lab teaching",
        },
        "/services": {
            title: "WhimsyLabs Services - Custom Virtual Lab Solutions for Education & Industry",
            description: "Discover WhimsyLabs' customizable virtual lab solutions for enhancing science education through AI-driven simulations, remote learning, and interactive experiments.",
            keywords: "virtual lab solutions, science education technology, remote laboratory learning, interactive science experiments",
        },
        "/features": {
            title: "WhimsyLabs Features - Cutting-Edge Virtual Laboratory Technology",
            description: "Explore WhimsyLabs' powerful features including realistic physics simulations, AI-driven assessment, cross-platform accessibility, and immersive STEM experiments.",
            keywords: "virtual laboratory features, science simulation software, AI assessment tools, immersive STEM learning",
        },
        "/faq": {
            title: "Frequently Asked Questions | WhimsyLabs Virtual Lab Software",
            description: "Get answers to common questions about WhimsyLabs virtual lab software, online lab simulations, and how our STEM virtual labs help students and educators.",
            keywords: "virtual lab software FAQ, online lab simulations help, STEM virtual labs questions, virtual laboratory software support",
        },
    };

    // Default meta if path is not predefined
    const currentMeta = metaInfo[location.pathname] || metaInfo["/"];

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{currentMeta.title}</title>
            <meta name="description" content={currentMeta.description} />
            <meta name="keywords" content={currentMeta.keywords} />
            
            {/* Open Graph Tags for Social Media */}
            <meta property="og:title" content={currentMeta.title} />
            <meta property="og:description" content={currentMeta.description} />
            <meta property="og:url" content={`https://whimsylabs.ai${location.pathname}`} />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="WhimsyLabs" />
            <meta property="og:locale" content="en_GB" />
            
            {/* Twitter Card Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={currentMeta.title} />
            <meta name="twitter:description" content={currentMeta.description} />
            
            {/* Canonical URL to prevent duplicate content issues */}
            <link rel="canonical" href={`https://whimsylabs.ai${location.pathname}`} />
            
            {/* Additional SEO Meta Tags */}
            <meta name="robots" content="index, follow" />
            <meta name="author" content="WhimsyLabs" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Helmet>
    );
};

export default MetaTags;
