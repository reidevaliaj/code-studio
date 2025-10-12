'use client';

import Image from 'next/image';

const AnimatedSeparator = () => {
  return (
    <section className="relative h-96 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/divider.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center text-white">
          <h3 className="text-2xl lg:text-3xl font-bold mb-4">
            Ready to Transform Your Digital Presence?
          </h3>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Let's work together to create something extraordinary that drives real results for your business.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AnimatedSeparator;
