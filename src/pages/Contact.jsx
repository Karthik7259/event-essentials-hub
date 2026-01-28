import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message Sent",
        description: "Our team will get back to you within 24 hours.",
      });
      e.target.reset();
    }, 1000);
  };

  const contactInfo = [
    { icon: MapPin, title: 'Head Office', content: '123 Event Plaza, Industrial Area, New Delhi - 110001' },
    { icon: Phone, title: 'Phone', content: '+91 98765 43210' },
    { icon: Mail, title: 'Email', content: 'enterprise@eventrent.com' },
    { icon: Clock, title: 'Hours', content: 'Mon - Sat: 9:00 AM - 7:00 PM' },
  ];

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
              Get in Touch
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-semibold text-primary-foreground mb-4">
              Let's Discuss Your Project
            </h1>
            <p className="text-lg text-primary-foreground/70 max-w-xl">
              Connect with our enterprise team for personalized consultation
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <Card className="luxury-card border-none">
                <CardContent className="p-8 md:p-10">
                  <h2 className="text-2xl font-display font-semibold text-foreground mb-8">
                    Send us a Message
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                        <Input 
                          id="name" 
                          placeholder="John Doe" 
                          className="h-12 rounded-xl border-border bg-secondary/50 focus:bg-card" 
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="you@company.com" 
                          className="h-12 rounded-xl border-border bg-secondary/50 focus:bg-card" 
                          required 
                        />
                      </div>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-medium">Phone</Label>
                        <Input 
                          id="phone" 
                          type="tel" 
                          placeholder="+91 98765 43210" 
                          className="h-12 rounded-xl border-border bg-secondary/50 focus:bg-card" 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company" className="text-sm font-medium">Company</Label>
                        <Input 
                          id="company" 
                          placeholder="Your company" 
                          className="h-12 rounded-xl border-border bg-secondary/50 focus:bg-card" 
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-sm font-medium">Subject</Label>
                      <Input 
                        id="subject" 
                        placeholder="How can we help?" 
                        className="h-12 rounded-xl border-border bg-secondary/50 focus:bg-card" 
                        required 
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sm font-medium">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us about your event and requirements..."
                        rows={5}
                        className="rounded-xl border-border bg-secondary/50 focus:bg-card resize-none"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-14 rounded-xl gradient-luxury text-primary-foreground font-semibold shadow-lg hover:shadow-xl transition-all group"
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
                    Contact Information
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Our enterprise team is ready to assist you with custom solutions and dedicated support.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  {contactInfo.map((info) => (
                    <Card key={info.title} className="luxury-card border-none group">
                      <CardContent className="p-6 flex gap-4">
                        <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center shrink-0 group-hover:bg-accent/10 transition-colors">
                          <info.icon className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{info.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{info.content}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Map Placeholder */}
                <Card className="luxury-card overflow-hidden border-none">
                  <div className="aspect-video bg-secondary flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                        <MapPin className="h-7 w-7 text-muted-foreground/50" />
                      </div>
                      <p className="text-muted-foreground">Interactive map available on production</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
