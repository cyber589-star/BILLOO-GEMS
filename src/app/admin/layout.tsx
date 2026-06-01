'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const nav = [
  { label: 'Dashboard', href: '/admin', icon: '📊' },
  { label: 'Analytics', href: '/admin/analytics', icon: '📈' },
  { label: 'Products', href: '/admin/products', icon: '📦' },
  { label: 'Categories', href: '/admin/categories', icon: '📁' },
  { label: 'Orders', href: '/admin/orders', icon: '📋' },
  { label: 'Order Tracker', href: '/admin/tracker', icon: '🔍' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-white border-r border-gray-200 shadow-sm transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="flex items-center justify-between px-5 h-16 border-b border-gray-100">
          <Link href="/admin" className="font-['Outfit'] text-lg font-bold tracking-wider text-gray-800">
            💎 BILLOO ADMIN
          </Link>
          <button className="lg:hidden text-gray-400 hover:text-gray-600 text-xl" onClick={() => setSidebarOpen(false)}>✕</button>
        </div>
        <nav className="p-3 space-y-1">
          {nav.map((item) => {
            const active = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  active
                    ? 'bg-indigo-50 text-indigo-700 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
          <Link href="/" className="flex items-center gap-2 text-xs text-gray-400 hover:text-gray-600 transition-colors">
            <span>←</span> Back to Store
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 min-w-0">
        {/* Top bar (mobile) */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 h-16 flex items-center px-4 lg:px-6 lg:hidden">
          <button className="text-gray-600 text-xl mr-3" onClick={() => setSidebarOpen(true)}>☰</button>
          <span className="font-['Outfit'] text-lg font-bold text-gray-800">💎 BILLOO ADMIN</span>
        </header>

        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
