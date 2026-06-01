'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    fetch('/api/products')
      .then((r) => r.json())
      .then(setProducts)
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"?`)) return;
    await fetch(`/api/products/${id}`, { method: 'DELETE' });
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-sm text-gray-500 mt-1">{products.length} product{products.length !== 1 ? 's' : ''}</p>
        </div>
        <Link href="/admin/products/new" className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
          + Add Product
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-400 text-sm">Loading...</div>
      ) : products.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-12 text-center shadow-sm">
          <div className="text-4xl mb-3">📦</div>
          <div className="text-gray-900 font-medium mb-1">No products yet</div>
          <div className="text-sm text-gray-400 mb-4">Add your first gemstone product</div>
          <Link href="/admin/products/new" className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors">
            + Add Product
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-gray-400 uppercase tracking-wider border-b border-gray-50 bg-gray-50/50">
                  <th className="px-5 py-3.5 font-medium">Image</th>
                  <th className="px-5 py-3.5 font-medium">Name</th>
                  <th className="px-5 py-3.5 font-medium">Category</th>
                  <th className="px-5 py-3.5 font-medium">Price</th>
                  <th className="px-5 py-3.5 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100">
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                      </div>
                    </td>
                    <td className="px-5 py-3 text-gray-900 font-medium">{p.name}</td>
                    <td className="px-5 py-3 text-gray-500">{p.category}</td>
                    <td className="px-5 py-3 text-gray-900 font-medium">${p.price.toLocaleString()}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <Link href={`/admin/products/${p.id}/edit`} className="px-3 py-1.5 text-xs font-medium text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">Edit</Link>
                        <button onClick={() => handleDelete(p.id, p.name)} className="px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors">Delete</button>
                      </div>
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
