import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import { site } from '@/config/site';

export const metadata: Metadata = { title: 'Liên hệ' };

export default function Page() {
  const c = site.contact;
  const socials = [['Zalo', c.zalo], ['Facebook', c.facebook], ['Instagram', c.instagram], ['TikTok', c.tiktok]].filter(([, u]) => u);
  return (
    <section className="section">
      <div className="wrap split" style={{ alignItems: 'start' }}>
        <div style={{ display: 'grid', gap: 18 }}>
          <div className="head" style={{ marginBottom: 0 }}><p className="eyebrow">Liên hệ</p><h1 style={{ fontSize: 'clamp(2rem,5vw,3rem)' }}>Chúng tôi luôn sẵn sàng lắng nghe</h1>
            <p>Hỏi về sản phẩm, đơn hàng hoặc hợp tác. Cửa hàng phản hồi trong giờ làm việc.</p></div>
          <div className="panel sum">
            <div><span>Điện thoại</span><b>{c.phone}</b></div>
            <div><span>Email</span><b>{c.email}</b></div>
            <div><span>Địa chỉ</span><b style={{ textAlign: 'right' }}>{c.address}</b></div>
            <div><span>Giờ làm việc</span><b style={{ textAlign: 'right' }}>{c.hours}</b></div>
            {socials.length > 0 && <div><span>Mạng xã hội</span><span style={{ display: 'flex', gap: 12 }}>{socials.map(([n, u]) => <a key={n} href={u} target="_blank" rel="noopener noreferrer">{n}</a>)}</span></div>}
          </div>
        </div>
        <div className="panel"><h2 style={{ fontSize: '1.5rem', marginBottom: 16 }}>Gửi tin nhắn</h2><ContactForm /></div>
      </div>
    </section>
  );
}
