'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useCart } from './CartProvider';
import { site } from '@/config/site';
import { vnd } from '@/lib/format';

const links = [
  { href: '/', label: 'Trang chủ' },
  { href: '/san-pham', label: 'Sản phẩm' },
  { href: '/cau-chuyen', label: 'Về VINATTO' },
  { href: '/lien-he', label: 'Liên hệ' },
];

export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  return (
    <>
      <div className="topbar">
        Miễn phí vận chuyển cho đơn từ {vnd(site.shipping.freeFrom)} · Phí giao hàng {vnd(site.shipping.fee)} cho đơn nhỏ hơn
      </div>
      <header className="header">
        <div className="wrap hrow">
          <Link href="/" className="brand" onClick={() => setOpen(false)}>
            <Image src="/logo.jpg" alt="Logo VINATTO" width={44} height={44} priority />
            <span>VINATTO</span>
          </Link>
          <nav className={`nav ${open ? 'open' : ''}`} aria-label="Điều hướng chính">
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                aria-current={(l.href === '/' ? path === '/' : path.startsWith(l.href)) ? 'page' : undefined}>{l.label}</Link>
            ))}
          </nav>
          <Link href="/gio-hang" className="cartlink" aria-label={`Giỏ hàng, ${count} sản phẩm`}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 4h2l2.2 11h10.6L20 7H6.2"/><circle cx="9" cy="19.5" r="1.4"/><circle cx="17" cy="19.5" r="1.4"/></svg>
            <span className="badge">{count}</span>
          </Link>
          <button className="burger" aria-expanded={open} aria-label="Mở menu" onClick={() => setOpen(!open)}>
            <span /><span /><span />
          </button>
        </div>
      </header>
    </>
  );
}
