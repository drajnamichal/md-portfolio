# Online Course Platform - Complete Implementation Guide

## 🎯 Overview

Your portfolio now includes a fully functional online course platform with:

- ✅ Stripe payment integration
- ✅ Supabase database backend
- ✅ Video course player
- ✅ Access control system
- ✅ Responsive design
- ✅ Production-ready code

## 📁 What Was Created

### New Pages

1. **`/courses`** - Enhanced course catalog with checkout
2. **`/course/[courseId]`** - Course player with video access
3. **`/payment/success`** - Payment confirmation page
4. **`/payment/cancel`** - Payment cancellation page

### API Routes

1. **`/api/checkout`** - Creates Stripe checkout session
2. **`/api/webhook`** - Handles Stripe webhooks
3. **`/api/verify-access`** - Verifies user course access
4. **`/api/get-videos`** - Retrieves course videos

### Utilities

1. **`utils/courseHelpers.js`** - Helper functions for course management

### Documentation

1. **`docs/DATABASE_SCHEMA.md`** - Database structure
2. **`docs/COURSE_SETUP.md`** - Detailed setup instructions
3. **`docs/FEATURES.md`** - Feature documentation
4. **`docs/TESTING.md`** - Testing guide
5. **`docs/sample_course_data.sql`** - Sample data script
6. **`env.local.example`** - Environment variables template

## 🚀 Quick Start (5 Minutes)

### 1. Install Dependencies

```bash
npm install
```

Dependencies added:

- `stripe` - Payment processing
- `@stripe/stripe-js` - Stripe client SDK

### 2. Set Up Environment Variables

```bash
cp env.local.example .env.local
```

Fill in these required values:

```env
# Get from Supabase Dashboard
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Get from Stripe Dashboard
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Your app URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Set Up Database

In your Supabase SQL Editor, run the SQL from `docs/DATABASE_SCHEMA.md`:

```sql
-- Creates three tables:
-- 1. course_purchases
-- 2. course_access
-- 3. course_videos
```

### 4. Add Sample Course Data

Run the SQL from `docs/sample_course_data.sql` to populate video content.

### 5. Start Development Server

Terminal 1:

```bash
npm run dev
```

Terminal 2 (for webhooks):

```bash
stripe listen --forward-to localhost:3000/api/webhook
```

### 6. Test It Out

1. Visit http://localhost:3000/courses
2. Enter test email: `test@example.com`
3. Click "Buy Now"
4. Use test card: `4242 4242 4242 4242`
5. Complete checkout
6. Access your course!

## 💳 Stripe Test Cards

| Card                | Scenario                |
| ------------------- | ----------------------- |
| 4242 4242 4242 4242 | Success                 |
| 4000 0000 0000 0002 | Decline                 |
| 4000 0025 0000 3155 | Requires authentication |

Any future expiry date and any 3-digit CVC works.

## 📊 Database Tables

### course_purchases

Tracks all purchases with Stripe details.

```
- id (UUID)
- email (VARCHAR)
- course_id (VARCHAR)
- stripe_session_id (VARCHAR)
- amount_paid (INTEGER)
- status (VARCHAR)
- created_at (TIMESTAMP)
```

### course_access

Manages user access to courses.

```
- id (UUID)
- email (VARCHAR)
- course_id (VARCHAR)
- purchase_id (UUID)
- is_active (BOOLEAN)
- expires_at (TIMESTAMP)
```

### course_videos

Stores video content.

```
- id (UUID)
- course_id (VARCHAR)
- title (VARCHAR)
- description (TEXT)
- video_url (TEXT)
- duration (INTEGER)
- order_index (INTEGER)
- is_free_preview (BOOLEAN)
```

## 🎥 Video Hosting

The platform supports multiple video hosting options:

### Option 1: Vimeo (Recommended)

- Best for paid courses
- Privacy controls
- Professional player
- URL format: `https://player.vimeo.com/video/VIDEO_ID`

### Option 2: YouTube

- Free hosting
- Unlisted videos
- URL format: `https://www.youtube.com/embed/VIDEO_ID`

### Option 3: Custom Storage

- S3, Cloudflare R2, etc.
- Full control
- Requires player implementation

## 🔒 Security Features

1. **Payment Security**

   - Stripe handles all card data
   - No card information stored
   - PCI compliant by default

2. **Webhook Verification**

   - Signature verification
   - Prevents unauthorized access grants

3. **Access Control**

   - Email-based verification
   - Server-side validation
   - Protected API endpoints

4. **Environment Variables**
   - Sensitive keys not exposed
   - Service role key server-only

## 💰 Pricing Configuration

To change course price, update in TWO places:

**1. Course Display** (`pages/courses.js`):

```javascript
{
  title: 'Playwright MCP Mastery',
  price: 99,  // Change this
  courseId: 'playwright-mcp',
  // ...
}
```

**2. Checkout API** (`pages/api/checkout.js`):

```javascript
const coursePrices = {
  'playwright-mcp': {
    price: 9900, // Change this (in cents)
    name: 'Playwright MCP Mastery Course',
    description: '...',
  },
};
```

## 🎨 Customization

### Add More Courses

