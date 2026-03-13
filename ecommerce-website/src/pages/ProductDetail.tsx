
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout';
import Price from '@/components/ui/price';
import BadgeLabel from '@/components/ui/badge-label';
import ColorOption from '@/components/ui/color-option';
import SizeOption from '@/components/ui/size-option';
import FeaturedProducts from '@/components/home/featured-products';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Heart, ArrowLeft } from 'lucide-react';
import { getProductById, getFeaturedProducts } from '@/data/products';
import { useCart } from '@/contexts/CartContext';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(id ? getProductById(id) : null);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState<Record<string, boolean>>({});
  
  // Related products - for this demo, we'll just use featured products
  const relatedProducts = getFeaturedProducts().filter(p => p.id !== id);
  
  useEffect(() => {
    // Scroll to top when the product changes
    window.scrollTo(0, 0);
    
    if (id) {
      setLoading(true);
      const foundProduct = getProductById(id);
      
      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedColor(foundProduct.colors[0] || '');
        setSelectedSize(foundProduct.sizes[0] || '');
        setCurrentImage(foundProduct.images[0] || '');
        setImagesLoaded({});
        
        // Simulate loading
        setTimeout(() => {
          setLoading(false);
        }, 500);
      } else {
        // Product not found, redirect to 404
        navigate('/not-found');
      }
    }
  }, [id, navigate]);
  
  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };
  
  const handleImageLoad = (imageSrc: string) => {
    setImagesLoaded(prev => ({
      ...prev,
      [imageSrc]: true
    }));
  };
  
  const handleAddToCart = () => {
    if (product && selectedColor && selectedSize) {
      addToCart(product, quantity, selectedSize, selectedColor);
    }
  };
  
  if (loading || !product) {
    return (
      <Layout>
        <div className="container px-4 mx-auto py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-secondary rounded w-1/4 mb-6" />
            <div className="flex flex-col lg:flex-row gap-12">
              <div className="lg:w-1/2">
                <div className="bg-secondary h-96 rounded-lg mb-4" />
                <div className="flex gap-4">
                  {[1, 2].map(i => (
                    <div key={i} className="bg-secondary h-24 w-24 rounded-lg" />
                  ))}
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="h-8 bg-secondary rounded w-3/4 mb-4" />
                <div className="h-6 bg-secondary rounded w-1/4 mb-6" />
                <div className="h-4 bg-secondary rounded mb-2 w-full" />
                <div className="h-4 bg-secondary rounded mb-2 w-full" />
                <div className="h-4 bg-secondary rounded mb-6 w-2/3" />
                <div className="h-8 bg-secondary rounded w-1/3 mb-8" />
                <div className="h-10 bg-secondary rounded w-full mb-4" />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  const { 
    name, 
    price, 
    discountPrice, 
    description, 
    colors, 
    sizes, 
    images, 
    new: isNew, 
    bestSeller
  } = product;

  return (
    <Layout>
      <div className="container px-4 mx-auto py-12">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm mb-8 hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Product Images */}
          <div className="lg:w-1/2">
            <div className="relative mb-4 rounded-lg overflow-hidden bg-secondary/30 aspect-square">
              <div className={`absolute inset-0 transition-opacity duration-500 ${imagesLoaded[currentImage] ? 'opacity-100' : 'opacity-0'}`}>
                <img
                  src={currentImage}
                  alt={name}
                  className="w-full h-full object-cover animate-scale-in"
                  onLoad={() => handleImageLoad(currentImage)}
                />
              </div>
              
              {!imagesLoaded[currentImage] && (
                <div className="absolute inset-0 image-shimmer"></div>
              )}
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
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
            
            {/* Thumbnail Images */}
            <div className="flex gap-4 flex-wrap">
              {images.map((image, index) => (
                <button
                  key={index}
                  className={`relative w-20 h-20 rounded-md overflow-hidden border-2 transition-all ${
                    currentImage === image 
                      ? 'border-primary' 
                      : 'border-transparent hover:border-primary/50'
                  }`}
                  onClick={() => setCurrentImage(image)}
                >
                  <div className={`absolute inset-0 transition-opacity duration-500 ${imagesLoaded[image] ? 'opacity-100' : 'opacity-0'}`}>
                    <img
                      src={image}
                      alt={`${name} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                      onLoad={() => handleImageLoad(image)}
                    />
                  </div>
                  
                  {!imagesLoaded[image] && (
                    <div className="absolute inset-0 image-shimmer"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
          
          {/* Product Details */}
          <div className="lg:w-1/2">
            <h1 className="text-3xl font-bold mb-2 animate-fade-in">{name}</h1>
            <Price 
              price={price} 
              discountPrice={discountPrice} 
              size="lg" 
              className="mb-6 animate-fade-in"
            />
            
            <div className="mb-6 animate-fade-in">
              <p className="text-muted-foreground">{description}</p>
            </div>
            
            {/* Color Selection */}
            <div className="mb-6 animate-fade-in">
              <h3 className="text-sm font-medium mb-3">Color: {selectedColor}</h3>
              <div className="flex gap-3">
                {colors.map((color) => (
                  <ColorOption
                    key={color}
                    color={color}
                    selected={selectedColor === color}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
            </div>
            
            {/* Size Selection */}
            <div className="mb-8 animate-fade-in">
              <h3 className="text-sm font-medium mb-3">Size</h3>
              <div className="flex flex-wrap gap-3">
                {sizes.map((size) => (
                  <SizeOption
                    key={size}
                    size={size}
                    selected={selectedSize === size}
                    onClick={() => setSelectedSize(size)}
                  />
                ))}
              </div>
            </div>
            
            {/* Quantity */}
            <div className="mb-8 animate-fade-in">
              <h3 className="text-sm font-medium mb-3">Quantity</h3>
              <div className="flex items-center border border-border rounded-md w-32">
                <button
                  type="button"
                  className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <div className="flex-1 text-center">{quantity}</div>
                <button
                  type="button"
                  className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= 10}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            {/* Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-fade-in">
              <Button 
                size="lg" 
                className="flex-1"
                onClick={handleAddToCart}
                disabled={!selectedColor || !selectedSize}
              >
                Add to Cart
              </Button>
              <Button variant="outline" size="icon" className="h-12 w-12">
                <Heart className="h-5 w-5" />
              </Button>
            </div>
            
            {/* Product Info */}
            <div className="border-t border-border pt-6 animate-fade-in">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-1">Product Details</h3>
                  <p className="text-sm text-muted-foreground">
                    Premium quality materials for comfort and durability.
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">Shipping & Returns</h3>
                  <p className="text-sm text-muted-foreground">
                    Free shipping on orders over $100. Easy returns within 30 days.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Products Section */}
        <section className="mt-20">
          <FeaturedProducts 
            title="You May Also Like" 
            products={relatedProducts.slice(0, 4)}
          />
        </section>
      </div>
    </Layout>
  );
};

export default ProductDetail;
