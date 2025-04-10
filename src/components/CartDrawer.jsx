import React from 'react';
import CartItem from './CartItem';

const CartDrawer = ({ cart, onRemoveFromCart, onIncrease, onDecrease }) => {
  return (
    <div className="fixed top-0 right-0 w-96 h-full bg-white dark:bg-gray-800 shadow-lg p-4 overflow-y-auto z-50">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">Cart is empty</p>
      ) : (
        cart.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onRemoveFromCart={onRemoveFromCart}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
          />
        ))
      )}
    </div>
  );
};

export default CartDrawer;
