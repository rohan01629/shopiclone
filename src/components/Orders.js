import React from 'react';

const Orders = ({ orders }) => {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">My Orders</h2>
      {orders.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No orders placed yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="border-t pt-4 mb-4">
            <h3 className="text-lg font-bold mb-2 text-gray-700 dark:text-white">
              Order #{order.id}
            </h3>
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                <span>{item.title} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
