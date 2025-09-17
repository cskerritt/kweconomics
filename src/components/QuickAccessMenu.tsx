import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger
} from '@/components/ui/dropdown-menu';
import {
  ChevronDown,
  Scale,
  Users,
  FileText,
  Building2,
  TrendingDown,
  PieChart,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Calculator,
  BookOpen,
  Award,
  Clock,
  Star
} from 'lucide-react';

interface QuickAccessMenuProps {
  variant?: 'header' | 'standalone';
  className?: string;
}

const QuickAccessMenu = ({ variant = 'header', className = '' }: QuickAccessMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const services = [
    { 
      title: 'Economic Loss Assessment', 
      href: '/services/economic-loss-assessment', 
      icon: Scale,
      description: 'Personal injury & wrongful death analysis',
      isPopular: true
    },
    { 
      title: 'Vocational Evaluation', 
      href: '/services/vocational-evaluation', 
      icon: Users,
      description: 'Work capacity & employability assessment'
    },
    { 
      title: 'Life Care Planning', 
      href: '/services/life-care-planning', 
      icon: FileText,
      description: 'Future care cost analysis'
    },
    { 
      title: 'Business Valuation', 
      href: '/services/business-valuation', 
      icon: PieChart,
      description: 'Business appraisal for litigation'
    },
    { 
      title: 'Disability Evaluation', 
      href: '/services/disability-evaluation', 
      icon: Building2,
      description: 'Social Security & workers comp'
    },
    { 
      title: 'Expert Testimony', 
      href: '/services/expert-testimony', 
      icon: TrendingDown,
      description: 'Qualified expert witness services'
    }
  ];

  const caseTypes = [
    { title: 'Personal Injury', href: '/case-types/personal-injury', count: '500+ cases' },
    { title: 'Wrongful Death', href: '/case-types/wrongful-death', count: '200+ cases' },
    { title: 'Medical Malpractice', href: '/case-types/medical-malpractice', count: '150+ cases' },
    { title: 'Workers\' Compensation', href: '/case-types/workers-compensation', count: '300+ cases' },
    { title: 'Disability Claims', href: '/case-types/disability-claims', count: '800+ cases' },
    { title: 'Business Disputes', href: '/case-types/business-disputes', count: '100+ cases' }
  ];

  const locations = [
    { title: 'California', href: '/california', cities: '50+ cities' },
    { title: 'New York', href: '/new-york', cities: '40+ cities' },
    { title: 'Texas', href: '/texas', cities: '60+ cities' },
    { title: 'Florida', href: '/florida', cities: '45+ cities' },
    { title: 'View All States', href: '/locations', cities: '50 states' }
  ];

  const quickActions = [
    { 
      title: 'Get Free Quote', 
      href: '/schedule-consultation', 
      icon: Calculator,
      color: 'text-green-700 bg-green-50 hover:bg-green-100',
      badge: 'Free'
    },
    { 
      title: 'Emergency Contact', 
      href: 'tel:+12036052814', 
      icon: Phone,
      color: 'text-red-700 bg-red-50 hover:bg-red-100',
      badge: '24/7'
    },
    { 
      title: 'Case Review', 
      href: '/contact', 
      icon: FileText,
      color: 'text-blue-700 bg-blue-50 hover:bg-blue-100'
    },
    { 
      title: 'Schedule Meeting', 
      href: '/schedule-consultation', 
      icon: Calendar,
      color: 'text-purple-700 bg-purple-50 hover:bg-purple-100'
    }
  ];

  if (variant === 'standalone') {
    return (
      <Card className={`p-6 shadow-card border-0 bg-card ${className}`}>
        <h3 className="text-lg font-semibold text-foreground mb-4">Quick Access</h3>
        
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {quickActions.map((action) => (
            <Link key={action.title} to={action.href}>
              <Button
                variant="outline"
                className={`w-full h-auto flex-col gap-2 p-4 ${action.color} border-0`}
              >
                <action.icon className="h-5 w-5" />
                <div className="text-center">
                  <div className="text-xs font-medium">{action.title}</div>
                  {action.badge && (
                    <Badge variant="secondary" className="text-xs mt-1">
                      {action.badge}
                    </Badge>
                  )}
                </div>
              </Button>
            </Link>
          ))}
        </div>

        {/* Popular Services */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">Popular Services</h4>
          {services.slice(0, 3).map((service) => (
            <Link
              key={service.title}
              to={service.href}
              className="flex items-center gap-3 p-2 rounded-md hover:bg-muted transition-colors group"
            >
              <service.icon className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
              <div className="flex-1">
                <div className="text-sm font-medium text-foreground">{service.title}</div>
                <div className="text-xs text-muted-foreground">{service.description}</div>
              </div>
              {service.isPopular && (
                <Star className="h-3 w-3 text-yellow-500" />
              )}
            </Link>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={`${className}`}>
          Quick Access
          <ChevronDown className="h-4 w-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-80 bg-background border shadow-lg" align="end">
        <DropdownMenuLabel className="text-base font-semibold">Quick Navigation</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {/* Quick Actions */}
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-sm text-muted-foreground">Quick Actions</DropdownMenuLabel>
          {quickActions.map((action) => (
            <DropdownMenuItem key={action.title} asChild>
              <Link to={action.href} className="flex items-center gap-3 cursor-pointer">
                <div className={`p-1 rounded ${action.color}`}>
                  <action.icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{action.title}</div>
                </div>
                {action.badge && (
                  <Badge variant="secondary" className="text-xs">
                    {action.badge}
                  </Badge>
                )}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        
        <DropdownMenuSeparator />
        
        {/* Services Submenu */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="flex items-center gap-2">
            <Scale className="h-4 w-4" />
            <span>Services</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="w-72 bg-background">
            {services.map((service) => (
              <DropdownMenuItem key={service.title} asChild>
                <Link to={service.href} className="flex items-center gap-3 cursor-pointer">
                  <service.icon className="h-4 w-4 text-primary" />
                  <div className="flex-1">
                    <div className="font-medium">{service.title}</div>
                    <div className="text-xs text-muted-foreground">{service.description}</div>
                  </div>
                  {service.isPopular && (
                    <Star className="h-3 w-3 text-yellow-500" />
                  )}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        
        {/* Case Types Submenu */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Case Types</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="w-64 bg-background">
            {caseTypes.map((caseType) => (
              <DropdownMenuItem key={caseType.title} asChild>
                <Link to={caseType.href} className="flex items-center justify-between cursor-pointer">
                  <span className="font-medium">{caseType.title}</span>
                  <span className="text-xs text-muted-foreground">{caseType.count}</span>
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        
        {/* Locations Submenu */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>Locations</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="w-56 bg-background">
            {locations.map((location) => (
              <DropdownMenuItem key={location.title} asChild>
                <Link to={location.href} className="flex items-center justify-between cursor-pointer">
                  <span className="font-medium">{location.title}</span>
                  <span className="text-xs text-muted-foreground">{location.cities}</span>
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        
        <DropdownMenuSeparator />
        
        {/* Direct Links */}
        <DropdownMenuItem asChild>
          <Link to="/about" className="flex items-center gap-2 cursor-pointer">
            <Award className="h-4 w-4" />
            <span>About & Credentials</span>
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
          <Link to="/case-studies" className="flex items-center gap-2 cursor-pointer">
            <BookOpen className="h-4 w-4" />
            <span>Case Studies</span>
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
          <Link to="/contact" className="flex items-center gap-2 cursor-pointer">
            <Mail className="h-4 w-4" />
            <span>Contact Us</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default QuickAccessMenu;