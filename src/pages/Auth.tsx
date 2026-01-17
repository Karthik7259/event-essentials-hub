import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, User, ArrowLeft, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import heroImage from '@/assets/hero-event.jpg';

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Backend Required",
        description: "Please connect Lovable Cloud to enable authentication.",
      });
    }, 1000);
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Backend Required",
        description: "Please connect Lovable Cloud to enable user registration.",
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          {/* Back Link */}
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-12 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          {/* Logo */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-12 h-12 gradient-luxury rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-primary-foreground font-display text-2xl font-bold">E</span>
            </div>
            <div>
              <h1 className="font-display text-2xl font-semibold text-foreground">EventRent</h1>
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Premium Rentals</p>
            </div>
          </div>

          {/* Welcome Text */}
          <div className="mb-8">
            <h2 className="text-3xl font-display font-semibold text-foreground mb-2">Welcome</h2>
            <p className="text-muted-foreground">
              Sign in to access your rental dashboard
            </p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-secondary rounded-xl p-1 h-12">
              <TabsTrigger value="login" className="rounded-lg text-sm font-medium data-[state=active]:bg-card data-[state=active]:shadow-sm">
                Sign In
              </TabsTrigger>
              <TabsTrigger value="signup" className="rounded-lg text-sm font-medium data-[state=active]:bg-card data-[state=active]:shadow-sm">
                Create Account
              </TabsTrigger>
            </TabsList>

            {/* Login Form */}
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="login-email" className="text-sm font-medium">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="you@company.com"
                      className="h-12 pl-11 rounded-xl border-border bg-secondary/50 focus:bg-card"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="login-password" className="text-sm font-medium">Password</Label>
                    <a href="#" className="text-xs text-accent hover:underline">
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="h-12 pl-11 pr-11 rounded-xl border-border bg-secondary/50 focus:bg-card"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 rounded-xl gradient-luxury text-primary-foreground font-semibold shadow-lg hover:shadow-xl transition-all group" 
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </TabsContent>

            {/* Signup Form */}
            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="signup-name" className="text-sm font-medium">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="John Doe"
                      className="h-12 pl-11 rounded-xl border-border bg-secondary/50 focus:bg-card"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-sm font-medium">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="you@company.com"
                      className="h-12 pl-11 rounded-xl border-border bg-secondary/50 focus:bg-card"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-sm font-medium">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Min. 8 characters"
                      className="h-12 pl-11 pr-11 rounded-xl border-border bg-secondary/50 focus:bg-card"
                      required
                      minLength={8}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-3 py-2">
                  <input type="checkbox" className="rounded border-border mt-0.5" required />
                  <span className="text-sm text-muted-foreground">
                    I agree to the{' '}
                    <a href="#" className="text-accent hover:underline">Terms of Service</a>
                    {' '}and{' '}
                    <a href="#" className="text-accent hover:underline">Privacy Policy</a>
                  </span>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 rounded-xl gradient-luxury text-primary-foreground font-semibold shadow-lg hover:shadow-xl transition-all group" 
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating account...' : 'Create Account'}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:flex flex-1 relative">
        <img 
          src={heroImage} 
          alt="Premium event setup" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/60 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="max-w-md text-center">
            <h3 className="text-3xl font-display font-semibold text-primary-foreground mb-4">
              Premium Event Infrastructure
            </h3>
            <p className="text-primary-foreground/70">
              Access world-class exhibition stalls, staging solutions, and complete event infrastructure for your enterprise needs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
