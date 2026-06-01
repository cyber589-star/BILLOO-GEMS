import { NextResponse } from 'next/server';
import { readOrder, updateOrder, deleteOrder } from '@/lib/db';

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = await readOrder(id);
  if (!order) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(order);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const updated = await updateOrder(id, body);
  if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const ok = await deleteOrder(id);
  if (!ok) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ success: true });
}
