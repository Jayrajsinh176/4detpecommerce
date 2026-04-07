import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { Package, Calendar, IndianRupee, ShoppingBag } from "lucide-react";

function OrderPage() {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) return;

    api.get(`/orders/${user.id}`)
      .then(res => setOrders(res.data))
      .catch(err => console.log(err));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const statusConfig = {
    pending: {
      color: "bg-yellow-50 text-yellow-700 border-yellow-200",
      dotColor: "bg-yellow-500"
    },
    processing: {
      color: "bg-blue-50 text-blue-700 border-blue-200",
      dotColor: "bg-blue-500"
    },
    dispatched: {
      color: "bg-purple-50 text-purple-700 border-purple-200",
      dotColor: "bg-purple-500"
    },
    delivered: {
      color: "bg-green-50 text-green-700 border-green-200",
      dotColor: "bg-green-500"
    },
    cancelled: {
      color: "bg-red-50 text-red-700 border-red-200",
      dotColor: "bg-red-500"
    }
  };

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };

  const handleCancelOrder = (orderId) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      api.put(`/orders/${orderId}/cancel`)
        .then(res => {
          api.get(`/orders/${user.id}`)
            .then(res => setOrders(res.data))
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    }
  };

  const handleWriteReview = (productId) => {
    window.location.href = `/product/${productId}#review`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-600 rounded-lg">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          </div>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No orders yet
            </h3>
            <p className="text-gray-500 mb-6">
              Looks like you haven't placed any orders
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="p-5 sm:p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <img
                    src={order.image}
                        alt={order.product_name}
                        className="w-full sm:w-28 sm:h-28 h-48 rounded-xl object-cover border border-gray-200"
                      />
                    </div>

                    {/* Order Details */}
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 text-lg mb-2">
                            {order.product_name}
                          </h3>
                          
                          {/* Status Badge */}
                          <span 
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border capitalize ${statusConfig[order.status]?.color || 'bg-gray-100 text-gray-700'}`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${statusConfig[order.status]?.dotColor}`}></span>
                            {order.status}
                          </span>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-2xl font-bold text-gray-900">
                            <IndianRupee className="w-5 h-5" />
                            {order.total_amount?.toLocaleString('en-IN')}
                          </div>
                        </div>
                      </div>

                      {/* Order Meta */}
                      <div className="flex flex-wrap items-center gap-6 mt-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4 text-gray-400" />
                          <span>Qty: <span className="font-medium text-gray-900">{order.quantity}</span></span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span>{formatDate(order.created_at)}</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 mt-4">
                        {order.status === 'pending' && (
                          <button 
                            onClick={() => handleCancelOrder(order.id)}
                            className="text-sm text-red-600 hover:text-red-700 font-medium"
                          >
                            Cancel Order
                          </button>
                        )}
                        
                        {order.status === 'delivered' && (
                          <button 
                            onClick={() => handleWriteReview(order.product_id)}
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                          >
                            Write a Review
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderPage;