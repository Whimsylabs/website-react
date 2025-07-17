import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { 
  isServerRendered, 
  getInitialRoute, 
  shouldHydrate, 
  initializeHydration,
  setupHydrationErrorBoundary
} from './hydration';

// Setup error boundaries for hydration
setupHydrationErrorBoundary();

// Get the initial route from the HTML (set by our static page generator)
// or from URL parameters (for backward compatibility)
let initialPath = getInitialRoute();

// Legacy redirect handling for backward compatibility
if (!window.__INITIAL_ROUTE__) {
  const urlParams = new URLSearchParams(window.location.search);
  const redirectPath = urlParams.get("redirect");
  
  if (redirectPath) {
    initialPath = redirectPath;
    // Update URL without causing a page reload
    window.history.replaceState({}, "", redirectPath);
  }
}

// Determine if we should hydrate or render normally
const shouldPerformHydration = isServerRendered() && shouldHydrate();

const rootElement = document.getElementById('root');

if (shouldPerformHydration) {
  // Hydrate the pre-rendered content
  console.log('🔄 Hydrating pre-rendered content for route:', initialPath);
  
  initializeHydration(() => {
    const root = ReactDOM.hydrateRoot(
      rootElement,
      <React.StrictMode>
        <App initialPath={initialPath} />
      </React.StrictMode>
    );
  });
} else {
  // Normal client-side rendering
  console.log('🚀 Client-side rendering for route:', initialPath);
  
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App initialPath={initialPath} />
    </React.StrictMode>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
