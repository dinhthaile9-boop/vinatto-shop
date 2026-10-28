// ====== CẬP NHẬT THÔNG TIN THẬT CỦA BẠN Ở ĐÂY ======
export const site = {
  name: 'VINATTO',
  slogan: 'Trái tim Việt – Sức khỏe Việt',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  legalName: '[Tên cơ sở kinh doanh]',
  taxCode: '[Mã số thuế]',
  contact: {
    phone: '0343481578',
    phoneHref: 'tel:0343481578',
    email: 'vinatto105@gmail.com',
    address: '12 Nguyễn Văn Bảo, phường Hạnh Thông, Tp. Hồ Chí Minh',
    hours: '08:00 – 20:00, Thứ Hai – Chủ Nhật',
    zalo: '', // ví dụ: 'https://zalo.me/0900000000'
    facebook: '',
    instagram: '',
    tiktok: '',
  },
  // Tài khoản nhận tiền. bankId là mã ngân hàng theo VietQR (vd: VCB, MB, TCB, ACB, BIDV, ICB, TPB, VPB).
  bank: {
    bankId: '',
    bankName: '[Tên ngân hàng]',
    accountNumber: '',
    accountName: '[Tên chủ tài khoản]',
  },
  shipping: { fee: 30000, freeFrom: 300000 },
};
export const hasBank = () => Boolean(site.bank.bankId && site.bank.accountNumber);
