'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/components/CartProvider';
import { vnd } from '@/lib/format';
import { shippingFor } from '@/lib/shipping';

export default function Checkout() {
  const { items, subtotal, clear, ready } = useCart();
  const router = useRouter();
  const [pay, setPay] = useState<'bank_transfer' | 'cod'>('bank_transfer');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const ship = shippingFor(subtotal);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(''); setBusy(true);
    const f = new FormData(e.currentTarget);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: f.get('name'), phone: f.get('phone'), email: f.get('email'),
          address: f.get('address'), province: f.get('province'), note: f.get('note'),
          payment_method: pay, items: items.map((i) => ({ slug: i.slug, qty: i.qty })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Không đặt được hàng.');
      clear();
      router.push(`/don-hang/${data.code}`);
    } catch (e2: any) {
      setErr(e2.message || 'Có lỗi xảy ra, vui lòng thử lại.');
      setBusy(false);
    }
  }

  if (ready && items.length === 0) {
    return <section className="section"><div className="wrap"><div className="panel" style={{ display: 'grid', gap: 14, justifyItems: 'start' }}>
      <p>Giỏ hàng đang trống nên chưa thể đặt hàng.</p><Link href="/san-pham" className="btn">Xem sản phẩm</Link></div></div></section>;
  }
  return (
    <section className="section">
      <div className="wrap">
        <div className="head"><h1 style={{ fontSize: 'clamp(2rem,5vw,3rem)' }}>Đặt hàng</h1></div>
        <form onSubmit={submit} className="cartgrid">
          <div style={{ display: 'grid', gap: 18 }}>
            <div className="panel" style={{ display: 'grid', gap: 14 }}>
              <h3>Thông tin nhận hàng</h3>
              <label htmlFor="name">Họ và tên<input id="name" name="name" required autoComplete="name" /></label>
              <div className="row2">
                <label htmlFor="phone">Số điện thoại<input id="phone" name="phone" type="tel" required autoComplete="tel" inputMode="tel" /></label>
                <label htmlFor="email">Email (không bắt buộc)<input id="email" name="email" type="email" autoComplete="email" /></label>
              </div>
              <label htmlFor="address">Địa chỉ (số nhà, đường, phường/xã, quận/huyện)<input id="address" name="address" required autoComplete="street-address" /></label>
              <label htmlFor="province">Tỉnh / Thành phố<input id="province" name="province" required autoComplete="address-level1" /></label>
              <label htmlFor="note">Ghi chú cho đơn hàng<textarea id="note" name="note" /></label>
            </div>
            <div className="panel" style={{ display: 'grid', gap: 12 }}>
              <h3>Thanh toán</h3>
              <label className={`radio ${pay === 'bank_transfer' ? 'on' : ''}`}>
                <input type="radio" name="pay" checked={pay === 'bank_transfer'} onChange={() => setPay('bank_transfer')} />
                <span>Chuyển khoản qua mã QR<small>Sau khi đặt hàng, mã QR đã điền sẵn số tiền và nội dung chuyển khoản.</small></span>
              </label>
              <label className={`radio ${pay === 'cod' ? 'on' : ''}`}>
                <input type="radio" name="pay" checked={pay === 'cod'} onChange={() => setPay('cod')} />
                <span>Thanh toán khi nhận hàng (COD)<small>Trả tiền mặt cho nhân viên giao hàng.</small></span>
              </label>
            </div>
          </div>
          <aside className="panel sum">
            <h3>Đơn hàng của bạn</h3>
            {items.map((i) => <div key={i.slug}><span>{i.name} × {i.qty}</span><span>{vnd(i.price * i.qty)}</span></div>)}
            <div><span>Tạm tính</span><span>{vnd(subtotal)}</span></div>
            <div><span>Phí vận chuyển</span><span>{ship === 0 ? 'Miễn phí' : vnd(ship)}</span></div>
            <div className="tot"><span>Tổng cộng</span><span>{vnd(subtotal + ship)}</span></div>
            {err && <p className="msg err" role="alert">{err}</p>}
            <button className="btn block" type="submit" disabled={busy || !ready}>{busy ? 'Đang gửi đơn…' : 'Đặt hàng'}</button>
            <p className="muted small">Bằng việc đặt hàng, bạn đồng ý với <Link href="/chinh-sach">chính sách mua hàng</Link>. Giá cuối cùng được máy chủ tính lại khi đặt đơn.</p>
          </aside>
        </form>
      </div>
    </section>
  );
}
