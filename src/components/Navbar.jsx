import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import Sidebar from "./Sidebar";

const Navbar = ({ onSearch, cartCount, ordersCount, user, onLogout, setSelectedCategory }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-4">
            <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Shopi Logo" />
            <span className="text-2xl font-semibold dark:text-white">Shopi</span>
          </Link>
          <ul className="hidden md:flex space-x-6 font-medium">
            <li><Link to="/" onClick={() => handleCategoryClick("all")} className="text-blue-700 dark:text-blue-500 hover:underline">All</Link></li>
            <li><Link to="/clothes" onClick={() => handleCategoryClick("men's clothing")} className="text-gray-900 dark:text-white hover:underline">Men's</Link></li>
            <li><Link to="/electronics" onClick={() => handleCategoryClick("electronics")} className="text-gray-900 dark:text-white hover:underline">Electronics</Link></li>
            <li><Link to="/jewelery" onClick={() => handleCategoryClick("jewelery")} className="text-gray-900 dark:text-white hover:underline">Jewelry</Link></li>
            <li><Link to="/womens-clothing" onClick={() => handleCategoryClick("women's clothing")} className="text-gray-900 dark:text-white hover:underline">Women's</Link></li>
          </ul>
        </div>

        <div className="flex items-center w-1/3 ml-10 mr-10">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search products..."
            className="w-full py-2 px-4 text-sm border border-gray-300 dark:bg-gray-700 dark:text-white rounded-lg"
          />
        </div>

        <ul className="hidden md:flex space-x-4 font-medium items-center ml-auto">
          <li><Link to="/orders" className="text-gray-900 dark:text-white hover:underline">Orders ({ordersCount})</Link></li>
          <li><Link to="/cart" className="text-gray-900 dark:text-white hover:underline">Cart ({cartCount})</Link></li>
          {user ? (
            <li className="cursor-pointer" onClick={toggleSidebar}>
              <FaUserCircle className="text-2xl text-gray-900 dark:text-white" />
            </li>
          ) : (
            <>
              <li><Link to="/login" className="text-gray-900 dark:text-white hover:underline">Login</Link></li>
              <li><Link to="/signup" className="text-gray-900 dark:text-white hover:underline">Signup</Link></li>
            </>
          )}
        </ul>

        <button className="md:hidden text-gray-500 dark:text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden flex flex-col space-y-4 p-4 bg-white dark:bg-gray-800">
          <Link to="/" onClick={() => handleCategoryClick("all")} className="text-gray-900 dark:text-white hover:underline">All</Link>
          <Link to="/clothes" onClick={() => handleCategoryClick("men's clothing")} className="text-gray-900 dark:text-white hover:underline">Men's</Link>
          <Link to="/electronics" onClick={() => handleCategoryClick("electronics")} className="text-gray-900 dark:text-white hover:underline">Electronics</Link>
          <Link to="/jewelery" onClick={() => handleCategoryClick("jewelery")} className="text-gray-900 dark:text-white hover:underline">Jewelry</Link>
          <Link to="/womens-clothing" onClick={() => handleCategoryClick("women's clothing")} className="text-gray-900 dark:text-white hover:underline">Women's</Link>
          <Link to="/orders" className="text-gray-900 dark:text-white hover:underline">Orders ({ordersCount})</Link>
          <Link to="/cart" className="text-gray-900 dark:text-white hover:underline">Cart ({cartCount})</Link>
          {user ? (
            <button onClick={onLogout} className="text-gray-900 dark:text-white hover:underline">Logout</button>
          ) : (
            <>
              <Link to="/login" className="text-gray-900 dark:text-white hover:underline">Login</Link>
              <Link to="/signup" className="text-gray-900 dark:text-white hover:underline">Signup</Link>
            </>
          )}
        </div>
      )}

      {isSidebarOpen && user && (
        <Sidebar userInfo={user} onLogout={onLogout} closeSidebar={closeSidebar} />
      )}
    </nav>
  );
};

export default Navbar;
