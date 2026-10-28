'use client';
import { useState } from 'react';

export default function ContactForm() {
  const [state, setState] = useState<'idle' | 'busy' | 'ok' | 'err'>('idle');
  const [msg, setMsg] = useState('');
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    setState('busy');
    const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.fromEntries(f)) });
    const d = await res.json().catch(() => ({}));
    if (res.ok) { setState('ok'); form.reset(); } else { setState('err'); setMsg(d.error || 'Có lỗi xảy ra.'); }
  }
  return (
    <form onSubmit={submit}>
      <label htmlFor="c-name">Họ và tên<input id="c-name" name="name" required /></label>
      <label htmlFor="c-contact">Số điện thoại hoặc email<input id="c-contact" name="contact" required /></label>
      <label htmlFor="c-body">Nội dung<textarea id="c-body" name="body" required /></label>
      <button className="btn" disabled={state === 'busy'}>{state === 'busy' ? 'Đang gửi…' : 'Gửi tin nhắn'}</button>
      {state === 'ok' && <p className="msg ok" role="status">Đã gửi. Cửa hàng sẽ phản hồi bạn sớm.</p>}
      {state === 'err' && <p className="msg err" role="alert">{msg}</p>}
    </form>
  );
}
