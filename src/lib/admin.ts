import { createHash } from 'crypto';
import { cookies } from 'next/headers';

export const ADMIN_COOKIE = 'vn_admin';
export function adminToken() {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) return null;
  return createHash('sha256').update(pw + '|vinatto-admin').digest('hex');
}
export function isAdmin() {
  const t = adminToken();
  return !!t && cookies().get(ADMIN_COOKIE)?.value === t;
}
