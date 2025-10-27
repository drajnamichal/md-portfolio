# Quick Reference Card - Online Course Platform

## 🚀 Start Development

```bash
# Terminal 1 - Start dev server
npm run dev

# Terminal 2 - Start Stripe webhooks
stripe listen --forward-to localhost:3000/api/webhook
```

## 🔑 Stripe Test Cards

```
Success:  4242 4242 4242 4242
Decline:  4000 0000 0000 0002
Requires: 4000 0025 0000 3155
```

## 📍 Key URLs

```
Course Catalog:     http://localhost:3000/courses
Course Player:      http://localhost:3000/course/playwright-mcp
Payment Success:    http://localhost:3000/payment/success
Payment Cancel:     http://localhost:3000/payment/cancel
```

## 🗄️ Database Quick Queries

### Check Recent Purchases

```sql
SELECT email, course_id, amount_paid, status, created_at
FROM course_purchases
ORDER BY created_at DESC
LIMIT 10;
```

### Check User Access

```sql
SELECT email, course_id, is_active
FROM course_access
WHERE email = 'user@example.com';
```

### Add Video

```sql
INSERT INTO course_videos (
  course_id, title, description,
  video_url, duration, order_index, is_free_preview
) VALUES (
  'playwright-mcp',
  'Video Title',
  'Video description',
  'https://player.vimeo.com/video/123456',
  600,
  1,
  false
);
```

### Grant Manual Access

```sql
INSERT INTO course_access (email, course_id, is_active)
VALUES ('user@example.com', 'playwright-mcp', true);
```

## 🔧 API Testing

### Test Checkout

```bash
curl -X POST http://localhost:3000/api/checkout \
  -H "Content-Type: application/json" \
  -d '{"courseId":"playwright-mcp","email":"test@example.com"}'
```

### Test Access Verification

```bash
curl -X POST http://localhost:3000/api/verify-access \
  -H "Content-Type: application/json" \
  -d '{"courseId":"playwright-mcp","email":"test@example.com"}'
```

### Get Course Videos

```bash
curl "http://localhost:3000/api/get-videos?courseId=playwright-mcp&email=test@example.com"
```

## 📝 Common Tasks

### Change Course Price

**File**: `pages/courses.js`

```javascript
price: 99; // Change to new price
```

**File**: `pages/api/checkout.js`

```javascript
price: 9900; // Change to new price in cents
```

### Add New Course

1. Add to `pages/courses.js` courses array
2. Add videos to database
3. Add pricing to `pages/api/checkout.js`

### Add Course Video

```sql
INSERT INTO course_videos (
  course_id, title, description, video_url,
  duration, order_index, is_free_preview
) VALUES (
  'playwright-mcp',
  'New Video',
  'Description',
  'https://player.vimeo.com/video/VIDEO_ID',
  900,
  99,  -- Order number
  false
);
```

## 🐛 Debugging

### Check Webhook Logs

```bash
# In terminal running Stripe CLI
# Look for incoming webhook events
```

### Check Server Logs

```bash
# In terminal running npm run dev
# Look for API errors
```

### Check Stripe Dashboard

- Dashboard → Payments → View recent payments
- Dashboard → Developers → Webhooks → View logs

### Check Supabase Logs

- Project → Logs → Select service

## 📊 Monitoring

### Database Stats

```sql
-- Total purchases
SELECT COUNT(*) as total_purchases FROM course_purchases;

-- Revenue
SELECT SUM(amount_paid)/100 as total_revenue
FROM course_purchases
WHERE status = 'completed';

-- Active users
SELECT COUNT(*) as active_users FROM course_access WHERE is_active = true;

-- Popular videos (requires view tracking)
SELECT course_id, COUNT(*) as purchases
FROM course_purchases
GROUP BY course_id;
```

## 🔒 Security Checklist

- [ ] `.env.local` in `.gitignore`
- [ ] Service role key never in client code
- [ ] Webhook signatures verified
- [ ] User input validated
- [ ] HTTPS in production
- [ ] Stripe keys match environment

## 🚨 Troubleshooting

### Webhook Not Working

1. Check Stripe CLI running
2. Verify webhook secret in `.env.local`
3. Check server logs for errors
4. Test webhook manually in Stripe Dashboard

### Access Not Granted

1. Check webhook received
2. Verify database records
3. Check email exactly matches
4. Manual grant if needed

### Checkout Fails

1. Verify Stripe keys
2. Check test vs live mode
3. Check console errors
4. Try different test card

## 📱 Testing Checklist

- [ ] Purchase flow works
- [ ] Webhook processes
- [ ] Access granted
- [ ] Videos play
- [ ] Mobile responsive
- [ ] Error handling
- [ ] Loading states
- [ ] Email validation

## 🌐 Production Deployment

1. Deploy to Vercel/hosting
2. Add environment variables
3. Set up production webhook
4. Update `NEXT_PUBLIC_APP_URL`
5. Test with live keys (test mode)
6. Switch to live mode
7. Test with real $0.50 purchase
8. Refund test purchase
9. Monitor first sales

## 📞 Support Resources

- **Stripe Docs**: https://stripe.com/docs
- **Supabase Docs**: https://supabase.com/docs
- **Next.js Docs**: https://nextjs.org/docs

## 💰 Pricing Tiers

Suggested pricing:

- Basic Course: $49-79
- Standard Course: $99-149
- Premium Course: $199-299
- Course Bundle: 20-30% off

## 🎯 Conversion Optimization

- Clear value proposition
- Social proof (reviews)
- Money-back guarantee
- Limited-time offers
- Email capture
- Exit intent popup
- Abandoned cart recovery

## 📈 Growth Strategies

1. **Content Marketing**: Blog posts, tutorials
2. **Email Marketing**: Newsletter with tips
3. **Social Proof**: Student testimonials
4. **SEO**: Optimize course pages
5. **Partnerships**: Affiliate program
6. **Bundles**: Package courses together
7. **Free Content**: Preview videos, mini-courses

## 🎓 Course Content Tips

- **Video Length**: 5-15 minutes ideal
- **Quality**: 1080p minimum
- **Audio**: Clear, professional
- **Slides**: Simple, readable
- **Examples**: Real-world, practical
- **Exercises**: Hands-on practice
- **Resources**: Downloadable files

## ✅ Launch Checklist

- [ ] Course content complete
- [ ] Videos uploaded and tested
- [ ] Pricing set
- [ ] Payment flow tested
- [ ] Mobile tested
- [ ] Error handling verified
- [ ] Terms & conditions
- [ ] Privacy policy
- [ ] Refund policy
- [ ] Customer support plan
- [ ] Marketing materials ready
- [ ] Social media posts scheduled
- [ ] Email announcement drafted

---

**Keep this file handy for quick reference!**
