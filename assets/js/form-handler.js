// ===== FORM HANDLER =====
// Advanced form handling with validation, submission, and user feedback

class FormHandler {
    constructor() {
        this.forms = new Map();
        this.validators = new Map();
        this.submissionInProgress = false;
        
        this.init();
    }
    
    init() {
        this.setupContactForm();
        this.setupNewsletterForm();
        this.setupValidators();
        this.setupRealTimeValidation();
        this.setupKeyboardNavigation();
        this.setupAccessibility();
    }
    
    // ===== CONTACT FORM SETUP =====
    setupContactForm() {
        const contactForm = document.getElementById('contact-form');
        if (!contactForm) return;
        
        this.forms.set('contact', contactForm);
        
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleContactSubmission(contactForm);
        });
        
        // Add input event listeners for real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }
    
    // ===== NEWSLETTER FORM SETUP =====
    setupNewsletterForm() {
        const newsletterForm = document.getElementById('newsletter-form');
        if (!newsletterForm) return;
        
        this.forms.set('newsletter', newsletterForm);
        
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleNewsletterSubmission(newsletterForm);
        });
    }
    
    // ===== VALIDATORS SETUP =====
    setupValidators() {
        this.validators.set('email', (value) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value) return { isValid: false, message: 'Email is required' };
            if (!emailRegex.test(value)) return { isValid: false, message: 'Please enter a valid email address' };
            return { isValid: true };
        });
        
        this.validators.set('required', (value) => {
            if (!value || value.trim() === '') {
                return { isValid: false, message: 'This field is required' };
            }
            return { isValid: true };
        });
        
        this.validators.set('minLength', (value, minLength = 10) => {
            if (value && value.length < minLength) {
                return { isValid: false, message: `Must be at least ${minLength} characters long` };
            }
            return { isValid: true };
        });
        
        this.validators.set('maxLength', (value, maxLength = 500) => {
            if (value && value.length > maxLength) {
                return { isValid: false, message: `Must be no more than ${maxLength} characters long` };
            }
            return { isValid: true };
        });
        
        this.validators.set('phone', (value) => {
            if (!value) return { isValid: true }; // Optional field
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
                return { isValid: false, message: 'Please enter a valid phone number' };
            }
            return { isValid: true };
        });
        
        this.validators.set('name', (value) => {
            if (!value) return { isValid: false, message: 'Name is required' };
            if (value.length < 2) return { isValid: false, message: 'Name must be at least 2 characters long' };
            if (!/^[a-zA-Z\s\-\'\.]+$/.test(value)) {
                return { isValid: false, message: 'Name can only contain letters, spaces, hyphens, and apostrophes' };
            }
            return { isValid: true };
        });
    }
    
    // ===== REAL-TIME VALIDATION =====
    setupRealTimeValidation() {
        const formFields = document.querySelectorAll('.form-input, .form-textarea, .form-select');
        
        formFields.forEach(field => {
            field.addEventListener('input', (e) => {
                this.debounce(() => {
                    this.validateField(field);
                }, 500)();
            });
        });
    }
    
    // ===== FIELD VALIDATION =====
    validateField(field) {
        const fieldName = field.name;
        const fieldValue = field.value;
        const fieldType = field.type;
        const isRequired = field.hasAttribute('required');
        
        let validationResult = { isValid: true };
        
        // Check required fields
        if (isRequired) {
            validationResult = this.validators.get('required')(fieldValue);
            if (!validationResult.isValid) {
                this.showFieldError(field, validationResult.message);
                return false;
            }
        }
        
        // Skip further validation if field is empty and not required
        if (!fieldValue && !isRequired) {
            this.clearFieldError(field);
            return true;
        }
        
        // Validate based on field type/name
        switch (fieldType) {
            case 'email':
                validationResult = this.validators.get('email')(fieldValue);
                break;
            case 'tel':
                validationResult = this.validators.get('phone')(fieldValue);
                break;
            default:
                if (fieldName === 'firstName' || fieldName === 'lastName') {
                    validationResult = this.validators.get('name')(fieldValue);
                } else if (fieldName === 'message') {
                    validationResult = this.validators.get('minLength')(fieldValue, 10);
                    if (validationResult.isValid) {
                        validationResult = this.validators.get('maxLength')(fieldValue, 1000);
                    }
                }
        }
        
        if (!validationResult.isValid) {
            this.showFieldError(field, validationResult.message);
            return false;
        }
        
        this.clearFieldError(field);
        return true;
    }
    
    // ===== FORM VALIDATION =====
    validateForm(form) {
        const fields = form.querySelectorAll('.form-input, .form-textarea, .form-select');
        let isValid = true;
        
        fields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    // ===== CONTACT FORM SUBMISSION =====
    async handleContactSubmission(form) {
        if (this.submissionInProgress) return;
        
        // Validate form
        if (!this.validateForm(form)) {
            this.showFormError(form, 'Please correct the errors above and try again.');
            return;
        }
        
        // Collect form data
        const formData = this.collectFormData(form);
        
        // Show loading state
        this.setSubmissionState(form, true);
        
        try {
            // Send form data
            const response = await this.submitContactForm(formData);
            
            if (response.success) {
                this.showFormSuccess(form, 'Thank you for your message! I\'ll get back to you within 24 hours.');
                form.reset();
                
                // Track successful submission
                this.trackEvent('contact_form_submitted', {
                    service: formData.service,
                    budget: formData.budget,
                    timeline: formData.timeline
                });
            } else {
                throw new Error(response.message || 'Failed to send message');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            this.showFormError(form, 'There was an error sending your message. Please try again or contact me directly at contact@edgewoodpark.io');
        } finally {
            this.setSubmissionState(form, false);
        }
    }
    
    // ===== NEWSLETTER FORM SUBMISSION =====
    async handleNewsletterSubmission(form) {
        if (this.submissionInProgress) return;
        
        const emailInput = form.querySelector('input[type="email"]');
        if (!this.validateField(emailInput)) return;
        
        this.setSubmissionState(form, true);
        
        try {
            const response = await this.submitNewsletterForm({
                email: emailInput.value
            });
            
            if (response.success) {
                this.showFormSuccess(form, 'Thank you for subscribing! Check your email for confirmation.');
                form.reset();
                
                // Track successful subscription
                this.trackEvent('newsletter_subscribed', {
                    email: emailInput.value
                });
            } else {
                throw new Error(response.message || 'Failed to subscribe');
            }
        } catch (error) {
            console.error('Newsletter submission error:', error);
            this.showFormError(form, 'There was an error subscribing you to the newsletter. Please try again.');
        } finally {
            this.setSubmissionState(form, false);
        }
    }
    
    // ===== FORM DATA COLLECTION =====
    collectFormData(form) {
        const formData = new FormData(form);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        // Add timestamp
        data.timestamp = new Date().toISOString();
        
        // Add page information
        data.page = window.location.pathname;
        data.referrer = document.referrer;
        
        return data;
    }
    
    // ===== FORM SUBMISSION METHODS =====
    async submitContactForm(data) {
        // In a real application, this would send to your backend
        // For now, we'll simulate the submission
        
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    }
    
    async submitNewsletterForm(data) {
        // In a real application, this would integrate with your email service
        // For now, we'll simulate the submission
        
        const response = await fetch('/api/newsletter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    }
    
    // ===== UI STATE MANAGEMENT =====
    setSubmissionState(form, isSubmitting) {
        this.submissionInProgress = isSubmitting;
        
        const submitButton = form.querySelector('button[type="submit"]');
        const buttonText = submitButton.querySelector('.button-text');
        const buttonLoading = submitButton.querySelector('.button-loading');
        
        if (isSubmitting) {
            submitButton.disabled = true;
            submitButton.classList.add('loading');
            if (buttonText) buttonText.style.display = 'none';
            if (buttonLoading) buttonLoading.style.display = 'flex';
        } else {
            submitButton.disabled = false;
            submitButton.classList.remove('loading');
            if (buttonText) buttonText.style.display = 'inline';
            if (buttonLoading) buttonLoading.style.display = 'none';
        }
    }
    
    showFieldError(field, message) {
        const formGroup = field.closest('.form-group');
        const errorElement = formGroup.querySelector('.form-error');
        
        formGroup.classList.add('error');
        field.setAttribute('aria-invalid', 'true');
        field.setAttribute('aria-describedby', errorElement.id || `${field.name}-error`);
        
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
            errorElement.setAttribute('role', 'alert');
        }
        
        // Add shake animation
        field.classList.add('shake');
        setTimeout(() => field.classList.remove('shake'), 500);
    }
    
    clearFieldError(field) {
        const formGroup = field.closest('.form-group');
        const errorElement = formGroup.querySelector('.form-error');
        
        formGroup.classList.remove('error');
        field.removeAttribute('aria-invalid');
        field.removeAttribute('aria-describedby');
        
        if (errorElement) {
            errorElement.classList.remove('show');
            errorElement.removeAttribute('role');
        }
    }
    
    showFormSuccess(form, message) {
        const successElement = form.querySelector('.form-success');
        const errorElement = form.querySelector('.form-error-message');
        
        if (errorElement) {
            errorElement.classList.remove('show');
        }
        
        if (successElement) {
            const messageElement = successElement.querySelector('.success-message p, h4 + p');
            if (messageElement) {
                messageElement.textContent = message;
            }
            successElement.classList.add('show');
            successElement.setAttribute('role', 'alert');
            
            // Auto-hide after 5 seconds
            setTimeout(() => {
                successElement.classList.remove('show');
                successElement.removeAttribute('role');
            }, 5000);
        }
        
        // Scroll to success message
        successElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    showFormError(form, message) {
        const errorElement = form.querySelector('.form-error-message');
        const successElement = form.querySelector('.form-success');
        
        if (successElement) {
            successElement.classList.remove('show');
        }
        
        if (errorElement) {
            const messageElement = errorElement.querySelector('.error-message p, h4 + p');
            if (messageElement) {
                messageElement.textContent = message;
            }
            errorElement.classList.add('show');
            errorElement.setAttribute('role', 'alert');
            
            // Auto-hide after 8 seconds
            setTimeout(() => {
                errorElement.classList.remove('show');
                errorElement.removeAttribute('role');
            }, 8000);
        }
        
        // Scroll to error message
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    // ===== KEYBOARD NAVIGATION =====
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const activeElement = document.activeElement;
                
                // Submit form if Enter is pressed on submit button
                if (activeElement && activeElement.type === 'submit') {
                    activeElement.click();
                }
                
                // Move to next field if Enter is pressed on input (except textarea)
                if (activeElement && activeElement.matches('input:not([type="submit"]), select')) {
                    const form = activeElement.closest('form');
                    const fields = form.querySelectorAll('input, textarea, select, button');
                    const currentIndex = Array.from(fields).indexOf(activeElement);
                    
                    if (currentIndex < fields.length - 1) {
                        fields[currentIndex + 1].focus();
                    }
                }
            }
        });
    }
    
    // ===== ACCESSIBILITY =====
    setupAccessibility() {
        // Add ARIA labels to form fields
        const formFields = document.querySelectorAll('.form-input, .form-textarea, .form-select');
        
        formFields.forEach(field => {
            const label = field.closest('.form-group').querySelector('.form-label');
            if (label && !field.getAttribute('aria-label')) {
                field.setAttribute('aria-label', label.textContent);
            }
            
            // Add required indicator for screen readers
            if (field.hasAttribute('required')) {
                const currentLabel = field.getAttribute('aria-label') || '';
                field.setAttribute('aria-label', currentLabel + ' (required)');
            }
        });
        
        // Announce form errors to screen readers
        const errorElements = document.querySelectorAll('.form-error');
        errorElements.forEach((error, index) => {
            if (!error.id) {
                error.id = `form-error-${index}`;
            }
        });
    }
    
    // ===== UTILITY FUNCTIONS =====
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    trackEvent(eventName, properties = {}) {
        // Track form interactions for analytics
        if (typeof window.gtag === 'function') {
            window.gtag('event', eventName, properties);
        }
        
        // Console log for development
        console.log('Form Event:', eventName, properties);
    }
    
    // ===== SPAM PROTECTION =====
    async checkSpam(data) {
        // Simple spam checks
        const spamKeywords = ['viagra', 'cialis', 'loan', 'casino', 'bitcoin', 'crypto'];
        const messageContent = (data.message || '').toLowerCase();
        
        for (const keyword of spamKeywords) {
            if (messageContent.includes(keyword)) {
                return { isSpam: true, reason: 'Spam keywords detected' };
            }
        }
        
        // Check for too many links
        const linkCount = (messageContent.match(/http/g) || []).length;
        if (linkCount > 3) {
            return { isSpam: true, reason: 'Too many links' };
        }
        
        return { isSpam: false };
    }
    
    // ===== FORM ANALYTICS =====
    trackFormInteraction(formName, action, field = null) {
        const data = {
            form: formName,
            action: action,
            timestamp: new Date().toISOString(),
            page: window.location.pathname
        };
        
        if (field) {
            data.field = field;
        }
        
        this.trackEvent('form_interaction', data);
    }
    
    // ===== CLEANUP =====
    destroy() {
        this.forms.clear();
        this.validators.clear();
        this.submissionInProgress = false;
    }
}

