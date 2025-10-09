import { ReactNode } from 'react';

interface SectionProps {
  title?: string;
  children: ReactNode;
  className?: string;
  id?: string;
}

const Section = ({ title, children, className = '', id }: SectionProps) => {
  return (
    <section 
      id={id}
      className={`py-16 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {title}
          </h2>
        )}
        {children}
      </div>
    </section>
  );
};

export default Section;
