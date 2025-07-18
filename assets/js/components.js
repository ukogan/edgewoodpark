// Component loader for reusable HTML elements
class ComponentLoader {
    constructor() {
        this.cache = new Map();
    }

    async loadComponent(componentPath, replacements = {}) {
        try {
            // Check cache first
            if (this.cache.has(componentPath)) {
                return this.processTemplate(this.cache.get(componentPath), replacements);
            }

            // Load component from file
            const response = await fetch(componentPath);
            if (!response.ok) {
                throw new Error(`Failed to load component: ${componentPath}`);
            }

            const template = await response.text();
            this.cache.set(componentPath, template);
            
            return this.processTemplate(template, replacements);
        } catch (error) {
            console.error('Error loading component:', error);
            return '';
        }
    }

    processTemplate(template, replacements) {
        let processed = template;
        
        // Replace template variables
        Object.entries(replacements).forEach(([key, value]) => {
            const regex = new RegExp(`{{${key}}}`, 'g');
            processed = processed.replace(regex, value);
        });

        return processed;
    }

    async insertComponent(selector, componentPath, replacements = {}) {
        const element = document.querySelector(selector);
        if (!element) {
            console.error(`Element not found: ${selector}`);
            return;
        }

        const html = await this.loadComponent(componentPath, replacements);
        element.innerHTML = html;

        // Reinitialize Feather icons for the new content
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    }

    // Predefined component loaders
    async loadContactCTA(selector) {
        await this.insertComponent(selector, '../assets/components/contact-cta.html');
    }

    async loadFooter(selector, isSubpage = false) {
        const basePath = isSubpage ? '../' : './';
        const footerContent = await this.loadComponent('../assets/components/footer.html');
        
        // Adjust paths for subpages
        let adjustedContent = footerContent;
        if (isSubpage) {
            adjustedContent = footerContent.replace(/href="\.\.\/(?!assets)/g, 'href="../');
        } else {
            adjustedContent = footerContent.replace(/href="\.\.\/(?!assets)/g, 'href="./');
        }

        const element = document.querySelector(selector);
        if (element) {
            element.innerHTML = adjustedContent;
            if (typeof feather !== 'undefined') {
                feather.replace();
            }
        }
    }

    async loadTestimonial(selector, testimonialData) {
        const template = await this.loadComponent('../assets/components/testimonial-card.html', testimonialData);
        const element = document.querySelector(selector);
        if (element) {
            element.innerHTML = template;
            if (typeof feather !== 'undefined') {
                feather.replace();
            }
        }
    }

    async loadServiceCard(selector, serviceData) {
        // Convert features array to HTML list items
        if (serviceData.features && Array.isArray(serviceData.features)) {
            serviceData.features = serviceData.features
                .map(feature => `<li>${feature}</li>`)
                .join('');
        }

        await this.insertComponent(selector, '../assets/components/service-card.html', serviceData);
    }
}

// Global instance
window.componentLoader = new ComponentLoader();

// Auto-load components on page load
document.addEventListener('DOMContentLoaded', async () => {
    // Auto-load footer
    const footerElement = document.querySelector('[data-component="footer"]');
    if (footerElement) {
        const isSubpage = window.location.pathname.includes('/') && window.location.pathname !== '/';
        await window.componentLoader.loadFooter('[data-component="footer"]', isSubpage);
    }

    // Auto-load contact CTA
    const ctaElement = document.querySelector('[data-component="contact-cta"]');
    if (ctaElement) {
        await window.componentLoader.loadContactCTA('[data-component="contact-cta"]');
    }
});