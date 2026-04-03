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

    const requests = products.map(item =>
      api.post("/place-order", {
        member_id: memberId,
        product_name: item.product.name,
        quantity: item.quantity,
        total_amount: item.product.price * item.quantity,
        image: item.product.image
      })
    );

    Promise.all(requests)
      .then(() => {
        // clear cart
        api.delete(`/clear-cart/${memberId}`);

        alert("Order Placed Successfully");
        navigate("/checkoutfinal");
      })
      .catch(err => console.log(err));
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
    <div className="bg-white p-4 sm:p-6">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 items-start mt-6 sm:mt-10">

        {/* LEFT SIDE */}
        <div className="w-full lg:flex-1 bg-gray-100 rounded shadow-sm p-4 sm:p-6">
          <h2 className="text-lg font-semibold mb-4">
            My Bag{" "}
            <span className="text-gray-500 text-sm">
              ({products.length} items)
            </span>
          </h2>

          {products.map((item) => (
            <div key={item.id} className="mt-3">
              <div className="flex gap-3 sm:gap-5">

                {/* IMAGE */}
                <img
                  src={item.product.image}
                  alt="product"
                  className="w-20 h-20 sm:w-28 sm:h-28 rounded object-cover"
                />

                {/* CONTENT */}
                <div className="flex-1 flex justify-between items-start">

                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">
                      {item.product.brand}
                    </p>

                    <h3 className="font-medium text-sm sm:text-base">
                      {item.product.name}
                    </h3>

                    {/* Quantity */}
                    <div className="flex items-center gap-2 mt-2 mb-2">
                      <button
                        onClick={() => updateQty(item.id, item.quantity - 1)}
                        className="w-6 h-6 border rounded"
                      >
                        −
                      </button>

                      <span className="font-semibold text-sm">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => updateQty(item.id, item.quantity + 1)}
                        className="w-6 h-6 border rounded"
                      >
                        +
                      </button>
                    </div>

                    <p className="text-sm font-semibold">
                      ₹{item.product.price * item.quantity}
                    </p>
                  </div>

                  {/* DELETE */}
                  <FaTrash
                    onClick={() => handleDelete(item.id)}
                    className="text-red-500 text-base cursor-pointer hover:scale-110 transition mt-1"
                  />

                </div>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full lg:w-80 bg-gray-100 rounded shadow-sm p-4 sm:p-6">
          <h4 className="font-semibold mb-3 text-gray-700">Price Details</h4>

          <div className="text-sm font-semibold text-gray-700 space-y-2">
            <div className="flex justify-between">
              <span>Total MRP</span>
              <span>₹{totalMrp}</span>
            </div>

            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>-₹{discount}</span>
            </div>
          </div>

          <hr className="my-4" />

          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button
            className="w-full bg-black text-white py-3 rounded mt-5"
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>

      </div>
    </div>
  );
}

export default Checkout;