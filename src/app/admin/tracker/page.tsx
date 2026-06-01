'use client';

import { useEffect, useState } from 'react';

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  productName: string;
  quantity: number;
  total: number;
  status: string;
  createdAt: string;
}

const timeline = ['pending', 'confirmed', 'shipped', 'delivered'] as const;
const statuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'] as const;

const stepIndex = (s: string) => timeline.indexOf(s as typeof timeline[number]);

const statusColor = (s: string) =>
  s === 'delivered' ? 'bg-green-50 text-green-700' :
  s === 'shipped' ? 'bg-blue-50 text-blue-700' :
  s === 'confirmed' ? 'bg-indigo-50 text-indigo-700' :
  s === 'cancelled' ? 'bg-red-50 text-red-700' :
  'bg-amber-50 text-amber-700';

const stepColor = (s: string) =>
  s === 'delivered' ? 'bg-green-500' :
  s === 'shipped' ? 'bg-blue-500' :
  s === 'confirmed' ? 'bg-indigo-500' :
  'bg-amber-400';

export default function AdminOrderTracker() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);

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

  const active = orders.find((o) => o.id === selected);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Order Tracker</h1>
        <p className="text-sm text-gray-500 mt-1">Track and update order statuses</p>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-400 text-sm">Loading...</div>
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-12 text-center shadow-sm">
          <div className="text-4xl mb-3">📋</div>
          <div className="text-gray-900 font-medium mb-1">No orders to track</div>
          <div className="text-sm text-gray-400">Orders will appear here once customers place them</div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Order list */}
          <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-gray-400 uppercase tracking-wider border-b border-gray-50 bg-gray-50/50">
                    <th className="px-4 py-3 font-medium">Customer</th>
                    <th className="px-4 py-3 font-medium">Product</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {orders.map((o) => (
                    <tr key={o.id} className={`hover:bg-gray-50 transition-colors cursor-pointer ${selected === o.id ? 'bg-indigo-50/50' : ''}`} onClick={() => setSelected(o.id)}>
                      <td className="px-4 py-3 text-gray-900 font-medium">{o.customerName}</td>
                      <td className="px-4 py-3 text-gray-600 truncate max-w-[140px]">{o.productName}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor(o.status)}`}>
                          {o.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={o.status}
                          onChange={(e) => { e.stopPropagation(); handleStatus(o.id, e.target.value); }}
                          onClick={(e) => e.stopPropagation()}
                          className={`text-xs font-medium rounded-full px-2.5 py-1 border-0 cursor-pointer outline-none ${statusColor(o.status)}`}
                        >
                          {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Timeline panel */}
          {active && (
            <div className="lg:w-80 bg-white rounded-xl border border-gray-100 shadow-sm p-6 shrink-0">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">{active.customerName}</h3>
              <p className="text-xs text-gray-500 mb-4">{active.productName} × {active.quantity}</p>

              <div className="relative">
                {active.status === 'cancelled' ? (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-red-50 border border-red-100">
                    <span className="text-lg">✕</span>
                    <div>
                      <div className="text-sm font-semibold text-red-700">Cancelled</div>
                      <div className="text-xs text-red-500">This order was cancelled</div>
                    </div>
                  </div>
                ) : (
                  <>
                    {timeline.map((s, i) => {
                      const currentIdx = stepIndex(active.status);
                      const done = i <= currentIdx;
                      const isLast = i === timeline.length - 1;
                      return (
                        <div key={s} className="flex gap-3 pb-6 relative">
                          {!isLast && (
                            <div className={`absolute left-[11px] top-6 w-0.5 h-full -z-0 ${done && currentIdx > i ? 'bg-green-400' : 'bg-gray-200'}`} />
                          )}
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 z-10 ${
                            done ? `${stepColor(active.status)} text-white` : 'bg-gray-100 text-gray-400'
                          }`}>
                            {done ? '✓' : i + 1}
                          </div>
                          <div>
                            <div className={`text-sm font-medium capitalize ${done ? 'text-gray-900' : 'text-gray-400'}`}>{s}</div>
                            <div className={`text-xs ${done ? 'text-gray-500' : 'text-gray-300'}`}>
                              {done ? 'Completed' : 'Pending'}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500">
                <div>Order ID: <span className="font-mono text-gray-700">{active.id}</span></div>
                <div className="mt-1">Total: <span className="font-semibold text-gray-900">${active.total.toLocaleString()}</span></div>
                <div className="mt-1">Date: {new Date(active.createdAt).toLocaleDateString()}</div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
