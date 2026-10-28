'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useCart } from './CartProvider';
import type { Product } from '@/lib/catalog';

export default function AddToCart({ product, withQty = false }: { product: Product; withQty?: boolean }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  function onAdd() {
    add({ slug: product.slug, name: product.name, price: product.price }, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  }
  return (
    <div className="addrow">
      {withQty && (
        <div className="qty" aria-label="Số lượng">
          <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Giảm">−</button>
          <span aria-live="polite">{qty}</span>
          <button type="button" onClick={() => setQty((q) => Math.min(99, q + 1))} aria-label="Tăng">+</button>
        </div>
      )}
      <button type="button" className="btn" onClick={onAdd}>Thêm vào giỏ</button>
      {added && <Link href="/gio-hang" className="added">Đã thêm. Xem giỏ hàng →</Link>}
    </div>
  );
}
