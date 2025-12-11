import { ShoppingCart, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCart, Product } from '@/context/CartContext';
import { toast } from '@/hooks/use-toast';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="bg-card rounded-xl shadow-soft overflow-hidden card-hover group">
      {/* Image Container */}
      <Link to={`/product/${product.id}`}>
        <div className="relative h-48 overflow-hidden cursor-pointer">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-3 right-3" onClick={(e) => e.preventDefault()}>
            <button className="w-8 h-8 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-card transition-colors">
              <Heart className="w-4 h-4 text-muted-foreground hover:text-destructive transition-colors" />
            </button>
          </div>
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-medium rounded-md">
              {product.category}
            </span>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 space-y-3">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-foreground line-clamp-1 hover:text-primary transition-colors">{product.name}</h3>
          <p className="text-sm text-muted-foreground">{product.farmer}</p>
        </Link>

        {product.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
        )}

        <div className="flex items-center justify-between pt-2">
          <span className="text-xl font-bold text-primary">{formatPrice(product.price)}</span>
          <Button
            size="sm"
            onClick={handleAddToCart}
            className="gap-1"
          >
            <ShoppingCart className="w-4 h-4" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
