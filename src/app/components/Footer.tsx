'use client';

export default function Footer() {
  return (
    <footer className="bg-[#2C2C2C] border-t border-white/5">
      {/* Newsletter */}
      <div className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 py-10 sm:py-12 lg:py-14">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-['Outfit'] text-xl sm:text-2xl text-white mb-1">Join Our Collector&apos;s Circle</h3>
              <p className="text-white/45 text-sm font-light">Exclusive access to new arrivals, market insights, and members-only pricing.</p>
            </div>
            <form onSubmit={(e) => e.preventDefault()} className="flex w-full sm:w-auto gap-3 shrink-0">
              <input type="email" placeholder="Enter your email"
                className="px-4 sm:px-5 py-3 bg-white/5 border border-white/10 rounded-full text-white text-sm placeholder:text-white/30 outline-none focus:border-black/50 transition-colors w-full sm:w-64 lg:w-72" />
              <button type="submit"
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-3 bg-black text-white text-sm font-semibold rounded-full hover:bg-black/80 transition-all duration-300 flex-shrink-0 whitespace-nowrap border-2 border-black">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 pt-10 sm:pt-14 lg:pt-16 pb-8 sm:pb-10">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-12 mb-10 sm:mb-12">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-4">
            <a href="#" className="font-['Outfit'] text-xl sm:text-2xl font-bold tracking-wider text-white no-underline mb-3 inline-flex items-center gap-1.5">
              💎 BILLOO GEMS
            </a>
            <p className="text-white/45 text-sm font-light leading-relaxed max-w-sm mt-3">
              Premium gemstone dealer since 2012. Every stone certified, ethically sourced, and hand-selected for uncompromising quality.
            </p>
          </div>

          {/* Shop Links */}
          <div className="lg:col-span-2">
            <h4 className="text-white/90 text-sm font-semibold mb-4 sm:mb-5 uppercase tracking-wider">Shop</h4>
            <ul className="space-y-2.5 sm:space-y-3">
              {[{ label: 'All Gemstones', href: '#featured' }, { label: 'Categories', href: '#categories' }, { label: 'About Us', href: '#about' }, { label: 'Contact', href: '#contact' }].map((l) => (
                <li key={l.label}><a href={l.href} className="text-white/45 text-sm font-light no-underline transition-colors duration-300 hover:text-white">{l.label}</a></li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="lg:col-span-3">
            <h4 className="text-white/90 text-sm font-semibold mb-4 sm:mb-5 uppercase tracking-wider">Support</h4>
            <ul className="space-y-2.5 sm:space-y-3">
              {['FAQ', 'Shipping & Returns', 'Certification', 'Privacy Policy'].map((l) => (
                <li key={l}><a href="#" className="text-white/45 text-sm font-light no-underline transition-colors duration-300 hover:text-white">{l}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3">
            <h4 className="text-white/90 text-sm font-semibold mb-4 sm:mb-5 uppercase tracking-wider">Contact</h4>
            <ul className="space-y-2.5 sm:space-y-3">
              <li><a href="mailto:hello@billoogems.com" className="text-white/45 text-sm font-light no-underline transition-colors duration-300 hover:text-white">hello@billoogems.com</a></li>
              <li><a href="tel:+1234567890" className="text-white/45 text-sm font-light no-underline transition-colors duration-300 hover:text-white">+1 (234) 567-890</a></li>
              <li className="text-white/45 text-sm font-light">Antwerp · New York · Mumbai</li>
            </ul>
          </div>
        </div>

        <div className="pt-5 sm:pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-white/30 text-xs font-light">
          <span>&copy; 2026 BILLOO GEMS. All rights reserved.</span>
          <div className="flex gap-5 sm:gap-6">
            <a href="#" className="text-white/30 no-underline transition-colors duration-300 hover:text-white">Privacy Policy</a>
            <a href="#" className="text-white/30 no-underline transition-colors duration-300 hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
