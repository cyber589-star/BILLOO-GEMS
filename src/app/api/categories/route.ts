import { NextResponse } from 'next/server';
import { readCategories, createCategory } from '@/lib/db';

export async function GET() {
  const categories = await readCategories();
  return NextResponse.json(categories);
}

export async function POST(request: Request) {
  const body = await request.json();
  const category = await createCategory(body);
  return NextResponse.json(category, { status: 201 });
}
