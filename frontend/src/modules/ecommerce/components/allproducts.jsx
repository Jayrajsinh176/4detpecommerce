import React, { useState, useEffect } from "react";
import { FaStar, FaHeart } from "react-icons/fa";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function AllProducts() {
  const [Products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [wishlist, setWishlist] = useState({});
  const navigate = useNavigate();

  const toggleWishlist = (id) =>
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));

  useEffect(() => {
    api.get("/products")
      .then((res) => {
        console.log("PRODUCTS SAMPLE:", res.data[0]); // 👈 check field names
        setProducts(res.data);
      })
      .catch((err) => console.log(err));

    api.get("/categories")
      .then((res) => {
        console.log("CATEGORIES SAMPLE:", res.data[0]); // 👈 check field names
        setCategories(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleAddToBag = (item) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) { alert("Please login first"); return; }

    api.post("/add-to-cart", {
      member_id: user.id,
      product_id: item.id,
      quantity: 1,
    })
      .then(() => { alert("Added to cart"); navigate("/checkout"); })
      .catch((err) => { console.error(err); alert("Error adding to cart"); });
  };

  // Filter products by category_id — adjust field names after checking console
  const filteredProducts = activeCategory === "All"
    ? Products
    : Products.filter((p) => p.category_id === activeCategory);

  return (
    <div className="min-h-screen bg-white px-3 sm:px-4 md:px-6 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="section-wrapper mt-8 sm:mt-10">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
            Products
          </h2>

         
          {/* Category Filter Buttons */}
<div className="flex flex-wrap gap-2 mb-6">
  <button
    onClick={() => setActiveCategory("All")}
    className={`px-4 py-1.5 text-xs sm:text-sm font-medium rounded-full border transition-all duration-200
      ${activeCategory === "All"
        ? "bg-black text-white border-black shadow-md scale-105"
        : "bg-gray-100 text-gray-600 border-gray-100 hover:bg-gray-200 hover:text-black"
      }`}
  >
    All
  </button>

  {categories.map((cat) => (
    <button
      key={cat.id}
      onClick={() => setActiveCategory(cat.id)}
      className={`px-4 py-1.5 text-xs sm:text-sm font-medium rounded-full border transition-all duration-200
        ${activeCategory === cat.id
          ? "bg-black text-white border-black shadow-md scale-105"
          : "bg-gray-100 text-gray-600 border-gray-100 hover:bg-gray-200 hover:text-black"
        }`}
    >
      {cat.name}
    </button>
  ))}
</div>
          {/* 5 Column Responsive Grid */}
          <div className="px-0 sm:px-4 md:px-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5 md:gap-6">
            {filteredProducts.map((item, index) => {
              const hasDiscount = item?.offer_price && item?.discount_percentage;

              return (
                <div key={index} className="flex flex-col group cursor-pointer">

                  {/* Image */}
                  <div className="relative rounded overflow-hidden bg-white">
                    <img
                      src={item.image}
                      alt="Product"
                      onClick={() => navigate(`/product/${item.id}`)}
                      className="w-full h-32 sm:h-36 md:h-40 object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                    <FaHeart
                      className="absolute top-2 right-2 text-xs sm:text-sm cursor-pointer transition-colors duration-200"
                      style={{ color: wishlist[item.id] ? "#e53e3e" : "#d1d5db" }}
                      onClick={() => toggleWishlist(item.id)}
                    />
                  </div>

                  {/* Content */}
                  <div className="mt-2 sm:mt-3">
                    <p className="text-xs sm:text-sm font-medium text-gray-400">
                      {item.brand}
                    </p>

                    {/* Name + Discount badge */}
                    <div className="flex items-start justify-between gap-1 mb-1 sm:mb-2">
                      <p className="text-xs sm:text-sm text-gray-700 font-semibold leading-tight line-clamp-2">
                        {item.name}
                      </p>
                      {hasDiscount && (
                        <span style={{
                          flexShrink: 0,
                          fontSize: 11,
                          fontWeight: 700,
                          background: "#e8f5e9",
                          color: "#2e7d32",
                          borderRadius: 4,
                          padding: "2px 5px",
                          lineHeight: 1.4,
                          marginTop: 1,
                        }}>
                          {item.discount_percentage}% off
                        </span>
                      )}
                    </div>

                    {/* Price row */}
                    <div className="flex items-baseline gap-1.5 flex-wrap">
                      <span className="text-xs sm:text-sm font-semibold text-gray-800">
                        ₹{hasDiscount ? item.offer_price : item.price}
                      </span>
                      {hasDiscount && (
                        <span className="text-xs text-gray-400 line-through font-normal">
                          ₹{item.price}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Button */}
                  <button
                    className="mt-2 sm:mt-3 bg-black text-white text-xs sm:text-sm py-1.5 sm:py-2 rounded
                      opacity-100 sm:opacity-0 translate-y-0 sm:translate-y-2
                      sm:group-hover:opacity-100 sm:group-hover:translate-y-0
                      transition-all duration-300"
                    onClick={() => handleAddToBag(item)}
                  >
                    Add to Bag
                  </button>

                </div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
}

export default AllProducts;