// App.js
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import MainContent from "./Components/MainContent";
import Blog from "./Components/Blog";

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
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

