import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Category } from '@/lib/products';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface CategoryCardProps {
  category: Category;
  index?: number;
}

const CategoryCard = ({ category, index = 0 }: CategoryCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link 
      to={`/products?category=${category.id}`}
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative h-full">
        {/* Hover glow effect */}
        <div className={cn(
          "absolute -inset-1 rounded-3xl bg-gradient-to-br from-accent/30 via-transparent to-accent/20 opacity-0 blur transition-opacity duration-500",
          isHovered && "opacity-100"
        )} />

        <div className="relative luxury-card h-full p-8 flex flex-col overflow-hidden">
          {/* Background pattern */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-secondary to-transparent rounded-bl-full opacity-50" />

          {/* Icon */}
          <div className="relative mb-6">
            <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center text-3xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
              {category.icon}
            </div>
            <div className={cn(
              "absolute -right-2 -top-2 w-6 h-6 rounded-full gradient-gold flex items-center justify-center opacity-0 transition-all duration-300",
              isHovered && "opacity-100 scale-100",
              !isHovered && "scale-75"
            )}>
              <ArrowUpRight className="h-3.5 w-3.5 text-primary" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 relative">
            <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-accent transition-colors duration-300">
              {category.name}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {category.description}
            </p>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-border relative">
            <span className="text-sm font-medium text-muted-foreground">
              {category.productCount} Products
            </span>
            <span className="flex items-center gap-2 text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
              Explore
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
