import React from "react";
import { FaTimes } from "react-icons/fa"; // Import the close icon (X)

const Sidebar = ({ userInfo, onLogout, closeSidebar }) => {
  return (
    <div className="fixed top-0 right-0 w-64 h-full bg-gray-800 text-white p-6 shadow-lg z-50">
      {/* Close button in the top-right corner */}
      <button
        onClick={closeSidebar}
        className="absolute top-4 right-4 text-white text-2xl"
      >
        <FaTimes />
      </button>

      <h2 className="text-2xl font-semibold mb-4">User Info</h2>
      <div className="mb-6">
        <p className="text-sm">Name: {userInfo.name || "N/A"}</p>
        <p className="text-sm">Email: {userInfo.email}</p>
        <p className="text-sm">Phone: {userInfo.phone || "Not Provided"}</p>
      </div>
      <button
        onClick={onLogout}
        className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
