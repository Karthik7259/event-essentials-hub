import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { products, categories } from '@/lib/products';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('name');

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        p =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    switch (sortBy) {
      case 'price-low':
        filtered = [...filtered].sort((a, b) => a.pricePerDay - b.pricePerDay);
        break;
      case 'price-high':
        filtered = [...filtered].sort((a, b) => b.pricePerDay - a.pricePerDay);
        break;
      case 'name':
      default:
        filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [searchQuery, selectedCategory, sortBy]);

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    if (value === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', value);
    }
    setSearchParams(searchParams);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSortBy('name');
    setSearchParams({});
  };

  const activeFiltersCount = [
    searchQuery !== '',
    selectedCategory !== 'all',
    sortBy !== 'name'
  ].filter(Boolean).length;

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
              Collection
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-semibold text-primary-foreground mb-4">
              Premium Inventory
            </h1>
            <p className="text-lg text-primary-foreground/70 max-w-xl">
              Discover our curated selection of world-class event infrastructure
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="py-6 border-b border-border bg-card/80 backdrop-blur-md sticky top-20 lg:top-24 z-40">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-12 pl-11 rounded-xl border-border bg-secondary/50"
                />
              </div>

              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                <SelectTrigger className="h-12 w-full md:w-[200px] rounded-xl border-border bg-secondary/50">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="all" className="rounded-lg">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id} className="rounded-lg">
                      {cat.icon} {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="h-12 w-full md:w-[180px] rounded-xl border-border bg-secondary/50">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="name" className="rounded-lg">Name (A-Z)</SelectItem>
                  <SelectItem value="price-low" className="rounded-lg">Price: Low to High</SelectItem>
                  <SelectItem value="price-high" className="rounded-lg">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>

              {/* Clear Filters */}
              {activeFiltersCount > 0 && (
                <Button 
                  variant="ghost" 
                  onClick={clearFilters} 
                  className="h-12 gap-2 rounded-xl text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                  Clear ({activeFiltersCount})
                </Button>
              )}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-6">
            {filteredProducts.length > 0 ? (
              <>
                <p className="text-sm text-muted-foreground mb-8">
                  Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {filteredProducts.map((product, index) => (
                    <div 
                      key={product.id} 
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-24">
                <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="h-10 w-10 text-muted-foreground/50" />
                </div>
                <h3 className="text-xl font-display font-semibold text-foreground mb-2">No products found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search or filter criteria
                </p>
                <Button variant="outline" onClick={clearFilters} className="rounded-full px-6">
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Products;
