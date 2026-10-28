'use client';
import { useState } from 'react';

const opts: [string, string][] = [['new', 'Chờ xác nhận'], ['paid', 'Đã thanh toán'], ['shipping', 'Đang giao'], ['done', 'Hoàn tất'], ['cancelled', 'Đã hủy']];
export default function StatusSelect({ id, value }: { id: string; value: string }) {
  const [v, setV] = useState(value);
  async function change(next: string) {
    const prev = v; setV(next);
    const res = await fetch('/api/admin/status', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, status: next }) });
    if (!res.ok) setV(prev);
  }
  return <select value={v} onChange={(e) => change(e.target.value)} aria-label="Trạng thái đơn">{opts.map(([k, l]) => <option key={k} value={k}>{l}</option>)}</select>;
}
