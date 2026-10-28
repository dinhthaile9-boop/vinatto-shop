import { NextResponse } from 'next/server';
import { randomBytes } from 'crypto';
import { serviceClient } from '@/lib/supabase';
import { getProducts } from '@/lib/catalog';
import { shippingFor } from '@/lib/shipping';

const clean = (v: unknown, max: number) => String(v ?? '').trim().slice(0, max);

function newCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const b = randomBytes(6);
  return 'VN' + Array.from(b).map((x) => chars[x % chars.length]).join('');
}

export async function POST(req: Request) {
  const db = serviceClient();
  if (!db) return NextResponse.json({ error: 'Hệ thống chưa kết nối cơ sở dữ liệu. Vui lòng liên hệ cửa hàng.' }, { status: 503 });
  let body: any;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Dữ liệu không hợp lệ.' }, { status: 400 }); }

  const name = clean(body.customer_name, 120), phone = clean(body.phone, 20), email = clean(body.email, 160);
  const address = clean(body.address, 300), province = clean(body.province, 80), note = clean(body.note, 500);
  const payment = body.payment_method === 'cod' ? 'cod' : body.payment_method === 'bank_transfer' ? 'bank_transfer' : '';
  if (!name || !address || !province || !payment) return NextResponse.json({ error: 'Vui lòng điền đầy đủ thông tin nhận hàng.' }, { status: 400 });
  if (!/^(\+?84|0)\d{8,10}$/.test(phone.replace(/[\s.-]/g, ''))) return NextResponse.json({ error: 'Số điện thoại chưa hợp lệ.' }, { status: 400 });
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: 'Email chưa hợp lệ.' }, { status: 400 });

  const raw = Array.isArray(body.items) ? body.items.slice(0, 20) : [];
  const catalog = await getProducts();
  const lines = raw.map((r: any) => {
    const p = catalog.find((x) => x.slug === r?.slug);
    const qty = Math.floor(Number(r?.qty));
    return p && qty >= 1 && qty <= 99 ? { slug: p.slug, name: p.name, price: p.price, qty } : null;
  }).filter(Boolean) as { slug: string; name: string; price: number; qty: number }[];
  if (lines.length === 0) return NextResponse.json({ error: 'Giỏ hàng trống hoặc sản phẩm không còn bán.' }, { status: 400 });

  // Giá luôn được tính lại ở server, không tin giá từ trình duyệt.
  const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0);
  const shipping_fee = shippingFor(subtotal);
  const total = subtotal + shipping_fee;

  for (let attempt = 0; attempt < 4; attempt++) {
    const code = newCode();
    const { data: order, error } = await db.from('orders').insert({
      code, customer_name: name, phone, email: email || null, address, province, note: note || null,
      payment_method: payment, subtotal, shipping_fee, total,
    }).select('id,code').single();
    if (error) { if (error.code === '23505') continue; return NextResponse.json({ error: 'Không lưu được đơn hàng, vui lòng thử lại.' }, { status: 500 }); }
    const { error: e2 } = await db.from('order_items').insert(lines.map((l) => ({ order_id: order.id, product_slug: l.slug, name: l.name, price: l.price, qty: l.qty })));
    if (e2) { await db.from('orders').delete().eq('id', order.id); return NextResponse.json({ error: 'Không lưu được chi tiết đơn hàng, vui lòng thử lại.' }, { status: 500 }); }
    return NextResponse.json({ code: order.code });
  }
  return NextResponse.json({ error: 'Không tạo được mã đơn, vui lòng thử lại.' }, { status: 500 });
}
