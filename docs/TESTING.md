# Testing Guide for Online Course Platform

## Overview

This guide covers how to test the online course platform before going live.

## Prerequisites

- Development environment set up (see COURSE_SETUP.md)
- Stripe CLI installed and configured
- Test data populated in Supabase

## Test Scenarios

### 1. Course Listing Page

**URL**: http://localhost:3000/courses

**Tests**:

- [ ] Page loads without errors
- [ ] All three courses are displayed
- [ ] Playwright MCP course shows price badge ($99)
- [ ] Email input field is present
- [ ] "Buy Now" button is visible and clickable
- [ ] "View Details" button works
- [ ] External course links open in new tab
- [ ] Page is responsive on mobile/tablet

**Expected Behavior**:

- Playwright MCP course is prominently displayed first
- Checkout controls only show for hosted courses
- Reviews slider auto-plays
- Student count animation works

---

### 2. Checkout Flow (Test Mode)

**Start**: http://localhost:3000/courses

**Steps**:

1. Enter test email: `test@example.com`
2. Click "Buy Now - $99"
3. Redirected to Stripe Checkout
4. Use test card: `4242 4242 4242 4242`
5. Enter any future expiry and CVC
6. Complete payment

**Tests**:

- [ ] Email validation works (shows error for invalid email)
- [ ] Loading state shows while redirecting
- [ ] Stripe Checkout loads correctly
- [ ] Test card processes successfully
- [ ] Webhook receives event (check terminal)
- [ ] Redirected to success page

**Expected Behavior**:

- Smooth redirect to Stripe
- No console errors
- Webhook logs show in terminal
- Database records created

---

### 3. Stripe Test Cards

Test different scenarios:

| Card Number         | Scenario      | Expected Result     |
| ------------------- | ------------- | ------------------- |
| 4242 4242 4242 4242 | Success       | Payment succeeds    |
| 4000 0000 0000 0002 | Decline       | Payment declined    |
| 4000 0025 0000 3155 | Requires auth | 3D Secure challenge |
| 4000 0000 0000 9995 | Insufficient  | Insufficient funds  |

---

### 4. Payment Success Page

**URL**: http://localhost:3000/payment/success?session_id=cs_test_xxx

**Tests**:

- [ ] Success message displays
- [ ] Checkmark icon shows
- [ ] "What's Next" section visible
- [ ] "Access Your Course Now" button works
- [ ] User email shown (if stored)
- [ ] Loading spinner shows briefly

**Expected Behavior**:

- Clean, professional success page
- Clear next steps
- Easy access to course

---

### 5. Payment Cancel Page

**URL**: http://localhost:3000/payment/cancel

**Tests**:

- [ ] Cancel message displays
- [ ] X icon shows
- [ ] "Try Again" button redirects to /courses
- [ ] "Go Home" button redirects to /
- [ ] No errors in console

**Expected Behavior**:

- User-friendly message
- Easy navigation back

---

### 6. Course Player (No Access)

**URL**: http://localhost:3000/course/playwright-mcp

**Without Purchase**:

- [ ] Email verification form shows
- [ ] Can enter email
- [ ] "Verify Access" button works
- [ ] Error shows for invalid email
- [ ] Error shows for no access
- [ ] "Purchase Course" button visible
- [ ] Course details section displays

**Expected Behavior**:

- Clear message about needing access
- Easy path to purchase
- No sensitive data exposed

---

### 7. Course Player (With Access)

**URL**: http://localhost:3000/course/playwright-mcp

**After Purchase**:

1. Enter email used for purchase
2. Click "Verify Access"

**Tests**:

- [ ] Access granted message shows
- [ ] Video player visible
- [ ] Course content sidebar appears
- [ ] All videos listed with numbers
- [ ] Locked videos show lock icon
- [ ] Free preview videos show "FREE" badge
- [ ] Purchased videos show checkmark
- [ ] Can click and play videos
- [ ] Video title and description show
- [ ] Duration displays correctly
- [ ] Course details section visible

**Expected Behavior**:

- Seamless access after verification
- Professional video player interface
- Clear progress indication
- Responsive design

---

### 8. Database Verification

**After Test Purchase**:

Check Supabase tables:

**course_purchases**:

```sql
SELECT * FROM course_purchases
WHERE email = 'test@example.com'
ORDER BY created_at DESC
LIMIT 1;
```

Expected fields:

- `id`: UUID
- `email`: test@example.com
- `course_id`: playwright-mcp
- `stripe_session_id`: cs_test_xxx
- `amount_paid`: 9900
- `status`: completed

**course_access**:

```sql
SELECT * FROM course_access
WHERE email = 'test@example.com'
AND course_id = 'playwright-mcp';
```

Expected fields:

- `id`: UUID
- `email`: test@example.com
- `course_id`: playwright-mcp
- `purchase_id`: (matches purchase ID)
- `is_active`: true
- `expires_at`: NULL

---

### 9. API Endpoints Testing

Use curl or Postman:

**Checkout API**:

