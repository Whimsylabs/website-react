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
import BlogPost from "./Components/BlogPost";
import { getCurrentLanguage } from "./i18n";
// import IgnitePitchDeck from "./Components/IgnitePitchDeck";

// Private/unreleased components
// import CashflowProjection from "./Components/CashflowProjection";
// import PricingPage from "./Components/PricingPage";

function App() {
  // Determine which component to render based on the current path
  // Use the initial route set by the static build if available
  const currentPath =
    typeof window !== "undefined"
      ? window.__INITIAL_ROUTE__ || window.location.pathname
      : "/";

  const getComponentForPath = (path) => {
    // Remove language prefix to get the base path
    const basePath = path.replace(/^\/[a-z]{2}(?=\/|$)/, "") || "/";

    if (basePath === "/") return <MainContent />;
    if (basePath === "/blog/" || basePath === "/blog") return <Blog />;
    if (basePath === "/services/" || basePath === "/services")
      return <Services />;
    if (basePath === "/features/" || basePath === "/features")
      return <Features />;
    if (basePath === "/faq/" || basePath === "/faq") return <FAQPage />;
    if (basePath === "/contact/" || basePath === "/contact")
      return <ContactPage />;
    if (basePath === "/privacy/" || basePath === "/privacy")
      return <PrivacyPage />;
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
      return <BlogPost slug={slug} />;
    }

    // Default to MainContent
    return <MainContent />;
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
