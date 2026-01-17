import { useState } from 'react';
import { Plus, Minus, ShoppingCart, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Product } from '@/lib/products';
import { useCart } from '@/contexts/CartContext';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [quantity, setQuantity] = useState(1);
  const [days, setDays] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, quantity, days);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const totalPrice = product.pricePerDay * quantity * days;

  return (
    <Card className="group overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-elevated bg-card">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {!product.available && (
          <div className="absolute inset-0 bg-foreground/60 flex items-center justify-center">
            <span className="bg-destructive text-destructive-foreground px-4 py-2 rounded-full text-sm font-medium">
              Currently Unavailable
            </span>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold">
            ₹{product.pricePerDay}/day
          </span>
        </div>
      </div>

      <CardContent className="p-4 space-y-4">
        <div>
          <h3 className="font-semibold text-lg text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
            {product.description}
          </p>
        </div>

        {product.specifications && (
          <ul className="flex flex-wrap gap-1.5">
            {product.specifications.slice(0, 2).map((spec, i) => (
              <li key={i} className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-md">
                {spec}
              </li>
            ))}
          </ul>
        )}

        <div className="space-y-3 pt-2 border-t border-border">
          {/* Quantity Selector */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Quantity:</span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={!product.available}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-8 text-center font-medium">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setQuantity(quantity + 1)}
                disabled={!product.available}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Days Selector */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Rental Days:</span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setDays(Math.max(1, days - 1))}
                disabled={!product.available}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-8 text-center font-medium">{days}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setDays(days + 1)}
                disabled={!product.available}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Total Price */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-sm font-medium text-foreground">Total:</span>
            <span className="text-lg font-bold text-primary">₹{totalPrice.toLocaleString()}</span>
          </div>

          {/* Add to Cart Button */}
          <Button
            className={cn(
              "w-full gap-2 transition-all",
              added
                ? "bg-green-600 hover:bg-green-600"
                : "bg-primary hover:bg-primary/90"
            )}
            onClick={handleAddToCart}
            disabled={!product.available || added}
          >
            {added ? (
              <>
                <Check className="h-4 w-4" />
                Added to Cart
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4" />
                Add to Cart
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
