import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, X } from 'lucide-react';
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

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        p =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    // Sort
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
      
      <main className="flex-1">
        {/* Header */}
        <section className="gradient-hero py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-2">
              Our Products
            </h1>
            <p className="text-primary-foreground/80 max-w-2xl">
              Browse our complete catalog of event and exhibition infrastructure available for rent
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="py-6 border-b border-border bg-card sticky top-16 md:top-20 z-40">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.icon} {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name (A-Z)</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>

              {/* Clear Filters */}
              {activeFiltersCount > 0 && (
                <Button variant="ghost" onClick={clearFilters} className="gap-2">
                  <X className="h-4 w-4" />
                  Clear ({activeFiltersCount})
                </Button>
              )}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            {filteredProducts.length > 0 ? (
              <>
                <p className="text-sm text-muted-foreground mb-6">
                  Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Filter className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">No products found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <Button variant="outline" onClick={clearFilters}>
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
