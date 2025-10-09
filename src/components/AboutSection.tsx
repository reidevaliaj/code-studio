'use client';
import { useTranslations } from 'next-intl';
import Section from './Section';
import Button from './Button';
import Image from 'next/image';

const AboutSection = () => {
  const t = useTranslations('home.about');

  const stats = [
    { label: 'Projects Completed', value: t('stats.projects') },
    { label: 'Happy Clients', value: t('stats.clients') },
    { label: 'Years Experience', value: t('stats.experience') },
    { label: 'Client Satisfaction', value: t('stats.satisfaction') },
  ];

  return (
    <Section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 font-heading">
                {t('title')}
              </h2>
              <p className="text-xl text-accent font-semibold mb-6 font-sans">
                {t('subtitle')}
              </p>
              <p className="text-lg text-gray-600 leading-relaxed font-sans">
                {t('description')}
              </p>
            </div>
            
            <div>
              <Button 
                href="/contact" 
                variant="primary" 
                size="lg"
              >
                Get In Touch
              </Button>
            </div>
          </div>

          {/* Code Studio Visual Element */}
          <div className="flex justify-center lg:justify-end">
          <ImageWithIcon imageSrc="/images/aboutusimage.jpg" />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16 pt-16 border-t border-gray-200">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-accent mb-2 font-heading">
                {stat.value}
              </div>
              <div className="text-gray-600 font-medium font-sans">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default AboutSection;

function ImageWithIcon({
    imageSrc,
     // you can change this text
  }: {
    imageSrc: string;
    label?: string;
  }) {
    return (
      <div className="relative w-[400px] h-[300px] md:w-[450px] md:h-[350px]">
        {/* Image card */}
        <div className="relative w-full h-full rounded-2xl overflow-hidden ">
          <Image
            src={imageSrc}
            alt="Code Studio Team"
            width={900}
            height={700}
            className="w-full h-full object-cover"
            priority
          />
  
          {/* soft bottom gradient like the reference */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
  
        {/* Overlapping icon + pill (bottom-left) */}
        <div className="absolute -bottom-1 -left-1 flex items-center gap-3">
          {/* circular icon badge */}
          <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center  ring-14 ring-gray-50">
            <span className="text-2xl font-bold font-heading">&lt;/&gt;</span>
          </div>
  
        </div>
      </div>
    );
  }