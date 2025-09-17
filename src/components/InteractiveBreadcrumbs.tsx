import { Link } from 'react-router-dom';
import { ChevronRight, Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface InteractiveBreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  showBackButton?: boolean;
}

const InteractiveBreadcrumbs = ({ 
  items, 
  className = "", 
  showBackButton = false 
}: InteractiveBreadcrumbsProps) => {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {showBackButton && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleGoBack}
          className="hover:bg-primary/10 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
      )}
      
      <nav className="flex items-center space-x-1 text-sm">
        <Link
          to="/"
          className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors hover:bg-primary/10 px-2 py-1 rounded-md group"
        >
          <Home className="h-4 w-4 group-hover:scale-110 transition-transform" />
          <span className="hidden sm:inline">Home</span>
        </Link>
        
        {items.length > 0 && (
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        )}
        
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <div key={index} className="flex items-center space-x-1">
              {isLast ? (
                <span className="text-foreground font-medium bg-primary/5 px-2 py-1 rounded-md">
                  {item.label}
                </span>
              ) : (
                <>
                  <Link
                    to={item.href}
                    className="text-muted-foreground hover:text-primary transition-colors hover:bg-primary/10 px-2 py-1 rounded-md hover:scale-105 transform"
                  >
                    {item.label}
                  </Link>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default InteractiveBreadcrumbs;