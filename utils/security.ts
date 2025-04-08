import sanitizeHtml from 'sanitize-html';

// Sanitize HTML content
export const sanitizeContent = (content: string): string => {
  return sanitizeHtml(content, {
    allowedTags: [], // No HTML tags allowed
    allowedAttributes: {}, // No attributes allowed
    disallowedTagsMode: 'recursiveEscape',
  });
};

// Validate email format
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

// Validate URL format and allowed domains
export const isValidUrl = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url);
    const allowedDomains = [
      'browserstack.com',
      'skillmea.sk',
      'youtube.com',
      'github.com',
      'linkedin.com',
      'twitter.com',
    ];
    return allowedDomains.some(domain => parsedUrl.hostname.endsWith(domain));
  } catch {
    return false;
  }
};

// Validate input length
export const isValidLength = (input: string, min: number, max: number): boolean => {
  const length = input.trim().length;
  return length >= min && length <= max;
};

// Escape special characters
export const escapeHtml = (text: string): string => {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, m => map[m]);
};

// Validate file type
export const isValidFileType = (filename: string, allowedTypes: string[]): boolean => {
  const extension = filename.split('.').pop()?.toLowerCase();
  return extension ? allowedTypes.includes(extension) : false;
};

// Rate limiting helper
export class RateLimiter {
  private requests: Map<string, { count: number; timestamp: number }> = new Map();
  private readonly windowMs: number;
  private readonly maxRequests: number;

  constructor(windowMs: number = 60000, maxRequests: number = 60) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
  }

  isRateLimited(key: string): boolean {
    const now = Date.now();
    const requestData = this.requests.get(key);

    if (!requestData) {
      this.requests.set(key, { count: 1, timestamp: now });
      return false;
    }

    if (now - requestData.timestamp > this.windowMs) {
      this.requests.set(key, { count: 1, timestamp: now });
      return false;
    }

    if (requestData.count >= this.maxRequests) {
      return true;
    }

    this.requests.set(key, {
      count: requestData.count + 1,
      timestamp: requestData.timestamp,
    });
    return false;
  }

  cleanup(): void {
    const now = Date.now();
    Array.from(this.requests.entries()).forEach(([key, value]) => {
      if (now - value.timestamp > this.windowMs) {
        this.requests.delete(key);
      }
    });
  }
}
