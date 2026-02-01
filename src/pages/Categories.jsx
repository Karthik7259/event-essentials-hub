import { Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CategoryCard from '@/components/CategoryCard';
import { categories } from '@/lib/products';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Categories = () => {
  const [categoriesWithCounts, setCategoriesWithCounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProductCounts = async () => {
      try {
        console.log('Fetching products from:', `${API_BASE_URL}/api/product/list`);
        const response = await fetch(`${API_BASE_URL}/api/product/list`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        console.log('Raw response data:', data);
        
        // Handle both array and nested response formats
        const products = Array.isArray(data) ? data : (data.products || []);
        console.log('Extracted products:', products);
        console.log('Total products found:', products.length);

        // Count products by category
        const countByCategory = {};
        categories.forEach(cat => {
          countByCategory[cat.id] = 0;
        });

        products.forEach(product => {
          console.log('Product category:', product.category);
          if (countByCategory.hasOwnProperty(product.category)) {
            countByCategory[product.category]++;
          }
        });

        console.log('Count by category:', countByCategory);

        // Update categories with actual counts
        const updatedCategories = categories.map(cat => ({
          ...cat,
          productCount: countByCategory[cat.id] || 0
        }));

        console.log('Updated categories:', updatedCategories);
        setCategoriesWithCounts(updatedCategories);
      } catch (error) {
        console.error('Error fetching products:', error);
        // Fallback to original categories if fetch fails
        setCategoriesWithCounts(categories);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductCounts();
  }, []);

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
              Categories
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-semibold text-primary-foreground mb-4">
              Curated Collections
            </h1>
            <p className="text-lg text-primary-foreground/70 max-w-xl">
              Explore our meticulously organized categories of premium event infrastructure
            </p>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading categories...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categoriesWithCounts.map((category, index) => (
                  <div 
                    key={category.id} 
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CategoryCard category={category} index={index} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Categories;
