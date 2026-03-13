
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout';
import ProductGrid from '@/components/product/product-grid';
import { Product } from '@/data/types';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Filter, SlidersHorizontal, ChevronDown, X } from 'lucide-react';

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const getCategoryTitle = () => {
    if (category === 'men') return "Men's Collection";
    if (category === 'women') return "Women's Collection";
    if (category === 'shoes') return "Footwear";
    if (category === 'clothing') return "Apparel";
    return "Products";
  };

  const filters = [
    { name: 'Running', value: 'running' },
    { name: 'Training', value: 'training' },
    { name: 'Lifestyle', value: 'lifestyle' },
    { name: 'Basketball', value: 'basketball' },
    { name: 'Soccer', value: 'soccer' },
    { name: 'Tennis', value: 'tennis' },
  ];

  useEffect(() => {
    // Scroll to top when the category changes
    window.scrollTo(0, 0);
    
    setLoading(true);
    
    // Simulate loading
    setTimeout(() => {
      if (category === 'men') {
        setFilteredProducts(products.filter(p => p.gender === 'men' || p.gender === 'unisex'));
      } else if (category === 'women') {
        setFilteredProducts(products.filter(p => p.gender === 'women' || p.gender === 'unisex'));
      } else if (category === 'shoes' || category === 'clothing') {
        setFilteredProducts(products.filter(p => p.category === category));
      } else {
        setFilteredProducts(products);
      }
      setLoading(false);
    }, 500);
  }, [category]);

  const handleFilterToggle = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  const clearFilters = () => {
    setActiveFilters([]);
  };

  // Filter products based on active filters
  useEffect(() => {
    if (activeFilters.length === 0) {
      // If no filters, reapply the category filter only
      if (category === 'men') {
        setFilteredProducts(products.filter(p => p.gender === 'men' || p.gender === 'unisex'));
      } else if (category === 'women') {
        setFilteredProducts(products.filter(p => p.gender === 'women' || p.gender === 'unisex'));
      } else if (category === 'shoes' || category === 'clothing') {
        setFilteredProducts(products.filter(p => p.category === category));
      } else {
        setFilteredProducts(products);
      }
      return;
    }

    // Apply active filters on top of category filter
    let baseProducts: Product[] = [];
    
    if (category === 'men') {
      baseProducts = products.filter(p => p.gender === 'men' || p.gender === 'unisex');
    } else if (category === 'women') {
      baseProducts = products.filter(p => p.gender === 'women' || p.gender === 'unisex');
    } else if (category === 'shoes' || category === 'clothing') {
      baseProducts = products.filter(p => p.category === category);
    } else {
      baseProducts = products;
    }

    // Apply type filters
    setFilteredProducts(
      baseProducts.filter(product => activeFilters.includes(product.type))
    );
  }, [activeFilters, category]);

  return (
    <Layout>
      <div className="container px-4 mx-auto py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{getCategoryTitle()}</h1>
          <p className="text-muted-foreground">
            {filteredProducts.length} products
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters - Mobile Toggle */}
          <div className="lg:hidden mb-4">
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-between"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <span className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </span>
              <ChevronDown className={`h-4 w-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
            </Button>
          </div>

          {/* Filters - Sidebar */}
          <div className={`lg:w-64 ${isFilterOpen ? 'block' : 'hidden lg:block'} transition-all duration-300 ease-in-out`}>
            <div className="bg-white p-6 rounded-lg border sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                </h3>
                {activeFilters.length > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={clearFilters}
                    className="h-auto py-1 px-2 text-xs"
                  >
                    Clear all
                  </Button>
                )}
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium mb-3">Product Type</h4>
                  <div className="space-y-2">
                    {filters.map(filter => (
                      <label 
                        key={filter.value} 
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-primary focus:ring-primary"
                          checked={activeFilters.includes(filter.value)}
                          onChange={() => handleFilterToggle(filter.value)}
                        />
                        <span className="text-sm">{filter.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {activeFilters.length > 0 && (
              <div className="mb-6 flex flex-wrap gap-2">
                {activeFilters.map(filter => (
                  <span 
                    key={filter} 
                    className="inline-flex items-center gap-1 bg-secondary px-3 py-1 rounded-full text-sm"
                  >
                    {filters.find(f => f.value === filter)?.name}
                    <button 
                      onClick={() => handleFilterToggle(filter)}
                      className="ml-1 rounded-full hover:bg-background/50 p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
                <button 
                  onClick={clearFilters}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Clear all
                </button>
              </div>
            )}

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-secondary h-72 mb-4 rounded-lg" />
                    <div className="h-5 bg-secondary rounded w-2/3 mb-2" />
                    <div className="h-4 bg-secondary rounded w-1/3" />
                  </div>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <ProductGrid products={filteredProducts} />
            ) : (
              <div className="py-12 text-center">
                <h3 className="text-lg font-medium mb-2">No products found</h3>
                <p className="text-muted-foreground mb-4">Try changing your filters or check back later.</p>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
