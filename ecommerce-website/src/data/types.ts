
export type Category = 'shoes' | 'clothing' | 'accessories';
export type Gender = 'men' | 'women' | 'unisex';
export type ProductType = 'running' | 'training' | 'lifestyle' | 'basketball' | 'soccer' | 'tennis';

export interface Product {
  id: string;
  name: string;
  price: number;
  discountPrice?: number;
  description: string;
  category: Category;
  gender: Gender;
  type: ProductType;
  images: string[];
  colors: string[];
  sizes: string[];
  inStock: boolean;
  featured?: boolean;
  new?: boolean;
  bestSeller?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
  gender?: Gender;
  category?: Category;
}
