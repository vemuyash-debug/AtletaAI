
import React from 'react';
import { Product } from '@/data/types';
import ProductCard from './product-card';
import './product.css';

interface ProductGridProps {
  products: Product[];
  columns?: number;
  className?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  columns = 4,
  className = ''
}) => {
  if (!products.length) {
    return (
      <div className="product-grid-empty">
        <h3 className="product-grid-empty-title">No products found</h3>
        <p className="product-grid-empty-message">Try changing your search or filter criteria.</p>
      </div>
    );
  }

  const getGridClasses = () => {
    let gridClass = 'product-grid product-grid-cols-1';
    
    switch (columns) {
      case 2:
        gridClass += ' product-grid-cols-2';
        break;
      case 3:
        gridClass += ' product-grid-cols-2 product-grid-cols-3';
        break;
      case 4:
      default:
        gridClass += ' product-grid-cols-2 product-grid-cols-3 product-grid-cols-4';
        break;
    }
    
    return gridClass;
  };

  return (
    <div className={`${getGridClasses()} ${className}`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
