// src/components/CartItem.js
import React from 'react';

const CartItem = ({ item, onRemoveFromCart, onIncrease, onDecrease }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center">
        <img className="w-16 h-16 object-contain" src={item.images?.[0]} alt={item.title} />
        <div className="ml-4">
          <h5 className="text-lg font-semibold text-gray-900 dark:text-white">{item.title}</h5>
          <div className="flex items-center mt-2">
            <button
              onClick={() => onDecrease(item.id)}
              className="text-lg px-2 rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              −
            </button>
            <span className="px-4">{item.quantity}</span>
            <button
              onClick={() => onIncrease(item.id)}
              className="text-lg px-2 rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              +
            </button>
          </div>
          <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
            Subtotal: ${Number(item.price * item.quantity).toFixed(2)}
          </p>
        </div>
      </div>
      <button
        onClick={() => onRemoveFromCart(item.id)}
        className="text-sm text-red-500 hover:underline"
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;
