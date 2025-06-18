import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import MetaTags from "./Components/MetaTags";
import MainContent from "./Components/MainContent";
import Blog from "./Components/Blog";
import Services from "./Components/Services";
import Features from "./Components/FeaturesPage";

function App({ initialPath = '/' }) {
    // Use effect to ensure we're on the correct path after initial render
    useEffect(() => {
        // If we're not already on the initial path, navigate to it
        if (window.location.pathname !== initialPath) {
            window.history.replaceState({}, "", initialPath);
        }
    }, [initialPath]);

    return (
        <HelmetProvider>
            <BrowserRouter>
                <MetaTags />
                <Routes>
                    <Route path="/" element={<MainContent />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/*" element={<Navigate to="/blog" />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/services/*" element={<Navigate to="/services" />} />
                    <Route path="/features" element={<Features />} />
                    <Route path="/features/*" element={<Navigate to="/features" />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </BrowserRouter>
        </HelmetProvider>
    );
}

export default App;
