import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const MetaTags = () => {
    const location = useLocation();

    // Define meta information based on the current route
    const metaInfo = {
        "/": {
            title: "Whimsylabs - Award Winning Virtual Labs",
            description: "Whimsylabs provides virtual labs for Biology, Chemistry, Physics, and more. Used in Schools, Colleges, and Universities.",
        },
        "/blog": {
            title: "Whimsylabs Blog - Latest Virtual Lab Innovations",
            description: "Stay updated with Whimsylabs' latest news on virtual laboratory technology and STEM education.",
        },
        "/services": {
            title: "Whimsylabs Services - Virtual Labs for Education, Industry and More!",
            description: "Discover Whimsylabs' virtual lab solutions for enhancing education through AI-driven simulations.",
        },
        "/features": {
            title: "Whimsylabs Features - Cutting-Edge Virtual Lab Technology",
            description: "Explore the powerful features of Whimsylabs, from immersive simulations to AI-driven experiments for STEM education.",
        },
    };

    // Default meta if path is not predefined
    const currentMeta = metaInfo[location.pathname] || metaInfo["/"];

    return (
        <Helmet>
            <title>{currentMeta.title}</title>
            <meta name="description" content={currentMeta.description} />
            <meta property="og:title" content={currentMeta.title} />
            <meta property="og:description" content={currentMeta.description} />
            <meta property="og:url" content={`https://whimsylabs.ai${location.pathname}`} />
            <meta property="og:type" content="website" />
            <link rel="canonical" href={`https://whimsylabs.ai${location.pathname}`} />
        </Helmet>
    );
};

export default MetaTags;
