import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CreditCard, Truck, CheckCircle, Smartphone, Wallet, Banknote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/context/CartContext';
import { useOrders } from '@/context/OrderContext';
import { toast } from '@/hooks/use-toast';

type PaymentMethod = 'card' | 'mobile-money' | 'wallet' | 'cod';

const paymentMethods = [
  { id: 'card' as const, label: 'Credit/Debit Card', icon: CreditCard, description: 'Visa, Mastercard, etc.' },
  { id: 'mobile-money' as const, label: 'Mobile Money', icon: Smartphone, description: 'M-Pesa, GCash, MTN' },
  { id: 'wallet' as const, label: 'Digital Wallet', icon: Wallet, description: 'Apple Pay, Google Pay' },
  { id: 'cod' as const, label: 'Cash on Delivery', icon: Banknote, description: 'Pay when you receive' },
];

const Checkout = () => {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const { addOrder } = useOrders();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [orderId, setOrderId] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    // Card details
    cardNumber: '',
    expiry: '',
    cvv: '',
    // Mobile money
    mobileNumber: '',
    mobileProvider: 'mpesa',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Create order
    const newOrderId = addOrder({
      items: [...items],
      total,
      shippingAddress: {
        name: formData.name,
        address: formData.address,
        city: formData.city,
        zip: formData.zip,
      },
    });

    setOrderId(newOrderId);
    setIsProcessing(false);
    setIsComplete(true);
    clearCart();

    toast({
      title: "Order Placed!",
      description: `Payment via ${paymentMethods.find(m => m.id === paymentMethod)?.label} successful.`,
    });
  };

  if (isComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-primary" />
          </div>
          <h2 className="text-2xl font-bold font-display text-foreground mb-2">
            Order Confirmed!
          </h2>
          <p className="text-muted-foreground mb-2">
            Thank you for your purchase. Your order will be delivered soon.
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            Order ID: <span className="font-semibold text-foreground">#{orderId.toUpperCase()}</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/order-history">
              <Button variant="outline">View Order History</Button>
            </Link>
            <Button onClick={() => navigate('/products')}>
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold font-display text-foreground mb-8">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Forms */}
            <div className="space-y-6">
              {/* Shipping Info */}
              <div className="bg-card rounded-xl shadow-soft p-6 border border-border">
                <div className="flex items-center gap-2 mb-4">
                  <Truck className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-semibold text-foreground">Shipping Information</h2>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 sm:col-span-1">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="zip">ZIP Code</Label>
                      <Input
                        id="zip"
                        required
                        value={formData.zip}
                        onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="bg-card rounded-xl shadow-soft p-6 border border-border">
                <h2 className="text-lg font-semibold text-foreground mb-4">Payment Method</h2>
                <div className="grid grid-cols-2 gap-3">
                  {paymentMethods.map((method) => {
                    const Icon = method.icon;
                    return (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setPaymentMethod(method.id)}
                        className={`p-4 rounded-xl border-2 transition-all text-left ${
                          paymentMethod === method.id
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <Icon className={`w-6 h-6 mb-2 ${paymentMethod === method.id ? 'text-primary' : 'text-muted-foreground'}`} />
                        <p className="font-medium text-foreground text-sm">{method.label}</p>
                        <p className="text-xs text-muted-foreground">{method.description}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Payment Details based on method */}
              {paymentMethod === 'card' && (
                <div className="bg-card rounded-xl shadow-soft p-6 border border-border">
                  <div className="flex items-center gap-2 mb-4">
                    <CreditCard className="w-5 h-5 text-primary" />
                    <h2 className="text-lg font-semibold text-foreground">Card Details</h2>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        required
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                          required
                          value={formData.expiry}
                          onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          required
                          value={formData.cvv}
                          onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'mobile-money' && (
                <div className="bg-card rounded-xl shadow-soft p-6 border border-border">
                  <div className="flex items-center gap-2 mb-4">
                    <Smartphone className="w-5 h-5 text-primary" />
                    <h2 className="text-lg font-semibold text-foreground">Mobile Money Details</h2>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="mobileProvider">Provider</Label>
                      <select
                        id="mobileProvider"
                        className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        value={formData.mobileProvider}
                        onChange={(e) => setFormData({ ...formData, mobileProvider: e.target.value })}
                      >
                        <option value="mpesa">M-Pesa</option>
                        <option value="gcash">GCash</option>
                        <option value="mtn">MTN Mobile Money</option>
                        <option value="airtel">Airtel Money</option>
                        <option value="orange">Orange Money</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="mobileNumber">Mobile Number</Label>
                      <Input
                        id="mobileNumber"
                        type="tel"
                        placeholder="+254 7XX XXX XXX"
                        required
                        value={formData.mobileNumber}
                        onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                      />
                    </div>
                    <div className="bg-accent/10 rounded-lg p-4">
                      <p className="text-sm text-muted-foreground">
                        You will receive a payment prompt on your phone. Please enter your PIN to complete the transaction.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'wallet' && (
                <div className="bg-card rounded-xl shadow-soft p-6 border border-border">
                  <div className="flex items-center gap-2 mb-4">
                    <Wallet className="w-5 h-5 text-primary" />
                    <h2 className="text-lg font-semibold text-foreground">Digital Wallet</h2>
                  </div>
                  <div className="space-y-3">
                    <button
                      type="button"
                      className="w-full p-4 rounded-xl border-2 border-border hover:border-primary/50 transition-all flex items-center gap-3"
                    >
                      <div className="w-10 h-10 bg-foreground rounded-lg flex items-center justify-center">
                        <span className="text-background text-lg font-bold">A</span>
                      </div>
                      <span className="font-medium text-foreground">Apple Pay</span>
                    </button>
                    <button
                      type="button"
                      className="w-full p-4 rounded-xl border-2 border-border hover:border-primary/50 transition-all flex items-center gap-3"
                    >
                      <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                        <span className="text-primary-foreground text-lg font-bold">G</span>
                      </div>
                      <span className="font-medium text-foreground">Google Pay</span>
                    </button>
                  </div>
                </div>
              )}

              {paymentMethod === 'cod' && (
                <div className="bg-card rounded-xl shadow-soft p-6 border border-border">
                  <div className="flex items-center gap-2 mb-4">
                    <Banknote className="w-5 h-5 text-primary" />
                    <h2 className="text-lg font-semibold text-foreground">Cash on Delivery</h2>
                  </div>
                  <div className="bg-accent/10 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-2">
                      Pay with cash when your order is delivered. Please have the exact amount ready.
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      Amount due: <span className="text-primary">${total.toFixed(2)}</span>
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Order Summary */}
            <div>
              <div className="bg-card rounded-xl shadow-soft p-6 sticky top-24 border border-border">
                <h2 className="text-lg font-semibold text-foreground mb-4">Order Summary</h2>

                <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground text-sm truncate">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        <p className="text-sm font-medium text-primary">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 space-y-2">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span className="text-primary">Free</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>Payment</span>
                    <span className="flex items-center gap-1">
                      {(() => {
                        const method = paymentMethods.find(m => m.id === paymentMethod);
                        const Icon = method?.icon || CreditCard;
                        return (
                          <>
                            <Icon className="w-4 h-4" />
                            {method?.label}
                          </>
                        );
                      })()}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-foreground pt-2">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full mt-6"
                  size="lg"
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : paymentMethod === 'cod' ? 'Place Order' : `Pay $${total.toFixed(2)}`}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
