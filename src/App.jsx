import { useRef, useEffect, useState, lazy, Suspense } from 'react'
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

const AboutUsPage = lazy(() => import('./pages/AboutUsPage'))
const ProductsPage = lazy(() => import('./pages/ProductsPage'))
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'))
const VisionMissionPage = lazy(() => import('./pages/VisionMissionPage'))
const LeadershipPage = lazy(() => import('./pages/LeadershipPage'))
const AwardsPage = lazy(() => import('./pages/AwardsPage'))
const HeritagePage = lazy(() => import('./pages/HeritagePage'))

// New Dropdown pages
const ProductSpecsPage = lazy(() => import('./pages/ProductSpecsPage'))
const ProductRangePage = lazy(() => import('./pages/ProductRangePage'))
const SustainabilityESGPage = lazy(() => import('./pages/SustainabilityESGPage'))
const SustainabilityCSRPage = lazy(() => import('./pages/SustainabilityCSRPage'))
const MediaNewsPage = lazy(() => import('./pages/MediaNewsPage'))
const NewsArticlePage = lazy(() => import('./pages/NewsArticlePage'))
const MediaPressPage = lazy(() => import('./pages/MediaPressPage'))
const MediaEventsPage = lazy(() => import('./pages/MediaEventsPage'))
const CareersPositionsPage = lazy(() => import('./pages/CareersPositionsPage'))
const CareersExperiencePage = lazy(() => import('./pages/CareersExperiencePage'))
const ContactFormPage = lazy(() => import('./pages/ContactFormPage'))
const ContactLocationsPage = lazy(() => import('./pages/ContactLocationsPage'))
const ContactHotlinePage = lazy(() => import('./pages/ContactHotlinePage'))
const ContactMapPage = lazy(() => import('./pages/ContactMapPage'))


function App() {
    const lenisRef = useRef()
    const [isContactOpen, setIsContactOpen] = useState(false)
    const [isQuoteOpen, setIsQuoteOpen] = useState(false)
    const [introDone, setIntroDone] = useState(false)

  useEffect(() => {
    fetch('/api/settings/theme')
      .then(r => r.json())
      .then(d => {
        if (d.theme === 'light') {
          document.body.classList.add('light-mode');
        } else {
          document.body.classList.remove('light-mode');
        }
      })
      .catch(() => {});
  }, []);
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
                    gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
                    dpr={[1, 1.5]}
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
                    <Route path="/about" element={<Suspense fallback={null}><AboutUsPage /></Suspense>} />
                    <Route path="/about/vision" element={<Suspense fallback={null}><VisionMissionPage /></Suspense>} />
                    <Route path="/about/leadership" element={<Suspense fallback={null}><LeadershipPage /></Suspense>} />
                    <Route path="/about/heritage" element={<Suspense fallback={null}><HeritagePage /></Suspense>} />
                    <Route path="/about/awards" element={<Suspense fallback={null}><AwardsPage /></Suspense>} />
                    <Route path="/products" element={<Suspense fallback={null}><ProductsPage /></Suspense>} />
                    <Route path="/products/range" element={<Suspense fallback={null}><ProductRangePage /></Suspense>} />
                    <Route path="/products/specifications" element={<Suspense fallback={null}><ProductSpecsPage /></Suspense>} />
                    <Route path="/sustainability/esg" element={<Suspense fallback={null}><SustainabilityESGPage /></Suspense>} />
                    <Route path="/sustainability/csr" element={<Suspense fallback={null}><SustainabilityCSRPage /></Suspense>} />
                    <Route path="/projects" element={<Suspense fallback={null}><ProjectsPage /></Suspense>} />
                    <Route path="/media/news" element={<Suspense fallback={null}><MediaNewsPage /></Suspense>} />
                    <Route path="/media/news/:slug" element={<Suspense fallback={null}><NewsArticlePage /></Suspense>} />
                    <Route path="/media/press" element={<Suspense fallback={null}><MediaPressPage /></Suspense>} />
                    <Route path="/media/events" element={<Suspense fallback={null}><MediaEventsPage /></Suspense>} />
                    <Route path="/careers/positions" element={<Suspense fallback={null}><CareersPositionsPage /></Suspense>} />
                    <Route path="/careers/experience" element={<Suspense fallback={null}><CareersExperiencePage /></Suspense>} />
                    <Route path="/contact/form" element={<Suspense fallback={null}><ContactFormPage /></Suspense>} />
                    <Route path="/contact/locations" element={<Suspense fallback={null}><ContactLocationsPage /></Suspense>} />
                    <Route path="/contact/hotline" element={<Suspense fallback={null}><ContactHotlinePage /></Suspense>} />
                    <Route path="/contact/map" element={<Suspense fallback={null}><ContactMapPage /></Suspense>} />
                </Routes>
            </main>

            <FloatingQuoteBtn />
            <Footer onOpenContact={() => setIsContactOpen(true)} />
        </div>
    )
}

export default App
