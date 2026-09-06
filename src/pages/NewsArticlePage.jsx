import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Link2, Check } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
    articleSlug, idFromSlug, paragraphs, excerpt, readTime, fetchNews,
} from '../lib/news';
import { useContent } from '../lib/content';

// খবরের তালিকার পাতা যে লেখা দেখায়, ভেতরের পাতাও সেখান থেকেই পড়ে
const DEFAULTS = {
    artLoading: 'Loading the story…',
    artGoneTag: 'NOT FOUND',
    artGone: 'This story is no longer available',
    artGoneText: 'It may have been removed from the newsroom, or the link may be incomplete.',
    artBack: 'All news',
    artMore: 'MORE FROM THE NEWSROOM',
};

gsap.registerPlugin(ScrollTrigger, useGSAP);

const CONTAINER = {
    maxWidth: '1180px',
    margin: '0 auto',
    padding: '0 clamp(1.25rem, 5vw, 3rem)',
};

const NewsArticlePage = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const rootRef = useRef(null);

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);
    const c = useContent('media-news', DEFAULTS);

    useEffect(() => { window.scrollTo(0, 0); }, [slug]);

    useEffect(() => {
        let cancelled = false;
        fetchNews()
            .then((d) => { if (!cancelled) setPosts(d); })
            .catch(() => { if (!cancelled) setPosts([]); })
            .finally(() => { if (!cancelled) setLoading(false); });
        return () => { cancelled = true; };
    }, []);

    // স্লাগের শুরুতে id, তাই শিরোনাম বদলালেও পুরোনো লিংক মেলে
    const article = useMemo(() => {
        const id = idFromSlug(slug);
        return posts.find((p) => p.id === id) || null;
    }, [posts, slug]);

    const related = useMemo(
        () => posts.filter((p) => p.id !== article?.id).slice(0, 3),
        [posts, article],
    );

    const body = useMemo(() => paragraphs(article?.description), [article]);

    useGSAP(() => {
        gsap.utils.toArray('.na-reveal').forEach((el) => {
            gsap.from(el, {
                y: 26, opacity: 0, duration: 0.65, ease: 'power3.out',
                scrollTrigger: { trigger: el, start: 'top 93%' },
            });
        });
    }, { scope: rootRef, dependencies: [article?.id] });

    const copyLink = () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }).catch(() => {});
    };

    const shell = (children) => (
        <div
            ref={rootRef}
            style={{
                background: 'var(--primary)', color: 'var(--text)',
                minHeight: '100vh', overflowX: 'hidden',
                paddingTop: 'clamp(7rem, 12vw, 9rem)',
                paddingBottom: 'clamp(3rem, 6vw, 5rem)',
            }}
        >
            <div style={CONTAINER}>{children}</div>
        </div>
    );

    if (loading) return shell(<p className="nw-note">{c.artLoading}</p>);

    if (!article) {
        return shell(
            <div className="na-missing">
                <span className="nw-kicker">{c.artGoneTag}</span>
                <h1 className="na-title">{c.artGone}</h1>
                <p className="na-lead">{c.artGoneText}</p>
                <button type="button" className="na-back" onClick={() => navigate('/media/news')}>
                    <ArrowLeft size={15} strokeWidth={2.2} /> {c.artBack}
                </button>
            </div>,
        );
    }

    return shell(
        <>
            <button type="button" className="na-back na-reveal" onClick={() => navigate('/media/news')}>
                <ArrowLeft size={15} strokeWidth={2.2} /> All news
            </button>

            <article className="na-article">
                <header className="na-head na-reveal">
                    {article.category && <span className="nw-kicker">{article.category}</span>}
                    <h1 className="na-title">{article.title}</h1>
                    <div className="nw-meta na-meta">
                        {article.event_date && <span>{String(article.event_date).toUpperCase()}</span>}
                        <span>{readTime(article.description)}</span>
                        <button type="button" className="na-copy" onClick={copyLink}>
                            {copied
                                ? <><Check size={13} strokeWidth={2.4} /> Link copied</>
                                : <><Link2 size={13} strokeWidth={2.2} /> Copy link</>}
                        </button>
                    </div>
                </header>

                {article.image_url && (
                    <figure className="na-figure na-reveal">
                        <img src={article.image_url} alt={article.title} />
                    </figure>
                )}

                {/* প্রথম অনুচ্ছেদটি বড় হরফে — খবরের পাতার মতো */}
                <div className="na-body na-reveal">
                    {body.map((p, i) => (
                        <p key={i} className={i === 0 ? 'na-lead' : undefined}>{p}</p>
                    ))}
                </div>
            </article>

            {related.length > 0 && (
                <section className="na-related">
                    <div className="nw-rule na-reveal"><span>{c.artMore}</span></div>

                    <div className="nw-grid">
                        {related.map((p) => (
                            <article
                                key={p.id}
                                className="nw-card na-reveal"
                                onClick={() => navigate('/media/news/' + articleSlug(p))}
                            >
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
                                    <span className="nw-more">
                                        Read <ArrowRight size={13} strokeWidth={2.2} />
                                    </span>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            )}
        </>,
    );
};

export default NewsArticlePage;
