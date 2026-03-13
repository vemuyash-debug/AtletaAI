
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/data/types';
import ProductGrid from '@/components/product/product-grid';
import { ArrowRight } from 'lucide-react';
import './featured.css';

interface FeaturedProductsProps {
  title: string;
  products: Product[];
  linkTo?: string;
  linkText?: string;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  title,
  products,
  linkTo = '/',
  linkText = 'View All'
}) => {
  if (!products.length) return null;

  return (
    <div className="featured-section">
      <div className="featured-header">
        <h2 className="featured-title">{title}</h2>
        {linkTo && (
          <Link to={linkTo} className="featured-link">
            {linkText}
            <ArrowRight className="featured-link-icon" />
          </Link>
        )}
      </div>
      <ProductGrid products={products} columns={4} />
    </div>
  );
};

export default FeaturedProducts;
