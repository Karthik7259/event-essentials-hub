import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Truck, Clock, HeadphonesIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import CategoryCard from '@/components/CategoryCard';
import ProductCard from '@/components/ProductCard';
import { categories, products } from '@/lib/products';

const Index = () => {
  const featuredProducts = products.slice(0, 4);

  const benefits = [
    {
      icon: Shield,
      title: "Quality Assured",
      description: "All our equipment undergoes rigorous quality checks before every rental."
    },
    {
      icon: Truck,
      title: "Pan-India Delivery",
      description: "We deliver and set up across all major cities with our dedicated fleet."
    },
    {
      icon: Clock,
      title: "Flexible Rentals",
      description: "Rent for a day, a week, or months. We adapt to your event timeline."
    },
    {
      icon: HeadphonesIcon,
      title: "Dedicated Support",
      description: "On-site supervisors and 24/7 helpline for seamless event execution."
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />

        {/* Categories Section */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
                  Browse by Category
                </h2>
                <p className="text-muted-foreground max-w-xl">
                  Explore our comprehensive range of event infrastructure solutions
                </p>
              </div>
              <Link to="/categories">
                <Button variant="outline" className="gap-2">
                  View All Categories
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.slice(0, 4).map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
                  Featured Products
                </h2>
                <p className="text-muted-foreground max-w-xl">
                  Our most popular rental items trusted by event organizers nationwide
                </p>
              </div>
              <Link to="/products">
                <Button variant="outline" className="gap-2">
                  View All Products
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Why Choose <span className="text-accent">EventRent?</span>
              </h2>
              <p className="text-primary-foreground/80 max-w-2xl mx-auto">
                We're committed to making your event a success with reliable equipment and professional service
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="text-center p-6">
                  <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-primary-foreground/70 text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-br from-secondary to-muted rounded-3xl p-8 md:p-12 lg:p-16 text-center">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Ready to Plan Your Next Event?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                Get in touch with our team for custom quotes and expert consultation on your event infrastructure needs.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/products">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 gap-2">
                    Start Browsing
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline">
                    Contact Us
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
