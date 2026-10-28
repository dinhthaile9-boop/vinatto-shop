import { NextResponse } from 'next/server';
import { isAdmin } from '@/lib/admin';
import { serviceClient } from '@/lib/supabase';

const ok = ['new', 'paid', 'shipping', 'done', 'cancelled'];
export async function POST(req: Request) {
  if (!isAdmin()) return NextResponse.json({ error: 'Chưa đăng nhập.' }, { status: 401 });
  const b = await req.json().catch(() => ({}));
  if (!ok.includes(b.status) || !b.id) return NextResponse.json({ error: 'Dữ liệu không hợp lệ.' }, { status: 400 });
  const db = serviceClient();
  if (!db) return NextResponse.json({ error: 'Chưa kết nối cơ sở dữ liệu.' }, { status: 503 });
  const { error } = await db.from('orders').update({ status: b.status }).eq('id', b.id);
  if (error) return NextResponse.json({ error: 'Không cập nhật được.' }, { status: 500 });
  return NextResponse.json({ ok: true });
}
