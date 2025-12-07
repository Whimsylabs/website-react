# WhimsyLabs Website

This is the official website for WhimsyLabs, a company that provides virtual laboratory simulations for educational purposes. The website showcases the company's products, services, blog, and contact information.

## Project Overview

WhimsyLabs offers award-winning virtual labs for Biology, Chemistry, Physics, and more. This website serves as the primary online presence for the company, highlighting its innovative approach to STEM education through virtual simulations.

## Key Features

- **Interactive Design**: Animated elements including bubbles, waves, and text effects
- **Responsive Layout**: Optimized for all device sizes
- **Blog System**: Dynamic blog with multiple posts
- **Service Showcase**: Information about custom simulation development
- **Partner Showcase**: Display of educational and business partners

## Technology Stack

- React.js
- React Router for navigation
- CSS3 with animations and responsive design
- GitHub Pages for deployment
- i18n for internationalization support
- MPA (Multi-Page Application) structure for SEO optimization - SPA is not compatible at all!!

## Development Setup

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/whimsylabs-website.git
   cd whimsylabs-website
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the development server
   ```
   npm start
   ```

The app will run in development mode at [http://localhost:3000](http://localhost:3000).

## Available Scripts

- npm run build-static - Builds the website as deployed for github pages (I think npm run build doesn't work so don't use that)
- node dev-server.js (I think, might actually be a npx command)
- Actually it's npx serve build

## Deployment

The website is deployed on GitHub Pages. To deploy updates:

1. Make your changes and test them locally
2. Run `npm run deploy` to build and deploy to GitHub Pages
3. The site will be available at [https://whimsylabs.ai](https://whimsylabs.ai)

### Multi-Page Application Structure

This website uses a hybrid approach that combines React with static HTML generation:

- Each main route (`/`, `/blog`, `/services`, `/features`) has its own HTML file
- The `generate-html-pages.js` script creates these files during the build process
- This approach improves SEO and allows direct access to URLs like [https://whimsylabs.ai/blog](https://whimsylabs.ai/blog)

For more details on how this works, see [MPA-CONVERSION.md](MPA-CONVERSION.md).

## Translations

The i18n.js file configures i18next for translation management within the React application.

### How it Works:

 1. Initialization: It imports i18next and react-i18next to set up the translation framework.
 2. Translation Resources: It loads translation data from ./translations.js, expecting an object where keys are language codes (e.g., en, es) and values are the corresponding translation        
    objects.
 3. Language Detection: The getCurrentLanguage() function determines the initial language by:
     * Checking if window is available (for browser environment).
     * Extracting the language code from the URL path (e.g., /es/page -> es).
     * Dynamically validating the extracted code against the keys present in the translations object, falling back to 'en' if not found.
 4. Configuration: It initializes i18next with:
     * resources: The loaded translation data.
     * lng: The language determined by getCurrentLanguage().
     * fallbackLng: 'en' as the default if a translation is missing.
     * interpolation: escapeValue: false because React handles escaping.
     * react: useSuspense: false for SSR compatibility.
 5. Export: The configured i18n instance is exported for use in React components.

Potential Improvements (Not critical errors but worth considering):

 1. Reliance on URL Path for Language Detection (SPA vs. MPA): The current setup is well-suited for Multi-Page Applications (MPA), given that we can't use a SPA router.
 2. Implicit Assumption of `translations` Structure: The code assumes that each language object within translations.js has a translation key (the default namespace for i18next). If
    translations.js uses a different structure, i18next might not find the translations. It's crucial that src/i18n/translations.js adheres to the i18next resource structure (e.g., en: {        
    translation: { ... } }).

## Project Structure

- `src/Components/`: React components for the website
- `src/Components/blog/`: Blog post components
- `public/images/`: Image assets (moved from src/Components/images/)
- `public/videos/`: Video assets (moved from src/Components/videos/)
- `public/`: Static assets and HTML template

## Design Guidelines

- **Color Palette**: Purple (#1f1968), light blue (#95CEF6), and lavender (#dabeff)
- **Typography**: Primarily uses Poppins font family
- **Animations**: Subtle animations for enhanced user experience
- **Component Structure**: Each component has its own CSS file for maintainability

## Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add some amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## License

Proprietary - All rights reserved by WhimsyLabs.
