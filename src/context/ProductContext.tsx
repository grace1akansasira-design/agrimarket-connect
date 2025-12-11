import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from './CartContext';


interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProductsByFarmer: (farmerName: string) => Product[];
}

const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Fresh Organic Tomatoes',
    price: 18500,
    image: 'https://images.unsplash.com/photo-1546470427-0d4db154cde8?w=400&h=300&fit=crop',
    category: 'Vegetables',
    farmer: 'Green Valley Farm',
    description: 'Vine-ripened organic tomatoes, perfect for salads and cooking.',
  },
  {
    id: '2',
    name: 'Farm Fresh Eggs',
    price: 25900,
    image: 'https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?w=400&h=300&fit=crop',
    category: 'Dairy & Eggs',
    farmer: 'Happy Hen Farm',
    description: 'Free-range eggs from pasture-raised chickens.',
  },
  {
    id: '3',
    name: 'Organic Honey',
    price: 48000,
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=300&fit=crop',
    category: 'Pantry',
    farmer: 'Bee Happy Apiary',
    description: 'Raw, unfiltered honey from local wildflowers.',
  },
  {
    id: '4',
    name: 'Fresh Strawberries',
    price: 22200,
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&h=300&fit=crop',
    category: 'Fruits',
    farmer: 'Berry Good Farm',
    description: 'Sweet, juicy strawberries picked at peak ripeness.',
  },
  {
    id: '5',
    name: 'Organic Carrots',
    price: 12900,
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=300&fit=crop',
    category: 'Vegetables',
    farmer: 'Root & Stem Farm',
    description: 'Crunchy organic carrots, great for snacking or cooking.',
  },
  {
    id: '6',
    name: 'Artisan Goat Cheese',
    price: 33300,
    image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&h=300&fit=crop',
    category: 'Dairy & Eggs',
    farmer: 'Mountain Meadow Dairy',
    description: 'Creamy, tangy goat cheese made fresh daily.',
  },
];

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('agrimarket_products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const saveProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    localStorage.setItem('agrimarket_products', JSON.stringify(newProducts));
  };

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = {
      ...product,
      id: Math.random().toString(36).substr(2, 9),
    };
    saveProducts([...products, newProduct]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    saveProducts(products.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProduct = (id: string) => {
    saveProducts(products.filter(p => p.id !== id));
  };

  const getProductsByFarmer = (farmerName: string) => {
    return products.filter(p => p.farmer === farmerName);
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, getProductsByFarmer }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
