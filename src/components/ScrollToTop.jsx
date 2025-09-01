import React, { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';
import { cn } from '../../lib/utils';

const ScrollToTop = ({ className, ...props }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <button
      className={cn(
        'fixed bottom-4 right-4 p-3 rounded-full bg-purple-600 text-white shadow-lg transition-opacity duration-300',
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none',
        className
      )}
      onClick={scrollToTop}
      aria-label="Scroll to top"
      {...props}
    >
      <ChevronUp className="w-6 h-6" />
    </button>
  );
};

export default ScrollToTop;
