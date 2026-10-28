import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { serviceClient } from '@/lib/supabase';
import { site, hasBank } from '@/config/site';
import { vnd } from '@/lib/format';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Đơn hàng', robots: { index: false } };

const statusText: Record<string, string> = {
  new: 'Chờ xác nhận', paid: 'Đã nhận thanh toán', shipping: 'Đang giao', done: 'Hoàn tất', cancelled: 'Đã hủy',
};

export default async function Page({ params }: { params: { code: string } }) {
  const db = serviceClient();
  if (!db) notFound();
  const { data: order } = await db.from('orders').select('*').eq('code', params.code).maybeSingle();
  if (!order) notFound();
  const { data: items } = await db.from('order_items').select('*').eq('order_id', order.id);
  const showQR = order.payment_method === 'bank_transfer' && order.status === 'new';
  const qr = hasBank()
    ? `https://img.vietqr.io/image/${site.bank.bankId}-${site.bank.accountNumber}-compact2.png?amount=${order.total}&addInfo=${encodeURIComponent(order.code)}&accountName=${encodeURIComponent(site.bank.accountName)}`
    : null;
  return (
    <section className="section">
      <div className="wrap" style={{ maxWidth: 900 }}>
        <div className="head">
          <p className="eyebrow">Cảm ơn bạn đã đặt hàng</p>
          <h1 style={{ fontSize: 'clamp(1.9rem,5vw,2.8rem)' }}>Đơn hàng {order.code}</h1>
          <p><span className="status">{statusText[order.status] || order.status}</span></p>
        </div>
        <div className="cartgrid">
          <div style={{ display: 'grid', gap: 18 }}>
            {showQR && (
              <div className="panel qrbox">
                <h3>Chuyển khoản để hoàn tất đơn</h3>
                {qr ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={qr} alt={`Mã QR chuyển khoản ${vnd(order.total)}`} />
                ) : <p className="muted">Mã QR sẽ hiện khi cửa hàng cập nhật thông tin ngân hàng.</p>}
                <div style={{ width: '100%' }}>
                  <div className="copy"><span>Ngân hàng</span><b>{site.bank.bankName}</b></div>
                  <div className="copy"><span>Số tài khoản</span><b>{site.bank.accountNumber || '[Cập nhật]'}</b></div>
                  <div className="copy"><span>Chủ tài khoản</span><b>{site.bank.accountName}</b></div>
                  <div className="copy"><span>Số tiền</span><b>{vnd(order.total)}</b></div>
                  <div className="copy"><span>Nội dung</span><b>{order.code}</b></div>
                </div>
                <p className="muted small">Vui lòng giữ nguyên nội dung chuyển khoản để cửa hàng đối chiếu nhanh.</p>
              </div>
            )}
            {order.payment_method === 'cod' && (
              <div className="panel"><h3>Thanh toán khi nhận hàng</h3><p className="muted">Bạn sẽ trả {vnd(order.total)} cho nhân viên giao hàng. Cửa hàng sẽ liên hệ xác nhận đơn qua số {order.phone}.</p></div>
            )}
            <div className="panel">
              <h3>Giao đến</h3>
              <p>{order.customer_name} · {order.phone}</p>
              <p className="muted">{order.address}, {order.province}</p>
              {order.note && <p className="muted small">Ghi chú: {order.note}</p>}
            </div>
          </div>
          <aside className="panel sum">
            <h3>Chi tiết đơn</h3>
            {(items || []).map((i: any) => <div key={i.id}><span>{i.name} × {i.qty}</span><span>{vnd(i.price * i.qty)}</span></div>)}
            <div><span>Tạm tính</span><span>{vnd(order.subtotal)}</span></div>
            <div><span>Phí vận chuyển</span><span>{order.shipping_fee === 0 ? 'Miễn phí' : vnd(order.shipping_fee)}</span></div>
            <div className="tot"><span>Tổng cộng</span><span>{vnd(order.total)}</span></div>
            <p className="muted small">Hãy lưu mã đơn {order.code} và liên hệ {site.contact.phone} nếu cần hỗ trợ.</p>
            <Link href="/san-pham" className="btn ghost block">Tiếp tục mua sắm</Link>
          </aside>
        </div>
      </div>
    </section>
  );
}
