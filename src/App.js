import { HashRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useEffect } from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import MainContent from "./Components/MainContent";
import Blog from "./Components/Blog";
import Services from "./Components/Services";

const HashRedirector = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const hashSlug = location.hash.replace("#", "").trim();
      if (hashSlug.startsWith("blog/")) {
        const slug = hashSlug.replace("blog/", "");
        window.location.replace(`#/blog/${slug}`);
      }
    }
  }, [location]);

  return null;
};

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Helmet>
          <title>Whimsylabs - Virtual Laboratory Solutions</title>
          <meta name="description" content="Explore innovative virtual laboratories for STEM education. Powered by AI and immersive technologies." />
        </Helmet>
        <Header />
        <div className="flex-grow">
          <HashRedirector />
          <Routes>
            <Route 
              path="/" 
              element={
                <>
                  <Helmet>
                    <title>Home - Whimsylabs</title>
                    <meta name="description" content="Welcome to Whimsylabs. Revolutionizing science education through interactive and accessible virtual labs." />
                  </Helmet>
                  <MainContent />
                </>
              } 
            />
            <Route 
              path="/blog" 
              element={
                <>
                  <Helmet>
                    <title>Blog - Whimsylabs</title>
                    <meta name="description" content="Stay updated with the latest from Whimsylabs. Learn about our innovations in STEM education." />
                  </Helmet>
                  <Blog />
                </>
              } 
            />
            <Route 
              path="/blog/:slug" 
              element={
                <>
                  <Helmet>
                    <title>Blog Post - Whimsylabs</title>
                    <meta name="description" content="Read the latest blog post from Whimsylabs." />
                  </Helmet>
                  <Blog />
                </>
              } 
            />
            <Route path="/services" element={<Services />} /> {/* Add this */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
