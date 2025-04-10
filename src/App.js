import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Orders from "./components/Orders";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        // Optionally reset orders if no user is logged in
        setOrders([]);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
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
    if (!user) {
      toast.error("Please log in to add items to your cart.");
      navigate("/login");
      return;
    }

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
  };

  const handleCheckout = (items) => {
    setOrders((prevOrders) => [...prevOrders, { id: Date.now(), items }]);
    setCart([]); 
    toast.success("Order placed!");
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery);
    const matchesCategory =
      selectedCategory === "all" ||
      product.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const handleRemoveFromCart = (id) => {
    const removedItem = cart.find((item) => item.id === id);
    toast.info(`${removedItem?.title} removed from cart`);
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Clear cart and orders after logout
        setCart([]);
        setOrders([]);

        // Optionally, clear localStorage if you are storing orders in it
        localStorage.removeItem("orders");

        toast.success("Logged out successfully!");
        navigate("/login"); // Redirect to login page
      })
      .catch((error) => {
        toast.error("Error logging out!");
      });
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Navbar
        cartCount={cart.length}
        ordersCount={orders.length}
        onSearch={handleSearch}
        user={user}
        onLogout={handleLogout}
        setSelectedCategory={setSelectedCategory}
      />
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
      <main className="p-6">
        <Routes>
          <Route
            path="/"
            element={<ProductList products={filteredProducts} onAddToCart={handleAddToCart} />}
          />
          <Route
            path="/cart"
            element={user ? (
              <Cart cartItems={cart} setCartItems={setCart} handleCheckout={handleCheckout} />
            ) : (
              <RedirectToLogin />
            )}
          />
          <Route path="/orders" element={<Orders orders={orders} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/clothes"
            element={<ProductList products={filteredProducts.filter(product => product.category === "men's clothing")} onAddToCart={handleAddToCart} />}
          />
          <Route
            path="/electronics"
            element={<ProductList products={filteredProducts.filter(product => product.category === "electronics")} onAddToCart={handleAddToCart} />}
          />
          <Route
            path="/jewelery"
            element={<ProductList products={filteredProducts.filter(product => product.category === "jewelery")} onAddToCart={handleAddToCart} />}
          />
          <Route
            path="/womens-clothing"
            element={<ProductList products={filteredProducts.filter(product => product.category === "women's clothing")} onAddToCart={handleAddToCart} />}
          />
        </Routes>
      </main>
    </div>
  );
}

const RedirectToLogin = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/login");
  }, [navigate]);
  return null;
};

export default App;
