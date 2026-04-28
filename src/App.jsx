import { useRef, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Lenis from 'lenis'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Scene from './components/three/Scene'
import VideoHero from './components/VideoHero'
import Hero from './components/Hero'
import { ProductService, AboutUs, WhyChooseUs, CoreStrengths, ProjectShowcase, MediaEvents, Blog, Footer } from './components/Sections'
import Navbar from './components/Navbar'
import ContactModal from './components/ContactModal'
import QuoteModal from './components/QuoteModal'
import IntroLoader from './components/IntroLoader'
import FloatingQuoteBtn from './components/FloatingQuoteBtn'
import AboutUsPage from './pages/AboutUsPage'
import ProductsPage from './pages/ProductsPage'

function App() {
    const lenisRef = useRef()
    const [isContactOpen, setIsContactOpen] = useState(false)
    const [isQuoteOpen, setIsQuoteOpen] = useState(false)
    const [introDone, setIntroDone] = useState(false)
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigate = (page, hash) => {
        const path = page === 'home' ? '/' : `/${page}`;
        
        if (location.pathname !== path) {
            navigate(path);
            setTimeout(() => {
                if (hash) {
                    const element = document.querySelector(hash);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }
                } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }, 100);
        } else {
            if (hash) {
                const element = document.querySelector(hash);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    };

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        })

        function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)
        lenisRef.current = lenis

        return () => {
            lenis.destroy()
        }
    }, [])

    useEffect(() => {
        if (lenisRef.current) {
            if (isContactOpen || isQuoteOpen || !introDone) {
                lenisRef.current.stop()
            } else {
                lenisRef.current.start()
            }
        }
    }, [isContactOpen, isQuoteOpen, introDone])

    useEffect(() => {
        const handleStop = () => lenisRef.current?.stop();
        const handleStart = () => lenisRef.current?.start();
        const handleOpenQuote = () => setIsQuoteOpen(true);
        
        window.addEventListener('lenis-stop', handleStop);
        window.addEventListener('lenis-start', handleStart);
        window.addEventListener('open-quote', handleOpenQuote);
        
        return () => {
            window.removeEventListener('lenis-stop', handleStop);
            window.removeEventListener('lenis-start', handleStart);
            window.removeEventListener('open-quote', handleOpenQuote);
        };
    }, []);

    return (
        <div className="app-container">
            {!introDone && <IntroLoader onComplete={() => setIntroDone(true)} />}
            <Navbar onOpenContact={() => setIsContactOpen(true)} onNavigate={handleNavigate} />
            <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
            <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />

            <div className="canvas-wrapper">
                <Canvas
                    shadows
                    camera={{ position: [0, 0, 5], fov: 35 }}
                    gl={{ antialias: true, alpha: true }}
                >
                    <Scene />
                </Canvas>
            </div>

            <main>
                <Routes>
                    <Route path="/" element={
                        <>
                            <VideoHero />
                            <Hero />
                            <ProductService />
                            <AboutUs />
                            <WhyChooseUs />
                            <CoreStrengths />
                            <ProjectShowcase />
                            <MediaEvents />
                            <Blog />
                        </>
                    } />
                    <Route path="/about" element={<AboutUsPage />} />
                    <Route path="/products" element={<ProductsPage />} />
                </Routes>
            </main>

            <FloatingQuoteBtn />
            <Footer onOpenContact={() => setIsContactOpen(true)} />
        </div>
    )
}

export default App
