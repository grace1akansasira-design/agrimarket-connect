import { Link } from 'react-router-dom';
import { Package, Truck, CheckCircle, Clock, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useOrders } from '@/context/OrderContext';
import { formatPrice } from '@/lib/utils';

const statusConfig = {
  processing: { label: 'Processing', icon: Clock, color: 'text-accent' },
  shipped: { label: 'Shipped', icon: Truck, color: 'text-blue-500' },
  delivered: { label: 'Delivered', icon: CheckCircle, color: 'text-primary' },
};

const OrderHistory = () => {
  const { orders } = useOrders();

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center py-12">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-12 h-12 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold font-display text-foreground mb-2">
            No orders yet
          </h2>
          <p className="text-muted-foreground mb-6">
            Start shopping to see your order history here.
          </p>
          <Link to="/products">
            <Button>Browse Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold font-display text-foreground mb-8">Order History</h1>

        <div className="space-y-6">
          {orders.map((order) => {
            const StatusIcon = statusConfig[order.status].icon;
            
            return (
              <div key={order.id} className="bg-card rounded-xl shadow-soft border border-border overflow-hidden">
                {/* Order Header */}
                <div className="bg-muted/50 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Package className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Order ID</p>
                      <p className="font-semibold text-foreground">#{order.id.toUpperCase()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                    <div className={`flex items-center gap-1 ${statusConfig[order.status].color}`}>
                      <StatusIcon className="w-4 h-4" />
                      <span className="font-medium">{statusConfig[order.status].label}</span>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  <div className="space-y-4 mb-6">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <Link 
                            to={`/product/${item.id}`}
                            className="font-medium text-foreground hover:text-primary transition-colors"
                          >
                            {item.name}
                          </Link>
                          <p className="text-sm text-muted-foreground">{item.farmer}</p>
                          <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-medium text-foreground">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Shipping Address */}
                  <div className="border-t border-border pt-4 mb-4">
                    <p className="text-sm text-muted-foreground mb-1">Shipped to:</p>
                    <p className="text-foreground">
                      {order.shippingAddress.name}, {order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.zip}
                    </p>
                  </div>

                  {/* Order Total */}
                  <div className="border-t border-border pt-4 flex justify-between items-center">
                    <span className="text-muted-foreground">Order Total</span>
                    <span className="text-xl font-bold text-primary">{formatPrice(order.total)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
