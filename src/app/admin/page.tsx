'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Stats {
  totalProducts: number;
  totalCategories: number;
  totalOrders: number;
  revenue: number;
  pendingOrders: number;
}

interface Order {
  id: string;
  customerName: string;
  productName: string;
  total: number;
  status: string;
  createdAt: string;
}

const cards = [
  { key: 'totalProducts', label: 'Total Products', icon: '📦', color: 'bg-blue-50 text-blue-700' },
  { key: 'totalCategories', label: 'Categories', icon: '📁', color: 'bg-emerald-50 text-emerald-700' },
  { key: 'totalOrders', label: 'Total Orders', icon: '📋', color: 'bg-amber-50 text-amber-700' },
  { key: 'revenue', label: 'Total Revenue', icon: '💰', color: 'bg-purple-50 text-purple-700', prefix: '$' },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetch('/api/stats').then((r) => r.json()).then(setStats);
    fetch('/api/orders').then((r) => r.json()).then((orders) => setRecentOrders(orders.slice(0, 5)));
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Overview of your gemstone store</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((card) => {
          const val = stats ? stats[card.key as keyof Stats] : '—';
          const display = typeof val === 'number' && card.key === 'revenue' ? `$${val.toLocaleString()}` : typeof val === 'number' ? val.toLocaleString() : val;
          return (
            <div key={card.key} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
              <div className={`w-10 h-10 rounded-lg ${card.color} flex items-center justify-center text-lg mb-3`}>{card.icon}</div>
              <div className="text-2xl font-bold text-gray-900">{display}</div>
              <div className="text-xs text-gray-500 mt-1">{card.label}</div>
            </div>
          );
        })}
      </div>

      {/* Pending Orders Alert */}
      {stats && stats.pendingOrders > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl">⏳</span>
            <div>
              <div className="text-sm font-semibold text-amber-800">{stats.pendingOrders} pending order{stats.pendingOrders > 1 ? 's' : ''}</div>
              <div className="text-xs text-amber-600">Orders awaiting confirmation</div>
            </div>
          </div>
          <Link href="/admin/orders" className="text-sm font-medium text-amber-800 hover:text-amber-600 underline">View Orders</Link>
        </div>
      )}

      {/* Recent Orders */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
          <h2 className="text-sm font-semibold text-gray-900">Recent Orders</h2>
          <Link href="/admin/orders" className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">View All</Link>
        </div>
        {recentOrders.length === 0 ? (
          <div className="p-6 text-center text-sm text-gray-400">No orders yet</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-gray-400 uppercase tracking-wider border-b border-gray-50">
                  <th className="px-6 py-3 font-medium">Customer</th>
                  <th className="px-6 py-3 font-medium">Product</th>
                  <th className="px-6 py-3 font-medium">Total</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-3.5 text-gray-900 font-medium">{o.customerName}</td>
                    <td className="px-6 py-3.5 text-gray-600">{o.productName}</td>
                    <td className="px-6 py-3.5 text-gray-900 font-medium">${o.total.toLocaleString()}</td>
                    <td className="px-6 py-3.5">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        o.status === 'delivered' ? 'bg-green-50 text-green-700' :
                        o.status === 'shipped' ? 'bg-blue-50 text-blue-700' :
                        o.status === 'confirmed' ? 'bg-indigo-50 text-indigo-700' :
                        o.status === 'cancelled' ? 'bg-red-50 text-red-700' :
                        'bg-amber-50 text-amber-700'
                      }`}>{o.status}</span>
                    </td>
                    <td className="px-6 py-3.5 text-gray-400 text-xs">{new Date(o.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
