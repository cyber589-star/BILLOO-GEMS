import { NextResponse } from 'next/server';
import { readProducts, readCategories, readOrders } from '@/lib/db';

export async function GET() {
  const [products, categories, orders] = await Promise.all([
    readProducts(),
    readCategories(),
    readOrders(),
  ]);

  const totalProducts = products.length;
  const totalCategories = categories.length;
  const totalOrders = orders.length;
  const revenue = orders.reduce((sum, o) => sum + o.total, 0);
  const pendingOrders = orders.filter((o) => o.status === 'pending').length;

  return NextResponse.json({
    totalProducts,
    totalCategories,
    totalOrders,
    revenue,
    pendingOrders,
  });
}
