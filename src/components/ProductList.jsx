// src/components/ProductList.jsx
import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ products = [], category, onAddToCart }) => {
  const filteredProducts = category
    ? products.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      )
    : products;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))
      ) : (
        <p className="text-gray-700 dark:text-white col-span-full text-center">
          No products found in this category.
        </p>
      )}
    </div>
  );
};

export default ProductList;
