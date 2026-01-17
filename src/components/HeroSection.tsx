import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-event.jpg';

const HeroSection = () => {
  const features = [
    "Premium Quality Equipment",
    "On-Time Delivery Guaranteed",
    "24/7 Support Available",
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="Exhibition hall" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/70" />
      </div>

      <div className="container mx-auto px-4 py-20 md:py-28 lg:py-36 relative">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 animate-fade-in">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-sm text-primary-foreground/90 font-medium">
              Trusted by 500+ Event Organizers
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground leading-tight mb-6 animate-slide-up">
            Complete Event & Exhibition{' '}
            <span className="text-accent">Infrastructure</span>{' '}
            Solutions
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl animate-slide-up" style={{ animationDelay: '0.1s' }}>
            From stalls and stages to lighting and logistics — everything you need to create 
            memorable events. Professional quality, competitive prices.
          </p>

          <div className="flex flex-wrap gap-3 mb-10 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            {features.map((feature, i) => (
              <div
                key={feature}
                className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-2"
              >
                <CheckCircle2 className="h-4 w-4 text-accent" />
                <span className="text-sm text-primary-foreground/90">{feature}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <Link to="/products">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2 shadow-elevated">
                Browse Products
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                Request Quote
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-16 border-t border-primary-foreground/10 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          {[
            { value: '500+', label: 'Events Served' },
            { value: '50+', label: 'Product Categories' },
            { value: '10+', label: 'Years Experience' },
            { value: '24/7', label: 'Support Available' },
          ].map((stat) => (
            <div key={stat.label} className="text-center md:text-left">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-1">{stat.value}</div>
              <div className="text-sm text-primary-foreground/70">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
