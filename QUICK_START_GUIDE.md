# 🚀 Quick Start Guide - Your Course Platform is Ready!

## ✅ What's Been Set Up

### Supabase Database

- ✅ **Project Created**: md-portfolio-courses
- ✅ **Region**: EU West (Ireland)
- ✅ **3 Tables Created**: course_purchases, course_access, course_videos
- ✅ **12 Sample Videos** Added for Playwright MCP course
- ✅ **Total Course Duration**: 3.2 hours
- ✅ **2 Free Preview Videos** available

---

## 📋 Next Steps (5 Minutes)

### Step 1: Add Supabase Credentials to .env.local

Open `SUPABASE_CREDENTIALS.txt` and copy the credentials to your `.env.local` file:

```bash
# Create .env.local if it doesn't exist
touch .env.local

# Copy credentials from SUPABASE_CREDENTIALS.txt
# You need to get the SERVICE_ROLE_KEY from the dashboard
```

**To get your Service Role Key:**

1. Visit: https://supabase.com/dashboard/project/tlatajkdlksrgyodaxth/settings/api
2. Scroll to "Project API keys"
3. Copy the `service_role` key
4. Add it to `.env.local`

### Step 2: Add Stripe Keys

If you don't have a Stripe account yet:

1. Go to https://stripe.com
2. Sign up for free
3. Get your test keys from: https://dashboard.stripe.com/test/apikeys
4. Add them to `.env.local`

### Step 3: Start Development Server

```bash
# Terminal 1 - Start Next.js
npm run dev

# Terminal 2 - Start Stripe webhook forwarding
stripe listen --forward-to localhost:3000/api/webhook
```

### Step 4: Test Your Course Platform

1. **Visit Courses Page**

   ```
   http://localhost:3000/courses
   ```

2. **Test Purchase Flow**

   - Enter email: `test@example.com`
   - Click "Buy Now - $99"
   - Use test card: `4242 4242 4242 4242`
   - Any future expiry date
   - Any 3-digit CVC
   - Complete checkout

3. **Access Your Course**
   ```
   http://localhost:3000/course/playwright-mcp
   ```
   - Enter the email you used
   - Verify access
   - Watch videos!

---

## 🎥 Update Video URLs

The sample videos use placeholder URLs. Replace them with your actual videos:

```sql
-- In Supabase SQL Editor
-- https://supabase.com/dashboard/project/tlatajkdlksrgyodaxth/sql

UPDATE course_videos
SET video_url = 'https://player.vimeo.com/video/YOUR_ACTUAL_VIDEO_ID'
WHERE order_index = 1;

-- Repeat for each video
```

Or bulk update:

```sql
-- Update all at once
UPDATE course_videos
SET video_url = CASE order_index
  WHEN 1 THEN 'https://player.vimeo.com/video/VIDEO_ID_1'
  WHEN 2 THEN 'https://player.vimeo.com/video/VIDEO_ID_2'
  -- ... add more
END
WHERE course_id = 'playwright-mcp';
```

---

## 📊 Your Course Stats

**Playwright MCP Mastery Course:**

- 📹 12 videos
- ⏱️ 3.2 hours total
- 🆓 2 free preview videos
- 🔒 10 premium videos
- 💰 $99 price

**Course Structure:**

1. Welcome to Playwright MCP Mastery (7 min) 🆓
2. What is Model Context Protocol? (13 min) 🆓
3. Setting Up Your Development Environment (15 min)
4. Building Your First MCP Server (20 min)
5. Advanced MCP Server Patterns (18 min)
6. AI-Powered Test Generation (22 min)
7. Integrating with CI/CD Pipelines (16 min)
8. Real-World Project: E-commerce Testing (30 min)
9. Performance Testing with Playwright (14 min)
10. Best Practices and Design Patterns (12 min)
11. Debugging and Troubleshooting (15 min)
12. Course Summary and Next Steps (10 min)

---

## 🔗 Quick Links

**Supabase:**

- Dashboard: https://supabase.com/dashboard/project/tlatajkdlksrgyodaxth
- Table Editor: https://supabase.com/dashboard/project/tlatajkdlksrgyodaxth/editor
- SQL Editor: https://supabase.com/dashboard/project/tlatajkdlksrgyodaxth/sql

**Your Course URLs:**

- Course Catalog: http://localhost:3000/courses
- Course Player: http://localhost:3000/course/playwright-mcp

**Documentation:**

- Full Setup Guide: `docs/COURSE_SETUP.md`
- Testing Guide: `docs/TESTING.md`
- Quick Reference: `docs/QUICK_REFERENCE.md`
- Architecture: `docs/ARCHITECTURE.md`

---

## ✅ Verification Checklist

Before going live, verify:

- [ ] Service role key added to `.env.local`
- [ ] Stripe keys added to `.env.local`
- [ ] Development server runs without errors
- [ ] Can view courses page
- [ ] Can complete test purchase
- [ ] Webhook receives payment event
- [ ] Database records created
- [ ] Can access course player
- [ ] Videos display correctly
- [ ] Free preview videos work
- [ ] Locked videos show lock icon

---

## 🐛 Troubleshooting

**Can't connect to Supabase?**

- Check URL and keys in `.env.local`
- Verify project is active in dashboard

**Webhook not working?**

- Check Stripe CLI is running
- Verify webhook secret in `.env.local`

**Videos not loading?**

- Update video URLs in database
- Check video hosting allows embedding

**Need more help?**

- See: `docs/TESTING.md`
- See: `docs/QUICK_REFERENCE.md`

---

## 🚀 Deploy to Production

When ready to go live:

1. **Push to Git**

   ```bash
   git add .
   git commit -m "feat: add course platform with Supabase integration"
   git push origin main
   ```

2. **Deploy to Vercel**

   - Vercel will auto-deploy from Git
   - Add environment variables in Vercel dashboard
   - Update `NEXT_PUBLIC_APP_URL` to production domain

3. **Set Up Production Webhook**

   - Create webhook in Stripe dashboard
   - Point to: `https://yourdomain.vercel.app/api/webhook`
   - Update webhook secret in Vercel

4. **Test with Real Payment**
   - Use your own card for $0.50 test
   - Verify full flow works
   - Refund the test payment

---

## 🎉 You're All Set!

Your complete course platform is ready:

- ✅ Payment processing via Stripe
- ✅ Video delivery system
- ✅ Access control
- ✅ Database configured
- ✅ Sample content loaded
- ✅ Documentation complete

**Time to launch your course!** 🚀

Need help? Check the docs in the `docs/` folder.

---

**Remember:** Delete `SUPABASE_CREDENTIALS.txt` after copying credentials to `.env.local` for security!
