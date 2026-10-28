'use client';
import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';

export type CartItem = { slug: string; name: string; price: number; qty: number };
type Ctx = {
  items: CartItem[]; count: number; subtotal: number; ready: boolean;
  add: (i: Omit<CartItem, 'qty'>, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void; clear: () => void;
};
const CartCtx = createContext<Ctx | null>(null);
const KEY = 'vinatto-cart-v1';

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try { const raw = localStorage.getItem(KEY); if (raw) setItems(JSON.parse(raw)); } catch {}
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem(KEY, JSON.stringify(items)); } catch {}
  }, [items, ready]);

  const value = useMemo<Ctx>(() => ({
    items, ready,
    count: items.reduce((s, i) => s + i.qty, 0),
    subtotal: items.reduce((s, i) => s + i.qty * i.price, 0),
    add: (i, qty = 1) => setItems((cur) => {
      const f = cur.find((c) => c.slug === i.slug);
      if (f) return cur.map((c) => c.slug === i.slug ? { ...c, qty: Math.min(99, c.qty + qty) } : c);
      return [...cur, { ...i, qty }];
    }),
    setQty: (slug, qty) => setItems((cur) => qty <= 0 ? cur.filter((c) => c.slug !== slug) : cur.map((c) => c.slug === slug ? { ...c, qty: Math.min(99, qty) } : c)),
    remove: (slug) => setItems((cur) => cur.filter((c) => c.slug !== slug)),
    clear: () => setItems([]),
  }), [items, ready]);
  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}
export function useCart() {
  const c = useContext(CartCtx);
  if (!c) throw new Error('useCart ngoài CartProvider');
  return c;
}
