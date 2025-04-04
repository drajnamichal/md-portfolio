# API Documentation

This document outlines the API endpoints available in the portfolio website.

## Base URL

```
Production: https://michaldrajna.com/api
Development: http://localhost:3000/api
```

## Authentication

All analytics endpoints require authentication using Supabase. Include your Supabase anon key in the request headers:

```
Authorization: Bearer your_supabase_anon_key
```

## Endpoints

### Analytics

#### Get Visitor Count
```http
GET /api/analytics/visitors
```

Returns the total number of unique visitors.

**Response**
```json
{
  "total": 1234,
  "uniqueVisitors": 890
}
```

#### Track Page Visit
```http
POST /api/analytics/track
```

Records a new page visit.

**Request Body**
```json
{
  "ip": "string",
  "page": "/example",
  "userAgent": "string",
  "referrer": "string",
  "location": {
    "country": "string",
    "city": "string",
    "region": "string",
    "timezone": "string"
  }
}
```

**Response**
```json
{
  "success": true,
  "visitId": "string"
}
```

### Contact Form

#### Submit Contact Form
```http
POST /api/contact
```

Sends a contact form submission.

**Request Body**
```json
{
  "name": "string",
  "email": "string",
  "message": "string",
  "subject": "string"
}
```

**Response**
```json
{
  "success": true,
  "messageId": "string"
}
```

### Projects

#### Get Featured Projects
```http
GET /api/projects
```

Returns a list of featured projects.

**Response**
```json
{
  "projects": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "image": "string",
      "tags": ["string"],
      "url": "string"
    }
  ]
}
```

### Blog Posts

#### Get Blog Posts
```http
GET /api/posts
```

Returns a list of blog posts.

**Query Parameters**
- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Number of posts per page (default: 10)
- `tag` (optional): Filter by tag

**Response**
```json
{
  "posts": [
    {
      "id": "string",
      "title": "string",
      "excerpt": "string",
      "date": "string",
      "tags": ["string"],
      "slug": "string"
    }
  ],
  "total": 0,
  "currentPage": 1,
  "totalPages": 1
}
```

#### Get Single Post
```http
GET /api/posts/[slug]
```

Returns a single blog post by slug.

**Response**
```json
{
  "id": "string",
  "title": "string",
  "content": "string",
  "date": "string",
  "author": {
    "name": "string",
    "avatar": "string"
  },
  "tags": ["string"]
}
```

## Error Responses

All endpoints follow the same error response format:

```json
{
  "error": {
    "code": "string",
    "message": "string"
  }
}
```

Common Error Codes:
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `500`: Internal Server Error

## Rate Limiting

API requests are limited to:
- 100 requests per minute for authenticated endpoints
- 50 requests per minute for public endpoints

## Data Models

### Visitor
```typescript
{
  id: string;
  ip: string;
  timestamp: Date;
  page: string;
  userAgent: string;
  referrer?: string;
  location: {
    country?: string;
    city?: string;
    region?: string;
    timezone?: string;
  };
}
```

### Project
```typescript
{
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  url: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Post
```typescript
{
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: {
    name: string;
    avatar: string;
  };
  tags: string[];
  publishedAt: Date;
  updatedAt: Date;
}
```

## Webhooks

### Analytics Webhook
```http
POST /api/webhooks/analytics
```

Receives analytics data from external services.

**Request Headers**
```
X-Webhook-Secret: your_webhook_secret
```

**Request Body**
```json
{
  "event": "string",
  "data": {
    // Event-specific data
  }
}
```

## Development

To run the API locally:

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env.local
```

3. Start the development server:
```bash
npm run dev
```

## Testing

Run API tests:
```bash
npm run test:api
```

## Changelog

### v1.0.0 (2024-01-01)
- Initial API release
- Added visitor analytics endpoints
- Added contact form endpoint
- Added project and blog post endpoints 