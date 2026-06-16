import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const initiatives = [
  {
    color: '#22c55e',
    bg: 'rgba(34,197,94,0.04)',
    iconBg: 'rgba(34,197,94,0.12)',
    imgBg: 'rgba(34,197,94,0.06)',
    title: 'Education',
    image: '/images/csr-education.jpg',
    imageLabel: 'Education Image',
    text: 'Funding schools and distributing scholarships to ensure quality education for low-income families across Bangladesh.',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>,
  },
  {
    color: '#3b82f6',
    bg: 'rgba(59,130,246,0.04)',
    iconBg: 'rgba(59,130,246,0.12)',
    imgBg: 'rgba(59,130,246,0.06)',
    title: 'Healthcare',
    image: '/images/csr-healthcare.jpg',
    imageLabel: 'Healthcare Image',
    text: 'Running free medical camps and healthcare programs to ensure quality treatment for underserved communities.',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
  },
  {
    color: '#E3182D',
    bg: 'rgba(227,24,45,0.04)',
    iconBg: 'rgba(227,24,45,0.12)',
    imgBg: 'rgba(227,24,45,0.06)',
    title: 'Community',
    image: '/images/csr-community.jpg',
    imageLabel: 'Community Image',
    text: 'Deep-rooted conviction towards people and society — empowering local communities through consistent engagement.',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E3182D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  },
  {
    color: '#eab308',
    bg: 'rgba(234,179,8,0.04)',
    iconBg: 'rgba(234,179,8,0.12)',
    imgBg: 'rgba(234,179,8,0.06)',
    title: 'Employee Welfare',
    image: '/images/csr-employee.jpg',
    imageLabel: 'Employee Welfare Image',
    text: 'Caring for our employees through training, safety programs, and comprehensive wellbeing initiatives.',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#eab308" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c4.97-2.5 8-6.5 8-11V5l-8-3-8 3v6c0 4.5 3.03 8.5 8 11z"/></svg>,
  },
  {
    color: '#a855f7',
    bg: 'rgba(168,85,247,0.04)',
    iconBg: 'rgba(168,85,247,0.12)',
    imgBg: 'rgba(168,85,247,0.06)',
    title: 'Environment',
    image: '/images/csr-environment.jpg',
    imageLabel: 'Environment Image',
    text: 'Reforestation drives and environmental awareness campaigns to preserve Bangladesh\'s natural heritage.',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 8C8 10 5.9 16.17 3.82 22M9.5 2.21C7 5.5 7 8 9.5 11c3-3.5 3-6.5 0-8.79"/></svg>,
  },
  {
    color: '#ec4899',
    bg: 'rgba(236,72,153,0.04)',
    iconBg: 'rgba(236,72,153,0.12)',
    imgBg: 'rgba(236,72,153,0.06)',
    title: 'Social Welfare',
    image: '/images/csr-welfare.jpg',
    imageLabel: 'Social Welfare Image',
    text: 'Supporting vulnerable groups through relief programs, disaster response, and social protection initiatives.',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  },
];

const impacts = [
  { n: '10K+', l: 'Families Supported' },
  { n: '500+', l: 'Scholarships Awarded' },
  { n: '20+', l: 'Free Medical Camps' },
  { n: '5000+', l: 'Trees Planted' },
];

const commitList = ['Education & Scholarships', 'Free Medical Camps', 'Community Engagement', 'Employee Wellbeing', 'Environmental Protection', 'Disaster Relief'];

const ImageSlot = ({ src, alt, label, color, bg }) => (
  <div style={{ width: '100%', height: '160px', position: 'relative', overflow: 'hidden', background: bg, borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
    <img src={src} alt={alt} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} onError={e => { e.target.style.display = 'none'; }} />
    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke={`${color}60`} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>
    </svg>
    <span style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: `${color}60` }}>{label}</span>
  </div>
);

