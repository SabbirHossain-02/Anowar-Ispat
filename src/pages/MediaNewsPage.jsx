import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import PageBanner from '../components/PageBanner';
import { articleSlug, excerpt, readTime, fetchNews } from '../lib/news';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SECTION_PAD = 'clamp(2.25rem, 4vw, 3.5rem)';
const CONTAINER = {
    maxWidth: '1180px',
    margin: '0 auto',
    padding: '0 clamp(1.25rem, 5vw, 3rem)',
};

const MediaNewsPage = () => {
    const rootRef = useRef(null);
    const tickerRef = useRef(null);
    const navigate = useNavigate();

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [failed, setFailed] = useState(false);
    const [active, setActive] = useState('All');

    useEffect(() => {
        let cancelled = false;
        fetchNews()
            .then((d) => { if (!cancelled) setPosts(d); })
            .catch(() => { if (!cancelled) setFailed(true); })
            .finally(() => { if (!cancelled) setLoading(false); });
        return () => { cancelled = true; };
    }, []);

    // বিভাগগুলো ডেটা থেকেই আসে — হাতে লেখা তালিকা রাখলে ব্যাকএন্ডে
    // নতুন বিভাগ যোগ হলে সেটা এখানে দেখাত না
    const categories = useMemo(() => {
        const set = [...new Set(posts.map((p) => p.category).filter(Boolean))];
        return set.length > 1 ? ['All', ...set] : [];
    }, [posts]);

    const shown = useMemo(
        () => (active === 'All' ? posts : posts.filter((p) => p.category === active)),
        [posts, active],
    );

    const [lead, ...rest] = shown;

    useGSAP(() => {
        if (tickerRef.current) {
            gsap.to(tickerRef.current, { xPercent: -50, duration: 26, ease: 'none', repeat: -1 });
        }
        gsap.utils.toArray('.nw-reveal').forEach((el) => {
            gsap.from(el, {
                y: 28, opacity: 0, duration: 0.65, ease: 'power3.out',
                scrollTrigger: { trigger: el, start: 'top 92%' },
            });
        });
    }, { scope: rootRef, dependencies: [shown.length] });

    const open = (p) => navigate('/media/news/' + articleSlug(p));

    return (
        <div
            ref={rootRef}
            style={{ background: 'var(--primary)', color: 'var(--text)', minHeight: '100vh', overflowX: 'hidden' }}
        >
            <PageBanner
                image="/latest-news-banner.jpg"
                label="MEDIA CENTER"
                title="Latest"
                accent="News"
                crumbs={[
                    { label: 'Home', to: '/' },
                    { label: 'Media Center' },
                    { label: 'News & Articles' },
                ]}
            />

            {/* খবরের সাইটের মতো চলমান শিরোনামের পট্টি — শিরোনামগুলো
                ডেটাবেস থেকেই, বানানো নয় */}
            {posts.length > 0 && (
                <div className="nw-ticker">
                    <span className="nw-ticker-tag">LATEST</span>
                    <div className="nw-ticker-track">
                        <div ref={tickerRef} className="nw-ticker-run">
                            {[0, 1].map((copy) => (
                                <span key={copy} aria-hidden={copy === 1}>
                                    {posts.map((p) => (
                                        <span key={`${copy}-${p.id}`} className="nw-ticker-item">
                                            {p.title}
                                        </span>
                                    ))}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <section style={{
                minHeight: 'auto', display: 'block',
                ...CONTAINER,
                paddingTop: SECTION_PAD,
                paddingBottom: `calc(${SECTION_PAD} * 1.4)`,
            }}>
                {/* বিভাগ বাছাই কেবল তখনই, যখন একাধিক বিভাগ সত্যিই আছে */}
                {categories.length > 0 && (
                    <div className="nw-filters">
                        {categories.map((c) => (
                            <button
                                key={c}
                                type="button"
                                className={c === active ? 'nw-filter is-on' : 'nw-filter'}
                                onClick={() => setActive(c)}
                            >
                                {c}
                            </button>
                        ))}
                    </div>
                )}

                {loading && <p className="nw-note">Loading the newsroom…</p>}

                {!loading && failed && (
                    <p className="nw-note">
                        The newsroom could not be reached just now. Please try again shortly.
                    </p>
                )}

                {!loading && !failed && shown.length === 0 && (
                    <p className="nw-note">No stories have been published in this section yet.</p>
                )}

                {lead && (
                    <>
                        <div className="nw-rule nw-reveal">
                            <span>LEAD STORY</span>
                        </div>

                        <article className="nw-lead nw-reveal" onClick={() => open(lead)}>
                            <div className="nw-lead-media">
                                {lead.image_url
                                    ? <img src={lead.image_url} alt={lead.title} loading="lazy" />
                                    : <span className="nw-noimg" aria-hidden="true" />}
                            </div>

                            <div className="nw-lead-body">
                                {lead.category && <span className="nw-kicker">{lead.category}</span>}
                                <h2 className="nw-lead-title">{lead.title}</h2>
                                <p className="nw-lead-text">{excerpt(lead.description, 260)}</p>
                                <div className="nw-meta">
                                    {lead.event_date && <span>{String(lead.event_date).toUpperCase()}</span>}
                                    <span>{readTime(lead.description)}</span>
                                    <span className="nw-more">
                                        Read the story <ArrowRight size={14} strokeWidth={2.2} />
                                    </span>
                                </div>
                            </div>
                        </article>
                    </>
                )}

                {rest.length > 0 && (
                    <>
                        <div className="nw-rule nw-reveal">
                            <span>MORE STORIES</span>
                        </div>

                        <div className="nw-grid">
                            {rest.map((p) => (
                                <article key={p.id} className="nw-card nw-reveal" onClick={() => open(p)}>
                                    <div className="nw-card-media">
                                        {p.image_url
                                            ? <img src={p.image_url} alt={p.title} loading="lazy" />
                                            : <span className="nw-noimg" aria-hidden="true" />}
                                    </div>
                                    {p.category && <span className="nw-kicker">{p.category}</span>}
                                    <h3 className="nw-card-title">{p.title}</h3>
                                    <p className="nw-card-text">{excerpt(p.description)}</p>
                                    <div className="nw-meta">
                                        {p.event_date && <span>{String(p.event_date).toUpperCase()}</span>}
                                        <span>{readTime(p.description)}</span>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </>
                )}
            </section>
        </div>
    );
};

export default MediaNewsPage;
