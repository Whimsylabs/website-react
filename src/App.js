import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import MainContent from "./Components/MainContent";
import Blog from "./Components/Blog";
import Services from "./Components/Services";
import Features from "./Components/FeaturesPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Helmet>
        <title>Whimsylabs - Virtual Laboratory Solutions</title>
      </Helmet>
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/services" element={<Services />} />
        <Route path="/Features" element={<Features />} />
      </Routes>
    </Router>
  );
}

export default App;
