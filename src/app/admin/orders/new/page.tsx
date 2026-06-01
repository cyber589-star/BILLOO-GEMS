'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  price: number;
}

export default function NewOrder() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState({
    customerName: '',
    customerEmail: '',
    productId: '',
    productName: '',
    quantity: 1,
    total: 0,
    status: 'pending',
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/products')
      .then((r) => r.json())
      .then((data) => setProducts(data));
  }, []);

  const handleProductChange = (id: string) => {
    const p = products.find((x) => x.id === id);
    if (p) {
      setForm((f) => ({
        ...f,
        productId: p.id,
        productName: p.name,
        total: p.price * f.quantity,
      }));
    }
  };

  const handleQtyChange = (qty: number) => {
    const p = products.find((x) => x.id === form.productId);
    setForm((f) => ({
      ...f,
      quantity: qty,
      total: p ? p.price * qty : 0,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, source: 'admin' }),
    });
    router.push('/admin/orders');
  };

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const val = key === 'quantity' ? Number(e.target.value) : e.target.value;
    setForm((f) => ({ ...f, [key]: val }));
    if (key === 'quantity') handleQtyChange(Number(e.target.value));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link href="/admin/orders" className="text-sm text-indigo-600 hover:text-indigo-800 mb-2 inline-block">← Back to Orders</Link>
        <h1 className="text-2xl font-bold text-gray-900">Create External Order</h1>
        <p className="text-sm text-gray-500 mt-1">Manually add an order — this will be marked as External</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Customer Name</label>
            <input value={form.customerName} onChange={set('customerName')} required placeholder="e.g. John Doe" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Customer Email</label>
            <input value={form.customerEmail} onChange={set('customerEmail')} type="email" placeholder="john@example.com" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Product</label>
            <select value={form.productId} onChange={(e) => handleProductChange(e.target.value)} required className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all bg-white">
              <option value="">Select a product</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>{p.name} — ${p.price.toLocaleString()}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Quantity</label>
            <input value={form.quantity} onChange={set('quantity')} type="number" min={1} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Status</label>
            <select value={form.status} onChange={set('status')} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all bg-white">
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Total</label>
            <div className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-semibold text-gray-900 bg-gray-50">
              ${form.total.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Link href="/admin/orders" className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Cancel</Link>
          <button type="submit" disabled={saving || !form.productId} className="px-6 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors shadow-sm">
            {saving ? 'Creating...' : 'Create External Order'}
          </button>
        </div>
      </form>
    </div>
  );
}
