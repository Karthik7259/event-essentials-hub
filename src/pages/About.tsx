import { CheckCircle2, Award, Users, MapPin } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About = () => {
  const milestones = [
    { year: '2014', title: 'Founded', description: 'Started with a vision to simplify event infrastructure' },
    { year: '2017', title: 'Expansion', description: 'Expanded operations to 10+ cities across India' },
    { year: '2020', title: 'Digital', description: 'Launched online platform for seamless rentals' },
    { year: '2024', title: 'Growth', description: '500+ successful events and counting' },
  ];

  const values = [
    { icon: CheckCircle2, title: 'Quality First', description: 'We never compromise on the quality of our equipment and services.' },
    { icon: Award, title: 'Reliability', description: 'On-time delivery and professional setup is our promise.' },
    { icon: Users, title: 'Customer Focus', description: 'Your event success is our top priority.' },
    { icon: MapPin, title: 'Pan-India Reach', description: 'Serving clients across all major cities in India.' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        {/* Header */}
        <section className="gradient-hero py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-4">
              About EventRent
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Your trusted partner for complete event and exhibition infrastructure solutions since 2014
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-display font-bold text-foreground mb-6">Our Story</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                EventRent was born from a simple observation: organizing events shouldn't be complicated. 
                We started in 2014 with a small inventory of basic event equipment and a commitment to 
                making event infrastructure accessible to everyone.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, we're one of India's leading event infrastructure rental companies, serving 
                corporate events, exhibitions, weddings, and large-scale public gatherings. Our 
                comprehensive catalog includes everything from stalls and stages to lighting and logistics.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-display font-bold text-foreground text-center mb-12">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value) => (
                <div key={value.title} className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-display font-bold text-foreground text-center mb-12">
              Our Journey
            </h2>
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                <div className="absolute left-4 md:left-1/2 h-full w-0.5 bg-border -translate-x-1/2" />
                {milestones.map((milestone, index) => (
                  <div key={milestone.year} className={`relative flex items-center gap-8 mb-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} pl-12 md:pl-0`}>
                      <span className="text-accent font-bold text-xl">{milestone.year}</span>
                      <h3 className="text-lg font-semibold text-foreground">{milestone.title}</h3>
                      <p className="text-muted-foreground text-sm">{milestone.description}</p>
                    </div>
                    <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-primary rounded-full -translate-x-1/2 z-10" />
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
