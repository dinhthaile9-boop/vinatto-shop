import Link from 'next/link';
import ImageSlot from './ImageSlot';
import AddToCart from './AddToCart';
import { vnd } from '@/lib/format';
import type { Product } from '@/lib/catalog';

export default function ProductCard({ p }: { p: Product }) {
  return (
    <article className="pcard">
      <Link href={`/san-pham/${p.slug}`} aria-label={p.name}>
        <ImageSlot src={p.image_url} label="Ảnh sản phẩm" ratio="1 / 1" />
      </Link>
      <div className="product-card-info">
        <Link href={`/san-pham/${p.slug}`} className="product-card-title"><h3>{p.name}</h3></Link>
        <strong className="price">{vnd(p.price)}<small> / {p.unit}</small></strong>
        <AddToCart product={p} />
      </div>
    </article>
  );
}
