import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ArrowLeft, Sparkles, Calendar, MapPin, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { orderAPI } from '@/lib/api';
import { useState } from 'react';
import { toast } from 'sonner';

const Cart = () => {
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity, updateDays, clearCart, totalPrice } = useCart();
  const { isAuthenticated, token } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOrderDialog, setShowOrderDialog] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    eventDate: '',
    eventLocation: '',
    deliveryAddress: {
      street: '',
      city: '',
      state: '',
      pincode: '',
    },
    notes: '',
  });

  const handleInputChange = (field, value) => {
    setOrderDetails(prev => ({ ...prev, [field]: value }));
  };

  const handleAddressChange = (field, value) => {
    setOrderDetails(prev => ({
      ...prev,
      deliveryAddress: { ...prev.deliveryAddress, [field]: value }
    }));
  };

  const handleSubmitOrder = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to submit order');
      navigate('/auth');
      return;
    }

    if (!orderDetails.eventDate) {
      toast.error('Please enter event date');
      return;
    }

    if (!orderDetails.eventLocation) {
      toast.error('Please enter event location');
      return;
    }

    setIsSubmitting(true);
    try {
      const orderData = {
        items: items.map(item => ({
          productId: item.product.id,
          quantity: item.quantity,
          days: item.days,
        })),
        eventDate: orderDetails.eventDate,
        eventLocation: orderDetails.eventLocation,
        deliveryAddress: orderDetails.deliveryAddress,
        notes: orderDetails.notes,
      };

      const response = await orderAPI.createOrder(orderData, token);

      if (response.success) {
        toast.success('Order submitted successfully! Our team will contact you soon.');
        clearCart();
        setShowOrderDialog(false);
        navigate('/');
      } else {
        toast.error(response.message || 'Failed to submit order');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      toast.error('An error occurred while submitting your order');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRequestClick = () => {
    if (!isAuthenticated) {
      toast.error('Please login to submit request');
      navigate('/auth');
      return;
    }
    setShowOrderDialog(true);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center pt-20 lg:pt-24 py-16">
          <div className="text-center px-6">
            <div className="w-28 h-28 bg-secondary rounded-full flex items-center justify-center mx-auto mb-8">
              <ShoppingBag className="h-12 w-12 text-muted-foreground/50" />
            </div>
            <h2 className="text-3xl font-display font-semibold text-foreground mb-3">
              Your cart is empty
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Explore our premium collection and add items to your rental request
            </p>
            <Link to="/products">
              <Button className="h-12 px-8 rounded-full gradient-luxury text-primary-foreground shadow-lg hover:shadow-xl transition-all group">
                Explore Collection
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 pt-20 lg:pt-24">
        {/* Header */}
        <section className="py-16 md:py-24 gradient-luxury relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl" />
          </div>
          <div className="container mx-auto px-6 relative">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent mb-4">
              <Sparkles className="h-4 w-4" />
              Rental Cart
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-semibold text-primary-foreground mb-4">
              Your Selection
            </h1>
            <p className="text-lg text-primary-foreground/70">
              Review and finalize your premium rental request
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm text-muted-foreground">
                    {items.length} item{items.length !== 1 ? 's' : ''} selected
                  </span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={clearCart} 
                    className="text-muted-foreground hover:text-destructive rounded-lg"
                  >
                    Clear All
                  </Button>
                </div>

                {items.map((item) => (
                  <Card key={item.product.id} className="luxury-card overflow-hidden border-none">
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row gap-6">
                        {/* Product Image */}
                        <div className="w-full sm:w-36 h-36 rounded-xl overflow-hidden bg-secondary shrink-0">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start gap-4">
                            <div>
                              <h3 className="font-display text-lg font-semibold text-foreground">
                                {item.product.name}
                              </h3>
                              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                {item.product.description}
                              </p>
                              <p className="text-sm font-medium text-accent mt-2">
                                ₹{item.product.pricePerDay}/day
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeFromCart(item.product.id)}
                              className="text-muted-foreground hover:text-destructive shrink-0 rounded-lg"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          {/* Controls */}
                          <div className="flex flex-wrap items-center gap-6 mt-6 pt-6 border-t border-border">
                            <div className="flex items-center gap-3">
                              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Qty</span>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-9 w-9 rounded-xl"
                                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                >
                                  <Minus className="h-3.5 w-3.5" />
                                </Button>
                                <span className="w-10 text-center font-semibold">{item.quantity}</span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-9 w-9 rounded-xl"
                                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                >
                                  <Plus className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Days</span>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-9 w-9 rounded-xl"
                                  onClick={() => updateDays(item.product.id, item.days - 1)}
                                >
                                  <Minus className="h-3.5 w-3.5" />
                                </Button>
                                <span className="w-10 text-center font-semibold">{item.days}</span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-9 w-9 rounded-xl"
                                  onClick={() => updateDays(item.product.id, item.days + 1)}
                                >
                                  <Plus className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                            </div>

                            <div className="ml-auto text-right">
                              <span className="text-2xl font-display font-semibold text-foreground">
                                ₹{(item.product.pricePerDay * item.quantity * item.days).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Link to="/products" className="inline-flex mt-4">
                  <Button variant="ghost" className="gap-2 rounded-full">
                    <ArrowLeft className="h-4 w-4" />
                    Continue Browsing
                  </Button>
                </Link>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="luxury-card sticky top-32 border-none">
                  <CardContent className="p-8">
                    <h3 className="text-lg font-display font-semibold text-foreground mb-6">
                      Order Summary
                    </h3>
                    
                    <div className="space-y-4 pb-6 border-b border-border">
                      {items.map((item) => (
                        <div key={item.product.id} className="flex justify-between text-sm">
                          <span className="text-muted-foreground truncate pr-4">
                            {item.product.name} × {item.quantity} × {item.days}d
                          </span>
                          <span className="text-foreground font-medium shrink-0">
                            ₹{(item.product.pricePerDay * item.quantity * item.days).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between pt-6 mb-8">
                      <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Total</span>
                      <span className="text-3xl font-display font-semibold text-foreground">
                        ₹{totalPrice.toLocaleString()}
                      </span>
                    </div>

                    <Button 
                      onClick={handleRequestClick}
                      className="w-full h-14 rounded-xl gradient-luxury text-primary-foreground font-semibold shadow-lg hover:shadow-xl transition-all group" 
                      size="lg"
                    >
                      Submit Request
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>

                    <p className="text-xs text-muted-foreground text-center mt-4">
                      {isAuthenticated ? 'Complete your rental request' : 'Sign in required to submit your rental request'}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Order Details Dialog */}
      <Dialog open={showOrderDialog} onOpenChange={setShowOrderDialog}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display">Complete Your Request</DialogTitle>
            <DialogDescription>
              Please provide event details to finalize your rental request
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Event Date */}
            <div className="space-y-2">
              <Label htmlFor="eventDate" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Event Date *
              </Label>
              <Input
                id="eventDate"
                type="date"
                value={orderDetails.eventDate}
                onChange={(e) => handleInputChange('eventDate', e.target.value)}
                className="rounded-xl"
                required
              />
            </div>

            {/* Event Location */}
            <div className="space-y-2">
              <Label htmlFor="eventLocation" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Event Location *
              </Label>
              <Input
                id="eventLocation"
                placeholder="Enter event venue or location"
                value={orderDetails.eventLocation}
                onChange={(e) => handleInputChange('eventLocation', e.target.value)}
                className="rounded-xl"
                required
              />
            </div>

            {/* Delivery Address */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Delivery Address</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input
                  placeholder="Street Address"
                  value={orderDetails.deliveryAddress.street}
                  onChange={(e) => handleAddressChange('street', e.target.value)}
                  className="rounded-xl md:col-span-2"
                />
                <Input
                  placeholder="City"
                  value={orderDetails.deliveryAddress.city}
                  onChange={(e) => handleAddressChange('city', e.target.value)}
                  className="rounded-xl"
                />
                <Input
                  placeholder="State"
                  value={orderDetails.deliveryAddress.state}
                  onChange={(e) => handleAddressChange('state', e.target.value)}
                  className="rounded-xl"
                />
                <Input
                  placeholder="Pincode"
                  value={orderDetails.deliveryAddress.pincode}
                  onChange={(e) => handleAddressChange('pincode', e.target.value)}
                  className="rounded-xl"
                />
              </div>
            </div>

            {/* Additional Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Additional Notes
              </Label>
              <Textarea
                id="notes"
                placeholder="Any special requirements or instructions..."
                value={orderDetails.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                className="rounded-xl min-h-[100px]"
              />
            </div>

            {/* Order Summary */}
            <div className="bg-secondary rounded-xl p-4 space-y-2">
              <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Order Summary</h4>
              {items.map((item) => (
                <div key={item.product.id} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {item.product.name} × {item.quantity} × {item.days}d
                  </span>
                  <span className="font-medium">
                    ₹{(item.product.pricePerDay * item.quantity * item.days).toLocaleString()}
                  </span>
                </div>
              ))}
              <div className="flex justify-between pt-2 border-t border-border">
                <span className="font-semibold">Total Amount</span>
                <span className="text-xl font-bold text-accent">₹{totalPrice.toLocaleString()}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setShowOrderDialog(false)}
                className="flex-1 rounded-xl"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmitOrder}
                disabled={isSubmitting}
                className="flex-1 rounded-xl gradient-luxury text-primary-foreground"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Cart;
