'use client';

import { useEffect, useRef } from 'react';

const features = [
  {
    title: '100% Authentic',
    desc: 'Every gemstone includes a certificate of authenticity from GIA, IGI, or SSEF laboratories.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: 'Direct From Source',
    desc: 'We buy directly from mines and cutters — no middlemen. You get better prices and full traceability.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    title: 'Secure Delivery',
    desc: 'Fully insured, discreet, and tracked worldwide shipping with tamper-proof packaging.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      </svg>
    ),
  },
  {
    title: '30-Day Returns',
    desc: 'Not satisfied? Return any gemstone within 30 days for a full, no-questions-asked refund.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="M12 15l-3-3a6 6 0 0 1 9-9 6 6 0 0 1-3 9z" />
      </svg>
    ),
  },
];

function Card({ f, i }: { f: typeof features[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add('animate-fade-in-up'); }, { threshold: 0 });
    o.observe(el);
    return () => o.disconnect();
  }, []);

  return (
    <div ref={ref} className="opacity-0 bg-white/70 backdrop-blur-xl rounded-2xl p-7 sm:p-8 lg:p-10 text-center shadow-xl border border-white/30 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
      style={{ transitionDelay: `${i * 100}ms` }}>
      <div className="w-16 h-16 sm:w-[72px] sm:h-[72px] mx-auto mb-5 rounded-full flex items-center justify-center text-black bg-white shadow-sm border border-gray-200/30 transition-all duration-500 group-hover:scale-110">
        {f.icon}
      </div>
      <h3 className="font-['Outfit'] text-xl sm:text-[22px] mb-2.5 text-[#2C2C2C]">{f.title}</h3>
      <p className="text-xs sm:text-sm text-[#4A4A4A] font-light leading-relaxed">{f.desc}</p>
    </div>
  );
}

export default function WhyChooseUs() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add('animate-fade-in-up'); }, { threshold: 0 });
    o.observe(el);
    return () => o.disconnect();
  }, []);

  return (
    <section id="why-choose-us" className="py-16 sm:py-20 bg-gradient-to-br from-[#FDF8F0] to-[#F5EDE0] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-96 h-96 -top-20 -right-20 rounded-full opacity-[0.04]" style={{ background: 'radial-gradient(circle, black, transparent 70%)' }} />
        <div className="absolute w-80 h-80 -bottom-20 -left-20 rounded-full opacity-[0.04]" style={{ background: 'radial-gradient(circle, black, transparent 70%)' }} />
      </div>
      <div className="max-w-7xl mx-auto px-5 sm:px-6 relative">
        <div ref={ref} className="opacity-0 text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.2em] uppercase text-black mb-4">
            <span className="w-6 h-px bg-black/40" />
            Why Shop With Us
            <span className="w-6 h-px bg-black/40" />
          </span>
          <h2 className="font-['Outfit'] text-[clamp(30px,3.8vw,46px)] text-[#2C2C2C] mb-3">
            Trusted by <span className="text-black">Collectors</span> Worldwide
          </h2>
          <p className="text-[#4A4A4A] font-light text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
            We uphold the highest standards of quality, ethics, and customer care.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-7">
          {features.map((f, i) => <Card key={i} f={f} i={i} />)}
        </div>
      </div>
    </section>
  );
}
