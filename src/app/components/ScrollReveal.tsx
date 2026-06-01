'use client';

import { useEffect, useRef } from 'react';

export default function ScrollReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const els = el.querySelectorAll('.opacity-0');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((child) => observer.observe(child));

    const fallback = setTimeout(() => {
      els.forEach((child) => child.classList.add('animate-fade-in-up'));
    }, 3000);

    return () => { observer.disconnect(); clearTimeout(fallback); };
  }, []);

  return <div ref={ref}>{children}</div>;
}
