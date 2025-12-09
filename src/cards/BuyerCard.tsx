import { ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart, Product } from '@/context/CartContext';
import { toast } from '@/hooks/use-toast';

interface BuyerCardProps {
  product: Product;
}

const BuyerCard = ({ product }: BuyerCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="bg-card rounded-xl shadow-soft overflow-hidden flex card-hover">
      <div className="w-32 h-32 flex-shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-foreground">{product.name}</h3>
              <p className="text-sm text-muted-foreground">{product.farmer}</p>
            </div>
            <span className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded">
              {product.category}
            </span>
          </div>
          <div className="flex items-center gap-1 mt-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${i < 4 ? 'text-secondary fill-secondary' : 'text-muted'}`}
              />
            ))}
            <span className="text-xs text-muted-foreground ml-1">4.0</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-2">
          <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
          <Button size="sm" onClick={handleAddToCart} className="gap-1">
            <ShoppingCart className="w-4 h-4" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BuyerCard;
