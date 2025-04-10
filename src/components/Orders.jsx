// src/components/Orders.jsx
import React from "react";

const Orders = ({ orders }) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Your Orders</h2>
      {orders.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No orders yet.</p>
      ) : (
        <div className="mt-4 space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Order #{order.id}
              </h3>
              <ul className="mt-2">
                {order.items.map((item) => (
                  <li key={item.id} className="text-gray-700 dark:text-gray-300">
                    {item.title} - {item.quantity} x ${item.price}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
