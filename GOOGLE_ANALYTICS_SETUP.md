# Google Analytics Setup Instructions

## Step 1: Create Google Analytics Account

1. Go to https://analytics.google.com
2. Click "Start measuring"
3. Create an account name (e.g., "Skerritt Economics")
4. Set up a property name (e.g., "Skerritt Economics Website")
5. Choose your business details
6. Select "Web" as platform
7. Enter your website URL: https://skerritteconomics.com
8. Name your stream: "Main Website"

## Step 2: Get Your Measurement ID

After creating your property, you'll see a Measurement ID that looks like: `G-XXXXXXXXXX`

Copy this ID - you'll need it for the next step.

## Step 3: Add to Your Website

### Option A: Add directly to App.tsx (RECOMMENDED)

Edit `/src/App.tsx` and add these lines:

```tsx
import { GoogleAnalytics } from './components/analytics/GoogleAnalytics';

// Inside the App component, add this right after <BrowserRouter>:
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <GoogleAnalytics measurementId="G-XXXXXXXXXX" /> {/* Add this line with your ID */}
        <Suspense fallback={<PageLoader />}>
          {/* ... rest of your routes ... */}
```

### Option B: Using Environment Variables

1. Create a `.env` file in your project root:
```
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

2. Update App.tsx:
```tsx
<GoogleAnalytics measurementId={import.meta.env.VITE_GA_MEASUREMENT_ID} />
```

## Step 4: Track Form Submissions

The form handler already includes tracking. When a form is submitted, it will automatically track:
- Form name
- Case type
- Submission success/failure

## Step 5: Track Phone Clicks

All phone numbers are now clickable and will track:
- Where the click happened (header, footer, etc.)
- Phone number clicked
- Time of click

## Step 6: Verify Installation

1. Open your website
2. Go to Google Analytics
3. Click "Reports" → "Realtime"
4. You should see yourself as an active user

## Step 7: Set Up Conversions (Goals)

In Google Analytics:

1. Go to "Admin" → "Events"
2. Mark these events as conversions:
   - `form_submit` - When someone submits a form
   - `phone_click` - When someone clicks phone number
   - `chat_opened` - If you add chat widget

## Step 8: Additional Tracking (Optional)

### Microsoft Clarity (Free Heatmaps)
1. Sign up at https://clarity.microsoft.com
2. Add their tracking code to index.html
3. See heatmaps of where users click

### Facebook Pixel (If running ads)
1. Get pixel ID from Facebook Business Manager
2. Add to index.html header

## What You'll Be Able to See

Once installed, you can track:
- **Traffic Sources**: Where visitors come from
- **User Behavior**: What pages they visit
- **Conversion Funnel**: Where they drop off
- **Phone Clicks**: How many people click to call
- **Form Submissions**: How many complete forms
- **Geographic Data**: Where your visitors are located
- **Device Types**: Mobile vs Desktop usage
- **Page Performance**: Load times and errors

## Important Metrics to Watch

1. **Conversion Rate**: Form submissions / Total visitors
2. **Phone Click Rate**: Phone clicks / Total visitors  
3. **Bounce Rate**: Single page visits / Total visits
4. **Average Session Duration**: How long people stay
5. **Pages Per Session**: How many pages they view

## Testing Your Setup

To test if everything is working:

1. Open your site in an incognito window
2. Click on a phone number
3. Submit a test form
4. Check Google Analytics Realtime reports
5. You should see your actions tracked

## Privacy Compliance

Remember to update your Privacy Policy to mention:
- You use Google Analytics
- What data is collected
- How it's used
- User rights regarding data

## Need Help?

- Google Analytics Help: https://support.google.com/analytics
- Measurement ID Location: Admin → Data Streams → Your Stream
- Debug View: Admin → DebugView (shows real-time events)