// ===== FORM VALIDATION UTILITIES =====
const FormValidation = {
    patterns: {
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        phone: /^[\+]?[1-9][\d]{0,15}$/,
        url: /^https?:\/\/[^\s$.?#].[^\s]*$/i,
        name: /^[a-zA-Z\s\-\'\.]+$/
    },
    
    sanitize: {
        html: (str) => str.replace(/[&<>"']/g, (match) => {
            const htmlEntities = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;'
            };
            return htmlEntities[match];
        }),
        
        sql: (str) => str.replace(/['";\\]/g, ''),
        
        trim: (str) => str.trim().replace(/\s+/g, ' ')
    },
    
    checkPasswordStrength: (password) => {
        const checks = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /\d/.test(password),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
        };
        
        const score = Object.values(checks).filter(Boolean).length;
        
        return {
            score: score,
            strength: score < 3 ? 'weak' : score < 5 ? 'medium' : 'strong',
            checks: checks
        };
    }
};

// ===== INITIALIZE FORM HANDLER =====
document.addEventListener('DOMContentLoaded', () => {
    const formHandler = new FormHandler();
    
    // Make available globally for debugging
    window.formHandler = formHandler;
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        formHandler.destroy();
    });
});

// ===== EXPORT FOR TESTING =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        FormHandler,
        FormValidation
    };
}
