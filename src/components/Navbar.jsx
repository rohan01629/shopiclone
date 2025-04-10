import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/cartContext.jsx";

const Navbar = () => {
  const { cartItems } = useContext(CartContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
            <li><Link to="/clothes" className="text-gray-900 dark:text-white hover:underline">Clothes</Link></li>
            <li><Link to="/Electronics" className="text-gray-900 dark:text-white hover:underline">Electronics</Link></li>
            <li><Link to="/Furniture" className="text-gray-900 dark:text-white hover:underline">Furniture</Link></li>
            <li><Link to="/Toys" className="text-gray-900 dark:text-white hover:underline">Toys</Link></li>
          </ul>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="mobile-menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
          </button>
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
            <li><Link to="/clothes" className="block text-gray-900 dark:text-white">Clothes</Link></li>
            <li><Link to="/Electronics" className="block text-gray-900 dark:text-white">Electronics</Link></li>
            <li><Link to="/Furniture" className="block text-gray-900 dark:text-white">Furniture</Link></li>
            <li><Link to="/Toys" className="block text-gray-900 dark:text-white">Toys</Link></li>
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
