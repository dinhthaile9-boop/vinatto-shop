'use client';

import { useEffect, useState } from 'react';

const banners = ['/images/banner1.jpg'];

export default function HeroCarousel() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setActive((current) => (current + 1) % banners.length), 5500);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="hero hero-carousel" aria-roledescription="carousel" aria-label="Banner VINATTO">
      {banners.map((banner, index) => (
        <div className={`hero-slide ${index === active ? 'is-active' : ''}`} key={banner} aria-hidden={index !== active}>
          <div className="hero-banner-image" role="img" aria-label={`Banner VINATTO ${index + 1}`} style={{ backgroundImage: `url(${banner})` }} />
        </div>
      ))}
      <div className="hero-controls" aria-label="Chọn banner">
        {banners.map((banner, index) => (
          <button key={banner} type="button" className={index === active ? 'is-active' : ''} onClick={() => setActive(index)} aria-label={`Xem banner ${index + 1}`} aria-pressed={index === active} />
        ))}
        <span>0{active + 1} <i /> 0{banners.length}</span>
      </div>
      <span className="hero-counter" aria-live="polite">Banner {active + 1} / {banners.length}</span>
    </section>
  );
}
