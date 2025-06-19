import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Get the initial route from the HTML (set by our static page generator)
// or from URL parameters (for backward compatibility)
let initialPath = '/';

// Check if we have an initial route set by our static HTML generator
if (window.__INITIAL_ROUTE__) {
  initialPath = window.__INITIAL_ROUTE__;
} else {
  // Legacy redirect handling
  const urlParams = new URLSearchParams(window.location.search);
  const redirectPath = urlParams.get("redirect");
  
  if (redirectPath) {
    initialPath = redirectPath;
    // Update URL without causing a page reload
    window.history.replaceState({}, "", redirectPath);
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App initialPath={initialPath} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
