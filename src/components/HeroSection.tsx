'use client';

import {useTranslations} from 'next-intl';
import Button from './Button';
import Image from 'next/image';

type HeroSectionProps = {
  /** i18n namespace, e.g. "home.hero" or "partners.hero" */
  ns?: string;
  /** Background video in /public/videos; if omitted, uses imageSrc */
  videoSrc?: string;
  /** Optional background image in /public/images if you don’t want a video */
  imageSrc?: string;
  /** CTA href override (defaults to /contact) */
  ctaHref?: string;
  /** Rotating ring options */
  ringText?: string;
  centerImageSrc?: string;
};

export default function HeroSection({
  ns = 'home.hero',
  videoSrc = '/videos/hero-background1.mp4',
  imageSrc,
  ctaHref = '/contact',
  ringText,
  centerImageSrc = '/images/elementorot.png'
}: HeroSectionProps) {
  const t = useTranslations(ns);

  return (
    <section className="dark-section relative min-h-screen flex items-center overflow-hidden">
      {/* Background: prefer video if provided, else image */}
      <div className="absolute inset-0 z-0">
  {imageSrc ? (
    <>
      <Image
        src={imageSrc}
        alt=""
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/60" />
    </>
  ) : videoSrc ? (
    <>
      <video
        className="w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/60" />
    </>
  ) : null}
</div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-12 items-center min-h-screen py-20">
          {/* Left */}
          <div className="text-left text-white space-y-8">
            <p className="text-sm font-medium uppercase tracking-widest text-white/80 font-sans">
              {t('subtitle')}
            </p>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight font-heading">
              {t('title')}
            </h1>

            <div className="pt-4">
              <Button href={ctaHref} variant="secondary" size="lg">
                {t('cta')}
              </Button>
            </div>
          </div>

          {/* Right */}
          <div className="flex justify-center lg:justify-end">
            <RotatingRing
              centerImageSrc={centerImageSrc}
              ringText={ringText ?? ' CODE STUDIO • YOUR PARTNER • '}
            />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}

function RotatingRing({
  centerImageSrc,
  ringText = ' CODE STUDIO • YOUR PARTNER • '
}: {
  centerImageSrc: string;
  ringText?: string;
}) {
  const text = ringText.repeat(8).slice(0, 120);
  return (
    <div className="relative w-[220px] h-[220px] md:w-[260px] md:h-[260px]">
      <div className="absolute inset-0 grid place-items-center">
        <Image
          src={centerImageSrc}
          alt="Center"
          width={96}
          height={96}
          className="rounded-full shadow-lg"
        />
      </div>

      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 m-auto [animation:spin_16s_linear_infinite] will-change-transform"
      >
        <defs>
          <path id="ring-path" d="M 100,100 m -80,0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0" />
        </defs>
        <text fill="none" className="text-[14px] md:text-[15px]" style={{letterSpacing: '0.25em'}}>
          <textPath href="#ring-path" startOffset="0" className="fill-white/90">
            {text}
          </textPath>
        </text>
      </svg>

      <div className="absolute inset-0 rounded-full border border-white/30" />
      <div className="absolute inset-0 grid place-items-center">
        <span className="block h-3 w-3 rounded-full bg-accent shadow-[0_0_0_6px_rgba(255,255,255,0.15)]" />
      </div>
    </div>
  );
}
