-- Chạy toàn bộ file này trong Supabase > SQL Editor

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  short_desc text not null default '',
  description text not null default '',
  price integer not null check (price >= 0),
  unit text not null default 'sản phẩm',
  image_url text,
  has_nutrition boolean not null default false,
  is_active boolean not null default true,
  sort integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  customer_name text not null,
  phone text not null,
  email text,
  address text not null,
  province text not null,
  note text,
  payment_method text not null check (payment_method in ('bank_transfer','cod')),
  subtotal integer not null,
  shipping_fee integer not null,
  total integer not null,
  status text not null default 'new' check (status in ('new','paid','shipping','done','cancelled')),
  created_at timestamptz not null default now()
);

create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  product_slug text not null,
  name text not null,
  price integer not null,
  qty integer not null check (qty > 0)
);

create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  contact text not null,
  body text not null,
  created_at timestamptz not null default now()
);

-- Bảo mật: bật RLS. Chỉ sản phẩm đang bán được đọc công khai.
-- Đơn hàng và tin nhắn chỉ ghi/đọc qua server bằng service role key.
alter table products enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table messages enable row level security;

drop policy if exists "products public read" on products;
create policy "products public read" on products for select using (is_active = true);

insert into products (slug, name, short_desc, description, price, unit, has_nutrition, sort) values
('hop-20-goi', 'Natto bột sấy thăng hoa – Hộp 20 gói', 'Hộp 20 stick × 5g, chia khẩu phần sẵn.', 'Natto làm từ đậu nành Việt Nam, lên men bằng Bacillus subtilis natto và sấy thăng hoa thành bột. Mỗi gói 5g hòa với 120–150ml nước ấm.', 229000, 'hộp', true, 1),
('stick-le', 'Natto bột sấy thăng hoa – 1 gói', 'Một stick 5g để dùng thử.', 'Một gói natto bột sấy thăng hoa 5g. Phù hợp để làm quen trước khi mua hộp.', 15000, 'gói', true, 2),
('natto-tuoi-100g', 'Natto tươi – Túi 100g', 'Giữ nguyên đặc tính truyền thống.', 'Natto tươi đóng túi 100g cho người muốn trải nghiệm hương vị và kết cấu truyền thống. Bảo quản lạnh.', 55000, 'túi', false, 3),
('combo-2-hop', 'Combo 2 hộp natto bột (40 gói)', 'Hai hộp 20 gói, giá tốt hơn mua lẻ.', 'Combo gồm 2 hộp natto bột sấy thăng hoa, tổng 40 gói 5g.', 449000, 'combo', true, 4)
on conflict (slug) do nothing;
