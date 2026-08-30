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

// স্লাইডের ক্রম রাখা হয়েছে। scope টা ছোট লেবেল হিসেবে ডানে বসে —
// আগের মতো তিনটি আলাদা সেকশনে ভাগ না করে, কারণ সেই শিরোনামগুলো
// নথিতে ছিল না, আমার বানানো ছিল।
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
        issuer: 'Bangladesh Standard — steel for the reinforcement of concrete',
        scope: 'Product standard',
    },
    {
        logo: '/cert-astm.png',
        code: 'ASTM-A615 & A706',
        issuer: 'ASTM International — seismic safety',
        scope: 'Product standard',
    },
];

const CertificationsPage = () => {
    const rootRef = useRef(null);

    useGSAP(() => {
        gsap.utils.toArray('.cert-row').forEach((el) => {
            gsap.from(el, {
                y: 22, opacity: 0, duration: 0.6, ease: 'power3.out',
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
                <div className="cert-layout">
                    {/* বাঁ পাশের অংশটা স্ক্রলের সাথে আটকে থাকে, তাই লম্বা
                        তালিকা দেখতে দেখতেও প্রসঙ্গটা চোখের সামনে থাকে */}
                    <aside className="cert-aside">
                        <p className="cert-count">
                            <span>08</span> certifications
                        </p>
                        <h2 className="cert-lede">
                            Every claim on this page is issued by a body outside Anwar Ispat.
                        </h2>
                        <p className="cert-intro">
                            The rebar is certified against Bangladeshi, British, Indian and American
                            standards. The mill itself is audited to ISO quality and environmental
                            management systems, and tested independently by BUET.
                        </p>
                    </aside>

                    <div className="cert-register">
                        {CERTIFICATES.map((c, i) => (
                            <article key={c.code} className="cert-row">
                                <span className="cert-index" aria-hidden="true">
                                    {String(i + 1).padStart(2, '0')}
                                </span>

                                {/* লোগোর প্লেট দুই থিমেই সাদা — কয়েকটি লোগো
                                    কালো কালিতে আঁকা, গাঢ় পটভূমিতে মিলিয়ে যেত */}
                                <div className="cert-plate">
                                    <img src={c.logo} alt={`${c.code} certification`} loading="lazy" />
                                </div>

                                <div className="cert-detail">
                                    <h3 className="cert-code">{c.code}</h3>
                                    <p className="cert-issuer">{c.issuer}</p>
                                </div>

                                <span className="cert-scope">{c.scope}</span>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CertificationsPage;
