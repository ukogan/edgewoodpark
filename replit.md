# Edgewood Park - Static Website

## Overview

This is a static website for Edgewood Park, a strategic product leadership consultancy serving B2B software executives. The site showcases services including Product Marketing, Product Management Advisory, and Fractional CMO services through a clean, professional design with nature-inspired branding.

## Recent Changes

- **July 18, 2025**: Complete content integration and visual enhancement:
  - **Favicon**: Added professional favicon across all pages
  - **Updated Logos**: Replaced with official HP and Salesforce logos, added Instinctive Solutions logo for Dave Jones
  - **Company Name Fix**: Corrected Dave Jones company name to "Instinctive Solutions"
  - **Image Improvements**: Enhanced background visibility and consistent hero image dimensions
  - **Blog Content**: Added 3 complete blog posts with real content showcasing expertise
  - **About Page**: Updated with Uri's actual bio, experience, and inspiration story about Edgewood Park
  - **Services Page**: Integrated real service offerings (Fractional CMO, Consulting, Lend a Hand)
  - **Testimonials Page**: Added 5 authentic testimonials from real clients and colleagues
  - **Park Photography**: Integrated all 8 beautiful Edgewood Park images strategically throughout the site:
    - Homepage hero: Misty morning landscape ("above-the-fog.jpg")
    - About page hero: Lush green park vista ("park-vista.jpg")
    - Services page hero: Expansive park landscape ("park-landscape.jpg")
    - Blog page hero: Inspiring trail paths ("park-trail-1.jpg")
    - Testimonials page hero: Natural park beauty ("park-nature-1.jpg")
    - Contact page hero: Peaceful nature setting ("park-nature-2.jpg")
    - Samples page hero: Scenic park trails ("park-trail-2.jpg")
    - Subtle background overlays: Nature scenes for visual depth throughout sections
- **Enhanced Styling**: Added comprehensive CSS for all new content sections with professional typography and responsive design
- **Professional Polish**: All placeholder content replaced with authentic, compelling content that demonstrates expertise

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Pure HTML5/CSS/JavaScript**: Static site with no frameworks or build tools
- **Multi-page structure**: Traditional server-side navigation with separate HTML files
- **Responsive design**: Mobile-first approach with CSS Grid and Flexbox
- **Progressive enhancement**: Core functionality works without JavaScript

### Technology Stack
- **HTML5**: Semantic markup with proper accessibility attributes
- **CSS3**: Custom properties (CSS variables), Grid, Flexbox, and animations
- **Vanilla JavaScript**: ES6+ features with progressive enhancement
- **External dependencies**: Google Fonts, Feather Icons CDN

## Key Components

### Navigation System
- **Responsive navbar**: Hamburger menu for mobile, full navigation for desktop
- **Scroll effects**: Navbar changes appearance on scroll with smooth transitions
- **Active state management**: Highlights current page in navigation

### Content Structure
- **Seven main pages**: Home, About, Services, Work Samples, Insights (Blog), Testimonials, Contact
- **Hero sections**: Full-width background images with overlay text
- **Reusable components**: Consistent navigation, footer, and styling across pages

### Styling Architecture
- **CSS custom properties**: Centralized color scheme and design tokens
- **Utility classes**: Reusable styles for animations, spacing, and layout
- **Component-based CSS**: Modular styles organized by functionality
- **Animation system**: Scroll-based reveals, hover effects, and micro-interactions

### JavaScript Features
- **Animation controller**: Intersection Observer API for scroll animations
- **Form handling**: Advanced validation and submission with user feedback
- **Navigation logic**: Mobile menu toggle and scroll-based effects
- **Accessibility features**: Keyboard navigation and screen reader support

## Data Flow

### Static Content Delivery
1. **Direct file serving**: HTML files served directly from filesystem
2. **Asset optimization**: Images and CSS organized in dedicated folders
3. **SEO optimization**: Meta tags, Open Graph tags, and semantic HTML structure

### User Interactions
1. **Navigation**: JavaScript handles menu toggles and scroll effects
2. **Form submission**: Client-side validation before submission
3. **Animations**: Triggered by scroll position and user interactions

## External Dependencies

### Content Delivery Networks
- **Google Fonts**: Inter and Merriweather font families
- **Feather Icons**: Icon library for UI elements

### Third-party Services
- **Form handling**: Contact forms will need backend integration or service like Netlify Forms
- **Video embedding**: YouTube/Wistia integration for work samples
- **Analytics**: Google Analytics integration capability

## Deployment Strategy

### Static Hosting
- **Target platforms**: Netlify, Vercel, GitHub Pages, or traditional web hosting
- **Build process**: No build step required - direct file deployment
- **Performance optimization**: Images should be optimized, CSS minified for production

### File Structure
```
/
├── index.html
├── about/index.html
├── services/index.html
├── samples/index.html
├── blog/index.html
├── testimonials/index.html
├── contact/index.html
└── assets/
    ├── css/
    │   ├── style.css
    │   └── animations.css
    ├── js/
    │   ├── main.js
    │   ├── animations.js
    │   └── form-handler.js
    └── img/ (to be added)
```

### Content Management
- **Manual updates**: Content changes require direct HTML editing
- **Blog posts**: Static HTML files with consistent layout
- **Asset management**: Images and documents stored in assets folder

### SEO and Performance
- **Semantic HTML**: Proper heading hierarchy and meta tags
- **Image optimization**: Lazy loading and responsive images needed
- **Performance budget**: Target under 100KB initial load
- **Accessibility**: WCAG 2.1 AA compliance with semantic markup

### Future Enhancements
- **CMS integration**: Potential for headless CMS if content updates become frequent
- **Build process**: Could add asset optimization and minification
- **Dynamic features**: Contact form backend integration required for full functionality