
import React from 'react';
import { Link } from 'react-router-dom';
import { Collection } from '@/data/types';
import { ArrowRight } from 'lucide-react';
import './featured.css';

interface FeaturedCollectionProps {
  collection: Collection;
  reverse?: boolean;
}

const FeaturedCollection: React.FC<FeaturedCollectionProps> = ({ collection, reverse = false }) => {
  const { name, description, image, gender, category } = collection;
  
  let linkPath = '/';
  if (gender && category) {
    linkPath = `/category/${gender}/${category}`;
  } else if (gender) {
    linkPath = `/category/${gender}`;
  } else if (category) {
    linkPath = `/category/${category}`;
  }

  return (
    <div className={`featured-collection ${reverse ? 'reverse' : ''}`}>
      <div className="featured-collection-image-container">
        <div className="featured-collection-image-wrapper">
          <img 
            src={image} 
            alt={name} 
            className="featured-collection-image" 
          />
        </div>
      </div>
      <div className="featured-collection-content">
        <h2 className="featured-collection-title">{name}</h2>
        <p className="featured-collection-description">{description}</p>
        <Link to={linkPath} className="featured-collection-button">
          Shop Collection <ArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default FeaturedCollection;
