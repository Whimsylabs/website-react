/**
 * Hydration Controller - Manages the transition from static to dynamic React content
 */

/**
 * Detect if the current page was server-rendered (pre-rendered)
 * @returns {boolean} - True if page was server-rendered
 */
export function isServerRendered() {
  // Check if we have the initial route set by the static generation
  return typeof window !== 'undefined' && window.__INITIAL_ROUTE__;
}

/**
 * Get the initial route from the static generation
 * @returns {string} - The initial route path
 */
export function getInitialRoute() {
  if (typeof window !== 'undefined' && window.__INITIAL_ROUTE__) {
    return window.__INITIAL_ROUTE__;
  }
  return window.location.pathname;
}

/**
 * Check if the root element has pre-rendered content
 * @returns {boolean} - True if root has content
 */
export function hasPrerenderedContent() {
  if (typeof window === 'undefined') return false;
  
  const root = document.getElementById('root');
  return root && root.children.length > 0;
}

/**
 * Preserve user state during hydration
 * This function can be extended to preserve scroll position, form data, etc.
 */
export function preserveUserState() {
  const state = {};
  
  // Preserve scroll position
  if (typeof window !== 'undefined') {
    state.scrollX = window.scrollX;
    state.scrollY = window.scrollY;
  }
  
  // Store in session storage for restoration after hydration
  if (typeof sessionStorage !== 'undefined') {
    sessionStorage.setItem('__HYDRATION_STATE__', JSON.stringify(state));
  }
  
  return state;
}

/**
 * Restore user state after hydration
 */
export function restoreUserState() {
  if (typeof sessionStorage === 'undefined') return;
  
  try {
    const stateStr = sessionStorage.getItem('__HYDRATION_STATE__');
    if (stateStr) {
      const state = JSON.parse(stateStr);
      
      // Restore scroll position
      if (state.scrollX !== undefined && state.scrollY !== undefined) {
        window.scrollTo(state.scrollX, state.scrollY);
      }
      
      // Clean up
      sessionStorage.removeItem('__HYDRATION_STATE__');
    }
  } catch (error) {
    console.warn('Could not restore hydration state:', error);
  }
}

/**
 * Handle hydration errors gracefully
 * @param {Error} error - The hydration error
 */
export function handleHydrationError(error) {
  console.error('Hydration error:', error);
  
  // Log error for debugging
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'exception', {
      description: `Hydration error: ${error.message}`,
      fatal: false
    });
  }
  
  // Ensure the page remains functional even if hydration fails
  // The static content should still be visible and basic navigation should work
}

/**
 * Initialize hydration process
 * @param {Function} hydrateCallback - Callback to perform the actual hydration
 */
export function initializeHydration(hydrateCallback) {
  if (typeof window === 'undefined') return;
  
  try {
    // Preserve user state before hydration
    preserveUserState();
    
    // Perform hydration
    hydrateCallback();
    
    // Restore user state after hydration
    setTimeout(restoreUserState, 0);
    
  } catch (error) {
    handleHydrationError(error);
  }
}

/**
 * Check if hydration is needed and safe to perform
 * @returns {boolean} - True if hydration should be performed
 */
export function shouldHydrate() {
  // Don't hydrate if we're in a non-browser environment
  if (typeof window === 'undefined') return false;
  
  // Don't hydrate if React is not available
  if (typeof window.React === 'undefined' && typeof require === 'undefined') {
    return false;
  }
  
  // Check if we have pre-rendered content to hydrate
  return hasPrerenderedContent();
}

/**
 * Setup hydration error boundaries
 */
export function setupHydrationErrorBoundary() {
  if (typeof window === 'undefined') return;
  
  // Global error handler for hydration issues
  window.addEventListener('error', (event) => {
    if (event.error && event.error.message && 
        (event.error.message.includes('hydrat') || 
         event.error.message.includes('render'))) {
      handleHydrationError(event.error);
    }
  });
  
  // Unhandled promise rejection handler
  window.addEventListener('unhandledrejection', (event) => {
    if (event.reason && event.reason.message && 
        (event.reason.message.includes('hydrat') || 
         event.reason.message.includes('render'))) {
      handleHydrationError(event.reason);
    }
  });
}