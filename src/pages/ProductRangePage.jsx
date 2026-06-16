import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: 1,
    badge: 'Flagship Product',
    badgeStyle: 'filled',
    name: 'ANWARS 500DWR',
    type: '500 Grade · Dual Wire Rib',
    image: '/images/product-500dwr.jpg',
    imageLabel: '500DWR Product Image',
    advantages: [
      'High Strength Reinforcing Steel',
      'Excellent Elongation Properties',
      'TS/YS ratio > 1.25',
      'Superior Weldability',
      'More Durable and Weather Resistant',
      'Good Quality Bonding with Concrete',
      'Excellent Bendability',
    ],
  },
  {
    id: 2,
    badge: 'Premium Grade',
    badgeStyle: 'outline',
    name: 'ANWARS 420DWR',
    type: '420 Grade · Dual Wire Rib',
    image: '/images/product-420dwr.jpg',
    imageLabel: '420DWR Product Image',
    advantages: [
      'Suitable Earthquake Resistance Structures',
      'High Ductility',
      'Higher Energy Consumption Capacity',
      'ACI Code and BNBC Certified',
      'Excellent Durability',
    ],
  },
  {
    id: 3,
    badge: 'High Performance',
    badgeStyle: 'outline',
    name: 'ANWARS 500W TMT',
    type: '500W Grade · Thermo Mechanical',
    image: '/images/product-500w-tmt.jpg',
    imageLabel: '500W TMT Product Image',
    advantages: [
      'Thermo Mechanically Treated Steel',
      'Enhanced Corrosion Resistance',
      'Superior Fatigue Strength',
      'Ideal for High-Rise Structures',
      'Consistent Mechanical Properties',
      'BDS & ISO Certified Quality',
    ],
  },
];

