# System Architecture - Online Course Platform

## 🏗️ High-Level Architecture

```
┌─────────────┐
│   Browser   │
│   (User)    │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────────────┐
│         Next.js Application             │
│  ┌─────────────────────────────────┐   │
│  │         Pages Layer             │   │
│  │  • /courses                     │   │
│  │  • /course/[courseId]           │   │
│  │  • /payment/success             │   │
│  │  • /payment/cancel              │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │        API Routes               │   │
│  │  • /api/checkout                │   │
│  │  • /api/webhook                 │   │
│  │  • /api/verify-access           │   │
│  │  • /api/get-videos              │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │         Utilities               │   │
│  │  • courseHelpers.js             │   │
│  └─────────────────────────────────┘   │
└───────┬─────────────────┬───────────────┘
        │                 │
        ▼                 ▼
┌───────────────┐   ┌──────────────┐
│    Stripe     │   │   Supabase   │
│   (Payment)   │   │  (Database)  │
└───────────────┘   └──────────────┘
```

---

## 🔄 User Purchase Flow

```
┌──────────────────────────────────────────────────────────────┐
│                    PURCHASE FLOW                             │
└──────────────────────────────────────────────────────────────┘

1. User Action                 2. Frontend                3. Backend
┌─────────────┐               ┌─────────────┐           ┌─────────────┐
│  Browse     │──────────────▶│  Display    │           │             │
│  /courses   │               │  Courses    │           │             │
└─────────────┘               └─────────────┘           │             │
                                     │                   │             │
┌─────────────┐               ┌─────────────┐           │             │
│  Enter      │──────────────▶│  Validate   │           │             │
│  Email      │               │  Email      │           │             │
└─────────────┘               └─────────────┘           │             │
                                     │                   │             │
┌─────────────┐               ┌─────────────┐           ┌─────────────┐
│  Click      │──────────────▶│  POST to    │──────────▶│  Create     │
│  Buy Now    │               │  /checkout  │           │  Session    │
└─────────────┘               └─────────────┘           └─────────────┘
                                     │                          │
                                     │                          │
                              ┌─────────────┐                  │
                              │  Redirect   │◀─────────────────┘
                              │  to Stripe  │
                              └─────────────┘
                                     │
                              ┌──────▼──────────────────┐
                              │   Stripe Checkout       │
                              │   (External)            │
                              └─────────────────────────┘
                                     │
                    ┌────────────────┴────────────────┐
                    │                                 │
             ┌──────▼──────┐                  ┌──────▼──────┐
             │   Success   │                  │   Cancel    │
             └─────────────┘                  └─────────────┘
                    │                                 │
             ┌──────▼──────────┐              ┌──────▼──────┐
             │  Stripe Webhook │              │  Cancel     │
             │  to /api/webhook│              │  Page       │
             └─────────────────┘              └─────────────┘
                    │
             ┌──────▼──────────┐
             │  Grant Access   │
             │  in Database    │
             └─────────────────┘
                    │
             ┌──────▼──────────┐
             │  Success Page   │
             │  + Course Link  │
             └─────────────────┘
```

---

## 🗄️ Database Schema Relationships

```
┌─────────────────────────────────────────────────────────────┐
│                      DATABASE SCHEMA                        │
└─────────────────────────────────────────────────────────────┘

┌───────────────────────┐
│   course_purchases    │
│─────────────────────────
│ id (PK)              │
│ email                │◀──────────┐
│ course_id            │           │
│ stripe_session_id    │           │
│ stripe_payment_intent│           │  References
│ amount_paid          │           │
│ status               │           │
│ created_at           │           │
└───────────┬───────────┘           │
            │                       │
            │ Referenced by         │
            │ (purchase_id)         │
            │                       │
            ▼                       │
┌───────────────────────┐           │
│    course_access      │           │
│─────────────────────────           │
│ id (PK)              │           │
│ email                │───────────┘
│ course_id            │◀──────────┐
│ purchase_id (FK)     │           │
│ is_active            │           │
│ expires_at           │           │
│ created_at           │           │
└───────────────────────┘           │
                                    │
                                    │ Matches on
                                    │ course_id
                                    │
┌───────────────────────┐           │
│    course_videos      │           │
│─────────────────────────           │
│ id (PK)              │           │
│ course_id            │───────────┘
│ title                │
│ description          │
│ video_url            │
│ duration             │
│ order_index          │
│ is_free_preview      │
│ created_at           │
└───────────────────────┘
```

---

## 🔐 Access Control Flow

```
┌──────────────────────────────────────────────────────────────┐
│                   ACCESS VERIFICATION                        │
└──────────────────────────────────────────────────────────────┘

User requests /course/playwright-mcp
         │
         ▼
┌─────────────────┐
│ Is email stored │ ──No──▶ Show email input form
│ in localStorage?│
└────────┬────────┘
         │ Yes
         ▼
┌─────────────────┐
│ POST to         │
│ /api/verify-    │
│ access          │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Query Supabase  │
│ course_access   │
│ table           │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Access found?   │ ──No──▶ Show purchase CTA
└────────┬────────┘
         │ Yes
         ▼
┌─────────────────┐
│ Is active &     │ ──No──▶ Show expired message
│ not expired?    │
└────────┬────────┘
         │ Yes
         ▼
┌─────────────────┐
│ Grant access    │
│ Show videos     │
└─────────────────┘
```

