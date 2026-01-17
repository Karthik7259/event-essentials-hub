import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowUpRight, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 gradient-gold rounded-xl flex items-center justify-center shadow-gold">
                <span className="text-primary font-display text-2xl font-bold">E</span>
              </div>
              <div>
                <h3 className="font-display text-2xl font-semibold">EventRent</h3>
                <p className="text-[10px] uppercase tracking-[0.2em] text-primary-foreground/50">Premium Rentals</p>
              </div>
            </Link>
            <p className="text-sm text-primary-foreground/60 leading-relaxed max-w-xs">
              India's premier destination for world-class event and exhibition infrastructure solutions.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Linkedin, href: '#' },
                { icon: Instagram, href: '#' },
              ].map((social, i) => (
                <a 
                  key={i}
                  href={social.href} 
                  className="w-10 h-10 rounded-xl bg-primary-foreground/5 hover:bg-primary-foreground/10 flex items-center justify-center transition-colors duration-300"
                >
                  <social.icon className="h-4 w-4 text-primary-foreground/70" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-primary-foreground/40 mb-6">Navigation</h4>
            <ul className="space-y-4">
              {['Collection', 'Categories', 'About', 'Contact'].map(link => (
                <li key={link}>
                  <Link 
                    to={`/${link.toLowerCase()}`} 
                    className="text-sm text-primary-foreground/70 hover:text-accent transition-colors duration-300 flex items-center gap-2 group"
                  >
                    {link}
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="lg:col-span-3">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-primary-foreground/40 mb-6">Categories</h4>
            <ul className="space-y-4">
              {['Stalls & Hangers', 'Furniture', 'Lighting & Power', 'Staging', 'Services'].map(cat => (
                <li key={cat}>
                  <Link 
                    to="/categories" 
                    className="text-sm text-primary-foreground/70 hover:text-accent transition-colors duration-300 flex items-center gap-2 group"
                  >
                    {cat}
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-primary-foreground/40 mb-6">Get in Touch</h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center shrink-0">
                  <MapPin className="h-4 w-4 text-accent" />
                </div>
                <span className="text-sm text-primary-foreground/70 leading-relaxed">
                  123 Event Plaza, Industrial Area<br />New Delhi - 110001
                </span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center shrink-0">
                  <Phone className="h-4 w-4 text-accent" />
                </div>
                <span className="text-sm text-primary-foreground/70">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center shrink-0">
                  <Mail className="h-4 w-4 text-accent" />
                </div>
                <span className="text-sm text-primary-foreground/70">hello@eventrent.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-primary-foreground/40">
            © 2024 EventRent. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-xs text-primary-foreground/40 hover:text-primary-foreground/70 transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-primary-foreground/40 hover:text-primary-foreground/70 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
