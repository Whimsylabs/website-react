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
import PrivacyPage from "./Components/PrivacyPage";
import DataSecurityPage from "./Components/DataSecurityPage";
import BettPage from "./Components/BettPage";
import GrantsPage from "./Components/GrantsPage";
import RoyalSocietyGrantPage from "./Components/RoyalSocietyGrantPage";
import ChemistryPage from "./Components/ChemistryPage";
import BiologyPage from "./Components/BiologyPage";
import PhysicsPage from "./Components/PhysicsPage";
import LandingDemo from "./Components/LandingDemo";
import BlogPost from "./Components/BlogPost";
import { getCurrentLanguage } from "./i18n";
import "./i18n/i18n"; // Initialize i18next
// import IgnitePitchDeck from "./Components/IgnitePitchDeck";

// Private/unreleased components
// import CashflowProjection from "./Components/CashflowProjection";
// import PricingPage from "./Components/PricingPage";

function App(props = {}) {
  // Get language from props (for SSR) or detect from URL (for client-side)
  const language = props.language || getCurrentLanguage();
  
  // Determine which component to render based on the current path
  // Use the initial route set by the static build if available
  const currentPath =
    typeof window !== "undefined"
      ? window.__INITIAL_ROUTE__ || window.location.pathname
      : "/";

  const getComponentForPath = (path) => {
    // Remove language prefix to get the base path
    const basePath = path.replace(/^\/[a-z]{2}(?=\/|$)/, "") || "/";

    if (basePath === "/") return <LandingDemo language={language} />;
    if (basePath === "/blog/" || basePath === "/blog") return <Blog language={language} />;
    if (basePath === "/services/" || basePath === "/services")
      return <Services language={language} />;
    if (basePath === "/features/" || basePath === "/features")
      return <Features language={language} />;
    if (basePath === "/faq/" || basePath === "/faq") return <FAQPage language={language} />;
    if (basePath === "/contact/" || basePath === "/contact")
      return <ContactPage language={language} />;
    if (basePath === "/privacy/" || basePath === "/privacy")
      return <PrivacyPage language={language} />;
    if (basePath === "/data-security/" || basePath === "/data-security")
      return <DataSecurityPage language={language} />;
    if (basePath === "/bett/" || basePath === "/bett")
      return <BettPage language={language} />;
    if (basePath === "/grants/" || basePath === "/grants")
      return <GrantsPage language={language} />;
    if (basePath === "/grants/royal-society/" || basePath === "/grants/royal-society")
      return <RoyalSocietyGrantPage language={language} />;
    if (basePath === "/chemistry/" || basePath === "/chemistry")
      return <ChemistryPage language={language} />;
    if (basePath === "/biology/" || basePath === "/biology")
      return <BiologyPage language={language} />;
    if (basePath === "/physics/" || basePath === "/physics")
      return <PhysicsPage language={language} />;
    // landing-demo is now the homepage
    // if (basePath === "/landing-demo/" || basePath === "/landing-demo")
    //   return <LandingDemo language={language} />;
    // Private/unreleased routes (disabled)
    // if (basePath === "/ignite-pitch/" || basePath === "/ignite-pitch")
    //   return <IgnitePitchDeck />;
    // if (basePath === "/cashflow/" || basePath === "/cashflow")
    //   return <CashflowProjection />;
    // if (basePath === "/pricing/" || basePath === "/pricing")
    //   return <PricingPage />;

    // Handle blog posts
    if (
      basePath.startsWith("/blog/") &&
      basePath !== "/blog/" &&
      basePath !== "/blog"
    ) {
      let slug = basePath.replace("/blog/", "").replace(/\/$/, "");
      // Handle both /slug/ and /slug/index.html patterns
      if (slug.endsWith("/index.html")) {
        slug = slug.replace("/index.html", "");
      }
      return <BlogPost slug={slug} language={language} />;
    }

    // Default to LandingDemo (homepage)
    return <LandingDemo language={language} />;
  };

  // Get current language for context
  const currentLanguage = getCurrentLanguage();

  return (
    <HelmetProvider>
      <MetaTags />
      <SchemaMarkup />
      {getComponentForPath(currentPath)}
    </HelmetProvider>
  );
}

export default App;
