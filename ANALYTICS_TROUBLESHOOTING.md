# Google Analytics Troubleshooting Guide

## Why You Might Not See Active Users:

### 1. **Browser Extensions Blocking**
- Ad blockers (uBlock, AdBlock Plus)
- Privacy extensions (Ghostery, Privacy Badger)
- Brave browser shields
- **Solution**: Test in Incognito mode or disable extensions

### 2. **Delay in Realtime Reports**
- Sometimes takes 1-2 minutes to show
- **Solution**: Click around the site, wait a minute, refresh GA

### 3. **Wrong View/Property**
- Make sure you're looking at the right property in GA
- Check the date range isn't set to past dates

### 4. **Development vs Production**
- Google Analytics might filter localhost traffic
- **Solution**: Deploy to production or use debug mode

## Quick Debug Steps:

### Step 1: Check if Script is Loading
Open Chrome DevTools Console and type:
```javascript
// Check if gtag exists
typeof gtag

// Check dataLayer
window.dataLayer

// Send test event
gtag('event', 'test_event', {
  event_category: 'debug',
  event_label: 'manual_test'
});
```

### Step 2: Check Network Tab
1. Open DevTools → Network tab
2. Filter by "collect"
3. Navigate to a new page
4. You should see requests to:
   - `https://www.google-analytics.com/g/collect?v=2&tid=G-V3V7N9LEBQ`

### Step 3: Use GA Debugger Extension
Install: https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna

This will show detailed GA activity in console.

### Step 4: Check DebugView in GA
1. Go to Google Analytics
2. Admin → DebugView
3. You should see events in real-time

## Alternative Quick Test:

Open the test file in your browser:
```
file:///Users/chrisskerritt/econ-detective-web/test-analytics.html
```

This is a simple HTML file with GA hardcoded. If this doesn't work, the issue is with:
- Browser blocking
- Network/firewall
- GA configuration

## If Nothing Works:

### Try Google Tag Manager Instead:
1. Create account at tagmanager.google.com
2. Add GTM container to site
3. Add GA4 tag through GTM
4. GTM has better debugging tools

### Or Try Alternative Analytics:
- **Plausible** - Privacy-focused, no cookies
- **Fathom** - Simple, GDPR compliant  
- **Umami** - Open source, self-hosted option
- **Microsoft Clarity** - Free, includes heatmaps

## Common Issues & Fixes:

| Issue | Solution |
|-------|----------|
| No requests in Network tab | Ad blocker active |
| Requests sent but no data in GA | Wrong Measurement ID |
| Works in production but not local | GA filters localhost |
| Works for some users not others | Browser/extension blocking |
| Delayed data | Normal - wait 1-2 minutes |

## Verify Your Setup:

Run this in browser console:
```javascript
// This should all return true
console.log('GA Loaded:', typeof gtag === 'function');
console.log('DataLayer exists:', Array.isArray(window.dataLayer));
console.log('DataLayer has data:', window.dataLayer.length > 0);

// Check what's being sent
window.dataLayer.forEach(item => console.log(item));
```

## Production Deployment:

Once deployed to production (skerritteconomics.com), you should definitely see data because:
- No localhost filtering
- Real domain matches GA property
- Most users won't have ad blockers

Let me know which step shows the issue and I can help fix it!