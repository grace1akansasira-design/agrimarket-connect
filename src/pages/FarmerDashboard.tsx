import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Package, TrendingUp, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FarmerCard from '@/cards/FarmerCard';
import { useProducts } from '@/context/ProductContext';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Product } from '@/context/CartContext';

const FarmerDashboard = () => {
  const { user } = useAuth();
  const { products, deleteProduct } = useProducts();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // For demo, show products that match user's name or all if not logged in
  const farmerName = user?.name || 'Green Valley Farm';
  const myProducts = products.filter(p => 
    p.farmer.toLowerCase().includes(farmerName.toLowerCase()) || 
    p.farmer === 'Green Valley Farm'
  );

  const handleDelete = (productId: string) => {
    deleteProduct(productId);
    toast({
      title: "Product deleted",
      description: "The product has been removed from your listings.",
    });
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    toast({
      title: "Edit mode",
      description: "Use the Add Product page to update this product.",
    });
  };

  const stats = [
    { label: 'Total Products', value: myProducts.length, icon: Package, color: 'bg-primary/10 text-primary' },
    { label: 'Total Views', value: '1,234', icon: TrendingUp, color: 'bg-secondary/20 text-secondary-foreground' },
    { label: 'Revenue', value: '$2,890', icon: DollarSign, color: 'bg-leaf-light/10 text-leaf' },
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold font-display text-foreground">Farmer Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Welcome back, {user?.name || 'Farmer'}! Manage your products here.
            </p>
          </div>
          <Link to="/add-product">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add New Product
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-card rounded-xl shadow-soft p-6 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Products */}
        <div className="bg-card rounded-xl shadow-soft p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Your Products</h2>

          {myProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {myProducts.map((product) => (
                <FarmerCard
                  key={product.id}
                  product={product}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No products yet</h3>
              <p className="text-muted-foreground mb-4">
                Start selling by adding your first product.
              </p>
              <Link to="/add-product">
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Product
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;
