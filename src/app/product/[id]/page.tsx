'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  category: string;
  origin: string;
  price: number;
  badge: string;
  image: string;
  description: string;
}

export default function ProductDetail() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [wish, setWish] = useState(false);

  useEffect(() => {
    fetch(`/api/products/${params.id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setProduct(data);
      })
      .catch(() => router.push('/'))
      .finally(() => setLoading(false));
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-gray-400 font-light">Loading...</span>
        </div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-xl border-b border-gray-100 flex items-center justify-between px-4 h-14">
        <button onClick={() => router.back()} className="w-9 h-9 flex items-center justify-center -ml-1 text-gray-700 text-xl">←</button>
        <span className="text-sm font-semibold text-gray-900">Product Details</span>
        <div className="w-9 h-9" />
      </div>

      <div className="max-w-lg mx-auto">
      {/* Image */}
      <div className="bg-white mx-4 mt-4 rounded-2xl shadow-sm overflow-hidden">
        <div className="aspect-square bg-[#F5EDE0] flex items-center justify-center p-6">
          <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
        </div>
      </div>

      {/* Details Card */}
      <div className="bg-white mx-4 mt-4 rounded-2xl shadow-sm p-5">
        {/* Category + Badge */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-medium text-black tracking-[0.1em] uppercase">{product.category}</span>
          <span className="text-[10px] font-medium text-[#4A4A4A]/50 bg-gray-100 px-2.5 py-1 rounded-full">{product.badge}</span>
        </div>

        {/* Name */}
        <h1 className="text-xl font-bold text-gray-900 leading-tight mb-2">{product.name}</h1>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <span key={s} className="text-amber-400 text-sm">★</span>
            ))}
          </div>
          <span className="text-xs text-gray-400">5 (0 reviews)</span>
        </div>

        {/* Price */}
        <div className="mb-4">
          <span className="text-xs text-gray-400 font-light">Price</span>
          <div className="text-3xl font-bold text-gray-900">${Number(product.price).toLocaleString()}</div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-500 font-light leading-relaxed mb-5">{product.description}</p>

        {/* Origin */}
        <div className="flex items-center gap-2 mb-5">
          <span className="text-xs text-gray-400">📍</span>
          <span className="text-xs text-gray-500 font-light">{product.origin}</span>
        </div>

        {/* Tags */}
        <div className="mb-5">
          <span className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2 block">Tags</span>
          <div className="flex flex-wrap gap-2">
            {['Certified', 'Premium', 'Luxury'].map((tag) => (
              <span key={tag} className="px-3 py-1.5 bg-gray-100 rounded-full text-xs text-gray-600 font-light">{tag}</span>
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div className="mb-6">
          <span className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2 block">Quantity</span>
          <div className="inline-flex items-center bg-gray-50 rounded-xl border border-gray-200">
            <button onClick={() => setQty(Math.max(1, qty - 1))}
              className="w-11 h-11 flex items-center justify-center text-gray-500 text-lg hover:bg-gray-100 rounded-l-xl transition-colors">−</button>
            <span className="w-12 h-11 flex items-center justify-center text-sm font-semibold text-gray-900 border-x border-gray-200">{qty}</span>
            <button onClick={() => setQty(qty + 1)}
              className="w-11 h-11 flex items-center justify-center text-gray-500 text-lg hover:bg-gray-100 rounded-r-xl transition-colors">+</button>
          </div>
        </div>

        {/* Total */}
        <div className="flex items-center justify-between py-4 border-t border-gray-100 mb-5">
          <span className="text-sm text-gray-500 font-light">Total</span>
          <span className="text-xl font-bold text-black">${(Number(product.price) * qty).toLocaleString()}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button className="flex-1 h-12 bg-black text-white text-sm font-semibold rounded-full hover:bg-black/80 transition-all duration-300 shadow-lg shadow-black/25 border-2 border-black">
            Add to Cart
          </button>
          <button onClick={() => setWish(!wish)}
            className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-gray-200 text-lg hover:border-black hover:bg-black/5 transition-all duration-300 shrink-0">
            {wish ? <span className="text-black">♥</span> : <span className="text-gray-400">♡</span>}
          </button>
          <button onClick={() => { if (navigator.share) navigator.share({ title: product.name, url: window.location.href }); }}
            className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-gray-200 text-gray-400 text-lg hover:border-black hover:text-black transition-all duration-300 shrink-0">
            ↗
          </button>
        </div>
      </div>

      {/* Trust Info */}
      <div className="bg-white mx-4 mt-4 rounded-2xl shadow-sm p-5">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-green-50 flex items-center justify-center text-sm shrink-0">🔒</div>
            <div>
              <div className="text-sm font-medium text-gray-900">Secure Payment</div>
              <div className="text-xs text-gray-400 font-light">SSL encrypted checkout</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-sm shrink-0">🌍</div>
            <div>
              <div className="text-sm font-medium text-gray-900">Ships Worldwide</div>
              <div className="text-xs text-gray-400 font-light">Insured & tracked delivery</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-amber-50 flex items-center justify-center text-sm shrink-0">↩</div>
            <div>
              <div className="text-sm font-medium text-gray-900">30-Day Returns</div>
              <div className="text-xs text-gray-400 font-light">No questions asked</div>
            </div>
          </div>
        </div>
      </div>

      {/* Back to store */}
      <div className="text-center mt-6">
        <Link href="/" className="text-xs text-gray-400 hover:text-black transition-colors no-underline">← Back to Store</Link>
      </div>
      </div>
    </div>
  );
}
