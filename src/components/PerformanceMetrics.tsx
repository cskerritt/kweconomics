import React, { useEffect, useState } from 'react';

interface PerformanceMetrics {
  loadTime: number;
  domContentLoaded: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
}

interface PerformanceMetricsProps {
  onMetricsCollected?: (metrics: PerformanceMetrics) => void;
  showDebugInfo?: boolean;
}

const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({
  onMetricsCollected,
  showDebugInfo = false
}) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);

  useEffect(() => {
    const collectMetrics = () => {
      if (typeof window !== 'undefined' && 'performance' in window) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        // Get paint timings
        const paintEntries = performance.getEntriesByType('paint');
        const fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint');
        
        // Get LCP if available
        let lcp = 0;
        if ('PerformanceObserver' in window) {
          try {
            const observer = new PerformanceObserver((list) => {
              const entries = list.getEntries();
              const lastEntry = entries[entries.length - 1];
              lcp = lastEntry.startTime;
            });
            observer.observe({ entryTypes: ['largest-contentful-paint'] });
          } catch (e) {
            // LCP not supported
          }
        }

        const performanceMetrics: PerformanceMetrics = {
          loadTime: navigation ? navigation.loadEventEnd - navigation.fetchStart : 0,
          domContentLoaded: navigation ? navigation.domContentLoadedEventEnd - navigation.fetchStart : 0,
          firstContentfulPaint: fcp ? fcp.startTime : 0,
          largestContentfulPaint: lcp
        };

        setMetrics(performanceMetrics);
        onMetricsCollected?.(performanceMetrics);
      }
    };

    // Collect metrics after page load
    if (document.readyState === 'complete') {
      setTimeout(collectMetrics, 100);
    } else {
      window.addEventListener('load', () => {
        setTimeout(collectMetrics, 100);
      });
    }
  }, [onMetricsCollected]);

  // Send metrics to analytics (example implementation)
  useEffect(() => {
    if (metrics && typeof window !== 'undefined') {
      // Example: Send to Google Analytics or other analytics service
      if ('gtag' in window) {
        // @ts-ignore
        window.gtag('event', 'page_performance', {
          page_load_time: Math.round(metrics.loadTime),
          dom_content_loaded: Math.round(metrics.domContentLoaded),
          first_contentful_paint: Math.round(metrics.firstContentfulPaint),
          largest_contentful_paint: Math.round(metrics.largestContentfulPaint)
        });
      }

      // Log performance warnings
      if (metrics.loadTime > 3000) {
        console.warn('Slow page load detected:', metrics.loadTime + 'ms');
      }
      if (metrics.largestContentfulPaint > 2500) {
        console.warn('Poor LCP detected:', metrics.largestContentfulPaint + 'ms');
      }
    }
  }, [metrics]);

  if (!showDebugInfo || !metrics) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 bg-background border border-border rounded-lg p-3 text-xs shadow-lg z-50 max-w-xs">
      <div className="font-semibold mb-2 text-foreground">Performance Metrics</div>
      <div className="space-y-1 text-muted-foreground">
        <div>Load: {Math.round(metrics.loadTime)}ms</div>
        <div>DOM: {Math.round(metrics.domContentLoaded)}ms</div>
        <div>FCP: {Math.round(metrics.firstContentfulPaint)}ms</div>
        {metrics.largestContentfulPaint > 0 && (
          <div>LCP: {Math.round(metrics.largestContentfulPaint)}ms</div>
        )}
      </div>
    </div>
  );
};

export default PerformanceMetrics;