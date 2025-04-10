// src/components/Cart.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const CartItem = ({ item, onRemove }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-300">
      <div className="flex items-center space-x-4">
        <img
          src={item.image}
          alt={item.name}
          className="w-20 h-20 object-cover rounded-md"
        />
        <div>
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <p className="text-gray-500">Price: ${item.price}</p>
          <p className="text-gray-500">Quantity: {item.quantity}</p>
        </div>
      </div>
      <button
        onClick={() => onRemove(item.id)}
        className="text-red-500 hover:text-red-700"
      >
        Remove
      </button>
    </div>
  );
};

const Cart = ({ cartItems, setCartItems, handleCheckout }) => {
  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const navigate = useNavigate();

  const handleProceedToCheckout = () => {
    handleCheckout(cartItems);
    navigate('/orders');
  };

  return (
    <div className="max-w-screen-xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-lg">Your cart is empty!</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} onRemove={handleRemoveItem} />
          ))}
        </div>
      )}

      <div className="mt-6">
        <div className="flex items-center justify-between text-lg font-semibold">
          <span>Total Price:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <button
          onClick={handleProceedToCheckout}
          className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
