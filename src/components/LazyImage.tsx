import React, { useState } from 'react';
import useLazyLoading from '@/hooks/useLazyLoading';
import { cn } from '@/lib/utils';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  placeholder?: string;
  className?: string;
  containerClassName?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  placeholder = '/placeholder.svg',
  className,
  containerClassName,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { elementRef, isVisible } = useLazyLoading({
    threshold: 0.1,
    rootMargin: '100px',
    triggerOnce: true
  });

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  return (
    <div 
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={cn('relative overflow-hidden', containerClassName)}
    >
      {/* Placeholder */}
      {!isLoaded && (
        <div className={cn(
          'absolute inset-0 bg-muted animate-pulse flex items-center justify-center',
          className
        )}>
          <div className="w-12 h-12 border-2 border-muted-foreground/20 border-t-primary rounded-full animate-spin" />
        </div>
      )}
      
      {/* Actual image */}
      {isVisible && (
        <img
          src={hasError ? placeholder : src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            'transition-opacity duration-300',
            isLoaded ? 'opacity-100' : 'opacity-0',
            className
          )}
          loading="lazy"
          {...props}
        />
      )}
    </div>
  );
};

export default LazyImage;