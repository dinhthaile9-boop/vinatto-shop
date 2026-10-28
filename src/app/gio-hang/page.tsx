'use client';
import Link from 'next/link';
import ImageSlot from '@/components/ImageSlot';
import { useCart } from '@/components/CartProvider';
import { vnd } from '@/lib/format';
import { shippingFor } from '@/lib/shipping';
import { site } from '@/config/site';

export default function CartPage() {
  const { items, subtotal, setQty, remove, ready } = useCart();
  const ship = shippingFor(subtotal);
  const left = site.shipping.freeFrom - subtotal;
  return (
    <section className="section">
      <div className="wrap">
        <div className="head"><h1 style={{ fontSize: 'clamp(2rem,5vw,3rem)' }}>Giỏ hàng</h1></div>
        {!ready ? <p className="muted">Đang tải giỏ hàng…</p> : items.length === 0 ? (
          <div className="panel" style={{ display: 'grid', gap: 14, justifyItems: 'start' }}>
            <p>Giỏ hàng của bạn đang trống.</p>
            <Link className="btn" href="/san-pham">Xem sản phẩm</Link>
          </div>
        ) : (
          <div className="cartgrid">
            <div className="panel">
              {items.map((i) => (
                <div className="line" key={i.slug}>
                  <ImageSlot label="Ảnh" ratio="1 / 1" />
                  <div>
                    <h3><Link href={`/san-pham/${i.slug}`} style={{ textDecoration: 'none' }}>{i.name}</Link></h3>
                    <p className="muted small">{vnd(i.price)}</p>
                    <button className="linkbtn" onClick={() => remove(i.slug)}>Xóa</button>
                  </div>
                  <div style={{ display: 'grid', gap: 8, justifyItems: 'end' }}>
                    <div className="qty">
                      <button onClick={() => setQty(i.slug, i.qty - 1)} aria-label="Giảm">−</button>
                      <span>{i.qty}</span>
                      <button onClick={() => setQty(i.slug, i.qty + 1)} aria-label="Tăng">+</button>
                    </div>
                    <strong>{vnd(i.price * i.qty)}</strong>
                  </div>
                </div>
              ))}
            </div>
            <aside className="panel sum">
              <h3>Tóm tắt đơn hàng</h3>
              <div><span>Tạm tính</span><span>{vnd(subtotal)}</span></div>
              <div><span>Phí vận chuyển</span><span>{ship === 0 ? 'Miễn phí' : vnd(ship)}</span></div>
              {left > 0 && <p className="muted small">Mua thêm {vnd(left)} để được miễn phí vận chuyển.</p>}
              <div className="tot"><span>Tổng cộng</span><span>{vnd(subtotal + ship)}</span></div>
              <Link href="/thanh-toan" className="btn block">Tiến hành đặt hàng</Link>
              <Link href="/san-pham" className="linkbtn" style={{ textAlign: 'center' }}>Tiếp tục mua sắm</Link>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}
