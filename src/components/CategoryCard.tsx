import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Category } from '@/lib/products';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link to={`/products?category=${category.id}`}>
      <Card className="group h-full overflow-hidden border-border/50 hover:border-accent/50 transition-all duration-300 hover:shadow-elevated bg-card cursor-pointer">
        <CardContent className="p-6 flex flex-col h-full">
          <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
            {category.icon}
          </div>
          
          <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
            {category.name}
          </h3>
          
          <p className="text-sm text-muted-foreground flex-1">
            {category.description}
          </p>
          
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
            <span className="text-sm text-muted-foreground">
              {category.productCount} products
            </span>
            <span className="text-primary flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all">
              Browse
              <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CategoryCard;
