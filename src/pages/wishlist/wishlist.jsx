import React, { useContext } from 'react';
import { ShopContext } from '../../context/shop-context';
import './wishlist.css';

export const Wishlist = () => {
    const { getWishlistProducts } = useContext(ShopContext);
    const wishlistProducts = getWishlistProducts();

    return (
        <div className="wishlist">
            <h1>Your Wishlist</h1>
            {wishlistProducts.length > 0 ? (
                <div className="wishlist-items">
                    {wishlistProducts.map((product) => (
                        <div key={product.id} className="wishlist-item">
                            <img src={product.productImage} alt={product.productName} />
                            <div className="description">
                                <p><b>{product.productName}</b></p>
                                <p>${product.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No items in your wishlist yet.</p>
            )}
        </div>
    );
};