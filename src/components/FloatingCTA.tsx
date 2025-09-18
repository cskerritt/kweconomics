import { useState, useEffect } from 'react';
import { Phone, MessageSquare, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trackPhoneClick } from './analytics/GoogleAnalytics';

const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showQuickContact, setShowQuickContact] = useState(false);

  useEffect(() => {
    // Show after 3 seconds on page
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    // Show when user scrolls up (intent to leave)
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      if (window.scrollY < lastScrollY && window.scrollY > 100) {
        setIsVisible(true);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handlePhoneClick = () => {
    trackPhoneClick('2013430700', 'floating-cta');
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Mobile Sticky Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-primary text-primary-foreground p-4 z-50 shadow-lg">
        <div className="flex gap-2">
          <Button 
            variant="hero" 
            size="lg" 
            className="flex-1"
            onClick={handlePhoneClick}
            asChild
          >
            <a href="tel:+12013430700">
              <Phone className="h-5 w-5 mr-2" />
              Call Now
            </a>
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="flex-1 bg-primary-foreground text-primary"
            onClick={() => setShowQuickContact(true)}
          >
            <MessageSquare className="h-5 w-5 mr-2" />
            Quick Question
          </Button>
        </div>
      </div>

      {/* Desktop Floating Button */}
      <div className="hidden lg:block fixed bottom-8 right-8 z-50">
        <div className="bg-card rounded-lg shadow-2xl p-6 max-w-sm border-2 border-primary">
          <button 
            onClick={() => setIsVisible(false)}
            className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
          
          <div className="mb-4">
            <h3 className="font-bold text-lg text-foreground">Need Immediate Help?</h3>
            <p className="text-sm text-muted-foreground">
              Free case evaluation • 24-hour response
            </p>
          </div>
          
          <div className="space-y-2">
            <Button 
              variant="default" 
              size="lg" 
              className="w-full"
              onClick={handlePhoneClick}
              asChild
            >
              <a href="tel:+12013430700">
                <Phone className="h-5 w-5 mr-2" />
                (201) 343-0700
              </a>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full"
              onClick={() => setShowQuickContact(true)}
            >
              <MessageSquare className="h-5 w-5 mr-2" />
              Send Quick Message
            </Button>
          </div>
          
          <div className="mt-4 text-xs text-center text-muted-foreground">
            Available Mon-Fri 8AM-6PM EST
            <br />
            Emergency consultations available
          </div>
        </div>
      </div>

      {/* Quick Contact Modal */}
      {showQuickContact && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Quick Contact</h3>
              <button onClick={() => setShowQuickContact(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form className="space-y-4">
              <input 
                type="text" 
                placeholder="Your Name" 
                className="w-full p-3 border rounded-lg"
                required
              />
              <input 
                type="tel" 
                placeholder="Phone Number" 
                className="w-full p-3 border rounded-lg"
                required
              />
              <textarea 
                placeholder="Brief description of your case (optional)" 
                className="w-full p-3 border rounded-lg h-24"
              />
              <Button type="submit" className="w-full" size="lg">
                Request Callback
              </Button>
            </form>
            
            <div className="mt-4 text-center text-sm text-muted-foreground">
              Or call directly: 
              <a href="tel:+12013430700" className="text-primary font-semibold ml-1">
                (201) 343-0700
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingCTA;