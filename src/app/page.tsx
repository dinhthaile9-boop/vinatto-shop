import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { getProducts } from '@/lib/catalog';
import { site } from '@/config/site';
import { vnd } from '@/lib/format';
import HeroCarousel from '@/components/HeroCarousel';

export const revalidate = 60;

const faqs = [
  ['Natto bột dùng như thế nào?', 'Hòa một gói 5g với 120–150ml nước ấm, khuấy đều rồi dùng ngay. Bạn cũng có thể rắc lên cháo, sữa chua hoặc món ăn quen thuộc.'],
  ['Natto có mùi mạnh không?', 'Natto truyền thống có mùi và độ nhớt đặc trưng. Dạng bột sấy thăng hoa của VINATTO được phát triển để nhẹ mùi, ít nhớt và dễ làm quen hơn.'],
  ['Bảo quản như thế nào?', 'Natto bột: để nơi khô ráo, thoáng mát và đóng kín sau khi mở. Natto tươi: bảo quản lạnh và dùng sớm.'],
  ['Phí giao hàng là bao nhiêu?', `Phí giao hàng ${vnd(site.shipping.fee)}. Đơn từ ${vnd(site.shipping.freeFrom)} được miễn phí vận chuyển.`],
  ['Thanh toán bằng cách nào?', 'Bạn có thể chuyển khoản qua mã QR hoặc thanh toán khi nhận hàng (COD).'],
  ['Sản phẩm có phải thuốc không?', 'Không. VINATTO là thực phẩm, không phải thuốc và không thay thế thuốc chữa bệnh. Nếu có bệnh lý hoặc đang dùng thuốc, hãy hỏi ý kiến bác sĩ trước khi sử dụng.'],
];

const benefits = [
  ['Đậu nành Việt Nam', 'Nguyên liệu trong nước, gần gũi với bữa ăn của người Việt.'],
  ['Nhẹ mùi, ít nhớt', 'Điều chỉnh mùi vị và kết cấu để dễ làm quen hơn natto truyền thống.'],
  ['Tiện mang theo', 'Stick 5g sấy thăng hoa, bỏ túi mang đi và pha với nước ấm khi cần.'],
  ['Giàu protein thực vật', '38,5g protein trên 100g sản phẩm theo kết quả kiểm nghiệm.'],
];

const process = [
  ['01', 'Đậu nành Việt Nam', 'Chọn và xử lý nguồn đậu nành trong nước.'],
  ['02', 'Lên men', 'Dùng Bacillus subtilis natto trong quá trình lên men.'],
  ['03', 'Sấy thăng hoa', 'Sấy đông khô để tạo dạng bột khô, gọn nhẹ.'],
  ['04', 'Đóng stick 5g', 'Chia sẵn từng khẩu phần, dễ mang theo.'],
];

export default async function Home() {
  const products = await getProducts();
  return (
    <>
      <HeroCarousel />

      <section className="section home-video-section">
        <div className="wrap">
          <div className="home-video-heading">
            <p className="eyebrow">Câu chuyện và giá trị dinh dưỡng</p>
            <h2>Về VINATTO</h2>
          </div>
          <div className="home-video-layout">
            <div className="home-video-copy">
              <h3>Natto là gì?</h3>
              <p>Natto là món đậu nành lên men truyền thống của Nhật Bản, giàu protein thực vật và dưỡng chất tự nhiên.</p>
              <p>VINATTO mang natto đến gần hơn với bữa ăn hằng ngày qua dạng bột tiện dùng, nhẹ mùi và dễ pha. Bổ sung natto vào chế độ ăn đa dạng giúp bạn thêm nguồn protein thực vật và dưỡng chất có lợi cho tiêu hóa.</p>
            </div>
            <div className="home-video-frame">
              <video controls playsInline preload="metadata" aria-label="Video giới thiệu VINATTO">
                <source src="/videos/vinatto.mp4" type="video/mp4" />
                Trình duyệt của bạn không hỗ trợ phát video.
              </video>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="head"><p className="eyebrow">Vì sao chọn VINATTO</p><h2>Natto dễ ăn hơn, tiện hơn</h2></div>
          <div className="grid3">
            {benefits.map(([title, text], index) => <div className="feat" key={title}><div className="ico">{index + 1}</div><h3>{title}</h3><p>{text}</p></div>)}
          </div>
        </div>
      </section>

      <section className="section band">
        <div className="wrap">
          <div className="head"><p className="eyebrow">Cửa hàng</p><h2>Sản phẩm VINATTO</h2></div>
          <div className="grid4">{products.map((product) => <ProductCard key={product.slug} p={product} />)}</div>
          <p style={{ marginTop: 24 }}><Link href="/san-pham" className="btn ghost">Xem tất cả sản phẩm</Link></p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="banner">
            <div>
              <p className="eyebrow" style={{ color: '#E0B677' }}>Ưu đãi giao hàng</p>
              <h2>Miễn phí vận chuyển cho đơn từ {vnd(site.shipping.freeFrom)}</h2>
              <p>Combo 2 hộp (40 gói) đủ điều kiện miễn phí giao hàng.</p>
              <p style={{ marginTop: 20 }}><Link href="/san-pham/combo-2-hop" className="btn">Xem combo 2 hộp</Link></p>
            </div>
            <div className="promo-visual"><div className="promo-ring"/><div className="promo-jar"><span>VINATTO</span><strong>NATTO<br/>POWDER</strong><small>ĐẬU NÀNH VIỆT NAM · 5G</small></div><div className="promo-pill">GỌN NHẸ<br/>MỖI NGÀY</div></div>
          </div>
        </div>
      </section>

      <section className="section band">
        <div className="wrap">
          <div className="head"><p className="eyebrow">Cách làm ra natto bột</p><h2>Từ hạt đậu đến que natto</h2></div>
          <ol className="process-grid">
            {process.map(([number, title, description]) => (
              <li className="process-card" key={number}>
                <div className="process-image"><img src={`/images/quy_trinh_${Number(number)}.jpg`} alt={`Quy trình ${number}`} /></div>
                <div className="process-copy"><span>{number} / QUY TRÌNH</span><h3>{title}</h3><p>{description}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <div className="ritual-visual"><img className="ritual-image" src="/images/cach_dung.jpg" alt="Hướng dẫn cách dùng natto VINATTO" /></div>
          <div>
            <p className="eyebrow">Cách dùng</p><h2>Một gói, một phút</h2>
            <ol style={{ marginTop: 18, paddingLeft: 20, display: 'grid', gap: 8 }}>
              <li>Xé một gói natto bột 5g.</li><li>Cho vào ly cùng 120–150ml nước ấm.</li><li>Khuấy đều và dùng ngay.</li>
            </ol>
            <p className="note">Nên dùng nước ấm, không dùng nước sôi.</p>
          </div>
        </div>
      </section>

      <section className="section band">
        <div className="wrap" style={{ maxWidth: 820 }}>
          <div className="head"><p className="eyebrow">Câu hỏi thường gặp</p><h2>Bạn có thể đang thắc mắc</h2></div>
          {faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}
        </div>
      </section>
    </>
  );
}
