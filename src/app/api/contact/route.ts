import { NextResponse } from 'next/server';
import { serviceClient } from '@/lib/supabase';

export async function POST(req: Request) {
  const db = serviceClient();
  if (!db) return NextResponse.json({ error: 'Hệ thống chưa kết nối cơ sở dữ liệu.' }, { status: 503 });
  const b = await req.json().catch(() => ({}));
  const name = String(b.name ?? '').trim().slice(0, 120);
  const contact = String(b.contact ?? '').trim().slice(0, 160);
  const body = String(b.body ?? '').trim().slice(0, 2000);
  if (!name || !contact || !body) return NextResponse.json({ error: 'Vui lòng điền đủ các ô.' }, { status: 400 });
  const { error } = await db.from('messages').insert({ name, contact, body });
  if (error) return NextResponse.json({ error: 'Chưa gửi được tin nhắn, vui lòng thử lại.' }, { status: 500 });
  return NextResponse.json({ ok: true });
}
