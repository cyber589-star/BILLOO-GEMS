'use client';

import { useEffect, useRef, useState } from 'react';

const gems = [
  { name: 'Blue Ceylon Sapphire', category: 'Precious', price: '$4,800', img: '/zkzb.PNG', desc: 'A stunning natural blue Ceylon sapphire with exceptional color saturation and clarity.' },
  { name: 'Burma Ruby', category: 'Precious', price: '$6,200', img: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=600&auto=format&fit=crop', desc: 'A vivid pigeon-blood Burma ruby with exceptional fluorescence and brilliance.' },
  { name: 'Colombian Emerald', category: 'Luxury', price: '$7,500', img: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=600&auto=format&fit=crop', desc: 'A lush green Colombian emerald with superb transparency and minimal inclusions.' },
  { name: 'Paraiba Tourmaline', category: 'Exotic', price: '$9,800', img: 'https://images.unsplash.com/photo-1519181245277-cffeb31da2e3?q=80&w=600&auto=format&fit=crop', desc: 'A neon-blue Paraiba tourmaline with the signature electric glow. Extremely rare.' },
  { name: 'Padparadscha Sapphire', category: 'Exotic', price: '$12,400', img: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop', desc: 'A rare padparadscha sapphire with the perfect salmon-pink hue. One of the most coveted gemstones.' },
  { name: 'Alexandrite', category: 'Rare', price: '$8,600', img: '/WhatsApp Image 2026-06-01 at 12.31.55 AM.jpeg', desc: 'A color-change alexandrite that shifts from emerald green in daylight to raspberry red under incandescent light.' },
];

function Card({ gem, i, onViewDetails }: { gem: typeof gems[0]; i: number; onViewDetails: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [wish, setWish] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add('animate-fade-in-up'); }, { threshold: 0 });
    o.observe(el);
    return () => o.disconnect();
  }, []);

  return (
    <div ref={ref} onClick={onViewDetails}
      className="opacity-0 group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 cursor-pointer"
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ transitionDelay: `${(i % 3) * 100}ms` }}>
      <div className="relative h-[200px] sm:h-[260px] lg:h-[280px] overflow-hidden bg-[#F5EDE0]">
        <img src={gem.img} alt={gem.name} loading="lazy"
          className={`w-full h-full object-cover transition-all duration-700 ${hover ? 'scale-110' : 'scale-100'}`} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
        <button onClick={(e) => { e.stopPropagation(); setWish(!wish); }}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/85 backdrop-blur-md flex items-center justify-center text-sm sm:text-base transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 hover:bg-white shadow-sm">
          {wish ? <span className="text-black">♥</span> : <span>♡</span>}
        </button>
      </div>
      <div className="p-4 sm:p-6">
        <div className="text-[10px] sm:text-[11px] font-medium text-black tracking-[0.1em] uppercase mb-1">{gem.category}</div>
          <h3 className="font-['Outfit'] text-base sm:text-xl mb-0.5 truncate">{gem.name}</h3>
        <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-[#F5EDE0]/80">
          <span className="font-['Outfit'] text-lg sm:text-2xl font-bold text-black">{gem.price}</span>
          <span className="text-[11px] sm:text-xs text-black/60 font-medium">Click to view</span>
        </div>
      </div>
    </div>
  );
}

