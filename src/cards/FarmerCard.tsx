import { Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/context/CartContext';

interface FarmerCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
}

const FarmerCard = ({ product, onEdit, onDelete }: FarmerCardProps) => {
  return (
    <div className="bg-card rounded-xl shadow-soft overflow-hidden">
      <div className="relative h-40 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <span className="px-2 py-1 bg-secondary/90 backdrop-blur-sm text-secondary-foreground text-xs font-medium rounded-md">
            {product.category}
          </span>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-foreground">{product.name}</h3>
          <p className="text-lg font-bold text-primary">${product.price.toFixed(2)}</p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 gap-1"
            onClick={() => onEdit(product)}
          >
            <Edit2 className="w-4 h-4" />
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            className="gap-1"
            onClick={() => onDelete(product.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FarmerCard;