---

## 📡 API Endpoints Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                     API ENDPOINTS                            │
└──────────────────────────────────────────────────────────────┘

POST /api/checkout
├─ Input: { courseId, email }
├─ Process:
│  ├─ Validate input
│  ├─ Get course price
│  ├─ Create Stripe session
│  └─ Return session URL
└─ Output: { sessionId, url }

POST /api/webhook
├─ Input: Stripe webhook event
├─ Process:
│  ├─ Verify signature
│  ├─ Extract session data
│  ├─ Insert purchase record
│  ├─ Grant course access
│  └─ Log success
└─ Output: { received: true }

POST /api/verify-access
├─ Input: { email, courseId }
├─ Process:
│  ├─ Validate input
│  ├─ Query course_access table
│  ├─ Check expiration
│  └─ Return access status
└─ Output: { hasAccess, access }

GET /api/get-videos
├─ Input: ?courseId=X&email=Y
├─ Process:
│  ├─ Verify user access
│  ├─ Query course_videos
│  ├─ Filter based on access
│  └─ Return video list
└─ Output: { videos, hasAccess }
```

---

## 🎬 Video Delivery Flow

```
┌──────────────────────────────────────────────────────────────┐
│                   VIDEO DELIVERY                             │
└──────────────────────────────────────────────────────────────┘

User opens course player
         │
         ▼
┌─────────────────┐
│ Verify access   │
│ (see above)     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ GET /api/       │
│ get-videos      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Query videos    │
│ from database   │
└────────┬────────┘
         │
         ├──────────────┐
         │              │
         ▼              ▼
┌─────────────┐  ┌──────────────┐
│ Has access? │  │ Free preview?│
│ Return all  │  │ Return       │
│ videos      │  │ limited info │
└─────────────┘  └──────────────┘
         │              │
         └──────┬───────┘
                ▼
┌─────────────────────────┐
│ Display in UI:          │
│ • Unlocked videos ✓     │
│ • Locked videos 🔒      │
│ • Free previews FREE    │
└─────────────────────────┘
         │
         ▼
┌─────────────────────────┐
│ User clicks video       │
└──────────┬──────────────┘
           │
    ┌──────┴──────┐
    │             │
    ▼             ▼
Locked?      Unlocked?
 │               │
 │               ▼
 │         ┌──────────────┐
 │         │ Load video   │
 │         │ from hosting │
 │         │ (Vimeo/etc)  │
 │         └──────────────┘
 │
 ▼
Show lock icon
+ purchase CTA
```

---

## 🔄 Webhook Processing Flow

```
┌──────────────────────────────────────────────────────────────┐
│                  WEBHOOK PROCESSING                          │
└──────────────────────────────────────────────────────────────┘

Stripe sends webhook event
         │
         ▼
┌─────────────────┐
│ POST /api/      │
│ webhook         │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Verify          │
│ signature       │◀─── Uses STRIPE_WEBHOOK_SECRET
└────────┬────────┘
         │
         ├─── Invalid ──▶ Return 400 error
         │
         ▼ Valid
┌─────────────────┐
│ Parse event     │
│ type            │
└────────┬────────┘
         │
         ├─── checkout.session.completed
         │
         ▼
┌─────────────────┐
│ Extract data:   │
│ • email         │
│ • courseId      │
│ • amount        │
│ • session_id    │
└────────┬────────┘
         │
         ▼
┌─────────────────────────┐
│ Insert into             │
│ course_purchases:       │
│ ┌─────────────────────┐ │
│ │ email               │ │
│ │ course_id           │ │
│ │ stripe_session_id   │ │
│ │ amount_paid         │ │
│ │ status: 'completed' │ │
│ └─────────────────────┘ │
└──────────┬──────────────┘
           │
           ▼
┌─────────────────────────┐
│ Insert into             │
│ course_access:          │
│ ┌─────────────────────┐ │
│ │ email               │ │
│ │ course_id           │ │
│ │ purchase_id         │ │
│ │ is_active: true     │ │
│ │ expires_at: null    │ │
│ └─────────────────────┘ │
└──────────┬──────────────┘
           │
           ▼
┌─────────────────┐
│ Log success     │
│ Return 200 OK   │
└─────────────────┘
```

---

## 🌐 Component Hierarchy

```
┌──────────────────────────────────────────────────────────────┐
│                   COMPONENT STRUCTURE                        │
└──────────────────────────────────────────────────────────────┘

