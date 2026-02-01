import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Star, 
  StarHalf, 
  Plus, 
  Minus, 
  ShoppingCart, 
  ArrowLeft, 
  Calendar,
  Package,
  Shield,
  Clock,
  CheckCircle,
  MessageSquare,
  User,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { productAPI } from '@/lib/api';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [days, setDays] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewComment, setReviewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    if (id) {
      fetchProduct();
    } else {
      console.error('No product ID provided');
      toast.error('Invalid product ID');
      navigate('/products');
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      console.log('Fetching product with ID:', id);
      const response = await productAPI.getProductById(id);
      console.log('Product response:', response);
      if (response.success) {
        setProduct(response.product);
      } else {
        toast.error('Product not found');
        navigate('/products');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    // Transform product to match cart format
    const cartProduct = {
      id: product._id,
      _id: product._id,
      name: product.name,
      description: product.description,
      category: product.category,
      pricePerDay: product.pricePerDay,
      image: product.images?.[0] || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
      images: product.images || [],
      available: product.isAvailable,
      isAvailable: product.isAvailable,
      rating: product.rating || 0,
      reviews: product.reviews || [],
    };
    
    addToCart(cartProduct, quantity, days);
    toast.success('Added to cart!');
  };

  const handleSubmitReview = async () => {
    if (!user) {
      toast.error('Please login to submit a review');
      navigate('/auth');
      return;
    }

    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    if (!reviewComment.trim()) {
      toast.error('Please write a review comment');
      return;
    }

    try {
      setSubmittingReview(true);
      const token = localStorage.getItem('token') || localStorage.getItem('authToken');
      const userId = user.id || localStorage.getItem('userId');
      const userName = user.name || localStorage.getItem('userName') || 'Anonymous';
      
      if (!token) {
        toast.error('Please login to submit a review');
        navigate('/auth');
        return;
      }
      
      const response = await productAPI.addReview(
        id,
        {
          userId: userId,
          userName: userName,
          rating,
          comment: reviewComment.trim()
        },
        token
      );

      if (response.success) {
        toast.success('Review submitted successfully!');
        setRating(0);
        setReviewComment('');
        fetchProduct(); // Refresh product data
      } else {
        toast.error(response.message || 'Failed to submit review');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Failed to submit review');
    } finally {
      setSubmittingReview(false);
    }
  };

  const renderStars = (rating, interactive = false, size = 'default') => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const iconSize = size === 'large' ? 'h-6 w-6' : size === 'small' ? 'h-4 w-4' : 'h-5 w-5';

    for (let i = 1; i <= 5; i++) {
      if (interactive) {
        stars.push(
          <button
            key={i}
            type="button"
            onMouseEnter={() => setHoverRating(i)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => setRating(i)}
            className="transition-colors"
          >
            <Star
              className={cn(
                iconSize,
                (hoverRating >= i || rating >= i)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              )}
            />
          </button>
        );
      } else {
        if (i <= fullStars) {
          stars.push(<Star key={i} className={cn(iconSize, 'fill-yellow-400 text-yellow-400')} />);
        } else if (i === fullStars + 1 && hasHalfStar) {
          stars.push(<StarHalf key={i} className={cn(iconSize, 'fill-yellow-400 text-yellow-400')} />);
        } else {
          stars.push(<Star key={i} className={cn(iconSize, 'text-gray-300')} />);
        }
      }
    }

    return <div className="flex items-center gap-1">{stars}</div>;
  };

  const totalPrice = product ? product.pricePerDay * quantity * days : 0;

  const nextImage = () => {
    if (product?.images) {
      setSelectedImage((prev) => (prev + 1) % product.images.length);
    }
  };

  const prevImage = () => {
    if (product?.images) {
      setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading product...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-muted-foreground">Product not found</p>
          <Button onClick={() => navigate('/products')} className="mt-4">
            Back to Products
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-accent transition-colors">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-accent transition-colors">Products</Link>
          <span>/</span>
          <Link to={`/categories?category=${product.category}`} className="hover:text-accent transition-colors">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-secondary group">
              <img
                src={product.images?.[selectedImage] || product.images?.[0] || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              
              {product.images && product.images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity rounded-full"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity rounded-full"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </>
              )}

              {!product.isAvailable && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                  <Badge className="bg-white text-black px-6 py-2 text-base">Currently Unavailable</Badge>
                </div>
              )}
            </div>

            {/* Thumbnail gallery */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={cn(
                      "aspect-square rounded-lg overflow-hidden border-2 transition-all",
                      selectedImage === idx ? "border-accent scale-105" : "border-transparent hover:border-accent/50"
                    )}
                  >
                    <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge className="mb-3">{product.category}</Badge>
              <h1 className="text-4xl font-display font-bold text-foreground mb-4">
                {product.name}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center gap-3 mb-4">
                {renderStars(product.rating || 0)}
                <span className="text-sm text-muted-foreground">
                  {product.rating ? product.rating.toFixed(1) : '0.0'} ({product.reviews?.length || 0} reviews)
                </span>
              </div>

              <p className="text-muted-foreground text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Price */}
            <div className="bg-accent/5 border border-accent/20 rounded-xl p-6">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-display font-bold text-accent">
                  ₹{product.pricePerDay}
                </span>
                <span className="text-muted-foreground">/day</span>
              </div>
              {product.depositAmount > 0 && (
                <p className="text-sm text-muted-foreground">
                  + ₹{product.depositAmount} refundable deposit
                </p>
              )}
            </div>

            {/* Quantity & Days Selection */}
            <Card>
              <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Quantity
                    </label>
                    <div className="flex items-center border border-border rounded-lg overflow-hidden">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={!product.isAvailable}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="border-0 text-center focus-visible:ring-0"
                        disabled={!product.isAvailable}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setQuantity(Math.min(product.availableQuantity, quantity + 1))}
                        disabled={!product.isAvailable}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {product.availableQuantity} available
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Rental Days
                    </label>
                    <div className="flex items-center border border-border rounded-lg overflow-hidden">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDays(Math.max(product.minimumRentalDays || 1, days - 1))}
                        disabled={!product.isAvailable}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        type="number"
                        value={days}
                        onChange={(e) => setDays(Math.max(product.minimumRentalDays || 1, parseInt(e.target.value) || 1))}
                        className="border-0 text-center focus-visible:ring-0"
                        disabled={!product.isAvailable}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDays(days + 1)}
                        disabled={!product.isAvailable}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Min: {product.minimumRentalDays || 1} day(s)
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Price</span>
                  <span className="text-2xl font-bold text-accent">₹{totalPrice.toLocaleString()}</span>
                </div>

                <Button
                  onClick={handleAddToCart}
                  disabled={!product.isAvailable}
                  className="w-full h-12 text-base gap-2 gradient-luxury"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </Button>
              </CardContent>
            </Card>

            {/* Quick Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Secure</p>
                  <p className="text-xs text-muted-foreground">100% Safe</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Flexible</p>
                  <p className="text-xs text-muted-foreground">Easy Returns</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features & Specifications */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Features */}
          {product.features && product.features.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-accent" />
                  Key Features
                </h3>
                <ul className="space-y-3">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Specifications */}
          {product.specifications && (
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Package className="h-5 w-5 text-accent" />
                  Specifications
                </h3>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {product.specifications}
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Reviews Section */}
        <Card className="mb-16">
          <CardContent className="p-8">
            <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <MessageSquare className="h-6 w-6 text-accent" />
              Customer Reviews ({product.reviews?.length || 0})
            </h3>

            {/* Add Review */}
            <div className="bg-secondary/30 rounded-xl p-6 mb-8">
              <h4 className="font-semibold text-foreground mb-4">Write a Review</h4>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Your Rating
                  </label>
                  {renderStars(rating, true, 'large')}
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Your Review
                  </label>
                  <Textarea
                    placeholder="Share your experience with this product..."
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
                <Button
                  onClick={handleSubmitReview}
                  disabled={submittingReview || !user}
                  className="gap-2"
                >
                  {submittingReview ? 'Submitting...' : 'Submit Review'}
                </Button>
                {!user && (
                  <p className="text-sm text-muted-foreground">
                    Please <Link to="/auth" className="text-accent hover:underline">login</Link> to submit a review
                  </p>
                )}
              </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-6">
              {product.reviews && product.reviews.length > 0 ? (
                product.reviews.map((review, idx) => (
                  <div key={idx} className="border-b border-border last:border-0 pb-6 last:pb-0">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-accent text-white">
                          {review.userName?.charAt(0).toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h5 className="font-semibold text-foreground">{review.userName || 'Anonymous'}</h5>
                          {renderStars(review.rating, false, 'small')}
                        </div>
                        <p className="text-muted-foreground mb-2">{review.comment}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(review.date).toLocaleDateString('en-IN', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No reviews yet. Be the first to review this product!
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Back Button */}
        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
