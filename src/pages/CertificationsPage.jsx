import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import PageBanner from '../components/PageBanner';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SECTION_PAD = 'clamp(2.25rem, 4vw, 3.5rem)';
const CONTAINER = {
    maxWidth: '1180px',
    margin: '0 auto',
    padding: '0 clamp(1.25rem, 5vw, 3rem)',
};

// স্লাইডের ক্রম রাখা হয়েছে। scope টা কার্ডের নিচে ছোট লেবেল হিসেবে
// বসে — আগের মতো তিনটি আলাদা শিরোনামে ভাগ করা হয়নি, কারণ সেই
// শিরোনামগুলো নথিতে ছিল না।
const CERTIFICATES = [
    {
        logo: '/cert-buet.png',
        code: 'BUET',
        issuer: 'Bangladesh University of Engineering and Technology',
        scope: 'Independent testing',
    },
    {
        logo: '/cert-bsti.jpg',
        code: 'BSTI',
        issuer: 'Bangladesh Standards and Testing Institution',
        scope: 'Product standard',
    },
    {
        logo: '/cert-iso-ems.jpg',
        code: 'ISO 14001:2015',
        issuer: 'Environmental management system',
        scope: 'Management system',
    },
    {
        logo: '/cert-iso-qms.png',
        code: 'ISO 9001:2015',
        issuer: 'Quality management system',
        scope: 'Management system',
    },
    {
        logo: '/cert-is1786.jpg',
        code: 'IS-1786',
        issuer: 'Bureau of Indian Standards — strength and flexibility',
        scope: 'Product standard',
    },
    {
        logo: '/cert-bs4449.png',
        code: 'BS-4449',
        issuer: 'British Standards Institution',
        scope: 'Product standard',
    },
    {
        logo: '/cert-bds-iso.png',
        code: 'BDS ISO 6935-2:2021',
        issuer: 'Bangladesh Standard for steel reinforcement of concrete',
        scope: 'Product standard',
    },
    {
        logo: '/cert-astm.png',
        code: 'ASTM-A615 & A706',
        issuer: 'ASTM International — certified for seismic safety',
        scope: 'Product standard',
    },
];

const CertificationsPage = () => {
    const rootRef = useRef(null);

    useGSAP(() => {
        gsap.utils.toArray('.cert-card').forEach((el, i) => {
            gsap.from(el, {
                y: 26, opacity: 0, duration: 0.6, ease: 'power3.out',
                // একই সারির কার্ডগুলো একটু পরপর আসে, একসাথে ঝাঁপিয়ে পড়ে না
                delay: (i % 4) * 0.06,
                scrollTrigger: { trigger: el, start: 'top 92%' },
            });
        });
    }, { scope: rootRef });

    return (
        <div
            ref={rootRef}
            style={{ background: 'var(--primary)', color: 'var(--text)', minHeight: '100vh', overflowX: 'hidden' }}
        >
            <PageBanner
                image="/Certifications-page-banner.jpg"
                label="CERTIFICATIONS"
                title="Tested, audited and"
                accent="Certified"
                crumbs={[
                    { label: 'Home', to: '/' },
                    { label: 'Products', to: '/products' },
                    { label: 'Certifications' },
                ]}
            />

            <section style={{
                minHeight: 'auto', display: 'block',
                ...CONTAINER,
                paddingTop: SECTION_PAD,
                paddingBottom: `calc(${SECTION_PAD} * 1.4)`,
            }}>
                <div className="cert-head">
                    <span className="cert-eyebrow">CERTIFICATIONS</span>
                    <h2 className="cert-title">
                        Every claim below is issued by a body outside Anwar Ispat
                    </h2>
                    <p className="cert-lead">
                        The rebar is certified against Bangladeshi, British, Indian and American
                        standards. The mill itself is audited to ISO quality and environmental
                        management systems, and tested independently by BUET.
                    </p>
                </div>

                <div className="cert-grid">
                    {CERTIFICATES.map((c) => (
                        <article key={c.code} className="cert-card">
                            {/* প্লেট দুই থিমেই সাদা — কয়েকটি লোগো কালো কালিতে
                                আঁকা, গাঢ় পটভূমিতে মিলিয়ে যেত */}
                            <div className="cert-plate">
                                <img src={c.logo} alt={`${c.code} certification`} loading="lazy" />
                            </div>

                            <div className="cert-body">
                                <h3 className="cert-code">{c.code}</h3>
                                <p className="cert-issuer">{c.issuer}</p>
                                {/* margin-top:auto — বিবরণ ছোট বা বড় যাই হোক,
                                    লেবেলটা সব কার্ডে একই উচ্চতায় থাকে */}
                                <span className="cert-scope">{c.scope}</span>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default CertificationsPage;
