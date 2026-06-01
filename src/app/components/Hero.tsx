'use client';

import { useRef } from 'react';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleEnded = () => {
    const v = videoRef.current;
    if (v && v.duration) v.currentTime = v.duration;
  };

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-[#2C2C2C]">
      {/* Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        preload="auto"
        autoPlay
        muted
        playsInline
        onEnded={handleEnded}
        src="/download (4).mp4"
      />

      {/* Dark overlay — stronger on mobile for readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/55 to-black/20 sm:from-[#2C2C2C]/85 sm:via-[#2C2C2C]/40 sm:to-black/25" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_50%,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
      <div className="absolute inset-0 opacity-20 sm:opacity-25"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      {/* Floating orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-80 h-80 top-[5%] -left-[8%] rounded-full opacity-40"
          style={{ background: 'radial-gradient(circle at 30% 30%, rgba(201,169,110,0.1), transparent 70%)' }} />
        <div className="absolute w-56 h-56 bottom-[15%] right-[3%] rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle at 30% 30%, rgba(139,0,0,0.08), transparent 70%)' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center px-5 sm:px-6 w-full pt-20 sm:pt-0 pb-20 sm:pb-0">
        <div className="text-center max-w-4xl mx-auto w-full">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-1.5 sm:py-2 border border-white/20 rounded-full text-white/80 text-[10px] sm:text-xs font-medium tracking-[0.15em] sm:tracking-[0.2em] uppercase mb-3 sm:mb-8 backdrop-blur-md bg-white/5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E] animate-pulse shrink-0" />
            Since 2012 — Premium Gemstone Store
          </div>

          {/* Heading */}
          <h1 className="text-white font-['Outfit'] text-[clamp(24px,5.5vw,76px)] font-bold leading-[1.1] sm:leading-[1.05] mb-2 sm:mb-5 tracking-wide">
            Discover Rare &amp;{' '}
            <span className="text-[#C9A96E]">Authentic</span>
            <br className="hidden sm:block" /> Gemstones
          </h1>

          {/* Subtitle */}
          <p className="text-white/65 text-xs sm:text-lg max-w-xl mx-auto mb-5 sm:mb-10 font-light leading-relaxed px-1 sm:px-0">
            Browse our exclusive collection of ethically sourced, certified gemstones. Each stone hand-selected for its brilliance and rarity.
          </p>

          {/* Buttons */}
          <div className="flex items-center justify-center gap-2.5 sm:gap-4 flex-wrap px-1 sm:px-0">
            <a href="#featured"
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-9 py-2.5 sm:py-4 bg-black text-white text-xs sm:text-base font-semibold rounded-full
                         shadow-lg shadow-black/35 hover:bg-black/80 hover:-translate-y-0.5 hover:shadow-xl
                         transition-all duration-300 flex-shrink-0 whitespace-nowrap border-2 border-black">
              Browse Collection
            </a>
            <a href="#contact"
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-9 py-2.5 sm:py-4 text-white text-xs sm:text-base font-semibold rounded-full
                         border-2 border-black hover:bg-black hover:-translate-y-0.5
                         transition-all duration-300 flex-shrink-0 whitespace-nowrap">
              Contact Us
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 sm:gap-2 text-white/30 sm:text-white/35 text-[10px] tracking-[0.25em] uppercase">
        <span>Scroll</span>
        <div className="w-px h-5 sm:h-9" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.2), transparent)' }} />
      </div>
    </section>
  );
}
