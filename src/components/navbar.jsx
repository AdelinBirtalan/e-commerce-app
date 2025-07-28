import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";
import "./navbar.css";

export const Navbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <div className="navbar">
      <div className="nav-left">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-bar"
        />
      </div>
      <Link className="navbar-logo" to="/">
        EchoTech
      </Link>
      <div className="nav-right">
        <Link className="navbar-cart" to="/cart">
          <ShoppingCart size={32} />
        </Link>
        <Link className="navbar-login" to="/login">
          Login
        </Link>
        <Link className="navbar-fav" to="/wishlist">
          Wishlist
        </Link>
      </div>
    </div>
  );
};
