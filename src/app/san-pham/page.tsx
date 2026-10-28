import type { Metadata } from 'next';
import ProductCard from '@/components/ProductCard';
import { getProducts } from '@/lib/catalog';

export const revalidate = 60;
export const metadata: Metadata = { title: 'Sản phẩm' };

export default async function Page() {
  const products = await getProducts();
  return (
    <section className="section">
      <div className="wrap">
        <div className="head"><p className="eyebrow">Cửa hàng</p><h1 style={{ fontSize: 'clamp(2rem,5vw,3rem)' }}>Sản phẩm VINATTO</h1>
          <p>Natto bột sấy thăng hoa dạng stick và natto tươi, làm từ đậu nành Việt Nam.</p></div>
        <div className="grid4">{products.map((p) => <ProductCard key={p.slug} p={p} />)}</div>
      </div>
    </section>
  );
}
