'use client';

import { useEffect, useState } from 'react';

const links = [
  { label: 'Gemstones', href: '#featured' },
  { label: 'Categories', href: '#categories' },
  { label: 'About', href: '#about' },
  { label: 'Reviews', href: '#testimonials' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-white/90 backdrop-blur-2xl shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 flex items-center justify-between">
        <a href="#"
          className={`font-['Outfit'] text-xl sm:text-2xl font-bold tracking-wider transition-colors duration-500 ${
            scrolled ? 'text-[#2C2C2C]' : 'text-white'
          }`}>
          <span className="mr-1.5">💎</span>BILLOO GEMS
        </a>

        <ul className="hidden md:flex items-center gap-8 lg:gap-10">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href}
                className={`text-sm font-medium tracking-wide transition-colors duration-300 relative
                  after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1.5px] after:transition-all after:duration-300 hover:after:w-full
                  ${scrolled ? 'text-[#4A4A4A] hover:text-[#2C2C2C] after:bg-black' : 'text-white/80 hover:text-white after:bg-[#C9A96E]'}`}>
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#contact"
              className="inline-flex items-center justify-center gap-2 px-5 lg:px-7 py-2.5 bg-black text-white text-sm font-semibold rounded-full
                         hover:bg-black/80 transition-all duration-300 shadow-lg shadow-black/25 flex-shrink-0 whitespace-nowrap border-2 border-black">
              Contact
            </a>
          </li>
        </ul>

        <button className="md:hidden flex flex-col gap-1.5 p-1.5 z-50" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          <span className={`block w-6 h-[2px] rounded-full transition-all duration-300 ${scrolled ? 'bg-[#2C2C2C]' : 'bg-white'} ${open ? 'rotate-45 translate-y-[5px]' : ''}`} />
          <span className={`block w-6 h-[2px] rounded-full transition-all duration-300 ${scrolled ? 'bg-[#2C2C2C]' : 'bg-white'} ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-[2px] rounded-full transition-all duration-300 ${scrolled ? 'bg-[#2C2C2C]' : 'bg-white'} ${open ? '-rotate-45 -translate-y-[5px]' : ''}`} />
        </button>
      </div>

      <div className={`fixed inset-0 bg-[#2C2C2C]/98 backdrop-blur-2xl flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden ${
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}
            className="text-white/80 text-xl font-medium tracking-wide hover:text-white transition-colors">
            {l.label}
          </a>
        ))}
        <a href="#contact" onClick={() => setOpen(false)}
          className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-black text-white text-base font-semibold rounded-full mt-2 hover:bg-black/80 transition-all duration-300 border-2 border-black">
          Contact
        </a>
      </div>
    </nav>
  );
}
