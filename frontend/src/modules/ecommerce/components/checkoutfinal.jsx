import React, { useEffect, useState } from "react";
import { BiSolidCoupon } from "react-icons/bi";
import api from "../api/axios";

function CheckoutFinal() {
  const [orders, setOrders] = useState([]);



  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("checkoutItems")) || [];
    setOrders(data);
  }, []);

  // Calculate total of all products
 const mrp = orders.reduce(
  (sum, item) =>
    sum + (item.product?.price || 0) * (item.quantity || 0),
  0
);
  const discount = 0;
  const total = mrp - discount;

  const handlePlaceOrder = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const checkoutItems = JSON.parse(localStorage.getItem("checkoutItems")) || [];

    if (!user) {
      alert("Please login first");
      return;
    }

    try {
      for (let item of checkoutItems) {
        await api.post("/place-order", {
          member_id: user.id,
          product_name: item.product.name,
          quantity: item.quantity,
          total_amount: item.product.price * item.quantity,
          image: item.product.image,
        });
      }

      alert("Order placed successfully");

      // ✅ clear cart
      await api.delete(`/clear-cart/${user.id}`);

      // ✅ clear temp storage
      localStorage.removeItem("checkoutItems");

      // ✅ go to order history
      window.location.href = "/";

    } catch (error) {
      console.error(error);
      alert("Error placing order");
    }
  };
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <style>{`
        .cf-scroll::-webkit-scrollbar { width: 4px; }
        .cf-scroll::-webkit-scrollbar-track { background: transparent; }
        .cf-scroll::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 99px; }
        .cf-scroll::-webkit-scrollbar-thumb:hover { background: #d1d5db; }
      `}</style>

      <div className="bg-white p-3 sm:p-6 min-h-screen">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 items-start mt-4 sm:mt-10">

          {/* LEFT SIDE */}
          <div className="w-full lg:flex-1 bg-white rounded-2xl shadow-md border border-gray-100 p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-bold mb-4 text-gray-800 tracking-tight">
              Address
            </h2>

            <div className="mt-3">
              <h5 className="text-gray-800 font-semibold text-sm sm:text-base">
               {user?.fullname}
              </h5>

              <p className="text-xs sm:text-sm text-gray-600 font-medium mt-2">
                {user?.address}
              </p>

              <p className="text-xs sm:text-sm text-gray-400 font-medium mt-2">
                Mobile: {user?.mobile_no}
              </p>
            </div>

            <hr className="my-4 border-gray-100" />

            {/* SHOW ALL ORDERED PRODUCTS — scrollable after 3 */}
            <h2 className="text-base sm:text-lg font-bold mb-3 text-gray-800 tracking-tight">
              Order Items
            </h2>

            {orders.length === 0 ? (
              <p className="text-sm text-gray-500">No orders found</p>
            ) : (
              <div className="cf-scroll overflow-y-auto max-h-[288px] flex flex-col gap-3 pr-1">
                {orders.map((order, index) => (
                  <div key={index} className="flex items-center gap-3 bg-[#f7f4f0] rounded-xl p-3 border border-gray-100">
                    <img
                     src={order.product?.image}
                      alt="product"
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover shrink-0 border border-gray-100"
                    />

                    <div className="flex-1">
                      <h3 className="font-semibold text-sm sm:text-base text-gray-800">
                     {order.product?.name}
                      </h3>

                      <p className="text-xs text-gray-400 mt-1">
                      Qty: {order.quantity}
                      </p>

                      <p className="text-sm font-bold text-gray-900 mt-1">
                        ₹{(order.product?.price || 0) * (order.quantity || 0)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT SIDE */}
          <div className="w-full lg:w-80 bg-white rounded-2xl shadow-md border border-gray-100 p-4 sm:p-6 sticky top-6">
            <div>
              <div className="mb-4">
                <h3 className="font-bold text-gray-800 text-sm sm:text-base flex items-center gap-2">
                  <BiSolidCoupon className="text-lg sm:text-xl text-orange-400" />
                  Coupons & Bank Offers
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 font-medium mt-2">
                  Login to Apply Coupons & Bank Offers
                </p>
              </div>

              <hr className="my-4 border-gray-100" />

              <div className="mt-4">
                <h4 className="font-bold mb-3 text-gray-800 text-sm sm:text-base tracking-tight">
                  Price Details
                </h4>

                <div className="text-xs sm:text-sm text-gray-600 space-y-2">
                  <div className="flex justify-between font-medium">
                    <span>Total MRP</span>
                    <span className="font-semibold text-gray-800">₹{mrp}</span>
                  </div>

                  <p className="text-xs text-gray-400">
                    Inclusive of all taxes
                  </p>

                  <div className="flex justify-between text-green-600 font-semibold">
                    <span>Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                </div>

                <hr className="my-4 border-gray-100" />

                <div className="flex justify-between font-bold text-gray-900 text-sm sm:text-base">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  className="w-full bg-gray-900 hover:bg-gray-800 active:scale-[0.98] text-white py-3.5 rounded-xl mt-5 font-semibold text-sm tracking-wide transition-all duration-150 shadow-lg shadow-gray-900/20"
                >
                  Select Payment Method
                </button>

                <p className="text-center text-xs text-gray-400 mt-3">🔒 Secure & encrypted payment</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default CheckoutFinal;