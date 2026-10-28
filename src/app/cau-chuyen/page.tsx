import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Về VINATTO' };

const process = [
  ['01', 'Đậu nành Việt Nam', 'Chọn và xử lý nguồn đậu trong nước.'],
  ['02', 'Lên men', 'Dùng Bacillus subtilis natto trong quá trình lên men.'],
  ['03', 'Sấy thăng hoa', 'Làm khô ở nhiệt độ thấp để tạo thành dạng bột.'],
  ['04', 'Đóng stick 5g', 'Chia sẵn từng khẩu phần tiện lợi.'],
];

const members = [
  'Nguyễn Gia Bảo',
  'Phạm Kim Ngân',
  'Trần Thị Thu Hương',
  'Trần Lê Thúy Quyên',
  'Lê Đình Thái',
];

export default function Page() {
  return (
    <>
      <section className="section">
        <div className="wrap split">
          <div style={{ display: 'grid', gap: 16 }}>
            <p className="eyebrow">Về VINATTO</p>
            <h1 style={{ fontSize: 'clamp(2rem,5vw,3.2rem)' }}>Trái tim Việt – Sức khỏe Việt</h1>
            <p>VINATTO làm mới món natto theo khẩu vị người Việt. Chúng tôi dùng đậu nành Việt Nam, lên men bằng Bacillus subtilis natto và sấy thăng hoa thành dạng bột gọn nhẹ, dễ pha với nước ấm.</p>
            <p>Natto truyền thống có mùi mạnh và độ nhớt cao khiến nhiều người ngại thử. Chúng tôi điều chỉnh mùi vị và kết cấu để natto trở thành thói quen dễ duy trì trong ngày bận rộn.</p>
            <p><Link href="/san-pham" className="btn">Xem sản phẩm</Link></p>
          </div>
          <div className="story-visual"><img className="story-image" src="/images/tu_hat_dau_nanh.jpg" alt="Từ hạt đậu nành Việt Nam đến natto VINATTO" /></div>
        </div>
      </section>
      <section className="section band">
        <div className="wrap">
          <div className="head"><p className="eyebrow">Công nghệ</p><h2>Quy trình bốn bước</h2></div>
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
        <div className="wrap">
          <div className="head"><p className="eyebrow">Đội ngũ</p><h2>Nhóm VINATTO</h2><p>VINATTO được phát triển bởi nhóm năm thành viên.</p></div>
          <div className="team">
            {members.map((name, index) => (
              <article className={`team-card team-card-${index + 1}`} key={name}>
                <div className="team-photo" role="img" aria-label={`Khung ảnh thành viên ${name}`} />
                <div className="team-info"><span className="team-role">THÀNH VIÊN {String(index + 1).padStart(2, '0')}</span><h3>{name}</h3></div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
