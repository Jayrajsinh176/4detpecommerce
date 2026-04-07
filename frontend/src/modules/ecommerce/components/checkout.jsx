import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { FaTrash } from "react-icons/fa";

function Checkout() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const memberId = user?.id;

  // ✅ Fetch cart from DB
  useEffect(() => {
    if (!user) return;

    api.get(`/cart/${user.id}`)
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  // ✅ Delete item
  const handleDelete = (id) => {
    api.delete(`/cart/${id}`)
      .then(() => {
        setProducts(products.filter(item => item.id !== id));
      })
      .catch(err => console.log(err));
  };

  // ✅ Update quantity
  const updateQty = (id, newQty) => {
    if (newQty < 1) return;

    api.put(`/cart/${id}`, { quantity: newQty })
      .then(() => {
        setProducts(products.map(item =>
          item.id === id ? { ...item, quantity: newQty } : item
        ));
      })
      .catch(err => console.log(err));
  };

  // ✅ Price calculation
  const totalMrp = products.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const discount = 0;
  const total = totalMrp - discount;

  // ✅ Checkout
 const handleCheckout = () => {
  if (!memberId) {
    alert("Please login first");
    return;
  }

  // ✅ Store cart data temporarily
  localStorage.setItem("checkoutItems", JSON.stringify(products));

  // ✅ Just navigate (NO ORDER SAVE)
  navigate("/checkoutfinal");
};

  // ✅ Empty cart
  if (products.length === 0) {
    return (
      <div className="px-4 sm:px-6 md:px-10 py-10 mt-10 text-center text-gray-600">
        <p className="text-base sm:text-lg font-semibold">
          Your cart is currently empty
        </p>
      </div>
    );
  }

  return (
    <>
    <style>{`
      .cart-scroll::-webkit-scrollbar { width: 4px; }
      .cart-scroll::-webkit-scrollbar-track { background: transparent; }
      .cart-scroll::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 99px; }
      .cart-scroll::-webkit-scrollbar-thumb:hover { background: #d1d5db; }
    `}</style>
    <div className="bg-white p-4 sm:p-6 min-h-screen">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 items-start mt-6 sm:mt-10">

        {/* LEFT SIDE */}
        <div className="w-full lg:flex-1 bg-white rounded-2xl shadow-md p-4 sm:p-6 border border-gray-100">
          <h2 className="text-xl font-bold mb-5 text-gray-800 tracking-tight">
            My Bag{" "}
            <span className="text-gray-400 text-sm font-normal">
              ({products.length} items)
            </span>
          </h2>

          <div className="cart-scroll flex flex-col divide-y divide-gray-100 overflow-y-auto max-h-[480px] pr-1">
            {products.map((item) => (
              <div key={item.id} className="py-4 first:pt-0 last:pb-0">
                <div className="flex gap-3 sm:gap-5">

                  {/* IMAGE */}
                  <img
                    src={item.product.image}
                    alt="product"
                    className="w-20 h-20 sm:w-28 sm:h-28 rounded-xl object-cover border border-gray-100 shadow-sm"
                  />

                  {/* CONTENT */}
                  <div className="flex-1 flex justify-between items-start">

                    <div>
                      <p className="text-xs sm:text-sm text-gray-400 font-medium tracking-wide uppercase">
                        {item.product.brand}
                      </p>

                      <h3 className="font-semibold text-sm sm:text-base text-gray-800 mt-0.5">
                        {item.product.name}
                      </h3>

                      {/* Quantity */}
                      <div className="flex items-center gap-2 mt-3 mb-2">
                        <button
                          onClick={() => updateQty(item.id, item.quantity - 1)}
                          className="w-7 h-7 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold transition-colors"
                        >
                          −
                        </button>

                        <span className="font-semibold text-sm w-5 text-center text-gray-800">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => updateQty(item.id, item.quantity + 1)}
                          className="w-7 h-7 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold transition-colors"
                        >
                          +
                        </button>
                      </div>

                      <p className="text-sm font-bold text-gray-900">
                        ₹{item.product.price * item.quantity}
                      </p>
                    </div>

                    {/* DELETE */}
                    <button className="p-2 rounded-lg hover:bg-red-50 transition-colors group">
                      <FaTrash
                        onClick={() => handleDelete(item.id)}
                        className="text-gray-300 group-hover:text-red-400 text-sm cursor-pointer transition-colors"
                      />
                    </button>

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full lg:w-80 bg-white rounded-2xl shadow-md p-4 sm:p-6 border border-gray-100 sticky top-6">
          <h4 className="font-bold mb-4 text-gray-800 text-base tracking-tight">Price Details</h4>

          <div className="text-sm text-gray-600 space-y-3">
            <div className="flex justify-between">
              <span className="font-medium">Total MRP</span>
              <span className="font-semibold text-gray-800">₹{totalMrp}</span>
            </div>

            <div className="flex justify-between text-green-600">
              <span className="font-medium">Discount</span>
              <span className="font-semibold">-₹{discount}</span>
            </div>
          </div>

          <hr className="my-4 border-gray-100" />

          <div className="flex justify-between font-bold text-lg text-gray-900">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button
            className="w-full bg-gray-900 hover:bg-gray-800 active:scale-[0.98] text-white py-3.5 rounded-xl mt-5 font-semibold text-sm tracking-wide transition-all duration-150 shadow-lg shadow-gray-900/20"
            onClick={handleCheckout}
          >
            Checkout
          </button>

          <p className="text-center text-xs text-gray-400 mt-3">🔒 Secure & encrypted payment</p>
        </div>

      </div>
    </div>
    </>
  );
}

export default Checkout;