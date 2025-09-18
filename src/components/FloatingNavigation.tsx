import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Phone,
  Mail,
  Menu,
  X,
  ArrowUp,
  Search,
  MapPin,
  Briefcase,
  Users,
  FileText,
  Calculator,
  Home
} from 'lucide-react';

const FloatingNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const location = useLocation();

  // Handle scroll to show/hide scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { 
      label: 'Home', 
      href: '/', 
      icon: Home,
      description: 'Back to homepage'
    },
    { 
      label: 'Get Quote', 
      href: '/schedule-consultation', 
      icon: Calculator,
      description: 'Free consultation',
      isPrimary: true
    },
    { 
      label: 'Services', 
      href: '/services', 
      icon: Briefcase,
      description: 'All our services'
    },
    { 
      label: 'Case Types', 
      href: '/case-types', 
      icon: FileText,
      description: 'Practice areas'
    },
    { 
      label: 'Locations', 
      href: '/locations', 
      icon: MapPin,
      description: 'Find us near you'
    },
    { 
      label: 'About Us', 
      href: '/about', 
      icon: Users,
      description: 'Our expertise'
    }
  ];

  const quickActions = [
    {
      label: 'Call Now',
      href: 'tel:+12013430700',
      icon: Phone,
      color: 'bg-green-600 hover:bg-green-700',
      text: '(201) 343-0700'
    },
    {
      label: 'Email',
      href: 'mailto:chris@kweconomics.com',
      icon: Mail,
      color: 'bg-blue-600 hover:bg-blue-700',
      text: 'Send Email'
    }
  ];

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-3">
        {/* Scroll to Top */}
        {showScrollTop && (
          <Button
            size="icon"
            className="rounded-full shadow-lg bg-secondary hover:bg-secondary/80 animate-fade-in mb-2"
            onClick={scrollToTop}
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        )}

        {/* Quick Actions */}
        <div className={`flex flex-col gap-2 transition-all duration-300 ${isOpen ? 'animate-fade-in' : 'opacity-0 pointer-events-none'}`}>
          {quickActions.map((action) => (
            <a
              key={action.label}
              href={action.href}
              className={`${action.color} text-white px-4 py-2 rounded-full shadow-lg hover:scale-105 transition-all duration-200 flex items-center gap-2 text-sm font-medium`}
            >
              <action.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{action.text}</span>
            </a>
          ))}
        </div>

        {/* Main FAB */}
        <Button
          size="icon"
          className="rounded-full shadow-lg bg-primary hover:bg-primary/90 w-14 h-14"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Floating Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 animate-fade-in" onClick={() => setIsOpen(false)}>
          <Card className="fixed bottom-28 right-8 w-80 max-w-[calc(100vw-4rem)] shadow-2xl animate-scale-in z-50">
            <div className="p-4">
              <h3 className="text-lg font-semibold text-foreground mb-4">Quick Navigation</h3>
              
              <div className="space-y-2 mb-4">
                {quickLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors group"
                  >
                    <div className={`p-2 rounded-md ${link.isPrimary ? 'bg-primary text-primary-foreground' : 'bg-muted'} group-hover:scale-110 transition-transform`}>
                      <link.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-foreground">{link.label}</div>
                      <div className="text-xs text-muted-foreground">{link.description}</div>
                    </div>
                    {link.isPrimary && (
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        Free
                      </Badge>
                    )}
                  </Link>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="text-sm text-muted-foreground mb-2">Emergency? Call now:</div>
                <a
                  href="tel:+12013430700"
                  className="flex items-center gap-2 p-2 bg-green-50 text-green-800 rounded-md hover:bg-green-100 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  <span className="font-medium">(201) 343-0700</span>
                </a>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default FloatingNavigation;