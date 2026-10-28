import { publicClient } from './supabase';

export type Product = {
  slug: string; name: string; short_desc: string; description: string;
  price: number; unit: string; image_url: string | null; has_nutrition: boolean;
};

export const fallbackProducts: Product[] = [
  { slug: 'hop-20-goi', name: 'Natto bột sấy thăng hoa – Hộp 20 gói', short_desc: 'Hộp 20 stick × 5g, chia khẩu phần sẵn.', description: 'Natto làm từ đậu nành Việt Nam, lên men bằng Bacillus subtilis natto và sấy thăng hoa thành bột. Mỗi gói 5g hòa với 120–150ml nước ấm.', price: 229000, unit: 'hộp', image_url: '/images/hop_natto_bot_20_goi.jpg', has_nutrition: true },
  { slug: 'stick-le', name: 'Natto bột sấy thăng hoa – 1 gói', short_desc: 'Một stick 5g để dùng thử.', description: 'Một gói natto bột sấy thăng hoa 5g. Phù hợp để làm quen trước khi mua hộp.', price: 15000, unit: 'gói', image_url: '/images/goi_natto_5g.jpg', has_nutrition: true },
  { slug: 'natto-tuoi-100g', name: 'Natto tươi – Túi 100g', short_desc: 'Giữ nguyên đặc tính truyền thống.', description: 'Natto tươi đóng túi 100g cho người muốn trải nghiệm hương vị và kết cấu truyền thống. Bảo quản lạnh.', price: 55000, unit: 'túi', image_url: '/images/natto_tuoi_100g.png', has_nutrition: false },
  { slug: 'combo-2-hop', name: 'Combo 2 hộp natto bột (40 gói)', short_desc: 'Hai hộp 20 gói, giá tốt hơn mua lẻ.', description: 'Combo gồm 2 hộp natto bột sấy thăng hoa, tổng 40 gói 5g.', price: 449000, unit: 'combo', image_url: '/images/combo_2_hop.jpg', has_nutrition: true },
];

const localImages: Record<string, string> = {
  'hop-20-goi': '/images/hop_natto_bot_20_goi.jpg',
  'stick-le': '/images/goi_natto_5g.jpg',
  'natto-tuoi-100g': '/images/natto_tuoi_100g.png',
  'combo-2-hop': '/images/combo_2_hop.jpg',
};

export async function getProducts(): Promise<Product[]> {
  const db = publicClient();
  if (!db) return fallbackProducts;
  const { data, error } = await db.from('products')
    .select('slug,name,short_desc,description,price,unit,image_url,has_nutrition')
    .eq('is_active', true).order('sort');
  if (error || !data || data.length === 0) return fallbackProducts;
  return (data as Product[]).map((product) => ({
    ...product,
    image_url: product.image_url || localImages[product.slug] || null,
  }));
}

export async function getProduct(slug: string): Promise<Product | null> {
  return (await getProducts()).find((product) => product.slug === slug) ?? null;
}
