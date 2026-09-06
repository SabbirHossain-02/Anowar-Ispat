import React from 'react'
import { useContent } from '../lib/content'

// অ্যাডমিন কিছু না বদলালে এগুলোই দেখা যায়। ঘরটি খালি রাখলেও
// পাতাটি ফাঁকা হয় না — নিচের লেখাই ফিরে আসে।
const DEFAULTS = {
    hero: {
        line1: 'FORGED IN',
        accent1: 'FIRE',
        line2: 'ENGINEERED FOR THE',
        accent2: 'FUTURE',
        sub: 'A cinematic journey of power, precision, and the steel that builds Bangladesh.',
        cta: 'DISCOVER THE FORCE',
    },
}

const Hero = () => {
    const { hero } = useContent('home', DEFAULTS)

    return (
        <section className="hero">
            <div className="hero-content">
                <h1 className="hero-title" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
                    {hero.line1} <span className="accent-text">{hero.accent1}</span>.
                    <br />
                    {hero.line2} <span className="accent-text">{hero.accent2}</span>.
                </h1>
                <p style={{ marginTop: '2rem', maxWidth: '400px', color: 'var(--subtext)', fontSize: '1rem', marginInline: 'auto' }}>
                    {hero.sub}
                </p>
                <a href="#discover" className="magnetic-btn">{hero.cta}</a>
            </div>
        </section>
    )
}

export default Hero
