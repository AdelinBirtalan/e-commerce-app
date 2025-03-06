
import React, { useContext } from 'react';
import { ShopContext } from '../../context/shop-context';
import { Link } from 'react-router-dom';

export const Product = (props) => {
    const { id, productName, price, productImage, productWish } = props.data;
    const { addToCart, cartItems, toggleWishlist, wishlistItems } = useContext(ShopContext);

    const isLiked = wishlistItems.includes(id);
    const cartItemCount = cartItems[id];

    const handleLikeClick = () => {
        toggleWishlist(id);
    };

    return (
        <div className='product'>
            <button 
                className="wish-button" 
                onClick={handleLikeClick}
                style={{ color: isLiked ? 'red' : 'black' }}
            >
                {productWish || '♥'}
            </button>
            <Link className='buypage' to={`/buypage/${id}`}>
                <img src={productImage} />
                <div className='description'>
                    <p><b>{productName}</b></p>
                    <p>${price}</p>
                </div>
            </Link>
            <button 
                className='addToCartButton' 
                onClick={() => addToCart(id)}
            >
                Add To Cart {cartItemCount > 0 && <> ({cartItemCount})</>}
            </button>
        </div>
    );
};