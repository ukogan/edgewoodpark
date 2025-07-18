# Edgewood Park - Static Website

## Overview

This is a static website for Edgewood Park, a strategic product leadership consultancy serving B2B software executives. The site showcases services including Product Marketing, Product Management Advisory, and Fractional CMO services through a clean, professional design with nature-inspired branding.

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