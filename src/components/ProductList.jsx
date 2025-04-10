// src/components/ProductList.jsx
import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ products = [], category = "All", onAddToCart }) => {
  const filteredProducts =
    category.toLowerCase() === "all"
      ? products
      : products.filter(
          (product) => product.category.toLowerCase() === category.toLowerCase()
        );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))
      ) : (
        <div className="text-gray-500 col-span-full text-center">No products found.</div>
      )}
    </div>
  );
};

export default ProductList;
