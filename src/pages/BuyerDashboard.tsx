import { useState } from 'react';
import { Search, Sparkles, Clock, Heart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import BuyerCard from '@/cards/BuyerCard';
import ProductCard from '@/cards/ProductCard';
import { useProducts } from '@/context/ProductContext';
import { useAuth } from '@/context/AuthContext';

const BuyerDashboard = () => {
  const { user } = useAuth();
  const { products } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');

  // Get random recommended products
  const recommendedProducts = products.slice(0, 4);
  const recentProducts = products.slice(-4).reverse();

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.farmer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-display text-foreground">
            Welcome, {user?.name || 'Buyer'}!
          </h1>
          <p className="text-muted-foreground mt-1">
            Discover fresh products from local farmers
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-md mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search products or farmers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {searchQuery ? (
          /* Search Results */
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Search Results ({filteredProducts.length})
            </h2>
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-card rounded-xl">
                <p className="text-muted-foreground">No products found matching "{searchQuery}"</p>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Recommended For You */}
            <section className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-secondary" />
                <h2 className="text-xl font-semibold text-foreground">Recommended For You</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendedProducts.map((product) => (
                  <BuyerCard key={product.id} product={product} />
                ))}
              </div>
            </section>

            {/* Recently Added */}
            <section className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">Recently Added</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {recentProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>

            {/* Categories Quick Access */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-5 h-5 text-destructive" />
                <h2 className="text-xl font-semibold text-foreground">Browse by Category</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {['Vegetables', 'Fruits', 'Dairy & Eggs', 'Pantry', 'Meat', 'Grains'].map((category) => (
                  <div
                    key={category}
                    className="bg-card rounded-xl shadow-soft p-6 text-center card-hover cursor-pointer"
                  >
                    <span className="text-2xl mb-2 block">
                      {category === 'Vegetables' && '🥬'}
                      {category === 'Fruits' && '🍎'}
                      {category === 'Dairy & Eggs' && '🥛'}
                      {category === 'Pantry' && '🫙'}
                      {category === 'Meat' && '🥩'}
                      {category === 'Grains' && '🌾'}
                    </span>
                    <span className="font-medium text-foreground text-sm">{category}</span>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default BuyerDashboard;
