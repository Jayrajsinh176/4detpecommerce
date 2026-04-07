import React, { useState, useEffect } from "react";
import { FaHeart, FaFire, FaShoppingBag } from "react-icons/fa";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const isValid = (val) => {
  if (val === null || val === undefined) return false;
  const num = parseFloat(String(val).replace(/,/g, ""));
  return !isNaN(num) && num > 0;
};

const toNum = (val) => parseFloat(String(val).replace(/,/g, "")) || 0;

function HomeViral() {
  const [viralProducts, setViralProducts] = useState([]);
  const [wishlist, setWishlist] = useState({});
  const navigate = useNavigate();

  const handleWishlist = (id) => {
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    api
      .get("/viral-products")
      .then((res) => setViralProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleAddToBag = (item) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) { alert("Please login first"); return; }
    api
      .post("/add-to-cart", { member_id: user.id, product_id: item.id, quantity: 1 })
      .then(() => navigate("/checkout"))
      .catch((err) => { console.error(err); alert("Error adding to cart"); });
  };

  return (
    <section className="bg-white py-10 px-4 sm:px-6 lg:px-10">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@400;500;600&display=swap');

        .viral-section { font-family: 'DM Sans', sans-serif; }
        .viral-title { font-family: 'Playfair Display', serif; }

        .product-card {
          background: #fff;
          border: 1px solid #f0f0f0;
          border-radius: 14px;
          overflow: hidden;
          transition: box-shadow 0.28s ease, transform 0.28s ease;
          position: relative;
        }
        .product-card:hover {
          box-shadow: 0 12px 36px rgba(0,0,0,0.10);
          transform: translateY(-4px);
        }

        .img-wrapper {
          position: relative;
          overflow: hidden;
          background: #f8f8f8;
        }
        .img-wrapper img {
          transition: transform 0.4s ease;
          width: 100%;
          object-fit: contain;
        }
        .product-card:hover .img-wrapper img { transform: scale(1.06); }

        .badge-hot {
          position: absolute;
          top: 10px; left: 10px;
          background: #111; color: #fff;
          font-size: 10px; font-weight: 600;
          letter-spacing: 0.04em;
          padding: 3px 8px;
          border-radius: 20px;
          display: flex; align-items: center; gap: 4px;
          text-transform: uppercase;
        }

        .wishlist-btn {
          position: absolute; top: 10px; right: 10px;
          width: 32px; height: 32px; border-radius: 50%;
          background: #fff;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.10);
          cursor: pointer; border: none;
          transition: transform 0.2s ease;
        }
        .wishlist-btn:hover { transform: scale(1.15); }
        .wishlist-btn.active { background: #fff0f0; }

        .card-body { padding: 14px 14px 16px; }

        .brand-tag {
          font-size: 11px; font-weight: 600; color: #aaa;
          text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 4px;
        }

        .product-name {
          font-size: 14px; font-weight: 500; color: #1a1a1a;
          line-height: 1.4;
          display: -webkit-box; -webkit-line-clamp: 2;
          -webkit-box-orient: vertical; overflow: hidden; min-height: 40px;
        }

        .price-row {
          display: flex; align-items: baseline; gap: 6px; margin-bottom: 12px;
        }
        .price-main {
          font-size: 20px; font-weight: 700; color: #111;
          font-family: 'DM Sans', sans-serif;
        }
        .price-label { font-size: 11px; color: #aaa; font-weight: 400; }

        .add-btn {
          width: 100%; background: #111; color: #fff; border: none;
          border-radius: 8px; padding: 10px 0;
          font-size: 13px; font-weight: 600; letter-spacing: 0.02em;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 7px;
          transition: background 0.2s ease, transform 0.15s ease;
          opacity: 1; transform: translateY(0);
        }
        @media (min-width: 640px) {
          .add-btn { opacity: 0; transform: translateY(6px); }
          .product-card:hover .add-btn { opacity: 1; transform: translateY(0); }
        }
        .add-btn:hover { background: #333; }
        .add-btn:active { transform: scale(0.97); }

        .section-header { display: flex; align-items: center; gap: 12px; margin-bottom: 28px; }
        .section-line { flex: 1; background: linear-gradient(to right, #e5e5e5, transparent); }
      `}</style>

      <div className="max-w-screen-xl mx-auto viral-section">

        {/* Section header */}
        <div className="section-header">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
              🔥 Trending Now
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Top Selling Products
            </h2>
          </div>
          <div className="section-line hidden sm:block" />
          <button
            onClick={() => navigate("/allproduct")}
            className="hidden sm:inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-gray-700 border border-gray-200 rounded-full px-4 py-2 hover:border-gray-800 hover:text-gray-900 transition-all"
          >
            View All →
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {viralProducts.map((item, index) => {
            const offerValid    = isValid(item.offer_price);
            const discountValid = isValid(item.discount_percentage);
            const displayPrice  = offerValid ? toNum(item.offer_price) : toNum(item.price);

            return (
              <div key={index} className="product-card">

                {/* Image */}
                <div
                  className="img-wrapper"
                  style={{ height: "clamp(160px, 22vw, 240px)" }}
                  onClick={() => navigate(`/product/${item.id}`)}
                >
                  <img src={item.image} alt={item.name} style={{ height: "100%" }} />

                  {index < 4 && (
                    <span className="badge-hot">
                      <FaFire style={{ fontSize: 9 }} /> Hot
                    </span>
                  )}

                  <button
                    className={`wishlist-btn ${wishlist[item.id] ? "active" : ""}`}
                    onClick={(e) => { e.stopPropagation(); handleWishlist(item.id); }}
                  >
                    <FaHeart style={{ fontSize: 13, color: wishlist[item.id] ? "#e53e3e" : "#ccc", transition: "color 0.2s" }} />
                  </button>
                </div>

                {/* Body */}
                <div className="card-body">
                  <p className="brand-tag">{item.brand}</p>

                  {/* Name + Discount badge */}
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 6, marginBottom: 8 }}>
                    <p className="product-name" onClick={() => navigate(`/product/${item.id}`)}>
                      {item.name}
                    </p>
                    {discountValid && (
                      <span style={{
                        flexShrink: 0, fontSize: 13, fontWeight: 700,
                        background: "#e8f5e9", color: "#2e7d32",
                        borderRadius: 6, padding: "3px 7px",
                        lineHeight: 1.4, marginTop: 2,
                      }}>
                        {toNum(item.discount_percentage)}% off
                      </span>
                    )}
                  </div>

                  {/* Price row */}
                  <div className="price-row">
                    <span className="price-main">₹{displayPrice}</span>
                    {offerValid && (
                      <span style={{ fontSize: 13, color: "#aaa", textDecoration: "line-through", fontWeight: 400 }}>
                        ₹{toNum(item.price)}
                      </span>
                    )}
                    <span className="price-label">incl. taxes</span>
                  </div>

                  <button className="add-btn" onClick={() => handleAddToBag(item)}>
                    <FaShoppingBag style={{ fontSize: 12 }} />
                    Add to Bag
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Mobile view all */}
        <div className="mt-8 text-center sm:hidden">
          <button
            onClick={() => navigate("/allproduct")}
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-800 border border-gray-800 rounded-full px-6 py-2.5 hover:bg-gray-800 hover:text-white transition-all"
          >
            View All Products →
          </button>
        </div>

      </div>
    </section>
  );
}

export default HomeViral;