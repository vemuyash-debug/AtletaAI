
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/data/types';
import Price from '@/components/ui/price';
import BadgeLabel from '@/components/ui/badge-label';
import './product.css';

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className = '' }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const { id, name, price, discountPrice, images, new: isNew, bestSeller } = product;
  
  const handleMouseEnter = () => {
    if (images.length > 1) {
      setCurrentImageIndex(1);
    }
  };
  
  const handleMouseLeave = () => {
    setCurrentImageIndex(0);
  };

  const handleImageLoaded = () => {
    setImageLoaded(true);
  };

  return (
    <div 
      className={`product-card ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link to={`/product/${id}`}>
        <div className="product-image-container">
          {/* Image */}
          <div className={`product-image-fade ${imageLoaded ? 'loaded' : 'loading'}`}>
            <img
              src={images[currentImageIndex]}
              alt={name}
              className="product-image"
              onLoad={handleImageLoaded}
            />
          </div>
          
          {/* Image placeholder */}
          {!imageLoaded && (
            <div className="image-shimmer"></div>
          )}

          {/* Badges */}
          <div className="product-badge-container">
            {isNew && <BadgeLabel text="New" variant="new" />}
            {bestSeller && <BadgeLabel text="Best Seller" variant="featured" />}
            {discountPrice && (
              <BadgeLabel
                text={`${Math.round(((price - discountPrice) / price) * 100)}% Off`}
                variant="sale"
              />
            )}
          </div>
        </div>

        <h3 className="product-title">{name}</h3>
        <Price price={price} discountPrice={discountPrice} />
      </Link>
    </div>
  );
};

export default ProductCard;