function DetailModal({ gem, onClose }: { gem: typeof gems[0] | null; onClose: () => void }) {
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (gem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [gem]);

  if (!gem) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="relative bg-white rounded-2xl max-w-3xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
        {/* Close */}
        <button onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-lg hover:bg-white transition-all shadow-sm">
          ✕
        </button>

        {/* Image */}
        <div className="relative h-[280px] sm:h-[400px] bg-gradient-to-b from-[#F5EDE0] to-[#FAFAF8]">
          <img src={gem.img} alt={gem.name} className="w-full h-full object-contain p-4 sm:p-8" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent pointer-events-none" />
        </div>

        {/* Details */}
        <div className="p-5 sm:p-8 lg:p-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
            <div>
              <div className="text-xs font-medium text-black tracking-[0.1em] uppercase mb-1">{gem.category}</div>
              <h2 className="font-['Outfit'] text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2C2C2C]">{gem.name}</h2>
            </div>
            <div className="text-left sm:text-right shrink-0">
              <div className="text-xs text-[#4A4A4A]/60 font-light mb-0.5">Amount</div>
              <div className="font-['Outfit'] text-3xl sm:text-4xl font-bold text-black">{gem.price}</div>
            </div>
          </div>

          <div className="border-t border-[#F5EDE0]/80 pt-5 mb-6">
            <p className="text-sm sm:text-base text-[#4A4A4A] font-light leading-relaxed">{gem.desc}</p>
          </div>

          {/* Quantity */}
          <div className="border-t border-[#F5EDE0]/80 pt-5 mb-6">
            <h3 className="text-xs font-medium text-[#4A4A4A] uppercase tracking-wider mb-3">Quantity</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center border-2 border-black/20 rounded-full overflow-hidden">
                <button onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-10 h-10 flex items-center justify-center text-lg font-medium hover:bg-black/5 transition-colors">−</button>
                <span className="w-12 text-center font-semibold text-base">{qty}</span>
                <button onClick={() => setQty(qty + 1)}
                  className="w-10 h-10 flex items-center justify-center text-lg font-medium hover:bg-black/5 transition-colors">+</button>
              </div>
              <span className="text-sm text-[#4A4A4A] font-light">
                Total: <strong className="text-black font-semibold">{(parseInt(gem.price.replace(/[$,]/g, '')) * qty).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</strong>
              </span>
            </div>
          </div>

          {/* Trust */}
          <div className="border-t border-[#F5EDE0]/80 pt-5 mb-6">
            <div className="flex flex-wrap gap-y-3 gap-x-6 text-sm">
              {[
                { icon: '✓', label: 'Certified Authentic' },
                { icon: '✓', label: 'Free Shipping' },
                { icon: '✓', label: '30-Day Returns' },
                { icon: '✓', label: 'Insured Delivery' },
              ].map((t) => (
                <div key={t.label} className="flex items-center gap-2 text-[#4A4A4A] font-light">
                  <span className="w-5 h-5 rounded-full bg-black/10 flex items-center justify-center text-[10px] text-black font-bold shrink-0">{t.icon}</span>
                  {t.label}
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-5 border-t border-[#F5EDE0]/80">
            <a href="#contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-black text-white text-sm font-semibold rounded-full hover:bg-black/80 transition-all duration-300 shadow-lg shadow-black/25 border-2 border-black flex-1 sm:flex-none text-center">
              Inquire Now
            </a>
            <a href="tel:+923018037442"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-black text-sm font-semibold rounded-full border-2 border-black hover:bg-black hover:text-white transition-all duration-300 flex-1 sm:flex-none text-center no-underline">
              Call to Order
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FeaturedGemstones() {
  const [selectedGem, setSelectedGem] = useState<typeof gems[0] | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add('animate-fade-in-up'); }, { threshold: 0 });
    o.observe(el);
    return () => o.disconnect();
  }, []);

  return (
    <>
      <section id="featured" className="py-16 sm:py-20 bg-[#FAFAF8]">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div ref={ref} className="opacity-0 text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <span className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.2em] uppercase text-black mb-4">
              <span className="w-6 h-px bg-black/40" />
              Our Collection
              <span className="w-6 h-px bg-black/40" />
            </span>
            <h2 className="font-['Outfit'] text-[clamp(30px,3.8vw,46px)] text-[#2C2C2C] mb-3">
              Featured <span className="text-black">Gemstones</span>
            </h2>
            <p className="text-[#4A4A4A] font-light text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
              Each piece is hand-selected by our expert gemologists for brilliance, color saturation, and rarity. Every stone is certified.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-7">
            {gems.map((gem, i) => <Card key={i} gem={gem} i={i} onViewDetails={() => setSelectedGem(gem)} />)}
          </div>
        </div>
      </section>
      <DetailModal gem={selectedGem} onClose={() => setSelectedGem(null)} />
    </>
  );
}
