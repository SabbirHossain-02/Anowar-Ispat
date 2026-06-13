import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const ProductsPage = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch('/api/products')
      .then(r => r.json())
      .then(data => setProducts(data.map(p => ({
        id: p.id,
        title: p.title,
        desc: p.description || '',
        img: p.image_url || '/product_image.png',
      }))))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = "hidden";
      window.dispatchEvent(new CustomEvent('lenis-stop'));
    } else {
      document.body.style.overflow = "";
      window.dispatchEvent(new CustomEvent('lenis-start'));
    }
    return () => {
      document.body.style.overflow = "";
      window.dispatchEvent(new CustomEvent('lenis-start'));
    };
  }, [selectedProduct]);

  return (
    <div 
      className="products-page" 
      style={{
        minHeight: '100vh',
        padding: '120px 5% 4rem 5%',
        background: 'var(--bg-main)',
      }}
    >
      <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 4rem auto" }}>
        <p style={{ fontFamily: "monospace", color: "var(--accent)", letterSpacing: "0.2em", marginBottom: "1rem", fontSize: "0.9rem" }}>
          OUR CATALOG
        </p>
        <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: "var(--text)", lineHeight: 1.1, textTransform: "uppercase", fontFamily: "var(--font-heading)", marginBottom: "1.5rem" }}>
          ENGINEERED FOR <span className="accent-text">ENDURANCE</span>
        </h1>
        <p style={{ color: "var(--subtext)", fontSize: "1.1rem", lineHeight: "1.6" }}>
          Forged in extreme intensity. We provide exceptional structural solutions designed to act as the unyielding backbone of tomorrow's infrastructure. Explore our full range of premium grade TMT rebars and steel products.
        </p>
      </div>

      <div className="products-grid" style={{ display: "grid", gap: "2rem", width: "100%", maxWidth: "1400px", margin: "0 auto" }}>
        {products.length === 0 ? (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', color: 'var(--subtext)', padding: '4rem' }}>
            No products available yet.
          </div>
        ) : products.map((product, idx) => (
          <div
            key={idx}
            className="product-grid-card"
            style={{ position: "relative", background: "var(--glass)", border: "1px solid var(--glass-border)", borderRadius: "16px", padding: "2rem", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", cursor: "pointer", transition: "transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease" }}
            onClick={() => setSelectedProduct(product)}
          >
            <div style={{ width: "100%", aspectRatio: "4/3", marginBottom: "2rem", display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
              <img 
                src={product.img} 
                alt={product.title} 
                style={{ maxWidth: "80%", maxHeight: "80%", objectFit: "contain", filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.4))", transition: "transform 0.5s ease" }}
                className="product-img"
              />
              <div className="product-glow" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, rgba(227, 24, 45, 0.15) 0%, transparent 70%)', opacity: 0, transition: 'opacity 0.4s ease', pointerEvents: 'none', zIndex: -1 }} />
            </div>
            <h3 style={{ fontSize: "1.5rem", color: "var(--text)", fontFamily: "var(--font-heading)", marginBottom: "1rem", textTransform: "uppercase" }}>
              {product.title}
            </h3>
            <p style={{ color: "var(--subtext)", fontSize: "0.95rem", lineHeight: "1.6", marginBottom: "2rem" }}>
              {product.desc}
            </p>
            <div className="carousel-actions" style={{ marginTop: 'auto', width: '100%' }}>
              <button className="btn-learn-more" onClick={(e) => { e.stopPropagation(); setSelectedProduct(product); }}>
                Learn More
              </button>
              <button className="btn-get-quote" onClick={(e) => { e.stopPropagation(); window.dispatchEvent(new CustomEvent('open-quote')); }}>
                Get Quote
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className={`product-modal-overlay ${selectedProduct ? "open" : ""}`} onClick={() => setSelectedProduct(null)}>
        <div className="product-modal" onClick={(e) => e.stopPropagation()}>
          <div className="product-modal-img-container">
            <img src={selectedProduct?.img || "/product_image.png"} alt={selectedProduct?.title || "Product"} className="product-modal-img" />
          </div>
          <div className="product-modal-content">
            <button className="product-modal-close" onClick={() => setSelectedProduct(null)}>
              <X size={28} />
            </button>
            <h3 className="product-modal-title">{selectedProduct?.title}</h3>
            <p className="product-modal-desc">{selectedProduct?.desc}</p>
            <div style={{ marginBottom: "1.5rem" }}>
              <h4 style={{ color: "var(--accent)", marginBottom: "0.8rem", letterSpacing: "0.1em", fontSize: "0.9rem", fontFamily: "var(--font-heading)" }}>KEY SPECIFICATIONS</h4>
              <ul className="product-spec-list">
                <li>Ultimate Tensile Strength: 500 MPa</li>
                <li>Excellent Weldability and Bendability</li>
                <li>Earthquake Resistant Properties</li>
                <li>Advanced Rib Design for better bonding</li>
              </ul>
            </div>
            <div className="product-modal-actions">
              <button className="btn-get-quote" style={{ width: "100%", padding: "1rem", fontSize: "1rem", fontWeight: "700" }} onClick={() => { window.dispatchEvent(new CustomEvent('open-quote')); }}>
                REQUEST A QUOTE
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .products-grid { grid-template-columns: repeat(3, 1fr); }
        .product-grid-card:hover { transform: translateY(-10px); border-color: var(--accent); box-shadow: 0 20px 40px rgba(0,0,0,0.2), inset 0 0 20px rgba(227,24,45,0.05); }
        .product-grid-card:hover .product-img { transform: scale(1.1) translateY(-10px); }
        .product-grid-card:hover .product-glow { opacity: 1; }
        .product-grid-card .carousel-actions { opacity: 1 !important; transform: translateY(0) !important; pointer-events: all !important; margin-top: 2rem !important; }
        body.light-mode .product-grid-card { background: rgba(255, 255, 255, 0.8) !important; border-color: rgba(0,0,0,0.1) !important; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
        body.light-mode .product-grid-card:hover { border-color: var(--accent) !important; box-shadow: 0 20px 40px rgba(0,0,0,0.1), inset 0 0 20px rgba(227,24,45,0.05) !important; }
        @media (max-width: 1200px) { .products-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 768px) { .products-grid { grid-template-columns: 1fr !important; } .products-page { padding-top: 100px !important; } }
      `}</style>
    </div>
  );
};

export default ProductsPage;
