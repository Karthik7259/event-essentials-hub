import { useState } from 'react';
import { Plus, Minus, ArrowRight, Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { cn } from '@/lib/utils';

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [days, setDays] = useState(1);
  const [added, setAdded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, quantity, days);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const totalPrice = product.pricePerDay * quantity * days;

  return (
    <div 
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Premium border effect on hover */}
      <div className={cn(
        "absolute -inset-0.5 rounded-3xl bg-gradient-to-br from-accent/50 via-transparent to-accent/30 opacity-0 blur-sm transition-opacity duration-500",
        isHovered && "opacity-100"
      )} />

      <div className="relative bg-card rounded-2xl overflow-hidden shadow-card transition-all duration-500 group-hover:shadow-luxury">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Premium badge */}
          <div className="absolute top-4 left-4">
            <div className="flex items-center gap-1.5 bg-card/90 backdrop-blur-md rounded-full px-3 py-1.5 shadow-lg">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              <span className="text-xs font-semibold text-foreground">Premium</span>
            </div>
          </div>

          {/* Price badge */}
          <div className="absolute top-4 right-4">
            <div className="gradient-gold rounded-full px-4 py-2 shadow-gold">
              <span className="text-sm font-bold text-primary">₹{product.pricePerDay}</span>
              <span className="text-xs text-primary/70">/day</span>
            </div>
          </div>

          {/* Unavailable overlay */}
          {!product.available && (
            <div className="absolute inset-0 bg-primary/70 backdrop-blur-sm flex items-center justify-center">
              <span className="bg-card text-foreground px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                Currently Reserved
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Title & Description */}
          <div>
            <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-accent transition-colors duration-300">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
              {product.description}
            </p>
          </div>

          {/* Specifications */}
          {product.specifications && Array.isArray(product.specifications) && product.specifications.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.specifications.slice(0, 2).map((spec, i) => (
                <span 
                  key={i} 
                  className="text-xs font-medium bg-secondary text-muted-foreground px-3 py-1.5 rounded-full"
                >
                  {spec}
                </span>
              ))}
            </div>
          )}

          {/* Controls */}
          <div className="space-y-4 pt-4 border-t border-border">
            {/* Quantity & Days */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">
                  Quantity
                </label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 rounded-xl"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={!product.available}
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </Button>
                  <span className="w-10 text-center font-semibold text-foreground">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 rounded-xl"
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={!product.available}
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">
                  Duration
                </label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 rounded-xl"
                    onClick={() => setDays(Math.max(1, days - 1))}
                    disabled={!product.available}
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </Button>
                  <span className="w-10 text-center font-semibold text-foreground">{days}d</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 rounded-xl"
                    onClick={() => setDays(days + 1)}
                    disabled={!product.available}
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Total & CTA */}
            <div className="flex items-center justify-between pt-2">
              <div>
                <span className="text-xs text-muted-foreground uppercase tracking-wide">Total</span>
                <p className="text-2xl font-display font-semibold text-foreground">
                  ₹{totalPrice.toLocaleString()}
                </p>
              </div>
              <Button
                className={cn(
                  "h-12 px-6 rounded-xl font-semibold transition-all duration-500 group/btn",
                  added
                    ? "bg-green-500 hover:bg-green-500 text-white"
                    : "gradient-luxury text-primary-foreground shadow-lg hover:shadow-xl"
                )}
                onClick={handleAddToCart}
                disabled={!product.available || added}
              >
                {added ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Added
                  </>
                ) : (
                  <>
                    Request
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
