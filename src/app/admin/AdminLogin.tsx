'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const router = useRouter();
  const [err, setErr] = useState('');
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const password = new FormData(e.currentTarget).get('password');
    const res = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) });
    if (res.ok) router.refresh(); else setErr('Sai mật khẩu hoặc chưa đặt ADMIN_PASSWORD.');
  }
  return (
    <form onSubmit={submit} className="panel">
      <p className="eyebrow">KHU VỰC QUẢN TRỊ · VINATTO</p>
      <h1 style={{ fontSize: '1.8rem' }}>Chào mừng trở lại</h1>
      <p className="muted">Đăng nhập để quản lý đơn hàng và tin nhắn cửa hàng.</p>
      <label htmlFor="pw">Mật khẩu quản trị<input id="pw" name="password" type="password" autoComplete="current-password" required /></label>
      <button className="btn">Đăng nhập an toàn <span aria-hidden="true">↗</span></button>
      <p className="admin-login-help">Mật khẩu được đặt trong biến <code>ADMIN_PASSWORD</code> ở tệp <code>.env.local</code>.</p>
      {err && <p className="msg err" role="alert">{err}</p>}
    </form>
  );
}
