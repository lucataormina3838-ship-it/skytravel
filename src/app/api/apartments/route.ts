import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = await createAdminClient();
  const { data, error } = await supabase.from('apartments').select('*').order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ apartments: data });
}

export async function POST(req: NextRequest) {
  const supabase = await createAdminClient();
  const body = await req.json();
  const { data, error } = await supabase.from('apartments').insert(body).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ apartment: data });
}

export async function PATCH(req: NextRequest) {
  const supabase = await createAdminClient();
  const { id, ...updates } = await req.json();
  const { data, error } = await supabase.from('apartments').update(updates).eq('id', id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ apartment: data });
}

export async function DELETE(req: NextRequest) {
  const supabase = await createAdminClient();
  const { id } = await req.json();
  const { error } = await supabase.from('apartments').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
