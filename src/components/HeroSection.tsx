import { Link } from 'react-router-dom';
import { ArrowRight, Play, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-event.jpg';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Premium exhibition setup" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-accent/5 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="max-w-3xl">
          {/* Badge */}
          <div 
            className="inline-flex items-center gap-3 glass rounded-full px-5 py-2.5 mb-8 animate-fade-in"
            style={{ animationDelay: '0.1s' }}
          >
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />
              ))}
            </div>
            <span className="text-sm font-medium text-primary-foreground/90">
              Trusted by 500+ Enterprise Clients
            </span>
          </div>

          {/* Heading */}
          <h1 
            className="text-5xl md:text-6xl lg:text-7xl font-display font-semibold text-primary-foreground leading-[1.1] mb-8 animate-slide-up"
            style={{ animationDelay: '0.2s' }}
          >
            World-Class Event{' '}
            <span className="text-gradient-gold">Infrastructure</span>{' '}
            <br className="hidden md:block" />
            On Demand
          </h1>

          {/* Subheading */}
          <p 
            className="text-lg md:text-xl text-primary-foreground/70 mb-10 max-w-xl leading-relaxed animate-slide-up font-light"
            style={{ animationDelay: '0.3s' }}
          >
            Premium exhibition stalls, staging solutions, and complete event infrastructure — 
            designed for enterprises that demand excellence.
          </p>

          {/* CTA Buttons */}
          <div 
            className="flex flex-wrap gap-4 mb-16 animate-slide-up"
            style={{ animationDelay: '0.4s' }}
          >
            <Link to="/products">
              <Button 
                size="lg" 
                className="h-14 px-8 rounded-full gradient-gold text-primary font-semibold shadow-gold hover:shadow-xl transition-all duration-500 group"
              >
                Explore Collection
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              className="h-14 px-8 rounded-full border-primary-foreground/20 text-primary-foreground bg-primary-foreground/5 hover:bg-primary-foreground/10 backdrop-blur-sm"
            >
              <Play className="mr-2 h-4 w-4" />
              Watch Showreel
            </Button>
          </div>

          {/* Stats */}
          <div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-primary-foreground/10 animate-slide-up"
            style={{ animationDelay: '0.5s' }}
          >
            {[
              { value: '500+', label: 'Events Delivered' },
              { value: '50+', label: 'Product Lines' },
              { value: '15+', label: 'Years Excellence' },
              { value: '24/7', label: 'Premium Support' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl md:text-4xl font-display font-semibold text-accent mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-primary-foreground/50 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary-foreground/50 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
