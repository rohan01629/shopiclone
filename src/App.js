import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import CartItem from './components/CartItem';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [products, setProducts] = useState([]);

  // 🛒 Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://fakestoreapi.com/products');
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Failed to load products');
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

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Navbar
        cartCount={cart.length}
        onCartClick={() => setIsCartOpen(!isCartOpen)}
        onCategoryChange={(category) => setSelectedCategory(category)}
      />
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />

      <main className="p-6">
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

        {orders.length > 0 && (
          <div className="mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">My Orders</h2>
            {orders.map((order) => (
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
            ))}
          </div>
        )}

        <ProductList
          products={products}
          category={selectedCategory}
          onAddToCart={handleAddToCart}
        />
      </main>
    </div>
  );
}

export default App;
