# Online Course Setup Guide

This guide will help you set up the online course platform with Stripe payment integration.

## Prerequisites

- Node.js 16+ installed
- A Supabase account
- A Stripe account

## Step 1: Install Dependencies

Dependencies have already been installed, but if you need to reinstall:

```bash
npm install
```

## Step 2: Set Up Supabase Database

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Create a new project or select an existing one
3. Navigate to the SQL Editor
4. Run the SQL commands from `docs/DATABASE_SCHEMA.md` to create the required tables:
   - `course_purchases`
   - `course_access`
   - `course_videos`

## Step 3: Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

2. Fill in your credentials:

### Supabase

- `NEXT_PUBLIC_SUPABASE_URL`: Found in Project Settings > API > Project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Found in Project Settings > API > Project API keys (anon/public)
- `SUPABASE_SERVICE_ROLE_KEY`: Found in Project Settings > API > Project API keys (service_role)
  ⚠️ **Important**: Keep the service role key secret! Never expose it in client-side code.

### Stripe

- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Found in Stripe Dashboard > Developers > API keys
- `STRIPE_SECRET_KEY`: Found in Stripe Dashboard > Developers > API keys
- `STRIPE_WEBHOOK_SECRET`: Will be created in Step 4

### App URL

- `NEXT_PUBLIC_APP_URL`: Your application URL (http://localhost:3000 for local development)

## Step 4: Set Up Stripe Webhooks

Stripe webhooks are required to automatically grant course access after payment.

### For Local Development

1. Install Stripe CLI:

```bash
# macOS
brew install stripe/stripe-cli/stripe

# Windows
scoop install stripe

# Linux
# Download from https://github.com/stripe/stripe-cli/releases/latest
```

2. Login to Stripe CLI:

```bash
stripe login
```

3. Forward webhooks to your local server:

```bash
stripe listen --forward-to localhost:3000/api/webhook
```

4. Copy the webhook signing secret (starts with `whsec_`) and add it to `.env.local` as `STRIPE_WEBHOOK_SECRET`

### For Production

1. Go to Stripe Dashboard > Developers > Webhooks
2. Click "Add endpoint"
3. Set the endpoint URL to: `https://yourdomain.com/api/webhook`
4. Select events to listen to:
   - `checkout.session.completed`
5. Copy the webhook signing secret and add it to your production environment variables

## Step 5: Add Course Videos

You can add course videos through the Supabase dashboard or by creating a migration:

```sql
INSERT INTO course_videos (course_id, title, description, video_url, duration, order_index, is_free_preview)
VALUES
  ('playwright-mcp', 'Introduction to Playwright MCP', 'Learn the basics of Model Context Protocol', 'https://vimeo.com/your-video-id', 600, 1, true),
  ('playwright-mcp', 'Setting Up Your Environment', 'Configure your development environment', 'https://vimeo.com/your-video-id', 900, 2, false);
```

### Video Hosting Options

1. **Vimeo** (Recommended for paid courses)

   - Privacy controls
   - Good player
   - Embed support
   - Example URL: `https://player.vimeo.com/video/VIDEO_ID`

2. **YouTube (Unlisted)**

   - Free hosting
   - Less control
   - Example URL: `https://www.youtube.com/embed/VIDEO_ID`

3. **Custom Storage** (S3, Cloudflare R2, etc.)
   - Full control
   - Requires video player implementation
   - Consider using HLS or DASH for better streaming

## Step 6: Test the Integration

1. Start your development server:

```bash
npm run dev
```

2. In a separate terminal, start the Stripe CLI webhook forwarding:

```bash
stripe listen --forward-to localhost:3000/api/webhook
```

3. Navigate to http://localhost:3000/courses

4. Use Stripe test cards:

   - Success: `4242 4242 4242 4242`
   - Decline: `4000 0000 0000 0002`
   - Any future expiry date
   - Any 3-digit CVC

5. Complete a test purchase and verify:
   - Redirected to success page
   - Database records created in `course_purchases` and `course_access`
   - Can access course videos at `/course/playwright-mcp`

## Step 7: Deploy to Production

1. Deploy your application (Vercel, Netlify, etc.)

2. Set up environment variables in your hosting platform

3. Configure production Stripe webhook (see Step 4)

4. Update `NEXT_PUBLIC_APP_URL` to your production domain

5. Test with Stripe test mode first, then switch to live mode

## Security Best Practices

1. **Never commit `.env.local`** - It's already in `.gitignore`
2. **Use different Stripe keys** for test and production
3. **Keep service role key secure** - Only use on server-side
4. **Verify webhook signatures** - Already implemented in `/api/webhook`
5. **Validate user input** - Already implemented in API routes

## Troubleshooting

### Webhook not receiving events

- Check Stripe CLI is running
- Verify webhook secret is correct
- Check server logs for errors

### Payment successful but no access granted

- Check webhook endpoint is receiving events
- Verify Supabase credentials
- Check server logs in `/api/webhook`

### Videos not loading

- Verify video URLs are correct
- Check video hosting service allows embedding
- Verify user has access in `course_access` table

## Support

For issues or questions:

- Check server logs for detailed error messages
- Verify all environment variables are set correctly
- Ensure database tables are created properly
- Test with Stripe test mode before going live

## Next Steps

1. Customize course content and pricing
2. Add more courses by following the same pattern
3. Implement email notifications (use Resend, SendGrid, etc.)
4. Add course completion tracking
5. Implement certificates generation
6. Add user dashboard for managing purchases
