import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 60; // 60 requests per minute
const ipRequestMap = new Map<string, { count: number; timestamp: number }>();

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Add security headers
  const headers = response.headers;

  // HSTS
  headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');

  // XSS Protection
  headers.set('X-XSS-Protection', '1; mode=block');

  // Frame options
  headers.set('X-Frame-Options', 'DENY');

  // Content type options
  headers.set('X-Content-Type-Options', 'nosniff');

  // Referrer policy
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Permissions policy
  headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), interest-cohort=()');

  // Content Security Policy
  headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline' *.vercel-insights.com *.youtube.com *.browserstack.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self'",
      "connect-src 'self' *.vercel-insights.com",
      "frame-src 'self' *.youtube.com",
      "media-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      'upgrade-insecure-requests',
    ].join('; ')
  );

  // Basic rate limiting
  const ip = request.ip ?? 'unknown';
  const now = Date.now();
  const requestData = ipRequestMap.get(ip);

  if (requestData) {
    if (now - requestData.timestamp > RATE_LIMIT_WINDOW) {
      // Reset if window has passed
      ipRequestMap.set(ip, { count: 1, timestamp: now });
    } else if (requestData.count >= MAX_REQUESTS) {
      // Rate limit exceeded
      return new NextResponse('Too Many Requests', { status: 429 });
    } else {
      // Increment counter
      ipRequestMap.set(ip, { count: requestData.count + 1, timestamp: requestData.timestamp });
    }
  } else {
    // First request from this IP
    ipRequestMap.set(ip, { count: 1, timestamp: now });
  }

  // Clean up old entries every hour
  if (now % (60 * 60 * 1000) < 1000) {
    const hourAgo = now - 60 * 60 * 1000;
    for (const [key, value] of ipRequestMap.entries()) {
      if (value.timestamp < hourAgo) {
        ipRequestMap.delete(key);
      }
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};
