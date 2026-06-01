import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

const BUCKET = 'product-images';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 });

    const ext = file.name.split('.').pop() || 'jpg';
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    const { error: bucketError } = await supabaseAdmin.storage.getBucket(BUCKET);
    if (bucketError) {
      await supabaseAdmin.storage.createBucket(BUCKET, { public: true });
    }

    const bytes = await file.arrayBuffer();
    const { error: uploadError } = await supabaseAdmin.storage
      .from(BUCKET)
      .upload(fileName, bytes, { contentType: file.type, upsert: false });

    if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 500 });

    const { data: publicUrl } = supabaseAdmin.storage.from(BUCKET).getPublicUrl(fileName);

    return NextResponse.json({ url: publicUrl.publicUrl });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
