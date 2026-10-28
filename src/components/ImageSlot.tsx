/* Khung ảnh. Chưa có ảnh thì hiện khung trống có nhãn để bạn thêm ảnh sau. */
export default function ImageSlot({ src, alt, label, ratio = '4 / 3', className = '' }: {
  src?: string | null; alt?: string; label: string; ratio?: string; className?: string;
}) {
  return (
    <div className={`slot ${className}`} style={{ aspectRatio: ratio }}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt || label} />
      ) : (
        <span>{label}</span>
      )}
    </div>
  );
}
