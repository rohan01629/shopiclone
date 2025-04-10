import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import CartItem from "./components/CartItem";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Store the search query

  useEffect(() => {
    // Fetch product data from API
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        toast.success(`Increased quantity of ${product.title}`);
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        toast.success(`${product.title} added to cart`);
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    setIsCartOpen(true);
  };

  const handleIncrease = (id) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
    );
  };

  const handleDecrease = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveFromCart = (id) => {
    const removedItem = cart.find((item) => item.id === id);
    toast.info(`${removedItem?.title} removed from cart`);
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setOrders((prevOrders) => [...prevOrders, { id: Date.now(), items: cart }]);
    setCart([]);
    toast.success("Order placed!");
    setIsCartOpen(false);
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // Handle search query
  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  // Filter products based on category and search query
  const filteredProducts = products.filter((product) => {
    if (searchQuery && !product.title.toLowerCase().includes(searchQuery)) {
      return false;
    }
    return true;
  });

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Navbar cartCount={cart.length} onSearch={handleSearch} />
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
      <main className="p-6">
        {/* Cart Drawer */}
        {isCartOpen && (
          <div className="fixed top-0 right-0 w-full sm:w-96 h-full bg-white dark:bg-gray-800 shadow-lg z-50 overflow-y-auto transition-transform transform translate-x-0">
            <div className="p-6 flex justify-between items-center border-b dark:border-gray-700">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Your Cart</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-gray-500 hover:text-gray-800 dark:hover:text-white">&times;</button>
            </div>
            <div className="p-6">
              {cart.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400">Your cart is empty.</p>
              ) : (
                <>
                  {cart.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onRemoveFromCart={handleRemoveFromCart}
                      onIncrease={handleIncrease}
                      onDecrease={handleDecrease}
                    />
                  ))}
                  <div className="flex justify-between mt-4 border-t pt-4">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">Total:</span>
                    <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      ${cartTotal.toFixed(2)}
                    </span>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="w-full mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Checkout
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Routes for filtered product views */}
        <Routes>
          <Route
            path="/"
            element={<ProductList products={filteredProducts} onAddToCart={handleAddToCart} />}
          />
          <Route
            path="/clothes"
            element={<ProductList products={filteredProducts.filter((product) => product.category === "men's clothing")} onAddToCart={handleAddToCart} />}
          />
          <Route
            path="/electronics"
            element={<ProductList products={filteredProducts.filter((product) => product.category === "electronics")} onAddToCart={handleAddToCart} />}
          />
          <Route
            path="/jewelery"
            element={<ProductList products={filteredProducts.filter((product) => product.category === "jewelery")} onAddToCart={handleAddToCart} />}
          />
          <Route
            path="/women's clothing"
            element={<ProductList products={filteredProducts.filter((product) => product.category === "women's clothing")} onAddToCart={handleAddToCart} />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
