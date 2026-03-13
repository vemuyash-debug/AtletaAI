import { Product, Collection } from './types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Air Flow Runner',
    price: 129.99,
    description: 'Lightweight running shoes with advanced cushioning for maximum comfort during your runs.',
    category: 'shoes',
    gender: 'men',
    type: 'running',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5',
    ],
    colors: ['#000000', '#FFFFFF', '#FF0000'],
    sizes: ['7', '8', '9', '10', '11', '12'],
    inStock: true,
    featured: true,
    bestSeller: true
  },
  {
    id: '2',
    name: 'Ultra Boost Trainer',
    price: 149.99,
    description: 'High-performance training shoes designed for intense workouts and gym sessions.',
    category: 'shoes',
    gender: 'men',
    type: 'training',
    images: [
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5',
    ],
    colors: ['#000000', '#FFFFFF', '#0000FF'],
    sizes: ['7', '8', '9', '10', '11', '12'],
    inStock: true,
    new: true
  },
  {
    id: '3',
    name: 'Court Classic Pro',
    price: 119.99,
    discountPrice: 89.99,
    description: 'Classic tennis shoes with modern technology, perfect for on and off the court.',
    category: 'shoes',
    gender: 'unisex',
    type: 'tennis',
    images: [
      'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5',
    ],
    colors: ['#FFFFFF', '#000000', '#00FF00'],
    sizes: ['6', '7', '8', '9', '10', '11'],
    inStock: true
  },
  {
    id: '4',
    name: 'Performance Dri-Fit Tee',
    price: 34.99,
    description: 'Moisture-wicking technology keeps you dry during intense workouts and training sessions.',
    category: 'clothing',
    gender: 'men',
    type: 'training',
    images: [
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a',
    ],
    colors: ['#000000', '#FFFFFF', '#0000FF', '#FF0000'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    featured: true
  },
  {
    id: '5',
    name: 'Flex Stride Running Shorts',
    price: 49.99,
    description: 'Lightweight running shorts with built-in liner for comfort during your runs.',
    category: 'clothing',
    gender: 'men',
    type: 'running',
    images: [
      'https://images.unsplash.com/photo-1593189834245-71519159eb69',
      'https://images.unsplash.com/photo-1563630423918-b58f07336ac5',
    ],
    colors: ['#000000', '#333333', '#0000FF'],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true
  },
  {
    id: '6',
    name: 'Cloud Comfort Running Shoes',
    price: 139.99,
    description: "Feel like you're running on clouds with our most comfortable running shoe yet.",
    category: 'shoes',
    gender: 'women',
    type: 'running',
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a',
      'https://images.unsplash.com/photo-1604671801908-6f0c6a092c05',
    ],
    colors: ['#FF69B4', '#FFFFFF', '#000000'],
    sizes: ['5', '6', '7', '8', '9', '10'],
    inStock: true,
    featured: true,
    new: true
  },
  {
    id: '7',
    name: 'High Impact Sports Bra',
    price: 54.99,
    description: 'Maximum support for high-intensity workouts and running.',
    category: 'clothing',
    gender: 'women',
    type: 'training',
    images: [
      'https://images.unsplash.com/photo-1616150638538-ffb0679a3fc4',
      'https://images.unsplash.com/photo-1565084888279-aca607ecce0c',
    ],
    colors: ['#000000', '#FFFFFF', '#FF69B4'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    bestSeller: true
  },
  {
    id: '8',
    name: 'Premium Yoga Leggings',
    price: 79.99,
    discountPrice: 59.99,
    description: 'Four-way stretch fabric with moisture-wicking technology for maximum comfort during your practice.',
    category: 'clothing',
    gender: 'women',
    type: 'training',
    images: [
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8',
      'https://images.unsplash.com/photo-1601924582970-9238bcb495d9',
    ],
    colors: ['#000000', '#333333', '#800080'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true
  }
];

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getNewArrivals = (): Product[] => {
  return products.filter(product => product.new);
};

export const getBestSellers = (): Product[] => {
  return products.filter(product => product.bestSeller);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getProductsByGender = (gender: string): Product[] => {
  return products.filter(product => product.gender === gender || product.gender === 'unisex');
};

export const collections: Collection[] = [
  {
    id: '1',
    name: 'Men\'s Running',
    description: 'Performance gear for your best run yet',
    image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8',
    gender: 'men',
    category: 'shoes'
  },
  {
    id: '2',
    name: 'Women\'s Activewear',
    description: 'Stylish and functional sportswear',
    image: 'https://images.unsplash.com/photo-1581497396202-5645e76a3a8e',
    gender: 'women',
    category: 'clothing'
  },
  {
    id: '3',
    name: 'Performance Footwear',
    description: 'Shoes engineered for peak performance',
    image: 'https://images.unsplash.com/photo-1562183241-840b8af0721f',
    category: 'shoes'
  }
];
