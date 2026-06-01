'use client';

import { useEffect, useState } from 'react';

interface Stats {
  totalProducts: number;
  totalCategories: number;
  totalOrders: number;
  revenue: number;
  pendingOrders: number;
}

interface Order {
  id: string;
  status: string;
  total: number;
  createdAt: string;
}

export default function AdminAnalytics() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetch('/api/stats').then((r) => r.json()).then(setStats);
    fetch('/api/orders').then((r) => r.json()).then(setOrders);
  }, []);

  const byStatus = (s: string) => orders.filter((o) => o.status === s).length;
  const monthlyRevenue = () => {
    const months: Record<string, number> = {};
    orders.forEach((o) => {
      if (o.status === 'delivered' || o.status === 'shipped') {
        const m = o.createdAt.slice(0, 7);
        months[m] = (months[m] || 0) + o.total;
      }
    });
    return Object.entries(months).sort().reverse().slice(0, 6);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-sm text-gray-500 mt-1">Business insights at a glance</p>
      </div>

      {/* Status distribution */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'].map((s) => (
          <div key={s} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs mb-2 ${
              s === 'delivered' ? 'bg-green-50 text-green-700' :
              s === 'shipped' ? 'bg-blue-50 text-blue-700' :
              s === 'confirmed' ? 'bg-indigo-50 text-indigo-700' :
              s === 'cancelled' ? 'bg-red-50 text-red-700' :
              'bg-amber-50 text-amber-700'
            }`}>
              {s === 'pending' ? '⏳' : s === 'confirmed' ? '✓' : s === 'shipped' ? '🚚' : s === 'delivered' ? '📦' : '✕'}
            </div>
            <div className="text-xl font-bold text-gray-900">{byStatus(s)}</div>
            <div className="text-[11px] text-gray-500 capitalize mt-0.5">{s}</div>
          </div>
        ))}
      </div>

      {/* Revenue trend */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-8">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">Monthly Revenue (last 6 months)</h2>
        {monthlyRevenue().length === 0 ? (
          <div className="text-center py-8 text-gray-400 text-sm">No completed orders yet</div>
        ) : (
          <div className="flex items-end gap-3 h-40">
            {monthlyRevenue().map(([month, total]) => {
              const max = Math.max(...monthlyRevenue().map(([, t]) => t), 1);
              const pct = (total / max) * 100;
              return (
                <div key={month} className="flex-1 flex flex-col items-center gap-1">
                  <div className="text-[10px] text-gray-400 font-medium">${(total / 1000).toFixed(1)}k</div>
                  <div className="w-full rounded-t-md bg-indigo-500/80 transition-all" style={{ height: `${pct}%`, minHeight: 4 }} />
                  <div className="text-[10px] text-gray-500">{month.slice(5)}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Summary cards */}
      {stats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Avg Order Value', value: stats.totalOrders > 0 ? `$${(stats.revenue / stats.totalOrders).toLocaleString(undefined, { maximumFractionDigits: 0 })}` : '$0', icon: '📊' },
            { label: 'Conversion Rate', value: stats.totalOrders > 0 ? `${((stats.totalOrders / (stats.totalProducts || 1)) * 100).toFixed(1)}%` : '0%', icon: '📈' },
            { label: 'Products per Category', value: stats.totalCategories > 0 ? (stats.totalProducts / stats.totalCategories).toFixed(1) : '0', icon: '📐' },
            { label: 'Fulfillment Rate', value: stats.totalOrders > 0 ? `${((byStatus('delivered') / stats.totalOrders) * 100).toFixed(0)}%` : '0%', icon: '✅' },
          ].map((c) => (
            <div key={c.label} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
              <div className="text-lg mb-2">{c.icon}</div>
              <div className="text-xl font-bold text-gray-900">{c.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{c.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
