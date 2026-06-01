'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  productId: string;
  productName: string;
  quantity: number;
  total: number;
  status: string;
  createdAt: string;
}

export default function OrderDetail() {
  const params = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/orders')
      .then((r) => r.json())
      .then((orders) => {
        const o = orders.find((o: Order) => o.id === params.id);
        setOrder(o || null);
        setLoading(false);
      });
  }, [params.id]);

  if (loading) return <div className="text-center py-12 text-gray-400 text-sm">Loading...</div>;
  if (!order) return <div className="text-center py-12 text-gray-400 text-sm">Order not found</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link href="/admin/orders" className="text-sm text-indigo-600 hover:text-indigo-800 mb-2 inline-block">← Back to Orders</Link>
        <h1 className="text-2xl font-bold text-gray-900">Order #{order.id.slice(0, 8)}</h1>
        <p className="text-sm text-gray-500 mt-1">{new Date(order.createdAt).toLocaleString()}</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm divide-y divide-gray-50">
        <div className="p-6">
          <h2 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Customer</h2>
          <div className="text-sm text-gray-900 font-medium">{order.customerName}</div>
          <div className="text-sm text-gray-500">{order.customerEmail}</div>
        </div>
        <div className="p-6">
          <h2 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Order Details</h2>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Product</span>
              <span className="text-gray-900 font-medium">{order.productName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Quantity</span>
              <span className="text-gray-900">{order.quantity}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Total</span>
              <span className="text-gray-900 font-bold">${order.total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Status</span>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                order.status === 'delivered' ? 'bg-green-50 text-green-700' :
                order.status === 'shipped' ? 'bg-blue-50 text-blue-700' :
                order.status === 'confirmed' ? 'bg-indigo-50 text-indigo-700' :
                order.status === 'cancelled' ? 'bg-red-50 text-red-700' :
                'bg-amber-50 text-amber-700'
              }`}>{order.status}</span>
            </div>
          </div>
        </div>
        <div className="p-6">
          <h2 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Timeline</h2>
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <span className="w-2 h-2 rounded-full bg-gray-300" />
            {new Date(order.createdAt).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}
