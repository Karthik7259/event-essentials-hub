import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Truck, Clock, HeadphonesIcon, Sparkles, ArrowUpRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import CategoryCard from '@/components/CategoryCard';
import ProductCard from '@/components/ProductCard';
import { categories } from '@/lib/products';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const Index = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/product/list`);
        const data = await response.json();
        
        if (data.success && data.products) {
          // Transform backend products to frontend format
          const transformedProducts = data.products.map(product => ({
            id: product._id,
            _id: product._id, // Keep both for compatibility
            name: product.name,
            category: product.category,
            description: product.description,
            image: product.images && product.images[0] ? product.images[0] : 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
            images: product.images || [],
            pricePerDay: product.pricePerDay,
            available: product.isAvailable,
            isAvailable: product.isAvailable,
            rating: product.rating || 0,
            reviews: product.reviews || [],
            specifications: product.specifications || []
          }));
          
          // Get first 4 products as featured
          setFeaturedProducts(transformedProducts.slice(0, 4));
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const benefits = [
    {
      icon: Shield,
      title: "Certified Quality",
      description: "Every piece undergoes rigorous inspection before delivery"
    },
    {
      icon: Truck,
      title: "Pan-India Network",
      description: "Seamless delivery and setup across 50+ cities"
    },
    {
      icon: Clock,
      title: "Flexible Terms",
      description: "Custom rental durations tailored to your event"
    },
    {
      icon: HeadphonesIcon,
      title: "Concierge Support",
      description: "Dedicated account managers available 24/7"
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />

        {/* Trusted By Section */}
        <section className="py-12 bg-secondary/50 border-y border-border/50">
          <div className="container mx-auto px-6">
            <p className="text-center text-xs font-medium uppercase tracking-widest text-muted-foreground mb-8">
              Trusted by Industry Leaders
            </p>
            <div className="flex flex-wrap justify-center items-center gap-12 opacity-50">
              {['TATA', 'Reliance', 'Infosys', 'Wipro', 'HDFC'].map((brand) => (
                <span key={brand} className="text-2xl font-display font-semibold text-muted-foreground/60">
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div className="max-w-xl">
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent mb-4">
                  <Sparkles className="h-4 w-4" />
                  Categories
                </span>
                <h2 className="text-4xl md:text-5xl font-display font-semibold text-foreground mb-4">
                  Curated Collections
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Explore our meticulously organized categories featuring the finest event infrastructure
                </p>
              </div>
              <Link to="/categories">
                <Button variant="outline" className="gap-2 rounded-full px-6 h-12 border-border hover:bg-secondary">
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.slice(0, 4).map((category, index) => (
                <CategoryCard key={category.id} category={category} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-24 md:py-32 bg-secondary/30">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div className="max-w-xl">
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent mb-4">
                  <Sparkles className="h-4 w-4" />
                  Featured
                </span>
                <h2 className="text-4xl md:text-5xl font-display font-semibold text-foreground mb-4">
                  Premium Selection
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Hand-picked products that set the standard for excellence in event infrastructure
                </p>
              </div>
              <Link to="/products">
                <Button className="gap-2 rounded-full px-6 h-12 gradient-luxury text-primary-foreground shadow-lg hover:shadow-xl transition-shadow">
                  Explore Collection
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {loading ? (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground">Loading products...</p>
                </div>
              ) : featuredProducts.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground">No products available</p>
                </div>
              ) : (
                featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              )}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent mb-4">
                <Sparkles className="h-4 w-4" />
                Why Choose Us
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-semibold text-foreground mb-4">
                The EventRent Difference
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Experience unparalleled service quality and attention to detail
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div 
                  key={benefit.title} 
                  className="luxury-card p-8 text-center group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-6 transition-all duration-500 group-hover:bg-accent/10 group-hover:scale-110">
                    <benefit.icon className="h-7 w-7 text-muted-foreground group-hover:text-accent transition-colors duration-300" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 md:py-32 gradient-luxury relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          </div>

          <div className="container mx-auto px-6 relative">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-primary-foreground mb-6 leading-tight">
                Ready to Create Something{' '}
                <span className="text-gradient-gold">Extraordinary?</span>
              </h2>
              <p className="text-lg text-primary-foreground/70 mb-10 max-w-xl mx-auto">
                Connect with our team for personalized consultation and bespoke solutions
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/products">
                  <Button 
                    size="lg" 
                    className="h-14 px-8 rounded-full gradient-gold text-primary font-semibold shadow-gold hover:shadow-xl transition-all duration-500"
                  >
                    Start Exploring
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="h-14 px-8 rounded-full border-primary-foreground/20 text-primary-foreground bg-primary-foreground/5 hover:bg-primary-foreground/10"
                  >
                    Schedule Consultation
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
