import React, { useState } from "react";
import { PRODUCTS } from "../../products";
import { Product } from "./product";
import "./shop.css";

export const Shop = ({ searchTerm }) => {
  const [sortOrder, setSortOrder] = useState(""); 


  const filteredProducts = PRODUCTS.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "asc") return a.price - b.price;
    if (sortOrder === "desc") return b.price - a.price;
    return 0;
  });

  return (
    <div className="shop">
      <div className="sort-filter">
        <h1>Products</h1>
        <h2>Filter:</h2>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="price-sort"
        >
          <option value="">Default Order</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>
      <div className="products">
        {sortedProducts.length > 0 ? (
          sortedProducts.map((product) => (
            <Product key={product.id} data={product} />
          ))
        ) : (
          <div className="no-products">
            <p>No products found.</p>
          </div>
        )}
      </div>
    </div>
  );
};