1. Add course to array in `pages/courses.js`
2. Add videos to database
3. Add pricing to `api/checkout.js`
4. Create course player route (optional if using dynamic route)

### Change Design

All styling uses Tailwind CSS. Colors use the teal theme:

- Primary: `teal-600`
- Hover: `teal-700`
- Light: `teal-50`

### Add Features

See `docs/FEATURES.md` for ideas:

- User accounts
- Certificates
- Progress tracking
- Discussion forums
- Course reviews

## 🧪 Testing

See `docs/TESTING.md` for comprehensive testing guide.

Quick smoke test:

```bash
# 1. Start dev server
npm run dev

# 2. Start webhook forwarding
stripe listen --forward-to localhost:3000/api/webhook

# 3. Test purchase
# Visit http://localhost:3000/courses
# Use test card 4242 4242 4242 4242
```

## 📦 Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Environment Variables

Add all variables from `.env.local` to Vercel:

- Project Settings → Environment Variables
- Add each variable
- Redeploy

### Production Webhook

1. Go to Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://yourdomain.com/api/webhook`
3. Select event: `checkout.session.completed`
4. Copy webhook secret
5. Update `STRIPE_WEBHOOK_SECRET` in Vercel

### Go Live

1. Test in Stripe test mode thoroughly
2. Switch to live Stripe keys
3. Test with small amount ($0.50)
4. Refund test payment
5. Monitor first real sales

## 🐛 Troubleshooting

### Webhook not working

- Check Stripe CLI is running
- Verify webhook secret in .env.local
- Check console for errors

### Access not granted

- Check webhook received (Stripe dashboard)
- Verify database records
- Check email matches exactly

### Videos not playing

- Check video URL is correct
- Verify embed permissions
- Test video URL directly

### Checkout fails

- Check Stripe keys are correct
- Verify test mode vs live mode
- Check network tab for errors

## 📚 File Structure

```
md-portfolio/
├── pages/
│   ├── courses.js              # Enhanced with checkout
│   ├── course/
│   │   └── [courseId].js       # Course player
│   ├── payment/
│   │   ├── success.js          # Success page
│   │   └── cancel.js           # Cancel page
│   └── api/
│       ├── checkout.js         # Stripe checkout
│       ├── webhook.js          # Stripe webhooks
│       ├── verify-access.js    # Access verification
│       └── get-videos.js       # Video retrieval
├── utils/
│   └── courseHelpers.js        # Helper functions
├── docs/
│   ├── DATABASE_SCHEMA.md      # Database structure
│   ├── COURSE_SETUP.md         # Setup guide
│   ├── FEATURES.md             # Features documentation
│   ├── TESTING.md              # Testing guide
│   └── sample_course_data.sql  # Sample data
└── env.local.example           # Environment template
```

## 💡 Best Practices

### Development

- Use test mode until fully tested
- Test webhook events thoroughly
- Monitor console for errors
- Check database after each test

### Production

- Use live Stripe keys
- Set up production webhook
- Monitor error logs
- Have rollback plan

### Security

- Never commit `.env.local`
- Keep service role key secret
- Verify webhook signatures
- Validate user input

### User Experience

- Clear error messages
- Fast page loads
- Mobile-friendly design
- Easy checkout process

## 📈 Analytics & Monitoring

Track these metrics:

- Course page visits
- Checkout initiations
- Completed purchases
- Abandoned carts
- Video engagement
- User feedback

Tools to integrate:

- Google Analytics
- Stripe Dashboard
- Supabase Analytics
- Custom logging

## 🆘 Getting Help

### Resources

- [Stripe Documentation](https://stripe.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)

### Common Questions

**Q: How do I add more videos?**
A: Insert into `course_videos` table via Supabase SQL Editor.

**Q: Can I offer refunds?**
A: Yes, refund via Stripe Dashboard. Consider adding logic to revoke access.

**Q: How do I email customers?**
A: Integrate an email service (Resend, SendGrid, etc.).

**Q: Can users download videos?**
A: Depends on your video hosting service settings.

**Q: How do I add multiple courses?**
A: Add new course data and videos following the same pattern.

## ✅ Pre-Launch Checklist

Before launching:

- [ ] Database tables created
- [ ] Environment variables set
- [ ] Test purchase completed
- [ ] Webhook working
- [ ] Videos accessible
- [ ] Mobile tested
- [ ] Error handling verified
- [ ] Production webhook set up
- [ ] Live keys configured
- [ ] Terms & privacy policy added
- [ ] Customer support plan ready
- [ ] Backup strategy in place

## 🎉 You're Ready!

Your online course platform is complete and production-ready. The implementation includes:

✅ Full payment processing
✅ Video course delivery
✅ Access control
✅ Responsive design
✅ Error handling
✅ Comprehensive documentation

Start adding your course content and launch your first course!

## 📞 Next Steps

1. **Add Real Content**: Replace sample videos with actual course content
2. **Test Thoroughly**: Use the testing guide (docs/TESTING.md)
3. **Deploy**: Push to production when ready
4. **Market**: Share your course with your audience
5. **Iterate**: Gather feedback and improve

Good luck with your course! 🚀