const ProductCard = ({ product, index }) => {
  const cardRef = useRef(null);

  return (
    <div
      ref={cardRef}
      className={`pr-card pr-card-${index}`}
      style={{
        background: 'var(--glass)',
        border: '1px solid var(--glass-border)',
        borderRadius: '16px',
        overflow: 'hidden',
        opacity: 0,
        transform: 'translateY(40px)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '220px',
          background: 'rgba(0,0,0,0.3)',
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          onError={e => { e.target.style.display = 'none'; }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            background: 'rgba(0,0,0,0.25)',
          }}
        >
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none"
            stroke="rgba(227,24,45,0.4)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <path d="M21 15l-5-5L5 21"/>
          </svg>
          <span style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)' }}>
            {product.imageLabel}
          </span>
        </div>
        <div style={{
          position: 'absolute',
          top: 0, right: 0,
          width: '100px', height: '100px',
          background: 'radial-gradient(circle, rgba(227,24,45,0.12), transparent)',
          pointerEvents: 'none',
        }} />
      </div>

      <div style={{
        background: 'linear-gradient(135deg, rgba(30,5,8,0.8) 0%, rgba(15,15,15,0.6) 100%)',
        padding: '22px 24px 16px',
        borderBottom: '1px solid var(--glass-border)',
      }}>
        <div style={{ marginBottom: '10px' }}>
          {product.badgeStyle === 'filled' ? (
            <span style={{
              display: 'inline-block',
              background: 'var(--accent)',
              color: '#fff',
              fontSize: '10px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              padding: '4px 10px',
              borderRadius: '4px',
              fontWeight: 700,
            }}>{product.badge}</span>
          ) : (
            <span style={{
              display: 'inline-block',
              background: 'rgba(227,24,45,0.1)',
              color: 'var(--accent)',
              border: '1px solid rgba(227,24,45,0.3)',
              fontSize: '10px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              padding: '4px 10px',
              borderRadius: '4px',
              fontWeight: 700,
            }}>{product.badge}</span>
          )}
        </div>
        <div style={{
          fontSize: '22px',
          fontWeight: 800,
          letterSpacing: '-0.5px',
          textTransform: 'uppercase',
          color: 'var(--text)',
          fontFamily: 'var(--font-heading)',
          marginBottom: '4px',
        }}>{product.name}</div>
        <div style={{ fontSize: '12px', color: 'var(--subtext)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
          {product.type}
        </div>
        <div style={{ width: '36px', height: '3px', background: 'var(--accent)', borderRadius: '2px', marginTop: '14px' }} />
      </div>

      <div style={{ padding: '20px 24px', flex: 1 }}>
        <div style={{ fontSize: '10px', letterSpacing: '3px', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '14px' }}>
          Advantages
        </div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {product.advantages.map((adv, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px', color: 'var(--subtext)', lineHeight: 1.5 }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)', flexShrink: 0, marginTop: '5px' }} />
              {adv}
            </li>
          ))}
        </ul>
      </div>

      <div style={{ padding: '0 24px 24px', display: 'flex', gap: '10px' }}>
        <button
          onClick={() => window.dispatchEvent(new CustomEvent('open-quote'))}
          style={{
            flex: 1,
            background: 'var(--accent)',
            color: '#fff',
            border: 'none',
            padding: '11px 16px',
            borderRadius: '6px',
            fontSize: '11px',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          Get Quote
        </button>
        <button
          style={{
            flex: 1,
            background: 'transparent',
            color: 'var(--subtext)',
            border: '1px solid var(--glass-border)',
            padding: '11px 16px',
            borderRadius: '6px',
            fontSize: '11px',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            cursor: 'pointer',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--glass-border)'; e.currentTarget.style.color = 'var(--subtext)'; }}
        >
          Learn More
        </button>
      </div>
    </div>
  );
};

const ProductRangePage = () => {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useGSAP(() => {
    gsap.fromTo('.pr-hero-tag', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: 'power3.out' });
    gsap.fromTo('.pr-hero-title', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, delay: 0.4, ease: 'power3.out' });
    gsap.fromTo('.pr-hero-sub', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.7, ease: 'power3.out' });

    products.forEach((_, i) => {
      const el = document.querySelector(`.pr-card-${i}`);
      if (!el) return;
      ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: 0.7, delay: i * 0.12, ease: 'power3.out' }),
      });
    });

    ScrollTrigger.create({
      trigger: '.pr-compare-section',
      start: 'top 88%',
      onEnter: () => gsap.to('.pr-compare-section', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }),
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} style={{ background: 'var(--primary)', color: 'var(--text)', minHeight: '100vh', paddingTop: '80px', overflowX: 'hidden' }}>

      <section style={{ padding: isMobile ? '56px 24px 40px' : '80px 40px 56px', borderBottom: '1px solid var(--glass-border)', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
        <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '600px', height: '250px', background: 'radial-gradient(ellipse, rgba(227,24,45,0.16) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <div className="pr-hero-tag" style={{ fontSize: '11px', letterSpacing: '4px', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '18px', opacity: 0 }}>// Product Line</div>
          <h1 className="pr-hero-title" style={{ fontSize: 'clamp(32px,5vw,54px)', fontWeight: 900, lineHeight: 1.05, textTransform: 'uppercase', letterSpacing: '-1px', marginBottom: '20px', opacity: 0, fontFamily: 'var(--font-heading)' }}>
            Our Product <span style={{ color: 'var(--accent)' }}>Range</span>
          </h1>
          <p className="pr-hero-sub" style={{ fontSize: isMobile ? '14px' : '15px', color: 'var(--subtext)', maxWidth: '540px', margin: '0 auto', lineHeight: 1.8, opacity: 0 }}>
            Premium grade reinforcing steel engineered for Bangladesh's most demanding structures.
          </p>
        </div>
      </section>

      <section style={{ padding: isMobile ? '40px 20px 48px' : '60px 40px 64px' }}>
        <div style={{
          maxWidth: '1060px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: '24px',
          alignItems: 'stretch',
        }}>
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      <section className="pr-compare-section" style={{
        maxWidth: '1060px', margin: '0 auto',
        padding: isMobile ? '0 20px 56px' : '0 40px 80px',
        opacity: 0, transform: 'translateY(30px)',
      }}>
        <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: isMobile ? '40px' : '56px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ fontSize: '11px', letterSpacing: '4px', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '10px' }}>// Side by Side</div>
            <h2 style={{ fontSize: isMobile ? '26px' : '32px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.5px', fontFamily: 'var(--font-heading)' }}>Product Comparison</h2>
          </div>
          <div style={{ border: '1px solid var(--glass-border)', borderRadius: '12px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ background: 'rgba(227,24,45,0.08)', padding: '14px 20px', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--accent)', textAlign: 'left', borderBottom: '1px solid var(--glass-border)' }}>Feature</th>
                  <th style={{ background: 'rgba(227,24,45,0.08)', padding: '14px 20px', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--accent)', textAlign: 'center', borderBottom: '1px solid var(--glass-border)' }}>500DWR</th>
                  <th style={{ background: 'rgba(227,24,45,0.08)', padding: '14px 20px', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--accent)', textAlign: 'center', borderBottom: '1px solid var(--glass-border)' }}>420DWR</th>
                  <th style={{ background: 'rgba(227,24,45,0.08)', padding: '14px 20px', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--accent)', textAlign: 'center', borderBottom: '1px solid var(--glass-border)' }}>500W TMT</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['High Strength Steel', true, false, true],
                  ['Earthquake Resistance', false, true, false],
                  ['Superior Weldability', true, false, false],
                  ['ACI & BNBC Certified', false, true, true],
                  ['TS/YS Ratio > 1.25', true, false, false],
                  ['High Ductility', false, true, false],
                  ['Weather Resistant', true, false, true],
                  ['Excellent Durability', true, true, true],
                  ['Thermo Mechanical Treatment', false, false, true],
                  ['Corrosion Resistance', false, false, true],
                ].map(([feature, v1, v2, v3], i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--glass-border)' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}>
                    <td style={{ padding: '12px 20px', fontSize: '13px', color: 'var(--subtext)' }}>{feature}</td>
                    <td style={{ padding: '12px 20px', textAlign: 'center', fontSize: '15px', fontWeight: 700, color: v1 ? 'var(--accent)' : 'rgba(255,255,255,0.15)' }}>{v1 ? '✓' : '—'}</td>
                    <td style={{ padding: '12px 20px', textAlign: 'center', fontSize: '15px', fontWeight: 700, color: v2 ? 'var(--accent)' : 'rgba(255,255,255,0.15)' }}>{v2 ? '✓' : '—'}</td>
                    <td style={{ padding: '12px 20px', textAlign: 'center', fontSize: '15px', fontWeight: 700, color: v3 ? 'var(--accent)' : 'rgba(255,255,255,0.15)' }}>{v3 ? '✓' : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ProductRangePage;