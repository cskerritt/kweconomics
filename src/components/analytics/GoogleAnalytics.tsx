import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

interface GoogleAnalyticsProps {
  measurementId: string;
}

export const GoogleAnalytics: React.FC<GoogleAnalyticsProps> = ({ measurementId }) => {
  const location = useLocation();

  useEffect(() => {
    // Check if script already exists
    const existingScript = document.querySelector(`script[src*="${measurementId}"]`);
    if (existingScript) {
      console.log('Google Analytics script already loaded');
      return;
    }

    // Load Google Analytics script
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script1);

    // Initialize Google Analytics
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(...args) {
      window.dataLayer.push(args);
    };
    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
      send_page_view: true, // Changed to true for initial page view
      debug_mode: true // Enable debug mode
    });

    console.log(`Google Analytics initialized with ID: ${measurementId}`);

    // Don't remove script on cleanup as it should persist
  }, [measurementId]);

  useEffect(() => {
    // Track page views on route change
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
        page_location: window.location.href,
        page_title: document.title,
      });
    }
  }, [location]);

  return null;
};

// Conversion tracking functions
export const trackFormSubmission = (formName: string, formData?: Record<string, unknown>) => {
  if (window.gtag) {
    window.gtag('event', 'form_submit', {
      event_category: 'engagement',
      event_label: formName,
      value: formData?.caseType || 'unknown',
    });
  }
};

export const trackPhoneClick = (phoneNumber: string, location: string) => {
  if (window.gtag) {
    window.gtag('event', 'phone_click', {
      event_category: 'contact',
      event_label: location,
      value: phoneNumber,
    });
  }
};

export const trackDownload = (fileName: string) => {
  if (window.gtag) {
    window.gtag('event', 'file_download', {
      event_category: 'engagement',
      event_label: fileName,
    });
  }
};

export const trackChatOpen = () => {
  if (window.gtag) {
    window.gtag('event', 'chat_opened', {
      event_category: 'engagement',
    });
  }
};

export const trackScrollDepth = (percentage: number) => {
  if (window.gtag) {
    window.gtag('event', 'scroll', {
      event_category: 'engagement',
      event_label: `${percentage}%`,
      value: percentage,
    });
  }
};