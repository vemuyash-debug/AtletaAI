
import React, { useEffect } from 'react';
import Layout from '@/components/layout';
import HeroSection from '@/components/home/hero-section';
import FeaturedProducts from '@/components/home/featured-products';
import FeaturedCollection from '@/components/home/featured-collection';
import NewsletterSection from '@/components/home/newsletter';
import { getFeaturedProducts, getNewArrivals, getBestSellers, collections } from '@/data/products';

const Index = () => {
  // Scroll to top when the page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const featuredProducts = getFeaturedProducts();
  const newArrivals = getNewArrivals();
  const bestSellers = getBestSellers();

  return (
    <Layout>
      <HeroSection />
      
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <FeaturedProducts 
            title="Featured Products" 
            products={featuredProducts}
            linkTo="/category/shoes"
            linkText="View All Products"
          />
        </div>
      </section>
      
      <section className="py-16 bg-secondary">
        <div className="container px-4 mx-auto">
          <FeaturedCollection collection={collections[0]} />
        </div>
      </section>

      <section className="py-16">
        <div className="container px-4 mx-auto">
          <FeaturedProducts 
            title="New Arrivals" 
            products={newArrivals}
            linkTo="/category/shoes"
            linkText="View All New Arrivals"
          />
        </div>
      </section>
      
      <section className="py-16 bg-secondary">
        <div className="container px-4 mx-auto">
          <FeaturedCollection collection={collections[1]} reverse />
        </div>
      </section>

      <section className="py-16">
        <div className="container px-4 mx-auto">
          <FeaturedProducts 
            title="Best Sellers" 
            products={bestSellers}
            linkTo="/category/shoes"
            linkText="View All Best Sellers"
          />
        </div>
      </section>
      
      <NewsletterSection />
    </Layout>
  );
};

export default Index;
