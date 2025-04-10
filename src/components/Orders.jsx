import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase"; // Import your Firebase authentication object
import { signOut } from "firebase/auth";

const Orders = ({ orders, setOrders }) => {
  const navigate = useNavigate();

  // Handle user logout and clear orders
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Clear orders when the user logs out
        setOrders([]); // Assuming setOrders is passed as a prop to update the state

        // Optionally, remove orders from localStorage if they're stored there
        localStorage.removeItem("orders"); // Clear orders from local storage (if used)

        navigate("/login"); // Navigate to login page after logging out
      })
      .catch((error) => {
        console.error("Error during logout: ", error);
      });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Your Orders</h2>

      {/* Logout button */}
      <button
        onClick={handleLogout}
        className="mt-4 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
      >
        Log Out
      </button>

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
