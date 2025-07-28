import React, { useContext, useState } from "react";
import { ShopContext } from "../../context/shop-context";
import { PRODUCTS } from "../../products";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import "./checkout.css";

export const Checkout = () => {
  const { cartItems, getTotalCartAmount } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    phoneNumber: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.fullName &&
      formData.address &&
      formData.city &&
      formData.postalCode &&
      formData.phoneNumber
    ) {
      toast.success("Order placed successfully! Thank you for your purchase.");
      navigate("/");
    } else {
      toast.error("Please fill out all fields.");
    }
  };

  return (
    <div className="checkout">
      <h1>Checkout</h1>
      <div className="checkout-container">
        <div className="checkout-form">
          <h2>Shipping Information</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="John Doe"
                required
              />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="123 Main St"
                required
              />
            </div>
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="New York"
                required
              />
            </div>
            <div className="form-group">
              <label>Postal Code</label>
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleInputChange}
                placeholder="10001"
                required
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="123-456-7890"
                required
              />
            </div>
            <button type="submit" className="confirm-button">
              Place Order
            </button>
          </form>
        </div>
        <div className="checkout-summary">
          <h2>Order Summary</h2>
          <div className="checkout-items">
            {PRODUCTS.map((product) => {
              if (cartItems[product.id] > 0) {
                return (
                  <div key={product.id} className="checkout-item">
                    <img src={product.productImage} alt={product.productName} />
                    <div className="details">
                      <p>{product.productName}</p>
                      <p>${product.price} x {cartItems[product.id]}</p>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
          <h3>Total: ${totalAmount.toFixed(2)}</h3>
        </div>
      </div>
    </div>
  );
};