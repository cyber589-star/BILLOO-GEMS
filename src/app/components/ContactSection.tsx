'use client';

import { useEffect, useRef } from 'react';

const info = [
  { icon: '✉', label: 'Email', value: 'hello@billoogems.com', href: 'mailto:hello@billoogems.com' },
  { icon: '📞', label: 'Phone', value: '+1 (234) 567-890', href: 'tel:+1234567890' },
  { icon: '📍', label: 'Location', value: 'Antwerp · New York · Mumbai', href: null },
  { icon: '🕐', label: 'Hours', value: 'Mon–Fri: 9 AM – 6 PM EST', href: null },
];

function InfoCard({ item, i }: { item: typeof info[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add('animate-fade-in-up'); }, { threshold: 0 });
    o.observe(el);
    return () => o.disconnect();
  }, []);

  return (
    <div ref={ref} className="opacity-0 bg-white/70 backdrop-blur-xl rounded-2xl p-5 sm:p-6 shadow-xl border border-white/30 hover:shadow-2xl hover:-translate-y-1 transition-all duration-400 flex items-center gap-4"
      style={{ transitionDelay: `${i * 100}ms` }}>
      <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-gray-200/30 flex items-center justify-center text-lg shrink-0">
        <span className="opacity-70">{item.icon}</span>
      </div>
      <div className="min-w-0">
        <div className="text-xs text-black font-medium tracking-wider uppercase mb-0.5">{item.label}</div>
        {item.href ? (
          <a href={item.href} className="text-sm sm:text-base text-[#2C2C2C] font-medium no-underline hover:text-black transition-colors">{item.value}</a>
        ) : (
          <div className="text-sm sm:text-base text-[#2C2C2C] font-medium">{item.value}</div>
        )}
      </div>
    </div>
  );
}

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add('animate-fade-in-up'); }, { threshold: 0 });
    o.observe(el);
    return () => o.disconnect();
  }, []);

  return (
    <section id="contact" className="py-16 sm:py-20 bg-gradient-to-br from-[#FAFAF8] to-[#F5EDE0] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-96 h-96 -top-20 -right-20 rounded-full opacity-[0.03]" style={{ background: 'radial-gradient(circle, black, transparent 70%)' }} />
        <div className="absolute w-80 h-80 -bottom-20 -left-20 rounded-full opacity-[0.03]" style={{ background: 'radial-gradient(circle, black, transparent 70%)' }} />
      </div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F5EDE0] to-transparent" />
      <div className="max-w-7xl mx-auto px-5 sm:px-6 relative">
        <div ref={ref} className="opacity-0 text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.2em] uppercase text-black mb-4">
            <span className="w-6 h-px bg-black/40" />
            Get In Touch
            <span className="w-6 h-px bg-black/40" />
          </span>
          <h2 className="font-['Outfit'] text-[clamp(30px,3.8vw,46px)] text-[#2C2C2C] mb-3">
            Have a <span className="text-black">Question</span>?
          </h2>
          <p className="text-[#4A4A4A] font-light text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
            Whether you&apos;re looking for a specific gemstone or need expert advice — we&apos;re here to help.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="space-y-4 sm:space-y-5">
            {info.map((item, i) => <InfoCard key={i} item={item} i={i} />)}
          </div>

          <div className="mt-6 sm:mt-8 flex justify-center">
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-5 sm:p-6 shadow-xl border border-white/30 inline-flex items-center gap-4">
              <span className="text-base opacity-60">🔒</span>
              <div>
                <div className="text-xs font-semibold text-[#2C2C2C]">Secure &amp; Confidential</div>
                <div className="text-[10px] text-[#4A4A4A] font-light">SSL encrypted</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
