// src/components/ProductCard.jsx
import React from "react";

const ProductCard = ({ product, onAddToCart }) => {
  if (!product) return null; // 👈 Extra safety check

  const { title, image, price, category } = product;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col h-full">
      {/* Product Image */}
      <img
        src={image}
        alt={title}
        className="h-48 w-full object-contain mb-4"
      />
      
      {/* Product Details */}
      <div className="flex-grow p-2">
        <div className="text-gray-800 dark:text-white font-semibold text-lg mb-2">
          {title}
        </div>
        <div className="text-gray-500 dark:text-gray-400 text-sm mb-2 capitalize">
          {category}
        </div>
        <div className="text-blue-600 dark:text-blue-400 font-bold text-xl mb-4">
          ${price.toFixed(2)}
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={() => onAddToCart(product)}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 mt-auto"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
