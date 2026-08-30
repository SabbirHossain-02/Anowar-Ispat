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

const CERTIFICATES = [
    { logo: '/cert-buet.png', name: 'BUET', line: 'Certified by the Bangladesh University of Engineering and Technology' },
    { logo: '/cert-bsti.jpg', name: 'BSTI', line: 'Certified for standard quality by the Bangladesh Standards and Testing Institution' },
    { logo: '/cert-iso-ems.jpg', name: 'ISO 14001:2015', line: 'Environmental management system certificate' },
    { logo: '/cert-iso-qms.png', name: 'ISO 9001:2015', line: 'Quality management system certificate' },
    { logo: '/cert-is1786.jpg', name: 'IS-1786', line: 'Certified for strength and flexibility, Bureau of Indian Standards' },
    { logo: '/cert-bs4449.png', name: 'BS-4449', line: 'Certified for British-standard quality' },
    { logo: '/cert-bds-iso.png', name: 'BDS ISO 6935-2:2021', line: 'Bangladesh Standard for steel for the reinforcement of concrete' },
    { logo: '/cert-astm.png', name: 'ASTM-A615 & A706', line: 'Certified for seismic safety' },
];

const CertificationsPage = () => {
    const rootRef = useRef(null);

    useGSAP(() => {
        gsap.utils.toArray('.ct-reveal').forEach((el) => {
            gsap.from(el, {
                y: 28, opacity: 0, duration: 0.7, ease: 'power3.out',
                scrollTrigger: { trigger: el, start: 'top 90%' },
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
                paddingTop: '30px',
                paddingBottom: `calc(${SECTION_PAD} * 1.4)`,
            }}>
                <p className="ct-reveal" style={{
                    fontFamily: 'var(--font-main)',
                    fontSize: 'clamp(1rem, 1.5vw, 1.22rem)',
                    lineHeight: 1.8, color: 'var(--text)',
                    margin: `0 0 ${SECTION_PAD}`, maxWidth: '62ch',
                }}>
                    Anwar Ispat rebar is certified against Bangladeshi, British, Indian and American
                    standards, and the mill is audited to ISO quality and environmental management
                    systems.
                </p>

                <div className="cert-grid">
                    {CERTIFICATES.map((c) => (
                        <figure key={c.name} className="ct-reveal cert-item">
                            {/* লোগোগুলোর নিজস্ব রং আছে এবং কয়েকটির পটভূমি সাদা,
                                তাই টাইলটা দুই থিমেই সাদা — নইলে ডার্ক মোডে
                                কালো কালিতে আঁকা লোগো মিলিয়ে যায় */}
                            <div className="cert-plate">
                                <img src={c.logo} alt={`${c.name} certification`} loading="lazy" />
                            </div>
                            <figcaption>
                                <h2 className="cert-name">{c.name}</h2>
                                <p className="cert-line">{c.line}</p>
                            </figcaption>
                        </figure>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default CertificationsPage;
