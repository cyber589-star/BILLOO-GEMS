import { NextResponse } from 'next/server';
import { readOrders, createOrder } from '@/lib/db';

export async function GET() {
  const orders = await readOrders();
  return NextResponse.json(orders);
}

export async function POST(request: Request) {
  const body = await request.json();
  const order = await createOrder(body);
  return NextResponse.json(order, { status: 201 });
}
