'use client';

import { useEffect, useRef } from 'react';

const cats = [
  { name: 'Precious Gems', desc: 'Rubies, Sapphires, Emeralds &amp; Diamonds', img: '/shsh.PNG', count: '124 stones' },
  { name: 'Semi-Precious', desc: 'Amethyst, Citrine, Garnet &amp; Tourmaline', img: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=600&auto=format&fit=crop', count: '89 stones' },
  { name: 'Rare &amp; Exotic', desc: 'Alexandrite, Paraiba &amp; Padparadscha', img: 'https://images.unsplash.com/photo-1519181245277-cffeb31da2e3?q=80&w=600&auto=format&fit=crop', count: '36 stones' },
  { name: 'Certified Lots', desc: 'Bulk &amp; Investment-grade parcels', img: '/k.PNG', count: '18 lots' },
];

function Card({ cat, i }: { cat: typeof cats[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add('animate-fade-in-up'); }, { threshold: 0 });
    o.observe(el);
    return () => o.disconnect();
  }, []);

  return (
    <div ref={ref} className="opacity-0 group relative rounded-xl sm:rounded-2xl overflow-hidden h-[260px] sm:h-[300px] cursor-pointer transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl"
         style={{ transitionDelay: `${i * 100}ms` }}>
      <img src={cat.img} alt={cat.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-white/20 rounded-tl-md opacity-0 group-hover:opacity-100 transition-all duration-500" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-white/20 rounded-br-md opacity-0 group-hover:opacity-100 transition-all duration-500" />
      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7 text-white">
        <h3 className="font-['Outfit'] text-xl sm:text-2xl mb-1">{cat.name}</h3>
        <p className="text-xs sm:text-sm text-white/70 font-light mb-2" dangerouslySetInnerHTML={{ __html: cat.desc }} />
        <span className="inline-block text-[10px] sm:text-xs text-white/50 font-medium tracking-wider uppercase">{cat.count}</span>
      </div>
    </div>
  );
}

export default function Categories() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add('animate-fade-in-up'); }, { threshold: 0 });
    o.observe(el);
    return () => o.disconnect();
  }, []);

  return (
    <section id="categories" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <div ref={ref} className="opacity-0 text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.2em] uppercase text-black mb-4">
            <span className="w-6 h-px bg-black/40" />
            Shop By Category
            <span className="w-6 h-px bg-black/40" />
          </span>
          <h2 className="font-['Outfit'] text-[clamp(30px,3.8vw,46px)] text-[#2C2C2C] mb-3">
            Gemstone <span className="text-black">Categories</span>
          </h2>
          <p className="text-[#4A4A4A] font-light text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
            From precious classics to rare exotic finds — find your perfect stone.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {cats.map((cat, i) => <Card key={i} cat={cat} i={i} />)}
        </div>
      </div>
    </section>
  );
}
