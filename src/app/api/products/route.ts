import { NextResponse } from 'next/server';
import { readProducts, createProduct } from '@/lib/db';

export async function GET() {
  const products = await readProducts();
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const body = await request.json();
  const product = await createProduct(body);
  return NextResponse.json(product, { status: 201 });
}
