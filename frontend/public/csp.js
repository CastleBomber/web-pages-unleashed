// Content Security Policy configuration
const cspConfig = {
  development: {
    'script-src': ["'self'", "'unsafe-eval'", "'unsafe-inline'", "https:"],
    'object-src': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"]
  },
  production: {
    'script-src': ["'self'", "https:"],
    'object-src': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
    'style-src': ["'self'", "'unsafe-inline'", "https:"],
    'img-src': ["'self'", "data:", "https:"],
    'connect-src': ["'self'", "https:"]
  }
};

// Function to generate CSP header
function generateCSP(environment = 'development') {
  const config = cspConfig[environment];
  return Object.entries(config)
    .map(([key, values]) => `${key} ${values.join(' ')}`)
    .join('; ');
}

// Export for use in server configuration
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { generateCSP, cspConfig };
} 