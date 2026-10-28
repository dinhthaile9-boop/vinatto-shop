import { site } from '@/config/site';
export function shippingFor(subtotal: number) {
  if (subtotal <= 0) return 0;
  return subtotal >= site.shipping.freeFrom ? 0 : site.shipping.fee;
}
