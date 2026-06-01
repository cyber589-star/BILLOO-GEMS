import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST() {
  const results: string[] = [];

  // Create storage bucket for product images
  const { error: bucketError } = await supabaseAdmin.storage.getBucket('product-images');
  if (bucketError) {
    const { error: createError } = await supabaseAdmin.storage.createBucket('product-images', { public: true });
    results.push(createError ? `Bucket error: ${createError.message}` : 'Bucket created: OK');
  } else {
    results.push('Bucket exists: OK');
  }

  return NextResponse.json({ success: true, results });
}
