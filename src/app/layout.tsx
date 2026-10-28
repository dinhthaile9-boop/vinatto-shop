import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/components/CartProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { site } from '@/config/site';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: 'VINATTO – Natto Việt, tiện lợi mỗi ngày', template: '%s | VINATTO' },
  description: 'VINATTO bán natto làm từ đậu nành Việt Nam: natto bột sấy thăng hoa dạng stick 5g và natto tươi. Trái tim Việt – Sức khỏe Việt.',
  icons: { icon: '/logo.jpg' },
  openGraph: { title: 'VINATTO', description: site.slogan, images: ['/logo.jpg'], locale: 'vi_VN', type: 'website' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600&family=Fraunces:opsz,wght@9..144,600;9..144,800&display=swap" />
      </head>
      <body>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