App (_app.js)
└── Layout
    └── Pages
        │
        ├── courses.js
        │   ├── Course Cards
        │   │   ├── Hosted (with checkout)
        │   │   │   ├── Email Input
        │   │   │   ├── Buy Button
        │   │   │   └── View Details Button
        │   │   └── External (with link)
        │   ├── Reviews Slider
        │   └── Statistics
        │
        ├── course/[courseId].js
        │   ├── Access Verification Form
        │   ├── Video Player
        │   │   └── iframe (Vimeo/YouTube)
        │   ├── Course Content Sidebar
        │   │   └── Video List
        │   │       ├── Free Preview Videos
        │   │       ├── Locked Videos
        │   │       └── Unlocked Videos
        │   └── Course Details
        │
        ├── payment/success.js
        │   ├── Success Icon
        │   ├── Thank You Message
        │   ├── Next Steps
        │   └── Access Course Button
        │
        └── payment/cancel.js
            ├── Cancel Icon
            ├── Cancel Message
            ├── Try Again Button
            └── Go Home Button
```

---

## 🔌 External Service Integration

```
┌──────────────────────────────────────────────────────────────┐
│                  EXTERNAL SERVICES                           │
└──────────────────────────────────────────────────────────────┘

┌─────────────────┐
│   Stripe API    │
│─────────────────│
│ • Create        │
│   checkout      │
│   session       │
│ • Send webhooks │
│ • Process       │
│   payments      │
│ • Manage        │
│   refunds       │
└─────────────────┘
         ▲
         │ API calls
         │
┌────────┴──────────────────────────────────────┐
│         Next.js Application                   │
│  • /api/checkout (creates sessions)          │
│  • /api/webhook (receives events)            │
└────────┬──────────────────────────────────────┘
         │
         │ Database queries
         ▼
┌─────────────────┐
│  Supabase API   │
│─────────────────│
│ • Store         │
│   purchases     │
│ • Manage        │
│   access        │
│ • Serve video   │
│   metadata      │
└─────────────────┘

┌─────────────────┐
│  Video Hosting  │
│─────────────────│
│ • Vimeo         │
│ • YouTube       │
│ • Custom CDN    │
└────────┬────────┘
         │
         │ Embedded in
         │
┌────────▼────────┐
│  Course Player  │
│  (/course/*)    │
└─────────────────┘
```

---

## 📊 Data Flow Summary

```
┌──────────────────────────────────────────────────────────────┐
│                     DATA FLOW                                │
└──────────────────────────────────────────────────────────────┘

User Input (Email, Payment)
         │
         ▼
Frontend Validation
         │
         ▼
API Routes (Next.js)
         │
         ├──────────┐
         │          │
         ▼          ▼
    Stripe API   Supabase DB
         │          │
         │          ▼
         │     Store Records
         │          │
         ▼          │
    Process        │
    Payment        │
         │          │
         ▼          │
    Send Webhook ──┘
         │
         ▼
    Grant Access
         │
         ▼
    User Can Watch Videos
```

---

## 🔒 Security Layers

```
┌──────────────────────────────────────────────────────────────┐
│                   SECURITY LAYERS                            │
└──────────────────────────────────────────────────────────────┘

Layer 1: Client-Side
├─ Email validation
├─ Form validation
└─ Basic input sanitization

Layer 2: API Routes
├─ Server-side validation
├─ Type checking
├─ Error handling
└─ Rate limiting (optional)

Layer 3: Stripe
├─ PCI compliance
├─ Card data encryption
├─ Fraud detection
└─ 3D Secure support

Layer 4: Webhook Verification
├─ Signature verification
├─ Event validation
└─ Duplicate prevention

Layer 5: Database
├─ Parameterized queries
├─ Access control
├─ Row Level Security (optional)
└─ Encrypted connections

Layer 6: Environment
├─ Secret key management
├─ HTTPS enforcement
├─ CORS configuration
└─ CSP headers
```

---

## 📈 Scalability Considerations

```
Current Implementation:
├─ Handles: ~1000 concurrent users
├─ Database: Supabase free tier (500MB)
├─ API: Serverless (auto-scaling)
└─ Video: External hosting (CDN)

Scaling Options:

For 10,000+ users:
├─ Database: Upgrade Supabase tier
├─ Caching: Add Redis/Vercel KV
├─ CDN: Cloudflare for assets
└─ Monitoring: Error tracking (Sentry)

For 100,000+ users:
├─ Database: Database replicas
├─ Queue: Job queue for webhooks
├─ Search: Elasticsearch for content
└─ Analytics: Dedicated analytics DB
```

---

## 🎯 Performance Optimization

```
Frontend:
├─ Next.js SSG for static pages
├─ Image optimization (next/image)
├─ Code splitting
├─ Lazy loading
└─ Asset compression

Backend:
├─ API response caching
├─ Database query optimization
├─ Connection pooling
└─ Serverless edge functions

Video:
├─ Adaptive bitrate streaming
├─ CDN delivery
├─ Video compression
└─ Thumbnail generation
```

---

This architecture provides a **solid foundation** for your online course platform with room to **scale as needed**!
