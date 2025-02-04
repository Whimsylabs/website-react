import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import MetaTags from "./Components/MetaTags";
import MainContent from "./Components/MainContent";
import Blog from "./Components/Blog";
import Services from "./Components/Services";
import Features from "./Components/FeaturesPage";

function App() {
    return (
        <HelmetProvider>
            <Router>
                <MetaTags />
                <Routes>
                    <Route path="/" element={<MainContent />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/features" element={<Features />} />
                </Routes>
            </Router>
        </HelmetProvider>
    );
}

export default App;
