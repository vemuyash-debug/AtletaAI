
import React from 'react';
import './price.css';

const Price = ({ 
  price, 
  discountPrice, 
  className = '',
  size = 'md'
}) => {
  const hasDiscount = !!discountPrice;
  
  return (
    <div className={`price-container ${className}`}>
      {hasDiscount ? (
        <>
          <span className={`price-current price-current-${size}`}>
            ${discountPrice.toFixed(2)}
          </span>
          <span className={`price-discount price-discount-${size}`}>
            ${price.toFixed(2)}
          </span>
        </>
      ) : (
        <span className={`price-current price-current-${size}`}>
          ${price.toFixed(2)}
        </span>
      )}
    </div>
  );
};

export default Price;
