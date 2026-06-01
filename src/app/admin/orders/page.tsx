'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  productName: string;
  quantity: number;
  total: number;
  status: string;
  source: string;
  createdAt: string;
}

const statuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'] as const;

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const load = () => {
    setLoading(true);
    fetch('/api/orders')
      .then((r) => r.json())
      .then(setOrders)
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleStatus = async (id: string, status: string) => {
    await fetch(`/api/orders/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this order?')) return;
    await fetch(`/api/orders/${id}`, { method: 'DELETE' });
    load();
  };

  const statusColor = (s: string) =>
    s === 'delivered' ? 'bg-green-50 text-green-700' :
    s === 'shipped' ? 'bg-blue-50 text-blue-700' :
    s === 'confirmed' ? 'bg-indigo-50 text-indigo-700' :
    s === 'cancelled' ? 'bg-red-50 text-red-700' :
    'bg-amber-50 text-amber-700';

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          <p className="text-sm text-gray-500 mt-1">{orders.length} order{orders.length !== 1 ? 's' : ''}</p>
        </div>
        <Link href="/admin/orders/new" className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
          + External Order
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-400 text-sm">Loading...</div>
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-12 text-center shadow-sm">
          <div className="text-4xl mb-3">📋</div>
          <div className="text-gray-900 font-medium mb-1">No orders yet</div>
          <div className="text-sm text-gray-400">Orders from customers will appear here</div>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-gray-400 uppercase tracking-wider border-b border-gray-50 bg-gray-50/50">
                  <th className="px-5 py-3.5 font-medium">Type</th>
                  <th className="px-5 py-3.5 font-medium">Customer</th>
                  <th className="px-5 py-3.5 font-medium">Email</th>
                  <th className="px-5 py-3.5 font-medium">Product</th>
                  <th className="px-5 py-3.5 font-medium">Qty</th>
                  <th className="px-5 py-3.5 font-medium">Total</th>
                  <th className="px-5 py-3.5 font-medium">Status</th>
                  <th className="px-5 py-3.5 font-medium">Date</th>
                  <th className="px-5 py-3.5 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3.5">
                      {o.source === 'admin' ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                          External
                        </span>
                      ) : (
                        <span className="text-[10px] text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-gray-900 font-medium">{o.customerName}</td>
                    <td className="px-5 py-3.5 text-gray-500 text-xs">{o.customerEmail}</td>
                    <td className="px-5 py-3.5 text-gray-700">{o.productName}</td>
                    <td className="px-5 py-3.5 text-gray-500">{o.quantity}</td>
                    <td className="px-5 py-3.5 text-gray-900 font-medium">${o.total.toLocaleString()}</td>
                    <td className="px-5 py-3.5">
                      <select
                        value={o.status}
                        onChange={(e) => handleStatus(o.id, e.target.value)}
                        className={`text-xs font-medium rounded-full px-2.5 py-1 border-0 cursor-pointer outline-none ${statusColor(o.status)}`}
                      >
                        {statuses.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-5 py-3.5 text-gray-400 text-xs">{new Date(o.createdAt).toLocaleDateString()}</td>
                    <td className="px-5 py-3.5">
                      <button onClick={() => handleDelete(o.id)} className="px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
