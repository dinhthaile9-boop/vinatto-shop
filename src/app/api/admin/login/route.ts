import { NextResponse } from 'next/server';
import { ADMIN_COOKIE, adminToken } from '@/lib/admin';

export async function POST(req: Request) {
  const t = adminToken();
  const b = await req.json().catch(() => ({}));
  if (!t || b.password !== process.env.ADMIN_PASSWORD) return NextResponse.json({ error: 'Sai mật khẩu.' }, { status: 401 });
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, t, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', path: '/', maxAge: 60 * 60 * 12 });
  return res;
}
