import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BreadcrumbItem } from '@/utils/slugs';

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  return (
    <nav aria-label="Breadcrumb" className={`flex items-center space-x-2 text-sm ${className}`}>
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && (
            <ChevronRight className="h-4 w-4 text-muted-foreground mx-2" />
          )}
          {index === 0 ? (
            <Link 
              to={item.href}
              className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <Home className="h-4 w-4 mr-1" />
              {item.label}
            </Link>
          ) : index === items.length - 1 ? (
            <span className="text-foreground font-medium">
              {item.label}
            </span>
          ) : (
            <Link 
              to={item.href}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumbs;