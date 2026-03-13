
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <img
          src="/homePage-image/sports.jpg"
          alt="Hero banner showing athlete racing with cheetah"
          className={`object-cover w-full h-full filter brightness-[0.85] transition-transform duration-[2s] ease-out-expo ${isLoaded ? 'scale-100' : 'scale-110'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
      </div>
      
      {/* Content */}
      <div className="container relative z-10 px-4 mx-auto pt-20 pb-12 flex flex-col h-full justify-center">
        <div className="max-w-lg animate-slide-in opacity-10" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
          <div className="inline-block mb-4 overflow-hidden">
            <span className="inline-block py-1 px-3 bg-primary/10 text-xs font-medium uppercase tracking-wider rounded-full animate-slide-in opacity-0" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
              New Collection
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white">
            <span className="block overflow-hidden">
              <span className="inline-block animate-slide-in opacity-0" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
                Performance Gear
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="inline-block animate-slide-in opacity-0" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
                For Every Athlete
              </span>
            </span>
          </h1>
          
          <p className="text-lg text-white/90 mb-8 max-w-md animate-slide-in opacity-0" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
            Elevate your performance with our premium collection of sports apparel and footwear designed for comfort and durability.
          </p>
          
          <div className="flex flex-wrap gap-4 animate-slide-in opacity-0" style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}>
            <Button asChild size="lg" className="rounded-full px-6">
              <Link to="/category/shoes">
                Shop Men
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-6 bg-transparent backdrop-blur-sm text-white border-white/20 hover:bg-white/10 hover:text-white">
              <Link to="/category/women">
                Shop Women
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll down indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/80 flex flex-col items-center animate-slide-in opacity-0" style={{ animationDelay: '1.5s', animationFillMode: 'forwards' }}>
        <span className="text-sm mb-2">Scroll to discover</span>
        <ArrowRight className="w-5 h-5 rotate-90" />
      </div>
    </section>
  );
};

export default HeroSection;
