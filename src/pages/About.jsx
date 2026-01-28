import { CheckCircle2, Award, Users, MapPin, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import heroImage from '@/assets/hero-event.jpg';

const About = () => {
  const milestones = [
    { year: '2009', title: 'Founded', description: 'Established with a vision to revolutionize event infrastructure' },
    { year: '2014', title: 'Expansion', description: 'Expanded to 25+ cities with dedicated warehouses' },
    { year: '2019', title: 'Digital', description: 'Launched our enterprise digital platform' },
    { year: '2024', title: 'Leadership', description: 'Became India\'s largest event infrastructure provider' },
  ];

  const values = [
    { icon: CheckCircle2, title: 'Uncompromising Quality', description: 'Every piece of equipment meets international standards.' },
    { icon: Award, title: 'Reliability', description: 'On-time delivery and flawless execution, guaranteed.' },
    { icon: Users, title: 'Client Partnership', description: 'We build lasting relationships, not just transactions.' },
    { icon: MapPin, title: 'Pan-India Presence', description: 'Serving enterprises across 50+ cities.' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 pt-20 lg:pt-24">
        {/* Hero */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0">
            <img src={heroImage} alt="Our story" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/60" />
          </div>
          <div className="container mx-auto px-6 relative">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent mb-4">
                <Sparkles className="h-4 w-4" />
                Our Story
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-primary-foreground mb-6 leading-tight">
                Crafting Excellence Since 2009
              </h1>
              <p className="text-lg text-primary-foreground/70 leading-relaxed">
                India's premier destination for world-class event and exhibition infrastructure, trusted by Fortune 500 companies.
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent mb-4">
                <Sparkles className="h-4 w-4" />
                The Beginning
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-8">
                From Vision to Leadership
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                EventRent was founded on a simple premise: exceptional events deserve exceptional infrastructure. 
                What started as a small operation in 2009 has grown into India's most trusted event infrastructure company.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, we serve over 500 enterprise clients annually, from Fortune 500 companies to government organizations, 
                delivering world-class solutions that set the standard for excellence in the industry.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 md:py-32 bg-secondary/30">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent mb-4">
                <Sparkles className="h-4 w-4" />
                Our Values
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground">
                What Drives Us
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div 
                  key={value.title} 
                  className="luxury-card p-8 text-center group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-6 transition-all duration-500 group-hover:bg-accent/10 group-hover:scale-110">
                    <value.icon className="h-7 w-7 text-muted-foreground group-hover:text-accent transition-colors" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-3">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent mb-4">
                <Sparkles className="h-4 w-4" />
                Milestones
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground">
                Our Journey
              </h2>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                <div className="absolute left-4 md:left-1/2 h-full w-px bg-border md:-translate-x-1/2" />
                {milestones.map((milestone, index) => (
                  <div 
                    key={milestone.year} 
                    className={`relative flex items-center gap-8 mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  >
                    <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} pl-12 md:pl-0`}>
                      <span className="text-3xl font-display font-semibold text-accent">{milestone.year}</span>
                      <h3 className="text-xl font-semibold text-foreground mt-1">{milestone.title}</h3>
                      <p className="text-muted-foreground mt-2">{milestone.description}</p>
                    </div>
                    <div className="absolute left-4 md:left-1/2 w-4 h-4 gradient-gold rounded-full md:-translate-x-1/2 shadow-gold z-10" />
                    <div className="flex-1 hidden md:block" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
