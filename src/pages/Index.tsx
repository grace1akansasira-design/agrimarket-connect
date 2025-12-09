import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, ShieldCheck, Truck, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/cards/ProductCard';
import { useProducts } from '@/context/ProductContext';

const Index = () => {
  const { products } = useProducts();
  const featuredProducts = products.slice(0, 3);

  const features = [
    {
      icon: Leaf,
      title: 'Fresh & Organic',
      description: 'Direct from farms to your table, ensuring maximum freshness.',
    },
    {
      icon: Users,
      title: 'Support Local Farmers',
      description: 'Every purchase directly supports hardworking local farmers.',
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Quick and reliable delivery to your doorstep.',
    },
    {
      icon: ShieldCheck,
      title: 'Quality Guaranteed',
      description: 'All products meet our strict quality standards.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative hero-gradient py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-slide-up">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              🌱 Farm Fresh, Direct to You
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-foreground mb-6 leading-tight">
              Connect with Local Farmers,
              <span className="text-gradient block mt-2">Buy Fresh Today</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              AgriMarket bridges the gap between farmers and buyers. Get the freshest produce while supporting sustainable local agriculture.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <Button variant="hero" className="w-full sm:w-auto gap-2">
                  Browse Products
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="outline" size="xl" className="w-full sm:w-auto">
                  Join as Farmer
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="p-6 rounded-xl bg-background shadow-soft card-hover"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold font-display text-foreground">Featured Products</h2>
              <p className="text-muted-foreground mt-1">Fresh picks from our farmers</p>
            </div>
            <Link to="/products">
              <Button variant="ghost" className="gap-2">
                View All
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-primary-foreground mb-4">
              Are You a Farmer?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8">
              Join AgriMarket today and reach thousands of buyers looking for fresh, local produce. 
              It's free to get started!
            </p>
            <Link to="/register">
              <Button variant="harvest" size="xl" className="gap-2">
                Start Selling Today
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '500+', label: 'Local Farmers' },
              { value: '10K+', label: 'Happy Buyers' },
              { value: '50K+', label: 'Products Sold' },
              { value: '100%', label: 'Fresh Guarantee' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
