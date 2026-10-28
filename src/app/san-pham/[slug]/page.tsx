import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ImageSlot from '@/components/ImageSlot';
import AddToCart from '@/components/AddToCart';
import ProductCard from '@/components/ProductCard';
import { getProduct, getProducts } from '@/lib/catalog';
import { vnd } from '@/lib/format';
import { site } from '@/config/site';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const p = await getProduct(params.slug);
  return p ? { title: p.name, description: p.short_desc } : {};
}

export default async function Page({ params }: { params: { slug: string } }) {
  const p = await getProduct(params.slug);
  if (!p) notFound();
  const others = (await getProducts()).filter((x) => x.slug !== p.slug).slice(0, 3);
  return (
    <>
      <section className="section">
        <div className="wrap">
          <p className="crumbs"><Link href="/">Trang chủ</Link> / <Link href="/san-pham">Sản phẩm</Link> / {p.name}</p>
          <div className="split" style={{ alignItems: 'start' }}>
            <div style={{ display: 'grid', gap: 12 }}>
              <ImageSlot src={p.image_url} label="Ảnh sản phẩm chính" ratio="1 / 1" />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
                <ImageSlot label="Ảnh 2" ratio="1 / 1" /><ImageSlot label="Ảnh 3" ratio="1 / 1" /><ImageSlot label="Ảnh 4" ratio="1 / 1" />
              </div>
            </div>
            <div style={{ display: 'grid', gap: 16 }}>
              <h1 style={{ fontSize: 'clamp(1.8rem,4vw,2.6rem)' }}>{p.name}</h1>
              <p className="price" style={{ fontSize: '2rem' }}>{vnd(p.price)}<small> / {p.unit}</small></p>
              <p>{p.description}</p>
              <AddToCart product={p} withQty />
              <ul className="muted small" style={{ display: 'grid', gap: 4 }}>
                <li>Miễn phí vận chuyển cho đơn từ {vnd(site.shipping.freeFrom)}</li>
                <li>Thanh toán chuyển khoản QR hoặc khi nhận hàng</li>
              </ul>
              <p className="note">Sản phẩm là thực phẩm, không phải thuốc và không có tác dụng thay thế thuốc chữa bệnh.</p>
            </div>
          </div>
        </div>
      </section>

      {p.has_nutrition && (
        <section className="section band">
          <div className="wrap split" style={{ alignItems: 'start' }}>
            <div>
              <p className="eyebrow">Thông tin dinh dưỡng</p>
              <h2>Trên 100g sản phẩm</h2>
              <p className="muted" style={{ marginTop: 12 }}>Theo kết quả kiểm nghiệm mẫu natto bột sấy thăng hoa.</p>
              <h3 style={{ marginTop: 24 }}>Cách dùng</h3>
              <p className="muted">Hòa 1 gói 5g với 120–150ml nước ấm, khuấy đều rồi dùng ngay. Bảo quản nơi khô ráo, thoáng mát, đóng kín sau khi mở.</p>
              <h3 style={{ marginTop: 20 }}>Hạn sử dụng</h3>
              <p className="muted">12 tháng kể từ ngày sản xuất. Vui lòng xem ngày sản xuất và hạn sử dụng được in trên bao bì.</p>
            </div>
            <div className="panel tablewrap">
              <table>
                <thead><tr><th>Thành phần</th><th>Trên 100g</th></tr></thead>
                <tbody>
                  <tr><th scope="row">Năng lượng</th><td>385 kcal</td></tr>
                  <tr><th scope="row">Protein</th><td>38,5 g</td></tr>
                  <tr><th scope="row">Carbohydrate</th><td>30,7 g</td></tr>
                  <tr><th scope="row">Béo tổng</th><td>12,8 g</td></tr>
                  <tr><th scope="row">Đường tổng</th><td>5,2 g</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="wrap">
          <div className="head"><h2>Có thể bạn cũng thích</h2></div>
          <div className="grid4">{others.map((o) => <ProductCard key={o.slug} p={o} />)}</div>
        </div>
      </section>
    </>
  );
}