const SustainabilityCSRPage = () => {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useGSAP(() => {
    gsap.fromTo('.csr-hero-tag', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: 'power3.out' });
    gsap.fromTo('.csr-hero-title', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, delay: 0.4, ease: 'power3.out' });
    gsap.fromTo('.csr-hero-sub', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.6, ease: 'power3.out' });
    gsap.fromTo('.csr-stats-row', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.9, ease: 'power3.out' });

    gsap.utils.toArray('.csr-fade').forEach((el) => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: 0.7, delay: parseFloat(el.dataset.delay || 0), ease: 'power3.out' })
      });
    });

    gsap.utils.toArray('.csr-card').forEach((el, i) => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: 0.7, delay: (i % 3) * 0.12, ease: 'power3.out' })
      });
    });

    gsap.utils.toArray('.csr-impact-item').forEach((el, i) => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 90%',
        onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: 0.6, delay: i * 0.1, ease: 'power3.out' })
      });
    });

    gsap.utils.toArray('.csr-commit-item').forEach((el, i) => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 92%',
        onEnter: () => gsap.to(el, { opacity: 1, x: 0, duration: 0.5, delay: i * 0.07, ease: 'power3.out' })
      });
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} style={{ background: 'var(--primary)', color: 'var(--text)', minHeight: '100vh', paddingTop: '80px', overflowX: 'hidden' }}>

      {/* HERO */}
      <section style={{ padding: isMobile ? '56px 24px 40px' : '80px 40px 56px', borderBottom: '1px solid var(--glass-border)', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
        <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '700px', height: '280px', background: 'radial-gradient(ellipse, rgba(227,24,45,0.13) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <div className="csr-hero-tag" style={{ fontSize: '11px', letterSpacing: '4px', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '18px', opacity: 0 }}>// Corporate Social Responsibility</div>
          <h1 className="csr-hero-title" style={{ fontSize: 'clamp(32px,5vw,58px)', fontWeight: 900, lineHeight: 1.05, textTransform: 'uppercase', letterSpacing: '-1px', marginBottom: '20px', opacity: 0, fontFamily: 'var(--font-heading)' }}>
            Community <span style={{ color: 'var(--accent)' }}>Outreach</span><br />& Welfare
          </h1>
          <p className="csr-hero-sub" style={{ fontSize: isMobile ? '14px' : '15px', color: 'var(--subtext)', maxWidth: '580px', margin: '0 auto 36px', lineHeight: 1.8, opacity: 0 }}>
            Anwar Group and Anwar Ispat stand close to communities — funding schools, distributing scholarships, and running medical camps for low-income families.
          </p>
          <div className="csr-stats-row" style={{ display: 'flex', justifyContent: 'center', gap: isMobile ? '28px' : '56px', flexWrap: 'wrap', opacity: 0 }}>
            {[{ n: '10K+', l: 'Families Helped' }, { n: '500+', l: 'Scholarships Given' }, { n: '48+', l: 'Years of Service' }, { n: '20+', l: 'Medical Camps' }].map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '36px', fontWeight: 800, color: 'var(--accent)' }}>{s.n}</div>
                <div style={{ fontSize: '10px', color: 'var(--subtext)', letterSpacing: '2px', textTransform: 'uppercase', marginTop: '4px' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section style={{ padding: isMobile ? '40px 24px' : '48px 40px', borderBottom: '1px solid var(--glass-border)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '24px' }}>
          <div className="csr-fade" data-delay="0" style={{ borderRadius: '14px', padding: isMobile ? '24px' : '28px', border: '1px solid rgba(227,24,45,0.2)', background: 'rgba(227,24,45,0.04)', opacity: 0, transform: 'translateY(30px)' }}>
            <div style={{ fontSize: '11px', letterSpacing: '3px', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '12px' }}>Our Mission</div>
            <h3 style={{ fontSize: '20px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '-0.5px', fontFamily: 'var(--font-heading)' }}>People First,<br />Always</h3>
            <div style={{ width: '36px', height: '3px', background: 'var(--accent)', borderRadius: '2px', marginBottom: '14px' }} />
            <p style={{ fontSize: '13px', color: 'var(--subtext)', lineHeight: 1.8, margin: 0 }}>We believe in building stronger communities through consistent investment in education, healthcare, and social welfare programs that create lasting impact.</p>
          </div>
          <div className="csr-fade" data-delay="0.12" style={{ borderRadius: '14px', padding: isMobile ? '24px' : '28px', border: '1px solid var(--glass-border)', background: 'var(--glass)', opacity: 0, transform: 'translateY(30px)' }}>
            <div style={{ fontSize: '11px', letterSpacing: '3px', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '12px' }}>Our Vision</div>
            <h3 style={{ fontSize: '20px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '-0.5px', fontFamily: 'var(--font-heading)' }}>A Stronger<br />Bangladesh</h3>
            <div style={{ width: '36px', height: '3px', background: 'var(--accent)', borderRadius: '2px', marginBottom: '14px' }} />
            <p style={{ fontSize: '13px', color: 'var(--subtext)', lineHeight: 1.8, margin: 0 }}>From Chawk Bazar to the nation — building a socially responsible future by empowering the underprivileged and nurturing the next generation.</p>
          </div>
        </div>
      </section>

      {/* INITIATIVES */}
      <section style={{ padding: isMobile ? '48px 24px' : '60px 40px' }}>
        <div style={{ maxWidth: '1040px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div className="csr-fade" data-delay="0" style={{ fontSize: '11px', letterSpacing: '4px', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '10px', opacity: 0, transform: 'translateY(20px)' }}>// CSR Initiatives</div>
            <h2 className="csr-fade" data-delay="0.1" style={{ fontSize: isMobile ? '26px' : '32px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.5px', fontFamily: 'var(--font-heading)', opacity: 0, transform: 'translateY(20px)' }}>What We Do</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: '20px' }}>
            {initiatives.map((item, i) => (
              <div key={i} className="csr-card" style={{ background: item.bg, border: '1px solid var(--glass-border)', borderRadius: '14px', overflow: 'hidden', opacity: 0, transform: 'translateY(40px)', display: 'flex', flexDirection: 'column' }}>
                <ImageSlot src={item.image} alt={item.title} label={item.imageLabel} color={item.color} bg={item.imgBg} />
                <div style={{ padding: '20px 22px 24px', flex: 1 }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: item.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>{item.icon}</div>
                  <div style={{ fontSize: '15px', fontWeight: 800, textTransform: 'uppercase', color: item.color, marginBottom: '8px', fontFamily: 'var(--font-heading)', letterSpacing: '0.5px' }}>{item.title}</div>
                  <p style={{ fontSize: '13px', color: 'var(--subtext)', lineHeight: 1.7, margin: 0 }}>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section style={{ padding: isMobile ? '0 24px 56px' : '0 40px 64px', borderTop: '1px solid var(--glass-border)' }}>
        <div style={{ maxWidth: '1040px', margin: '0 auto', paddingTop: isMobile ? '40px' : '56px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div className="csr-fade" data-delay="0" style={{ fontSize: '11px', letterSpacing: '4px', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '10px', opacity: 0, transform: 'translateY(20px)' }}>// Our Impact</div>
            <h2 className="csr-fade" data-delay="0.1" style={{ fontSize: isMobile ? '24px' : '30px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.5px', fontFamily: 'var(--font-heading)', opacity: 0, transform: 'translateY(20px)' }}>Making a Difference</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4,1fr)', gap: '14px' }}>
            {impacts.map((item, i) => (
              <div key={i} className="csr-impact-item" style={{ background: 'var(--glass)', border: '1px solid var(--glass-border)', borderRadius: '12px', padding: '22px 18px', textAlign: 'center', opacity: 0, transform: 'translateY(20px)' }}>
                <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--accent)' }}>{item.n}</div>
                <div style={{ fontSize: '11px', color: 'var(--subtext)', letterSpacing: '1.5px', textTransform: 'uppercase', marginTop: '6px', lineHeight: 1.4 }}>{item.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMITMENT */}
      <section style={{ padding: isMobile ? '0 24px 60px' : '0 40px 80px', borderTop: '1px solid var(--glass-border)' }}>
        <div style={{ maxWidth: '1040px', margin: '0 auto', paddingTop: isMobile ? '40px' : '56px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '40px', alignItems: 'start' }}>
          <div className="csr-fade" data-delay="0" style={{ opacity: 0, transform: 'translateY(30px)' }}>
            <div style={{ fontSize: '11px', letterSpacing: '4px', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '10px' }}>// Our Commitment</div>
            <h2 style={{ fontSize: isMobile ? '22px' : '26px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.5px', fontFamily: 'var(--font-heading)', marginBottom: '22px' }}>Standing Close to Communities</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <p style={{ fontSize: '14px', color: 'var(--subtext)', lineHeight: 1.85, margin: 0 }}>Anwar Group and Anwar Ispat stand close to communities. We fund schools, distribute scholarships, and run medical camps to ensure quality healthcare and education for low-income families.</p>
              <p style={{ fontSize: '14px', color: 'var(--subtext)', lineHeight: 1.85, margin: 0 }}>At the heart of our activities is the deep-rooted conviction towards people and society at large, emanating from the values that have been in the family for many centuries.</p>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {commitList.map((item, i) => (
              <div key={i} className="csr-commit-item" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 18px', background: 'var(--glass)', border: '1px solid var(--glass-border)', borderLeft: '3px solid var(--accent)', borderRadius: '0 8px 8px 0', opacity: 0, transform: 'translateX(-20px)', cursor: 'default' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(227,24,45,0.05)'; e.currentTarget.style.borderColor = 'var(--accent)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--glass)'; e.currentTarget.style.borderColor = 'var(--glass-border)'; }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)', flexShrink: 0 }} />
                <span style={{ fontSize: '13px', color: 'var(--subtext)', fontWeight: 500 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default SustainabilityCSRPage;