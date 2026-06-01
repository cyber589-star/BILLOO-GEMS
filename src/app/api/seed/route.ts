import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

const products = [
  { id: 'p1', name: 'Blue Ceylon Sapphire', category: 'Precious', price: 4800, image: '/zkzb.PNG', description: 'A stunning natural blue Ceylon sapphire with exceptional color saturation and clarity.', createdAt: '2026-01-15T10:00:00.000Z', updatedAt: '2026-01-15T10:00:00.000Z' },
  { id: 'p2', name: 'Burma Ruby', category: 'Precious', price: 6200, image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=600&auto=format&fit=crop', description: 'A vivid pigeon-blood Burma ruby with exceptional fluorescence and brilliance.', createdAt: '2026-01-15T10:00:00.000Z', updatedAt: '2026-01-15T10:00:00.000Z' },
  { id: 'p3', name: 'Colombian Emerald', category: 'Luxury', price: 7500, image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=600&auto=format&fit=crop', description: 'A lush green Colombian emerald with superb transparency and minimal inclusions.', createdAt: '2026-01-15T10:00:00.000Z', updatedAt: '2026-01-15T10:00:00.000Z' },
  { id: 'p4', name: 'Paraiba Tourmaline', category: 'Exotic', price: 9800, image: 'https://images.unsplash.com/photo-1519181245277-cffeb31da2e3?q=80&w=600&auto=format&fit=crop', description: 'A neon-blue Paraiba tourmaline with the signature electric glow. Extremely rare.', createdAt: '2026-01-15T10:00:00.000Z', updatedAt: '2026-01-15T10:00:00.000Z' },
  { id: 'p5', name: 'Padparadscha Sapphire', category: 'Exotic', price: 12400, image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop', description: 'A rare padparadscha sapphire with the perfect salmon-pink hue.', createdAt: '2026-01-15T10:00:00.000Z', updatedAt: '2026-01-15T10:00:00.000Z' },
  { id: 'p6', name: 'Alexandrite', category: 'Rare', price: 8600, image: '/WhatsApp Image 2026-06-01 at 12.31.55 AM.jpeg', description: 'A color-change alexandrite that shifts from emerald green to raspberry red.', createdAt: '2026-01-15T10:00:00.000Z', updatedAt: '2026-01-15T10:00:00.000Z' },
];

const categories = [
  { id: 'c1', name: 'Precious Gems', description: 'Rubies, Sapphires, Emeralds & Diamonds', image: '/shsh.PNG', count: '124 stones', createdAt: '2026-01-15T10:00:00.000Z' },
  { id: 'c2', name: 'Semi-Precious', description: 'Amethyst, Citrine, Garnet & Tourmaline', image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=600&auto=format&fit=crop', count: '89 stones', createdAt: '2026-01-15T10:00:00.000Z' },
  { id: 'c3', name: 'Rare & Exotic', description: 'Alexandrite, Paraiba & Padparadscha', image: 'https://images.unsplash.com/photo-1519181245277-cffeb31da2e3?q=80&w=600&auto=format&fit=crop', count: '36 stones', createdAt: '2026-01-15T10:00:00.000Z' },
  { id: 'c4', name: 'Certified Lots', description: 'Bulk & Investment-grade parcels', image: '/k.PNG', count: '18 lots', createdAt: '2026-01-15T10:00:00.000Z' },
];

export async function POST() {
  const results: string[] = [];

  for (const p of products) {
    const { error } = await supabaseAdmin.from('products').upsert(p, { onConflict: 'id' });
    if (error) results.push(`Product ${p.id}: ${error.message}`);
    else results.push(`Product ${p.id}: OK`);
  }

  for (const c of categories) {
    const { error } = await supabaseAdmin.from('categories').upsert(c, { onConflict: 'id' });
    if (error) results.push(`Category ${c.id}: ${error.message}`);
    else results.push(`Category ${c.id}: OK`);
  }

  return NextResponse.json({ success: true, results });
}
