import { isAdmin } from '@/lib/admin';
import { serviceClient } from '@/lib/supabase';
import { vnd } from '@/lib/format';
import AdminLogin from './AdminLogin';
import StatusSelect from './StatusSelect';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Quản lý đơn hàng', robots: { index: false, follow: false } };

export default async function Page() {
  if (!isAdmin()) return <section className="section"><div className="wrap" style={{ maxWidth: 420 }}><AdminLogin /></div></section>;
  const db = serviceClient();
  if (!db) return <section className="section"><div className="wrap"><p className="msg err">Chưa cấu hình SUPABASE_SERVICE_ROLE_KEY.</p></div></section>;
  const { data: orders } = await db.from('orders').select('*, order_items(*)').order('created_at', { ascending: false }).limit(200);
  const { data: messages } = await db.from('messages').select('*').order('created_at', { ascending: false }).limit(50);
  return (
    <section className="section">
      <div className="wrap" style={{ display: 'grid', gap: 28 }}>
        <h1 style={{ fontSize: '2rem' }}>Quản lý đơn hàng</h1>
        <div className="panel tablewrap">
          <table>
            <thead><tr><th>Mã</th><th>Khách</th><th>Sản phẩm</th><th>Tổng</th><th>Thanh toán</th><th>Trạng thái</th></tr></thead>
            <tbody>
              {(orders || []).map((o: any) => (
                <tr key={o.id}>
                  <th scope="row" style={{ whiteSpace: 'nowrap' }}>{o.code}<br /><small className="muted">{new Date(o.created_at).toLocaleString('vi-VN')}</small></th>
                  <td style={{ textAlign: 'left' }}>{o.customer_name}<br />{o.phone}<br /><small className="muted">{o.address}, {o.province}</small></td>
                  <td style={{ textAlign: 'left' }}>{o.order_items.map((i: any) => <div key={i.id}>{i.name} × {i.qty}</div>)}</td>
                  <td style={{ whiteSpace: 'nowrap' }}>{vnd(o.total)}</td>
                  <td style={{ textAlign: 'left' }}>{o.payment_method === 'cod' ? 'COD' : 'Chuyển khoản'}</td>
                  <td><StatusSelect id={o.id} value={o.status} /></td>
                </tr>
              ))}
              {(!orders || orders.length === 0) && <tr><td colSpan={6} style={{ textAlign: 'left' }}>Chưa có đơn hàng.</td></tr>}
            </tbody>
          </table>
        </div>
        <div className="panel">
          <h2 style={{ fontSize: '1.4rem', marginBottom: 12 }}>Tin nhắn liên hệ</h2>
          {(messages || []).map((m: any) => <div key={m.id} className="line" style={{ gridTemplateColumns: '1fr' }}><b>{m.name} · {m.contact}</b><span>{m.body}</span><small className="muted">{new Date(m.created_at).toLocaleString('vi-VN')}</small></div>)}
          {(!messages || messages.length === 0) && <p className="muted">Chưa có tin nhắn.</p>}
        </div>
      </div>
    </section>
  );
}
