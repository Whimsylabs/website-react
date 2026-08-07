import React from 'react';

// Native lazy-loading for blog imagery. The blog listing and posts are
// pre-rendered to static HTML (MPA), so these attributes are baked into the
// markup crawlers and browsers see. The first image in a block stays eager,
// it is usually the in-viewport hero and a lazy hint would only delay LCP.

// Recursively clone a JSX tree, adding loading="lazy"/decoding="async" to
// every <img> after the first. Images that already declare `loading` are
// left untouched.
export function withLazyImages(node, state = { seen: 0 }) {
  if (Array.isArray(node)) {
    return node.map((child) => withLazyImages(child, state));
  }
  if (!React.isValidElement(node)) {
    return node;
  }
  if (node.type === 'img') {
    const index = state.seen++;
    if (node.props.loading) return node;
    if (index === 0) {
      return React.cloneElement(node, { decoding: 'async' });
    }
    return React.cloneElement(node, { loading: 'lazy', decoding: 'async' });
  }
  const children = node.props && node.props.children;
  if (!children) {
    return node;
  }
  return React.cloneElement(
    node,
    undefined,
    React.Children.map(children, (child) => withLazyImages(child, state))
  );
}

// Same treatment for HTML-string content (dangerouslySetInnerHTML path).
export function lazyImageHtml(html) {
  if (typeof html !== 'string') return html;
  let seen = 0;
  return html.replace(/<img\b(?![^>]*\bloading=)/gi, () =>
    seen++ === 0 ? '<img decoding="async"' : '<img loading="lazy" decoding="async"'
  );
}
