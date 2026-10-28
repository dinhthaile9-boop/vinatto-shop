import type { Metadata } from 'next';
import { site } from '@/config/site';
import { vnd } from '@/lib/format';

export const metadata: Metadata = { title: 'Chính sách mua hàng' };

export default function Page() {
  return (
    <section className="section">
      <div className="wrap prose">
        <p className="eyebrow">Chính sách</p>
        <h1 style={{ fontSize: 'clamp(2rem,5vw,3rem)' }}>Chính sách mua hàng</h1>
        <h2>Vận chuyển</h2>
        <ul>
          <li>Giao hàng toàn quốc.</li>
          <li>Phí vận chuyển {vnd(site.shipping.fee)} cho mỗi đơn. Miễn phí cho đơn từ {vnd(site.shipping.freeFrom)}.</li>
          <li>Cửa hàng xác nhận đơn qua điện thoại hoặc tin nhắn trước khi giao.</li>
        </ul>
        <h2>Thanh toán</h2>
        <ul>
          <li>Chuyển khoản qua mã QR ngay sau khi đặt hàng. Đơn được xử lý khi cửa hàng nhận được tiền.</li>
          <li>Thanh toán khi nhận hàng (COD).</li>
        </ul>
        <h2>Đổi trả</h2>
        <ul>
          <li>Liên hệ cửa hàng trong vòng 48 giờ kể từ khi nhận hàng nếu sản phẩm bị lỗi, hư hỏng do vận chuyển hoặc giao sai.</li>
          <li>Gửi kèm ảnh sản phẩm và mã đơn hàng để được hỗ trợ nhanh.</li>
          <li>Sản phẩm đã mở gói, đã sử dụng không áp dụng đổi trả, trừ trường hợp lỗi từ nhà sản xuất.</li>
        </ul>
        <h2>Bảo mật thông tin</h2>
        <p>Cửa hàng chỉ dùng họ tên, số điện thoại và địa chỉ của bạn để xử lý và giao đơn hàng, không chia sẻ cho bên thứ ba ngoài đơn vị vận chuyển.</p>
        <h2>Lưu ý về sản phẩm</h2>
        <p>VINATTO là thực phẩm, không phải thuốc và không có tác dụng thay thế thuốc chữa bệnh. Người có bệnh lý, đang dùng thuốc, phụ nữ có thai hoặc cho con bú nên hỏi ý kiến bác sĩ trước khi dùng.</p>
        <p className="muted small">Liên hệ: {site.contact.phone} · {site.contact.email}</p>
      </div>
    </section>
  );
}
