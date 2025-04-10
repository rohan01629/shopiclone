// src/components/Navbar.jsx
import React, { useState, useContext } from "react"; // Added useContext import
import { Link } from "react-router-dom";
import { CartContext } from "../context/cartContext.jsx";

const Navbar = ({ onSearch }) => { // onSearch function passed as a prop
  const { cartItems } = useContext(CartContext); // Using useContext to get cartItems
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State to handle search query

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value); // Call the onSearch function passed from the parent (App.js)
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Left section: Logo + links */}
        <div className="flex items-center space-x-10">
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="text-2xl font-semibold dark:text-white">E-Shop</span>
          </Link>

          <ul className="hidden md:flex space-x-6 font-medium">
            <li><Link to="/" className="text-blue-700 dark:text-blue-500 hover:underline">All</Link></li>
            <li><Link to="/clothes" className="text-gray-900 dark:text-white hover:underline">Men's</Link></li>
            <li><Link to="/Electronics" className="text-gray-900 dark:text-white hover:underline">Electronics</Link></li>
            <li><Link to="/jewelery" className="text-gray-900 dark:text-white hover:underline">Jewelery</Link></li>
            <li><Link to="/Women's Clothing" className="text-gray-900 dark:text-white hover:underline">Women's Clothing</Link></li>
          </ul>
        </div>

        {/* Search bar */}
        <div className="flex items-center w-1/3">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search products..."
            className="w-full py-2 px-4 text-sm border border-gray-300 dark:bg-gray-700 dark:text-white rounded-lg"
          />
        </div>

        {/* Right section */}
        <ul className="hidden md:flex space-x-6 font-medium items-center">
          <li><Link to="/cart" className="text-gray-900 dark:text-white hover:underline">Cart ({cartItems.length})</Link></li>
          <li><Link to="/login" className="text-gray-900 dark:text-white hover:underline">Login</Link></li>
          <li><Link to="/signup" className="text-gray-900 dark:text-white hover:underline">Signup</Link></li>
        </ul>
      </div>

      {/* Mobile dropdown menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pb-4">
          <ul className="space-y-2 font-medium">
            <li><Link to="/" className="block text-blue-700">All</Link></li>
            <li><Link to="/clothes" className="block text-gray-900 dark:text-white">Men's</Link></li>
            <li><Link to="/Electronics" className="block text-gray-900 dark:text-white">Electronics</Link></li>
            <li><Link to="/jewelery" className="block text-gray-900 dark:text-white">Jewelery</Link></li>
            <li><Link to="/Women's Clothing" className="block text-gray-900 dark:text-white">Women's Clothing</Link></li>
            <li><Link to="/cart" className="block text-gray-900 dark:text-white">Cart ({cartItems.length})</Link></li>
            <li><Link to="/login" className="block text-gray-900 dark:text-white">Login</Link></li>
            <li><Link to="/signup" className="block text-gray-900 dark:text-white">Signup</Link></li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
