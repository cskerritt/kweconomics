# Search Console Submission Checklist

1. Deploy the updated site to production (ensure public/sitemap.xml & public/sitemap-index.xml are live).
2. Verify property in Google Search Console (domain property preferred).
3. Submit sitemap:
   - Add https://kweconomics.com/sitemap-index.xml.
   - Confirm it references sitemap.xml (current single-file mode) and/or parts.
4. Inspect a few representative URLs:
   - State page (e.g., /california)
   - City page (e.g., /california/los-angeles)
   - Service+state+city (READY) (e.g., /services/economic-loss-assessment/california/los-angeles)
   - Service+state+city (NOT-READY) should show noindex.
5. Coverage → Exclusions should show noindexed URLs for not-ready cities.
6. Performance → monitor clicks/impressions for READY pages; expand contentReady as insights roll out.
7. Crawl stats → ensure no spike in server errors.
8. When flipping cities to READY:
   - Add city key to readyCitySet in src/data/contentReadiness.ts.
   - node generate-sitemap.mjs to refresh sitemap.
   - Deploy and resubmit sitemap in GSC.

Notes:
- READY pages: indexed and present in service-location sitemaps.
- NOT-READY pages: live for users/navigation but marked noindex and omitted from service-location sitemaps.
