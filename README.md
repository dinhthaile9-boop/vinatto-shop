# VINATTO – Website bán hàng (Next.js + Supabase + Vercel)

## 1. Tạo cơ sở dữ liệu Supabase
1. Tạo project tại supabase.com.
2. Vào **SQL Editor**, dán toàn bộ nội dung `supabase/schema.sql` rồi chạy. File tạo bảng, bật RLS và thêm 4 sản phẩm mẫu.
3. Vào **Project Settings > API**, lấy `Project URL`, `anon key`, `service_role key`.

## 2. Điền thông tin cửa hàng
Mở `src/config/site.ts` và điền: điện thoại, email, địa chỉ, Zalo/Facebook, tên pháp nhân, mã số thuế.
Phần `bank` cần `bankId` theo VietQR (ví dụ VCB, MB, TCB, ACB, BIDV, ICB, TPB, VPB), số tài khoản và tên chủ tài khoản. Khi điền đủ, trang đơn hàng tự hiện mã QR đã gắn số tiền và mã đơn.
Phí giao hàng và mức miễn phí nằm ở `shipping`.

## 3. Chạy thử trên máy
1. Tạo tệp `.env.local` ở thư mục gốc dự án; sao chép biến Supabase trong `.env.example` nếu bạn đã cấu hình cơ sở dữ liệu.
2. Đặt `ADMIN_PASSWORD` thành mật khẩu riêng, ngẫu nhiên, tối thiểu 32 ký tự. Không dùng giá trị mẫu hoặc chia sẻ tệp `.env.local`.
3. Cài gói bằng `npm install`, rồi chạy `npm run dev` và mở http://localhost:3000.

## 4. Deploy lên Vercel
1. Đẩy mã lên GitHub, import vào Vercel.
2. Thêm các biến môi trường trong `.env.example` (đặc biệt `SUPABASE_SERVICE_ROLE_KEY` và `ADMIN_PASSWORD`).
3. Deploy. Đặt `ADMIN_PASSWORD` trong **Project Settings → Environment Variables** của Vercel rồi deploy lại. Quản lý đơn tại `/admin` trên tên miền của bạn.

## Đăng nhập quản trị
- Mở `http://localhost:3000/admin` khi đang chạy local, hoặc `https://ten-mien-cua-ban/admin` sau khi deploy.
- Nhập giá trị `ADMIN_PASSWORD` bạn đã tự đặt trong `.env.local` (local) hoặc Vercel Environment Variables (website thật).
- Nếu quên mật khẩu, thay biến này bằng mật khẩu ngẫu nhiên mới rồi khởi động lại dev server hoặc redeploy.
- Cookie đăng nhập chỉ đọc được bởi máy chủ, đánh dấu `httpOnly`, giới hạn trong 12 giờ, và chỉ gửi qua HTTPS ở môi trường production. Cơ sở dữ liệu không công khai quyền đọc đơn hàng/tin nhắn; chỉ máy chủ có service key truy cập.
- Dùng mật khẩu riêng dài tối thiểu 32 ký tự, bật HTTPS trên website công khai, và tuyệt đối không commit service role key hay `.env.local` lên Git.

## Thêm ảnh
- Các khung ảnh đang để trống (nét đứt, có nhãn). Ảnh sản phẩm: cập nhật cột `image_url` của bảng `products` (dán link ảnh, ví dụ ảnh trong Supabase Storage).
- Các ảnh banner và ảnh minh họa hiện được dựng bằng CSS; ảnh đội ngũ là minh họa vector. Có thể thay ảnh minh họa đội ngũ trong `public/team-*.svg` bằng ảnh chân dung đã được các thành viên đồng ý sử dụng.

## Cách hoạt động của đơn hàng
- Giỏ hàng lưu trong trình duyệt. Khi đặt hàng, `/api/orders` tính lại giá và phí giao ở server rồi ghi vào Supabase.
- Bảng `orders`, `order_items`, `messages` không có chính sách đọc công khai (RLS), chỉ server dùng service role key truy cập được.
- Chuyển khoản chưa tự đối soát. Chủ shop kiểm tra tiền về rồi đổi trạng thái đơn ở `/admin`.