```bash
curl -X POST http://localhost:3000/api/checkout \
  -H "Content-Type: application/json" \
  -d '{"courseId":"playwright-mcp","email":"test@example.com"}'
```

Expected: `{ "sessionId": "cs_test_...", "url": "https://checkout.stripe.com/..." }`

**Verify Access API**:

```bash
curl -X POST http://localhost:3000/api/verify-access \
  -H "Content-Type: application/json" \
  -d '{"courseId":"playwright-mcp","email":"test@example.com"}'
```

Expected: `{ "hasAccess": true }` or `{ "hasAccess": false }`

**Get Videos API**:

```bash
curl "http://localhost:3000/api/get-videos?courseId=playwright-mcp&email=test@example.com"
```

Expected: `{ "videos": [...], "hasAccess": true }`

---

### 10. Error Handling

Test error scenarios:

**Invalid Email**:

- [ ] Leave email blank → Error message
- [ ] Enter "notanemail" → Error message
- [ ] Enter "test@" → Error message

**Invalid Course ID**:

- [ ] Try checkout with wrong courseId → Error
- [ ] Access non-existent course → 404 or error

**Network Errors**:

- [ ] Disconnect internet → Graceful error handling
- [ ] Stripe down → Clear error message

**Webhook Failures**:

- [ ] Stop Stripe CLI → Payment succeeds but access not granted
- [ ] Check error logs
- [ ] Manual access grant process

---

### 11. Security Testing

**Environment Variables**:

- [ ] Service role key not exposed in client
- [ ] Stripe secret key not in client bundle
- [ ] Webhook secret properly validated

**Access Control**:

- [ ] Cannot access videos without purchase
- [ ] Cannot forge access verification
- [ ] Email-based access properly validated

**SQL Injection**:

- [ ] API endpoints sanitize input
- [ ] Supabase parameterized queries

---

### 12. Performance Testing

**Page Load Times**:

- [ ] Course listing < 2s
- [ ] Course player < 2s
- [ ] Video starts quickly

**Lighthouse Scores**:

```bash
npm install -g lighthouse
lighthouse http://localhost:3000/courses --view
```

Target scores:

- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

---

### 13. Mobile Testing

Test on actual devices or Chrome DevTools:

**Devices to Test**:

- [ ] iPhone (Safari)
- [ ] Android (Chrome)
- [ ] iPad (Safari)

**Tests**:

- [ ] Course cards stack properly
- [ ] Video player responsive
- [ ] Checkout flow works
- [ ] Touch interactions work
- [ ] Buttons are thumb-friendly

---

### 14. Browser Compatibility

**Browsers to Test**:

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

---

### 15. Webhook Testing

**With Stripe CLI**:

Terminal 1:

```bash
npm run dev
```

Terminal 2:

```bash
stripe listen --forward-to localhost:3000/api/webhook
```

**Tests**:

- [ ] Webhook receives events
- [ ] Events logged to console
- [ ] Signature verified successfully
- [ ] Database updated correctly
- [ ] Access granted immediately

**Common Issues**:

- Webhook secret mismatch → Check .env.local
- Events not received → Check Stripe CLI running
- Signature verification fails → Restart Stripe CLI

---

## Test Checklist Summary

Before going live:

- [ ] All test scenarios pass
- [ ] No console errors
- [ ] Database records correct
- [ ] Email validation works
- [ ] Payment flow smooth
- [ ] Access control secure
- [ ] Mobile responsive
- [ ] Cross-browser compatible
- [ ] Performance acceptable
- [ ] Error handling graceful
- [ ] Webhook processing reliable

---

## Production Testing

Before enabling live mode:

1. **Switch to Test Mode**:

   - Use Stripe test keys first
   - Test all flows thoroughly

2. **Set Up Production Webhook**:

   - Create production webhook in Stripe Dashboard
   - Update STRIPE_WEBHOOK_SECRET

3. **Test with Real Card**:

   - Use your own card for $0.50 test
   - Verify full flow end-to-end
   - Refund the test payment

4. **Monitor First Sales**:
   - Watch logs closely
   - Check database records
   - Verify access granted
   - Test customer experience

---

## Troubleshooting

### Issue: Webhook not working

**Solutions**:

1. Check Stripe CLI is running
2. Verify webhook secret in .env.local
3. Check server logs for errors
4. Test webhook signature verification

### Issue: Access not granted

**Solutions**:

1. Check course_access table
2. Verify webhook received
3. Check email matches exactly
4. Manual grant via SQL

### Issue: Videos not playing

**Solutions**:

1. Check video URLs
2. Verify embed permissions
3. Test video directly
4. Check browser console

### Issue: Checkout fails

**Solutions**:

1. Check Stripe keys
2. Verify API endpoint
3. Check network tab
4. Test with different card

---

## Support Resources

- [Stripe Testing Guide](https://stripe.com/docs/testing)
- [Supabase Documentation](https://supabase.com/docs)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)

---

## Contact

If you encounter issues not covered here, check:

1. Server logs
2. Browser console
3. Stripe Dashboard logs
4. Supabase logs
