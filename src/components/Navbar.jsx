import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalItems } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Collection' },
    { href: '/categories', label: 'Categories' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
      scrolled 
        ? "bg-card/90 backdrop-blur-xl shadow-soft border-b border-border/50" 
        : "bg-transparent"
    )}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-11 h-11 gradient-luxury rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-gold transition-shadow duration-500">
                <span className="text-primary-foreground font-display text-2xl font-bold">E</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-accent rounded-full opacity-80" />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-display text-2xl font-semibold text-foreground tracking-tight">EventRent</h1>
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-medium">Premium Rentals</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "relative px-5 py-2.5 text-sm font-medium transition-all duration-300 rounded-full",
                  isActive(link.href) 
                    ? "text-foreground" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <Link to="/cart" className="relative group">
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative w-11 h-11 rounded-full hover:bg-secondary"
              >
                <ShoppingCart className="h-5 w-5 text-foreground/80 group-hover:text-foreground transition-colors" />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 gradient-gold text-primary text-[10px] font-bold rounded-full flex items-center justify-center shadow-gold animate-scale-in">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>

            <div className="hidden md:flex items-center gap-2">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 border border-border/50">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">
                      {user?.name || user?.email?.split('@')[0] || 'User'}
                    </span>
                  </div>
                  <Button 
                    onClick={handleLogout}
                    variant="ghost" 
                    size="sm" 
                    className="gap-2 rounded-full px-5 text-sm font-medium hover:bg-secondary text-red-500 hover:text-red-600"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                </>
              ) : (
                <Link to="/auth">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="gap-2 rounded-full px-5 text-sm font-medium hover:bg-secondary"
                  >
                    <User className="h-4 w-4" />
                    Sign In
                  </Button>
                </Link>
              )}

              <Link to="/admin">
                <Button 
                  size="sm" 
                  className="rounded-full px-6 gradient-luxury text-primary-foreground shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  Dashboard
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden w-11 h-11 rounded-full"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden py-6 border-t border-border/50 animate-fade-in">
            <div className="flex flex-col gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300",
                    isActive(link.href)
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-2 px-4 pt-4 mt-2 border-t border-border/50">
                {isAuthenticated ? (
                  <>
                    <div className="flex-1 px-3 py-2.5 rounded-full bg-secondary/50 border border-border/50 text-sm font-medium text-foreground text-center">
                      {user?.name || user?.email?.split('@')[0] || 'User'}
                    </div>
                    <Button 
                      onClick={handleLogout}
                      size="sm" 
                      className="flex-1 rounded-full gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                      variant="outline"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <Link to="/auth" className="flex-1" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full gap-2 rounded-full">
                      <User className="h-4 w-4" />
                      Sign In
                    </Button>
                  </Link>
                )}
                <Link to="/admin" className="flex-1" onClick={() => setIsOpen(false)}>
                  <Button size="sm" className="w-full rounded-full gradient-luxury text-primary-foreground">
                    Dashboard
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
