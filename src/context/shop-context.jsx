import React, { createContext, useState, useEffect } from 'react';
import { PRODUCTS } from '../products';
import { toast } from 'react-toastify';

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let i = 1; i < PRODUCTS.length + 1; i++) {
    cart[i] = 0;
  }
  return cart;
};

export const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : getDefaultCart();
  });
  const [wishlistItems, setWishlistItems] = useState(() => {
    const savedWishlist = localStorage.getItem('wishlistItems');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = PRODUCTS.find((product) => product.id === Number(item));
        totalAmount += cartItems[item] * itemInfo.price;
      }
    }
    return totalAmount;
  };

  const addToCart = (itemId) => {
    const product = PRODUCTS.find(p => p.id === itemId);
    setCartItems((prev) => {
      const newCart = { ...prev, [itemId]: (prev[itemId] || 0) + 1 };
      toast.success(`${product.productName} added to cart!`, { toastId: `add-to-cart-${itemId}` });
      return newCart;
    });
  };

  const removeFromCart = (itemId) => {
    const product = PRODUCTS.find(p => p.id === itemId);
    setCartItems((prev) => {
      const newCart = { ...prev, [itemId]: prev[itemId] - 1 };
      if (newCart[itemId] >= 0) {
        toast.info(`${product.productName} removed from cart!`, { toastId: `remove-from-cart-${itemId}` });
      }
      return newCart;
    });
  };

  const updateCartItemCount = (newAmount, itemId) => {
    const product = PRODUCTS.find(p => p.id === itemId);
    setCartItems((prev) => {
      const newCart = { ...prev, [itemId]: newAmount };
      if (newAmount > prev[itemId]) {
        toast.success(`${product.productName} quantity increased!`, { toastId: `update-cart-${itemId}` });
      } else if (newAmount < prev[itemId]) {
        toast.info(`${product.productName} quantity decreased!`, { toastId: `update-cart-${itemId}` });
      }
      return newCart;
    });
  };

  const toggleWishlist = (itemId) => {
    const product = PRODUCTS.find(p => p.id === itemId);
    setWishlistItems((prev) => {
      if (prev.includes(itemId)) {
        toast.info(`${product.productName} removed from wishlist!`, { toastId: `remove-wishlist-${itemId}` });
        return prev.filter((id) => id !== itemId);
      } else {
        toast.success(`${product.productName} added to wishlist!`, { toastId: `add-wishlist-${itemId}` });
        return [...prev, itemId];
      }
    });
  };

  const getWishlistProducts = () => {
    return PRODUCTS.filter((product) => wishlistItems.includes(product.id));
  };

  const logout = () => {
    setIsAuthenticated(false);
    toast.info("Logged out successfully!", { toastId: "logout" });
  };

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    updateCartItemCount,
    getTotalCartAmount,
    wishlistItems,
    toggleWishlist,
    getWishlistProducts,
    isAuthenticated,
    setIsAuthenticated,
    logout,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};