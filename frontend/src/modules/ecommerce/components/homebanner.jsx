import React, { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

function HomeBanner() {
  const [current, setCurrent] = useState(0);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const images = [
    "/images/ecom/video1.mp4",
    "/images/ecom/Banner2.jpg",
    "/images/ecom/Banner.jpg",
  ];

  useEffect(() => {
    api.get("/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500;600;700&display=swap');

        .hb-wrap { font-family: 'DM Sans', sans-serif; }

        /* ── Promo bar ── */
        .promo-bar {
          background: #111;
          color: #fff;
          text-align: center;
          font-size: 13px;
          font-weight: 500;
          padding: 9px 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          letter-spacing: 0.01em;
        }
        .promo-code {
          background: #fff;
          color: #111;
          font-weight: 700;
          font-size: 12px;
          letter-spacing: 0.08em;
          padding: 2px 10px;
          border-radius: 4px;
        }

        /* ── Slider ── */
        .slider-outer {
          position: relative;
          width: 100%;
          overflow: hidden;
          background: #f0f0f0;
        }
        .slide-img {
          width: 100%;
          display: block;
          object-fit: cover;
          animation: fadeSlide 0.5s ease;
        }
        @keyframes fadeSlide {
          from { opacity: 0.6; transform: scale(1.01); }
          to   { opacity: 1;   transform: scale(1); }
        }
        .slider-arrow {
          position: absolute;
          top: 50%; transform: translateY(-50%);
          z-index: 10;
          width: 42px; height: 42px; border-radius: 50%;
          background: rgba(255,255,255,0.88);
          border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 2px 14px rgba(0,0,0,0.14);
          color: #111;
          transition: background 0.2s, transform 0.2s;
        }
        .slider-arrow:hover {
          background: #fff;
          transform: translateY(-50%) scale(1.08);
        }
        .slider-dots {
          position: absolute;
          bottom: 16px; left: 50%; transform: translateX(-50%);
          display: flex; gap: 7px; align-items: center;
        }
        .sdot {
          width: 8px; height: 8px; border-radius: 50%;
          border: none; cursor: pointer; padding: 0;
          background: rgba(255,255,255,0.45);
          transition: background 0.3s, transform 0.3s, width 0.3s;
        }
        .sdot.active {
          background: #fff;
          width: 22px;
          border-radius: 4px;
          transform: none;
        }

        /* ── Category cards — reference style ── */
        .cat-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        @media(max-width: 1024px) { .cat-grid { grid-template-columns: repeat(2,1fr); } }
        @media(max-width: 540px)  { .cat-grid { grid-template-columns: repeat(2,1fr); gap: 10px; } }

        .cat-card {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          background: #efefef;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: box-shadow 0.25s, transform 0.25s;
        }
        .cat-card:hover {
          box-shadow: 0 10px 30px rgba(0,0,0,0.12);
          transform: translateY(-2px);
        }
        .cat-card img {
          position: absolute;
          right: 0; bottom: 0;
          height: 100%;
          width: 55%;
          object-fit: cover;
          object-position: top center;
          display: block;
          transition: transform 0.4s ease;
        }
        .cat-card:hover img { transform: scale(1.05); }

        /* dark left overlay so text is readable */
        .cat-card::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(to right, rgba(255,255,255,0.96) 38%, rgba(255,255,255,0.0) 72%);
          z-index: 1;
        }

        .cat-content {
          position: relative;
          z-index: 2;
          padding: 22px 20px 20px;
          display: flex;
          flex-direction: column;
          height: 100%;
          justify-content: space-between;
        }
        .cat-top { margin-bottom: auto; }
        .cat-name {
          font-size: 17px;
          font-weight: 700;
          color: #111;
          line-height: 1.2;
          margin-bottom: 5px;
        }
        @media(max-width:640px){ .cat-name { font-size: 14px; } }
        .cat-count {
          font-size: 12px;
          color: #777;
          font-weight: 500;
        }
        .cat-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 18px;
          background: #111;
          color: #fff;
          font-size: 12px;
          font-weight: 600;
          padding: 8px 16px;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          letter-spacing: 0.02em;
          width: fit-content;
          transition: background 0.2s;
        }
        .cat-btn:hover { background: #333; }
        @media(max-width:640px){
          .cat-btn { font-size: 11px; padding: 7px 12px; margin-top: 12px; }
        }

        .section-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(22px, 3vw, 32px);
          font-weight: 700;
          color: #111;
          letter-spacing: -0.01em;
        }
      `}</style>

      <div className="hb-wrap bg-white">

        {/* ── Promo Bar ── */}
        <div className="promo-bar">
          🎉 Enjoy up to ₹2000 off. Use code:
          <span className="promo-code">BIGSALE26</span>
        </div>

        {/* ── Full-width Slider ── */}
        <div className="slider-outer">
         {images[current].endsWith(".mp4") ? (
  <video
    key={current}
    src={images[current]}
    className="slide-img"
    autoPlay
    muted
    loop
    playsInline
    style={{ height: 'clamp(180px, 44vw, 540px)' }}
  />
) : (
  <img
    key={current}
    src={images[current]}
    alt="Banner"
    className="slide-img"
    style={{ height: 'clamp(180px, 44vw, 540px)' }}
  />
)}

          

          <div className="slider-dots">
            {images.map((_, i) => (
              <button
                key={i}
                className={`sdot ${i === current ? "active" : ""}`}
                onClick={() => setCurrent(i)}
              />
            ))}
          </div>
        </div>

        {/* ── Categories ── */}
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-16">

          {/* Header */}
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
              ✦ Browse by
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Popular Categories</h2>
          </div>

          {/* Grid */}
          <div className="cat-grid">
            {categories.map((item) => (
              <div
                key={item.id}
                className="cat-card"
                style={{ minHeight: 'clamp(150px, 18vw, 210px)' }}
                onClick={() => navigate(`/category/${item.id}`)}
              >
                <img src={item.image} alt={item.name} />
                <div className="cat-content">
                  <div className="cat-top">
                    <p className="cat-name">{item.name}</p>
                    {item.product_count && (
                      <p className="cat-count">{item.product_count} Products</p>
                    )}
                  </div>
                  <button className="cat-btn" onClick={(e) => { e.stopPropagation(); navigate(`/category/${item.id}`); }}>
                    Shop Now
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </>
  );
}

export default HomeBanner;