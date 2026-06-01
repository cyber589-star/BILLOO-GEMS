'use client';

import { useEffect, useRef } from 'react';

const reviews = [
  {
    quote: 'Absolutely stunning sapphire. The color is even more vibrant in person. Certification was thorough and shipping was impeccable. Will definitely order again.',
    author: 'Eleanor Mitchell',
    role: 'Private Collector · New York',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
  },
  {
    quote: 'I\'ve been buying from BILLOO GEMS for years. Their quality, pricing, and reliability are unmatched. A truly trusted source for fine gemstones.',
    author: 'Ravi Kapoor',
    role: 'Jewelry Designer · Mumbai',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
  },
  {
    quote: 'The Paraiba tourmaline I purchased exceeded every expectation. Expert grading, flawless cut, and outstanding customer service from start to finish.',
    author: 'Sarah Lindström',
    role: 'Gemologist · Stockholm',
    img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop',
  },
];

function Card({ t, i }: { t: typeof reviews[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add('animate-fade-in-up'); }, { threshold: 0 });
    o.observe(el);
    return () => o.disconnect();
  }, []);

  return (
    <div ref={ref} className="opacity-0 bg-white/70 backdrop-blur-xl rounded-2xl p-7 sm:p-9 shadow-xl border border-white/30 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative"
      style={{ transitionDelay: `${i * 120}ms` }}>
      <div className="absolute top-0 left-8 right-8 h-0.5 bg-gradient-to-r from-transparent via-black/20 to-transparent rounded-full" />
      <div className="text-amber-400 text-sm tracking-[3px] mb-4">★★★★★</div>
      <blockquote className="text-sm text-[#4A4A4A] font-light italic leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</blockquote>
      <div className="flex items-center gap-3.5 mt-auto">
        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden shrink-0 ring-2 ring-white/50 shadow-md">
          <img src={t.img} alt={t.author} loading="lazy" className="w-full h-full object-cover" />
        </div>
        <div>
          <strong className="block text-sm font-semibold text-[#2C2C2C]">{t.author}</strong>
          <span className="text-[11px] sm:text-xs text-[#4A4A4A]/70 font-light">{t.role}</span>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add('animate-fade-in-up'); }, { threshold: 0 });
    o.observe(el);
    return () => o.disconnect();
  }, []);

  return (
    <section id="testimonials" className="py-16 sm:py-20 bg-gradient-to-br from-[#FAFAF8] to-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-96 h-96 -top-20 -right-20 rounded-full opacity-[0.03]" style={{ background: 'radial-gradient(circle, black, transparent 70%)' }} />
        <div className="absolute w-80 h-80 -bottom-20 -left-20 rounded-full opacity-[0.03]" style={{ background: 'radial-gradient(circle, black, transparent 70%)' }} />
      </div>
      <div className="max-w-7xl mx-auto px-5 sm:px-6 relative">
        <div ref={ref} className="opacity-0 text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.2em] uppercase text-black mb-4">
            <span className="w-6 h-px bg-black/40" />
            Customer Reviews
            <span className="w-6 h-px bg-black/40" />
          </span>
          <h2 className="font-['Outfit'] text-[clamp(30px,3.8vw,46px)] text-[#2C2C2C] mb-3">
            What Our <span className="text-black">Customers</span> Say
          </h2>
          <p className="text-[#4A4A4A] font-light text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
            Trusted by collectors, jewelers, and investors across the globe.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-7">
          {reviews.map((t, i) => <Card key={i} t={t} i={i} />)}
        </div>
      </div>
    </section>
  );
}
