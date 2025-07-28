import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PRODUCTS } from '../../products';
import { ShopContext } from '../../context/shop-context';
import { toast } from 'react-toastify';
import './buypage.css';

export const Buypage = () => {
  const { productId } = useParams();
  const { addToCart, cartItems } = useContext(ShopContext);
  const product = PRODUCTS.find(p => p.id === parseInt(productId));
  const cartItemCount = cartItems[productId] || 0;

  const [reviews, setReviews] = useState(() => {
    const savedReviews = localStorage.getItem(`reviews_${productId}`);
    return savedReviews ? JSON.parse(savedReviews) : [];
  });
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" });

  useEffect(() => {
    localStorage.setItem(`reviews_${productId}`, JSON.stringify(reviews));
  }, [reviews, productId]);

  if (!product) {
    return <div>Product not found</div>;
  }

  const descriptions = {
    1: "The latest iPhone with advanced camera technology and powerful performance.",
    2: "High-performance desktop computer perfect for gaming and productivity.",
    3: "Crystal-clear sound with these wireless earbuds featuring noise cancellation.",
    4: "Immersive audio experience with this gaming headset and built-in microphone.",
    5: "Sleek and powerful MacBook with long battery life and stunning display.",
    6: "Portable 10000mAh power bank to keep your devices charged on the go.",
    7: "Track your fitness goals with this stylish smart watch.",
    8: "High-quality 1080p webcam perfect for video calls and streaming.",
    9: "Professional-grade digital audio recorder for crystal-clear recordings."
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (newReview.rating > 0 && newReview.comment.trim()) {
      setReviews([...reviews, { ...newReview, date: new Date().toLocaleDateString() }]);
      setNewReview({ rating: 0, comment: "" });
      toast.success("Review submitted successfully!");
    } else {
      toast.error("Please provide a rating and comment.");
    }
  };

  const handleRatingChange = (rating) => {
    setNewReview((prev) => ({ ...prev, rating }));
  };

  return (
    <div className="buypage-container">
      <div className="product-details">
        <div className="product-image">
          <img src={product.productImage} alt={product.productName} />
        </div>
        <div className="product-info">
          <div className="title-price">
            <h1>{product.productName}</h1>
            <p className="price">${product.price}</p>
            <button 
              className="addToCartButton"
              onClick={() => addToCart(product.id)}
            >
              Add To Cart {cartItemCount > 0 && <> ({cartItemCount})</>}
            </button>
          </div>
          <div className="description-section">
            <p className="description">
              {descriptions[product.id] || "No description available."}
            </p>
          </div>
          <div className="review-section">
            <h2>Reviews</h2>
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <div key={index} className="review">
                  <div className="rating">
                    {"★".repeat(review.rating) + "☆".repeat(5 - review.rating)}
                  </div>
                  <p>{review.comment}</p>
                  <span className="review-date">{review.date}</span>
                </div>
              ))
            ) : (
              <p>No reviews yet. Be the first to leave one!</p>
            )}
            <form onSubmit={handleReviewSubmit} className="review-form">
              <div className="rating-input">
                <label>Rating: </label>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={star <= newReview.rating ? "star filled" : "star"}
                    onClick={() => handleRatingChange(star)}
                  >
                    ★
                  </span>
                ))}
              </div>
              <textarea
                value={newReview.comment}
                onChange={(e) => setNewReview((prev) => ({ ...prev, comment: e.target.value }))}
                placeholder="Write your review here..."
                rows="4"
                required
              />
              <button type="submit" className="submit-review-button">
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};