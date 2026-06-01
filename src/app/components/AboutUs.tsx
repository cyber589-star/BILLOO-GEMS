'use client';

import { useEffect, useRef } from 'react';

const stats = [
  { value: '14+', label: 'Years in Business' },
  { value: '10K+', label: 'Happy Customers' },
  { value: '5,000+', label: 'Gemstones Sold' },
  { value: '99.8%', label: 'Satisfaction Rate' },
];

export default function AboutUs() {
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    [ref1, ref2].forEach((r) => {
      const el = r.current;
      if (!el) return;
      const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add('animate-fade-in-up'); }, { threshold: 0 });
      o.observe(el);
      return () => o.disconnect();
    });
  }, []);

  return (
    <section id="about" className="py-16 sm:py-20 bg-[#FDF8F0] relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F5EDE0] to-transparent" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div ref={ref1} className="opacity-0 relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] max-w-lg mx-auto lg:mx-0">
              <img src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=800&auto=format&fit=crop"
                   alt="Expert gemologist" loading="lazy" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />
            </div>
            <div className="absolute -bottom-4 -right-4 lg:right-[-20px] lg:bottom-[-20px] bg-black text-white rounded-2xl p-5 sm:p-6 shadow-xl shadow-black/25 max-w-[200px] sm:max-w-[220px]">
              <div className="font-['Outfit'] text-2xl sm:text-3xl font-bold leading-none mb-1">100%</div>
              <div className="text-white/80 text-xs sm:text-sm font-light">Certified Authentic</div>
            </div>
          </div>

          <div ref={ref2} className="opacity-0">
            <span className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.2em] uppercase text-black mb-4">
              <span className="w-6 h-px bg-black/40" />
              About Our Store
            </span>
            <h2 className="font-['Outfit'] text-[clamp(30px,3.8vw,46px)] text-[#2C2C2C] mb-5 leading-tight">
              A Legacy of <span className="text-black">Quality</span> in Every Gemstone
            </h2>
            <div className="space-y-4 text-[#4A4A4A] font-light text-sm sm:text-base leading-relaxed">
              <p>Founded in 2012, BILLOO GEMS has grown from a small family atelier in Antwerp to a trusted name in fine gemstones. We personally source every stone from the world&apos;s most renowned mining regions.</p>
              <p>From the sapphire mines of Sri Lanka to the emerald valleys of Colombia, we travel the globe to hand-select each gemstone that bears our name. Every purchase includes a certificate from GIA, IGI, or SSEF.</p>
              <p>When you buy from BILLOO GEMS, you&apos;re buying directly from a family of gem experts — not a third-party platform. We stand behind every stone we sell.</p>
            </div>
            <a href="#featured"
              className="inline-flex items-center justify-center gap-2 px-7 sm:px-9 py-3.5 sm:py-4 mt-6 sm:mt-8 bg-black text-white text-sm sm:text-base font-semibold rounded-full
                         shadow-lg shadow-black/25 hover:bg-black/80 hover:-translate-y-0.5 transition-all duration-300 flex-shrink-0 whitespace-nowrap border-2 border-black">
              Browse Our Collection
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-8 mt-14 sm:mt-20 pt-10 sm:pt-14 border-t border-[#F5EDE0]/60">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="font-['Outfit'] text-3xl sm:text-4xl font-bold text-black mb-1">{s.value}</div>
              <div className="text-xs sm:text-sm text-[#4A4A4A] font-light">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
