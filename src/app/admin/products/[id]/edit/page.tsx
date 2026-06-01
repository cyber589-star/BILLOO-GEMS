'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export default function EditProduct() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [form, setForm] = useState({ name: '', category: '', price: '', image: '', description: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetch('/api/products')
      .then((r) => r.json())
      .then((products) => {
        const p = products.find((p: { id: string }) => p.id === params.id);
        if (p) {
          setForm({ name: p.name, category: p.category, price: String(p.price), image: p.image, description: p.description });
        }
        setLoading(false);
      });
  }, [params.id]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: fd });
    const data = await res.json();
    if (data.url) setForm((f) => ({ ...f, image: data.url }));
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await fetch(`/api/products/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, price: Number(form.price) }),
    });
    router.push('/admin/products');
  };

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm((f) => ({ ...f, [key]: e.target.value }));

  if (loading) return <div className="text-center py-12 text-gray-400 text-sm">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link href="/admin/products" className="text-sm text-indigo-600 hover:text-indigo-800 mb-2 inline-block">← Back to Products</Link>
        <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
        <p className="text-sm text-gray-500 mt-1">Update {form.name}</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Product Name</label>
            <input value={form.name} onChange={set('name')} required className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Category</label>
            <input value={form.category} onChange={set('category')} required className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Price ($)</label>
            <input value={form.price} onChange={set('price')} type="number" required className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Image</label>
            <div className="flex items-center gap-3">
              <label className="flex-1 cursor-pointer">
                <div className="border-2 border-dashed border-gray-200 rounded-lg px-4 py-3 text-center text-sm text-gray-400 hover:border-indigo-400 hover:text-indigo-500 transition-all">
                  {uploading ? 'Uploading...' : 'Click to upload from device'}
                </div>
                <input type="file" accept="image/*" onChange={handleUpload} className="hidden" disabled={uploading} />
              </label>
              <span className="text-xs text-gray-400">or</span>
              <input value={form.image} onChange={set('image')} placeholder="Paste image URL..." className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all" />
            </div>
            {form.image && (
              <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                <span>✓ Image set</span>
                <img src={form.image} alt="preview" className="w-8 h-8 rounded object-cover" />
              </div>
            )}
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Description</label>
            <textarea value={form.description} onChange={set('description')} rows={3} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all resize-none" />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Link href="/admin/products" className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Cancel</Link>
          <button type="submit" disabled={saving || uploading} className="px-6 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors shadow-sm">
            {saving ? 'Saving...' : 'Update Product'}
          </button>
        </div>
      </form>
    </div>
  );
}
