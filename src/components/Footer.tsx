import Link from 'next/link';
import { site } from '@/config/site';

export default function Footer() {
  const c = site.contact;
  const socials = [['Zalo', c.zalo], ['Facebook', c.facebook], ['Instagram', c.instagram], ['TikTok', c.tiktok]].filter(([, u]) => u);
  return (
    <footer className="footer">
      <div className="wrap fgrid">
        <div>
          <div className="fbrand">VINATTO</div>
          <p>{site.slogan}</p>
          <p className="muted small">{site.legalName} · MST: {site.taxCode}</p>
        </div>
        <div>
          <h4>Cửa hàng</h4>
          <ul>
            <li><Link href="/san-pham">Tất cả sản phẩm</Link></li>
            <li><Link href="/gio-hang">Giỏ hàng</Link></li>
            <li><Link href="/cau-chuyen">Về VINATTO</Link></li>
            <li><Link href="/chinh-sach">Chính sách mua hàng</Link></li>
          </ul>
        </div>
        <div>
          <h4>Liên hệ</h4>
          <ul>
            <li>Điện thoại: {c.phoneHref ? <a href={c.phoneHref}>{c.phone}</a> : c.phone}</li>
            <li>Email: {c.email}</li>
            <li>Địa chỉ: {c.address}</li>
            <li>Giờ làm việc: {c.hours}</li>
          </ul>
          {socials.length > 0 && (
            <p className="socials">{socials.map(([n, u]) => <a key={n} href={u} target="_blank" rel="noopener noreferrer">{n}</a>)}</p>
          )}
        </div>
      </div>
      <div className="wrap fnote">
        <p>Sản phẩm là thực phẩm, không phải thuốc và không có tác dụng thay thế thuốc chữa bệnh.</p>
        <p>© {new Date().getFullYear()} {site.name}. Bảo lưu mọi quyền.</p>
      </div>
    </footer>
  );
}
