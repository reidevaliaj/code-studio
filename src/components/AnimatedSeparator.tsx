'use client';

import { useEffect, useState } from 'react';

const AnimatedSeparator = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('animated-separator');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <section 
      id="animated-separator"
      className="relative h-96 overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800"
    >
      {/* Background Image Placeholder */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-center opacity-30">
            <div className="w-32 h-32 bg-white bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
            </div>
          
          </div>
        </div>
      </div>

      {/* Animated Elements */}
      <div className="absolute inset-0">
        {/* Floating Circles */}
        <div className={`absolute top-10 left-10 w-20 h-20 bg-white bg-opacity-10 rounded-full transition-all duration-1000 ${isVisible ? 'animate-bounce' : ''}`}></div>
        <div className={`absolute top-32 right-20 w-16 h-16 bg-white bg-opacity-15 rounded-full transition-all duration-1000 delay-300 ${isVisible ? 'animate-pulse' : ''}`}></div>
        <div className={`absolute bottom-20 left-1/4 w-12 h-12 bg-white bg-opacity-20 rounded-full transition-all duration-1000 delay-500 ${isVisible ? 'animate-ping' : ''}`}></div>
        <div className={`absolute bottom-32 right-1/3 w-24 h-24 bg-white bg-opacity-5 rounded-full transition-all duration-1000 delay-700 ${isVisible ? 'animate-bounce' : ''}`}></div>

        {/* Floating Lines */}
        <div className={`absolute top-1/4 left-1/3 w-32 h-1 bg-white bg-opacity-20 transition-all duration-1000 delay-200 ${isVisible ? 'animate-pulse' : ''}`}></div>
        <div className={`absolute bottom-1/4 right-1/4 w-24 h-1 bg-white bg-opacity-15 transition-all duration-1000 delay-400 ${isVisible ? 'animate-pulse' : ''}`}></div>

        {/* Floating Dots */}
        <div className={`absolute top-1/2 left-1/5 w-3 h-3 bg-white bg-opacity-30 rounded-full transition-all duration-1000 delay-600 ${isVisible ? 'animate-ping' : ''}`}></div>
        <div className={`absolute top-1/3 right-1/5 w-2 h-2 bg-white bg-opacity-25 rounded-full transition-all duration-1000 delay-800 ${isVisible ? 'animate-ping' : ''}`}></div>
        <div className={`absolute bottom-1/3 left-2/3 w-4 h-4 bg-white bg-opacity-20 rounded-full transition-all duration-1000 delay-1000 ${isVisible ? 'animate-ping' : ''}`}></div>
      </div>

      {/* Overlay Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center text-white">
          <h3 className="text-2xl lg:text-3xl text-white color-white font-bold mb-4">
            Ready to Transform Your  Digital Presence?
          </h3>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Let's work together to create something extraordinary that drives real results for your business.
          </p>
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/20"></div>
    </section>
  );
};

export default AnimatedSeparator;
