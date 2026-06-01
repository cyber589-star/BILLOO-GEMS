'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  count: string;
}

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    fetch('/api/categories')
      .then((r) => r.json())
      .then(setCategories)
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete category "${name}"?`)) return;
    await fetch(`/api/categories/${id}`, { method: 'DELETE' });
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="text-sm text-gray-500 mt-1">{categories.length} categor{categories.length !== 1 ? 'ies' : 'y'}</p>
        </div>
        <Link href="/admin/categories/new" className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
          + Add Category
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-400 text-sm">Loading...</div>
      ) : categories.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-12 text-center shadow-sm">
          <div className="text-4xl mb-3">📁</div>
          <div className="text-gray-900 font-medium mb-1">No categories yet</div>
          <div className="text-sm text-gray-400 mb-4">Create your first product category</div>
          <Link href="/admin/categories/new" className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors">
            + Add Category
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categories.map((c) => (
            <div key={c.id} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm flex items-center gap-4">
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                <img src={c.image} alt={c.name} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-gray-900 truncate">{c.name}</h3>
                <p className="text-xs text-gray-500 truncate mt-0.5">{c.description}</p>
                <p className="text-xs text-gray-400 mt-1">{c.count}</p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <Link href={`/admin/categories/${c.id}/edit`} className="px-3 py-1.5 text-xs font-medium text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">Edit</Link>
                <button onClick={() => handleDelete(c.id, c.name)} className="px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
