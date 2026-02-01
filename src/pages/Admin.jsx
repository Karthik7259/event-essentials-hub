import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  Package,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  Plus,
  Search,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  XCircle,
  ArrowLeft,
  ArrowRight,
  LayoutDashboard,
  TrendingUp,
  DollarSign,
  Filter,
  Download,
  X,
  Upload,
  CheckSquare,
  Square,
  ImagePlus,
  Loader,
  Calendar,
  MapPin,
  FileText,
  Tag,
  Image,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { categories } from '@/lib/products';
import { productAPI, orderAPI } from '@/lib/api';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const emptyProductForm = {
  name: '',
  category: '',
  description: '',
  images: [],
  pricePerDay: 0,
  quantity: 1,
  availableQuantity: 1,
  features: [],
  specifications: {},
  minimumRentalDays: 1,
  tags: [],
  depositAmount: 0,
};

// ProductForm component - moved outside Admin to prevent re-creation on every render
const ProductForm = ({ 
  isEdit, 
  formData, 
  featuresInput, 
  tagsInput, 
  specificationsInput,
  uploadedImages,
  existingImages = [],
  deletedImageIndices = [],
  removeExistingImage,
  fileInputRef,
  handleInputChange,
  setFeaturesInput,
  setTagsInput,
  setSpecificationsInput,
  handleImageUpload,
  removeImage,
  handleAddProduct,
  handleEditProduct,
  setIsAddDialogOpen,
  setIsEditDialogOpen,
  isSubmitting
}) => {
  return (
    <div className="space-y-6 max-h-[75vh] overflow-y-auto pr-4">
      {/* Section: Basic Information */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-border">
          <Package className="h-5 w-5 text-accent" />
          <h3 className="font-semibold text-foreground">Basic Information</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">Product Name *</Label>
            <Input
              id="name"
              placeholder="e.g., Aluminium German Hanger"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="rounded-lg border-border"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category" className="text-sm font-medium">Category *</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => handleInputChange('category', value)}
            >
              <SelectTrigger className="rounded-lg border-border">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="rounded-lg">
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id} className="rounded-md">
                    {cat.icon} {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-sm font-medium">Description *</Label>
          <Textarea
            id="description"
            placeholder="Detailed description of the product..."
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            className="rounded-lg border-border min-h-[80px]"
          />
        </div>
      </div>

      {/* Section: Pricing & Availability */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-border">
          <DollarSign className="h-5 w-5 text-accent" />
          <h3 className="font-semibold text-foreground">Pricing & Availability</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="pricePerDay" className="text-sm font-medium">Price per Day (₹) *</Label>
            <Input
              id="pricePerDay"
              type="number"
              placeholder="0"
              value={formData.pricePerDay || ''}
              onChange={(e) => handleInputChange('pricePerDay', Number(e.target.value))}
              className="rounded-lg border-border"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="depositAmount" className="text-sm font-medium">Deposit Amount (₹)</Label>
            <Input
              id="depositAmount"
              type="number"
              placeholder="0"
              value={formData.depositAmount || ''}
              onChange={(e) => handleInputChange('depositAmount', Number(e.target.value))}
              className="rounded-lg border-border"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="quantity" className="text-sm font-medium">Total Quantity</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              placeholder="1"
              value={formData.quantity || 1}
              onChange={(e) => handleInputChange('quantity', Number(e.target.value))}
              className="rounded-lg border-border"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="availableQuantity" className="text-sm font-medium">Available Quantity</Label>
            <Input
              id="availableQuantity"
              type="number"
              min="1"
              placeholder="1"
              value={formData.availableQuantity || 1}
              onChange={(e) => handleInputChange('availableQuantity', Number(e.target.value))}
              className="rounded-lg border-border"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="minimumRentalDays" className="text-sm font-medium">Min Rental Days</Label>
            <Input
              id="minimumRentalDays"
              type="number"
              min="1"
              placeholder="1"
              value={formData.minimumRentalDays || 1}
              onChange={(e) => handleInputChange('minimumRentalDays', Number(e.target.value))}
              className="rounded-lg border-border"
            />
          </div>
        </div>
      </div>

      {/* Section: Features & Tags */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-border">
          <Tag className="h-5 w-5 text-accent" />
          <h3 className="font-semibold text-foreground">Features & Tags</h3>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="features" className="text-sm font-medium">Features</Label>
          <Input
            id="features"
            placeholder="e.g., Premium quality, Durable, Easy setup"
            value={featuresInput}
            onChange={(e) => setFeaturesInput(e.target.value)}
            className="rounded-lg border-border"
          />
          <p className="text-xs text-muted-foreground">Separate with commas</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="tags" className="text-sm font-medium">Tags</Label>
          <Input
            id="tags"
            placeholder="e.g., wedding, decoration, luxury"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            className="rounded-lg border-border"
          />
          <p className="text-xs text-muted-foreground">Separate with commas</p>
        </div>
      </div>

      {/* Section: Specifications */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-border">
          <Settings className="h-5 w-5 text-accent" />
          <h3 className="font-semibold text-foreground">Specifications</h3>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="specifications" className="text-sm font-medium">Product Specifications</Label>
          <Textarea
            id="specifications"
            placeholder="Write product specifications..."
            value={specificationsInput}
            onChange={(e) => setSpecificationsInput(e.target.value)}
            className="rounded-lg border-border min-h-[120px] text-sm leading-relaxed"
          />
          <p className="text-xs text-muted-foreground">
            Write detailed product specifications in paragraph format
          </p>
        </div>
      </div>

      {/* Section: Product Images */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-border">
          <Image className="h-5 w-5 text-accent" />
          <h3 className="font-semibold text-foreground">Product Images *</h3>
        </div>

        <div>
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className="rounded-lg gap-2 w-full border-2 border-dashed border-border hover:border-accent transition-colors py-6"
          >
            <ImagePlus className="h-5 w-5" />
            <div className="text-left">
              <p className="font-medium">Click to upload</p>
              <p className="text-xs text-muted-foreground">or drag & drop</p>
            </div>
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            multiple
            className="hidden"
          />
          <p className="text-xs text-muted-foreground mt-2">PNG, JPG up to 5MB each</p>
        </div>

        {/* Existing Images (for edit mode) */}
        {isEdit && existingImages.length > 0 && (
          <div>
            <p className="text-sm font-medium text-foreground mb-2">Current Images ({existingImages.filter((_, i) => !deletedImageIndices.includes(i)).length})</p>
            <div className="grid grid-cols-4 gap-2">
              {existingImages.map((imageUrl, index) => (
                !deletedImageIndices.includes(index) && (
                  <div key={`existing-${index}`} className="relative group">
                    <div className="aspect-square bg-secondary rounded-lg overflow-hidden border border-border">
                      <img
                        src={imageUrl}
                        alt={`Existing ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeExistingImage(index)}
                      className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="h-4 w-4 text-white" />
                    </button>
                    <div className="absolute top-1 left-1 bg-blue-500 text-white text-xs px-2 py-0.5 rounded">
                      Current
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        )}

        {/* New Uploaded Images */}
        {uploadedImages.length > 0 && (
          <div>
            <p className="text-sm font-medium text-foreground mb-2">New Images ({uploadedImages.length})</p>
            <div className="grid grid-cols-4 gap-2">
              {uploadedImages.map((image, index) => (
                <div key={`new-${index}`} className="relative group">
                  <div className="aspect-square bg-secondary rounded-lg overflow-hidden border border-border">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="h-4 w-4 text-white" />
                  </button>
                  <div className="absolute top-1 left-1 bg-green-500 text-white text-xs px-2 py-0.5 rounded">
                    New
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pt-4 border-t border-border sticky bottom-0 bg-background">
        <Button
          variant="outline"
          onClick={() => isEdit ? setIsEditDialogOpen(false) : setIsAddDialogOpen(false)}
          className="rounded-lg"
        >
          Cancel
        </Button>
        <Button
          onClick={isEdit ? handleEditProduct : handleAddProduct}
          disabled={!formData.name || !formData.category || !formData.pricePerDay || (!isEdit && uploadedImages.length === 0) || (isEdit && existingImages.filter((_, i) => !deletedImageIndices.includes(i)).length === 0 && uploadedImages.length === 0) || isSubmitting}
          className="rounded-lg gradient-luxury text-primary-foreground gap-2"
        >
          {isSubmitting && <Loader className="h-4 w-4 animate-spin" />}
          {isEdit ? 'Update Product' : 'Add Product'}
        </Button>
      </div>
    </div>
  );
};;

const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [productList, setProductList] = useState([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isBulkDeleteDialogOpen, setIsBulkDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState(emptyProductForm);
  const [featuresInput, setFeaturesInput] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [specificationsInput, setSpecificationsInput] = useState('');
  const [selectedProducts, setSelectedProducts] = useState(new Set());
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [deletedImageIndices, setDeletedImageIndices] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [orderStats, setOrderStats] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');

  // Guard: Require admin token to access this page
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      toast.error('Admin access required. Please login as admin.');
      navigate('/auth');
    }
  }, [navigate]);

  // Fetch orders when orders tab is active
  useEffect(() => {
    const fetchOrders = async () => {
      if (activeTab === 'orders') {
        setOrdersLoading(true);
        try {
          const token = localStorage.getItem('adminToken');
          if (!token) {
            toast.error('Admin token not found. Please login again.');
            return;
          }
          
          const filters = orderStatusFilter !== 'all' ? { status: orderStatusFilter } : {};
          console.log('Fetching orders with filters:', filters);
          const response = await orderAPI.getAllOrders(token, filters);
          console.log('Orders response:', response);
          
          if (response.success) {
            setOrders(response.orders || []);
            console.log(`Loaded ${response.orders?.length || 0} orders`);
          } else {
            toast.error(response.message || 'Failed to fetch orders');
            setOrders([]);
          }
        } catch (error) {
          console.error('Error fetching orders:', error);
          toast.error('Error loading orders');
          setOrders([]);
        } finally {
          setOrdersLoading(false);
        }
      }
    };

    fetchOrders();
  }, [activeTab, orderStatusFilter]);

  // Fetch order stats for dashboard
  useEffect(() => {
    const fetchOrderStats = async () => {
      if (activeTab === 'dashboard') {
        try {
          const token = localStorage.getItem('adminToken');
          const response = await orderAPI.getOrderStats(token);
          
          if (response.success) {
            setOrderStats(response.stats);
          }
        } catch (error) {
          console.error('Error fetching order stats:', error);
        }
      }
    };

    fetchOrderStats();
  }, [activeTab]);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await productAPI.getAllProducts(token);
        
        if (response.success && response.products) {
          // Transform products to ensure image field is set
          const transformedProducts = response.products.map(product => ({
            ...product,
            id: product._id || product.id,
            image: product.images?.[0] || product.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
            available: product.isAvailable !== undefined ? product.isAvailable : true,
          }));
          setProductList(transformedProducts);
        } else {
          setProductList([]);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setProductList([]);
      }
    };

    fetchProducts();
  }, []);

  // Map orders to display format for requests tab
  const rentalRequests = orders.map(order => ({
    id: order._id.toString().slice(-8).toUpperCase(),
    customer: order.userName,
    email: order.userEmail,
    items: order.items.length,
    total: order.totalAmount,
    status: order.status,
    date: new Date(order.createdAt).toLocaleDateString('en-IN'),
    order: order, // Keep full order object for details
  }));

  const stats = [
    { 
      label: 'Total Revenue', 
      value: orderStats ? `₹${(orderStats.totalRevenue / 100000).toFixed(1)}L` : '₹0', 
      change: '+12.5%', 
      icon: DollarSign, 
      color: 'bg-green-500/10 text-green-600' 
    },
    { 
      label: 'Total Orders', 
      value: orderStats ? orderStats.totalOrders.toString() : '0', 
      change: `${orderStats?.pendingOrders || 0} pending`, 
      icon: ShoppingCart, 
      color: 'bg-blue-500/10 text-blue-600' 
    },
    { 
      label: 'Products', 
      value: productList.length.toString(), 
      change: '+3', 
      icon: Package, 
      color: 'bg-purple-500/10 text-purple-600' 
    },
    { 
      label: 'Completed', 
      value: orderStats ? orderStats.completedOrders.toString() : '0', 
      change: `${orderStats?.cancelledOrders || 0} cancelled`, 
      icon: CheckCircle, 
      color: 'bg-emerald-500/10 text-emerald-600' 
    },
  ];

  const getStatusBadge = (status) => {
    const config = {
      pending: { class: 'bg-amber-50 text-amber-700 border-amber-200', icon: Clock },
      approved: { class: 'bg-green-50 text-green-700 border-green-200', icon: CheckCircle },
      completed: { class: 'bg-blue-50 text-blue-700 border-blue-200', icon: CheckCircle },
      rejected: { class: 'bg-red-50 text-red-700 border-red-200', icon: XCircle },
    };
    const statusConfig = config[status] || config.pending;
    return (
      <Badge variant="outline" className={cn("gap-1.5 font-medium", statusConfig.class)}>
        <statusConfig.icon className="h-3 w-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const sidebarItems = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'products', label: 'Inventory', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'requests', label: 'Requests', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const filteredProducts = productList.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenAddDialog = () => {
    setFormData(emptyProductForm);
    setSpecificationsInput('');
    setIsAddDialogOpen(true);
  };

  const handleOpenEditDialog = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      description: product.description,
      pricePerDay: product.pricePerDay,
      quantity: product.quantity || 1,
      availableQuantity: product.availableQuantity || 1,
      minimumRentalDays: product.minimumRentalDays || 1,
      depositAmount: product.depositAmount || 0,
    });
    
    // Set features
    if (product.features && Array.isArray(product.features)) {
      setFeaturesInput(product.features.join(', '));
    } else {
      setFeaturesInput('');
    }
    
    // Set tags
    if (product.tags && Array.isArray(product.tags)) {
      setTagsInput(product.tags.join(', '));
    } else {
      setTagsInput('');
    }
    
    // Set specifications (now a string)
    if (typeof product.specifications === 'string') {
      setSpecificationsInput(product.specifications);
    } else if (Array.isArray(product.specifications)) {
      setSpecificationsInput(product.specifications.join(', '));
    } else {
      setSpecificationsInput('');
    }
    
    // Set existing images from product
    const existingImgs = product.images || product.image || [];
    setExistingImages(Array.isArray(existingImgs) ? existingImgs : []);
    setUploadedImages([]);
    setDeletedImageIndices([]);
    setIsEditDialogOpen(true);
  };

  const handleOpenDeleteDialog = (product) => {
    setSelectedProduct(product);
    setIsDeleteDialogOpen(true);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddProduct = async () => {
    if (!formData.name || !formData.category || !formData.pricePerDay) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (uploadedImages.length === 0) {
      toast.error('Please upload at least one image');
      return;
    }

    setIsSubmitting(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('pricePerDay', formData.pricePerDay);
      formDataToSend.append('quantity', formData.quantity);
      formDataToSend.append('availableQuantity', formData.availableQuantity);
      formDataToSend.append('features', JSON.stringify(featuresInput.split(',').map(f => f.trim()).filter(f => f)));
      formDataToSend.append('minimumRentalDays', formData.minimumRentalDays);
      formDataToSend.append('tags', JSON.stringify(tagsInput.split(',').map(t => t.trim()).filter(t => t)));
      formDataToSend.append('depositAmount', formData.depositAmount);
      
      // Add specifications as plain string
      if (specificationsInput.trim()) {
        formDataToSend.append('specifications', specificationsInput.trim());
      }

      // Add images
      uploadedImages.forEach((image, index) => {
        formDataToSend.append('images', image);
      });

      // Get admin token from localStorage
      const adminToken = localStorage.getItem('adminToken');
      if (!adminToken) {
        toast.error('Please login as admin first');
        return;
      }

      const response = await productAPI.addProduct(formDataToSend, adminToken);
      
      if (response.success) {
        // Add to local list for immediate display
        const newProduct = {
          id: response.product._id,
          name: response.product.name,
          category: response.product.category,
          description: response.product.description,
          image: response.product.images?.[0] || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
          pricePerDay: response.product.pricePerDay,
          quantity: response.product.quantity,
          availableQuantity: response.product.availableQuantity,
        };
        setProductList(prev => [...prev, newProduct]);
        setIsAddDialogOpen(false);
        setFormData(emptyProductForm);
        setFeaturesInput('');
        setTagsInput('');
        setSpecificationsInput('');
        setUploadedImages([]);
        toast.success('Product added successfully!');
      } else {
        toast.error(response.message || 'Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Error adding product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditProduct = async () => {
    if (!selectedProduct) return;

    if (!formData.name || !formData.category || !formData.pricePerDay) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('pricePerDay', formData.pricePerDay);
      formDataToSend.append('quantity', formData.quantity || 1);
      formDataToSend.append('availableQuantity', formData.availableQuantity || 1);
      formDataToSend.append('features', JSON.stringify(featuresInput.split(',').map(f => f.trim()).filter(f => f)));
      formDataToSend.append('minimumRentalDays', formData.minimumRentalDays || 1);
      formDataToSend.append('tags', JSON.stringify(tagsInput.split(',').map(t => t.trim()).filter(t => t)));
      formDataToSend.append('depositAmount', formData.depositAmount || 0);
      
      // Add specifications as plain string
      if (specificationsInput.trim()) {
        formDataToSend.append('specifications', specificationsInput.trim());
      }

      // Add new images if uploaded
      if (uploadedImages.length > 0) {
        uploadedImages.forEach((image) => {
          formDataToSend.append('images', image);
        });
      }

      // Add deleted image indices
      if (deletedImageIndices.length > 0) {
        formDataToSend.append('deletedImages', JSON.stringify(deletedImageIndices));
      }

      // Get admin token from localStorage
      const adminToken = localStorage.getItem('adminToken');
      if (!adminToken) {
        toast.error('Please login as admin first');
        return;
      }

      const response = await productAPI.updateProduct(selectedProduct._id || selectedProduct.id, formDataToSend, adminToken);
      
      if (response.success) {
        // Update local list
        setProductList(prev =>
          prev.map(p =>
            (p.id === selectedProduct.id || p._id === selectedProduct._id)
              ? {
                  ...p,
                  id: response.product._id,
                  _id: response.product._id,
                  name: response.product.name,
                  category: response.product.category,
                  description: response.product.description,
                  image: response.product.images?.[0] || p.image,
                  images: response.product.images || p.images,
                  pricePerDay: response.product.pricePerDay,
                  quantity: response.product.quantity,
                  availableQuantity: response.product.availableQuantity,
                  features: response.product.features,
                  specifications: response.product.specifications,
                  minimumRentalDays: response.product.minimumRentalDays,
                  tags: response.product.tags,
                  depositAmount: response.product.depositAmount,
                  available: response.product.isAvailable,
                  isAvailable: response.product.isAvailable,
                }
              : p
          )
        );
        setIsEditDialogOpen(false);
        setSelectedProduct(null);
        setFormData(emptyProductForm);
        setFeaturesInput('');
        setTagsInput('');
        setSpecificationsInput('');
        setUploadedImages([]);
        setExistingImages([]);
        setDeletedImageIndices([]);
        toast.success('Product updated successfully!');
      } else {
        toast.error(response.message || 'Failed to update product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Error updating product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProduct = async () => {
    if (!selectedProduct) return;
    try {
      const adminToken = localStorage.getItem('adminToken');
      if (!adminToken) {
        toast.error('Please login as admin first');
        return;
      }

      const productId = selectedProduct._id || selectedProduct.id;
      const response = await productAPI.deleteProduct(productId, adminToken);
      if (response.success) {
        setProductList(prev => prev.filter(p => (p.id !== productId && p._id !== productId)));
        setIsDeleteDialogOpen(false);
        setSelectedProduct(null);
        toast.success('Product deleted successfully!');
      } else {
        toast.error(response.message || 'Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Error deleting product. Please try again.');
    }
  };

  const toggleProductSelection = (productId) => {
    setSelectedProducts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    if (selectedProducts.size === filteredProducts.length) {
      setSelectedProducts(new Set());
    } else {
      setSelectedProducts(new Set(filteredProducts.map(p => p.id)));
    }
  };

  const handleBulkDelete = async () => {
    try {
      const adminToken = localStorage.getItem('adminToken');
      if (!adminToken) {
        toast.error('Please login as admin first');
        return;
      }

      const idsToDelete = Array.from(selectedProducts);
      const results = await Promise.all(
        idsToDelete.map((id) => productAPI.deleteProduct(id, adminToken))
      );

      const successCount = results.filter(r => r && r.success).length;
      setProductList(prev => prev.filter(p => !selectedProducts.has(p.id)));
      setSelectedProducts(new Set());
      setIsSelectionMode(false);
      setIsBulkDeleteDialogOpen(false);
      toast.success(`${successCount} product${successCount !== 1 ? 's' : ''} deleted successfully!`);
    } catch (error) {
      console.error('Error bulk deleting products:', error);
      toast.error('Error deleting products. Please try again.');
    }
  };

  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (files) {
      const newImages = [];
      let validCount = 0;

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.size > 5 * 1024 * 1024) {
          toast.error(`Image ${file.name} is larger than 5MB`);
          continue;
        }
        newImages.push(file);
        validCount++;
      }

      if (validCount > 0) {
        setUploadedImages(prev => [...prev, ...newImages]);
        toast.success(`${validCount} image(s) uploaded successfully!`);
      }
    }
  };

  const removeImage = (index) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (index) => {
    setDeletedImageIndices(prev => [...prev, index]);
  };

  const cancelSelectionMode = () => {
    setIsSelectionMode(false);
    setSelectedProducts(new Set());
  };

  const handleUpdateOrderStatus = async (orderId, newStatus, notes = '') => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await orderAPI.updateOrderStatus(orderId, { status: newStatus, adminNotes: notes }, token);
      
      if (response.success) {
        toast.success('Order status updated successfully');
        // Refresh orders list
        const ordersResponse = await orderAPI.getAllOrders(token, { status: orderStatusFilter !== 'all' ? orderStatusFilter : undefined });
        if (ordersResponse.success) {
          setOrders(ordersResponse.orders);
        }
      } else {
        toast.error(response.message || 'Failed to update order status');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Error updating order status');
    }
  };

  const handleApproveRequest = async (orderId) => {
    try {
      await handleUpdateOrderStatus(orderId, 'confirmed', 'Request approved by admin');
    } catch (error) {
      console.error('Error approving request:', error);
      toast.error('Error approving request');
    }
  };

  const handleExportOrders = () => {
    try {
      // Prepare data for export
      const exportData = orders.map(order => ({
        'Order ID': order._id.slice(-8).toUpperCase(),
        'Customer Name': order.userName,
        'Email': order.userEmail,
        'Phone': order.userPhone || 'N/A',
        'Total Amount': `₹${order.totalAmount}`,
        'Status': order.status,
        'Event Date': order.eventDate ? new Date(order.eventDate).toLocaleDateString() : 'N/A',
        'Event Location': order.eventLocation || 'N/A',
        'Items': order.items.map(item => `${item.productName} (${item.quantity}x)`).join(', '),
        'Created Date': new Date(order.createdAt).toLocaleString(),
      }));

      // Convert to CSV
      const headers = Object.keys(exportData[0]);
      const csvContent = [
        headers.join(','),
        ...exportData.map(row => 
          headers.map(header => {
            const value = row[header];
            // Escape commas and quotes in values
            return `"${String(value).replace(/"/g, '""')}"`;
          }).join(',')
        )
      ].join('\n');

      // Create and download file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `orders_export_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success(`Exported ${orders.length} orders successfully!`);
    } catch (error) {
      console.error('Error exporting orders:', error);
      toast.error('Failed to export orders');
    }
  };

  const handleExportProducts = () => {
    try {
      // Prepare data for export
      const exportData = productList.map(product => ({
        'Product ID': product._id || product.id,
        'Name': product.name,
        'Category': product.category,
        'Price per Day': `₹${product.pricePerDay}`,
        'Total Quantity': product.quantity,
        'Available Quantity': product.availableQuantity,
        'Minimum Rental Days': product.minimumRentalDays || 1,
        'Deposit Amount': `₹${product.depositAmount || 0}`,
        'Rating': product.rating || 0,
        'Reviews': product.reviews?.length || 0,
        'Status': product.isAvailable ? 'Available' : 'Unavailable',
      }));

      // Convert to CSV
      const headers = Object.keys(exportData[0]);
      const csvContent = [
        headers.join(','),
        ...exportData.map(row => 
          headers.map(header => {
            const value = row[header];
            return `"${String(value).replace(/"/g, '""')}"`;
          }).join(',')
        )
      ].join('\n');

      // Create and download file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `products_export_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success(`Exported ${productList.length} products successfully!`);
    } catch (error) {
      console.error('Error exporting products:', error);
      toast.error('Failed to export products');
    }
  };

  const getOrderStatusBadge = (status) => {
    const config = {
      pending: { class: 'bg-amber-50 text-amber-700 border-amber-200', icon: Clock },
      confirmed: { class: 'bg-blue-50 text-blue-700 border-blue-200', icon: CheckCircle },
      processing: { class: 'bg-purple-50 text-purple-700 border-purple-200', icon: Clock },
      delivered: { class: 'bg-green-50 text-green-700 border-green-200', icon: CheckCircle },
      completed: { class: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: CheckCircle },
      cancelled: { class: 'bg-red-50 text-red-700 border-red-200', icon: XCircle },
    };
    const statusConfig = config[status] || config.pending;
    return (
      <Badge variant="outline" className={cn("gap-1.5 font-medium", statusConfig.class)}>
        <statusConfig.icon className="h-3 w-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const handleViewOrderDetails = (order) => {
    setSelectedOrder(order);
    setIsOrderDetailsOpen(true);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-72 bg-card border-r border-border hidden lg:flex flex-col">
        <div className="p-6 border-b border-border">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 gradient-luxury rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-primary-foreground font-display text-xl font-bold">E</span>
            </div>
            <div>
              <h1 className="font-display text-lg font-semibold text-foreground">EventRent</h1>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Admin Console</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-300",
                activeTab === item.id
                  ? "gradient-luxury text-primary-foreground shadow-lg"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-border space-y-1">
          <Link to="/">
            <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground rounded-xl">
              <ArrowLeft className="h-5 w-5" />
              Back to Site
            </Button>
          </Link>
          <Button variant="ghost" className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10 rounded-xl">
            <LogOut className="h-5 w-5" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="sticky top-0 z-40 glass border-b border-border px-8 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-display font-semibold text-foreground capitalize">
                {activeTab === 'dashboard' ? 'Overview' : activeTab}
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                Manage your inventory and rental operations
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative hidden md:block">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-11 w-72 h-11 rounded-xl border-border bg-secondary/50"
                />
              </div>
              <Button 
                className="gap-2 h-11 rounded-xl gradient-luxury text-primary-foreground shadow-lg"
                onClick={handleOpenAddDialog}
              >
                <Plus className="h-4 w-4" />
                Add Product
              </Button>
            </div>
          </div>
        </header>

        <div className="p-8 pr-32">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 max-w-6xl ml-auto">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <Card key={stat.label} className="luxury-card border-none" style={{ animationDelay: `${index * 0.1}s` }}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                          <p className="text-3xl font-display font-semibold text-foreground mt-2">{stat.value}</p>
                          <div className="flex items-center gap-1 mt-2">
                            <TrendingUp className="h-3 w-3 text-green-500" />
                            <span className="text-xs font-medium text-green-600">{stat.change}</span>
                            <span className="text-xs text-muted-foreground">vs last month</span>
                          </div>
                        </div>
                        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", stat.color)}>
                          <stat.icon className="h-6 w-6" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Recent Requests */}
              <Card className="luxury-card border-none">
                <CardHeader className="flex flex-row items-center justify-between pb-4">
                  <CardTitle className="text-lg font-semibold">Recent Requests ({rentalRequests.length})</CardTitle>
                  <Link to="/admin" onClick={() => setActiveTab('requests')}>
                    <Button variant="outline" size="sm" className="gap-2 rounded-lg">
                      View All
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  {rentalRequests.length === 0 ? (
                    <div className="text-center py-12">
                      <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">No requests yet</h3>
                      <p className="text-muted-foreground">Requests will appear here when customers submit orders</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Request ID</th>
                            <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Client</th>
                            <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Items</th>
                            <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Value</th>
                            <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                            <th className="text-right py-4 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {rentalRequests.slice(0, 5).map((request) => (
                          <tr key={request.id} className="border-b border-border/50 last:border-0 hover:bg-secondary/30 transition-colors">
                            <td className="py-4 px-4">
                              <span className="font-mono text-sm text-foreground">{request.id}</span>
                            </td>
                            <td className="py-4 px-4">
                              <div>
                                <p className="font-medium text-foreground">{request.customer}</p>
                                <p className="text-xs text-muted-foreground">{request.email}</p>
                              </div>
                            </td>
                            <td className="py-4 px-4 text-foreground">{request.items}</td>
                            <td className="py-4 px-4 font-semibold text-foreground">₹{request.total.toLocaleString()}</td>
                            <td className="py-4 px-4">{getStatusBadge(request.status)}</td>
                            <td className="py-4 px-4 text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="rounded-lg">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="rounded-xl">
                                  <DropdownMenuItem className="gap-2 rounded-lg">
                                    <Eye className="h-4 w-4" />
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="gap-2 rounded-lg text-green-600">
                                    <CheckCircle className="h-4 w-4" />
                                    Approve
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="gap-2 rounded-lg text-destructive">
                                    <XCircle className="h-4 w-4" />
                                    Reject
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div className="space-y-6 max-w-6xl ml-auto">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <p className="text-muted-foreground">
                    {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
                  </p>
                  {isSelectionMode && selectedProducts.size > 0 && (
                    <Badge variant="secondary" className="gap-1.5">
                      <CheckSquare className="h-3 w-3" />
                      {selectedProducts.size} selected
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {isSelectionMode ? (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleSelectAll}
                        className="rounded-lg gap-2"
                      >
                        {selectedProducts.size === filteredProducts.length ? (
                          <>
                            <Square className="h-4 w-4" />
                            Deselect All
                          </>
                        ) : (
                          <>
                            <CheckSquare className="h-4 w-4" />
                            Select All
                          </>
                        )}
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => setIsBulkDeleteDialogOpen(true)}
                        disabled={selectedProducts.size === 0}
                        className="rounded-lg gap-2"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete ({selectedProducts.size})
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={cancelSelectionMode}
                        className="rounded-lg"
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsSelectionMode(true)}
                      className="rounded-lg gap-2"
                    >
                      <CheckSquare className="h-4 w-4" />
                      Bulk Select
                    </Button>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product, index) => (
                  <Card 
                    key={product.id} 
                    className={cn(
                      "luxury-card overflow-hidden border-none group cursor-pointer transition-all",
                      isSelectionMode && selectedProducts.has(product.id) && "ring-2 ring-primary ring-offset-2"
                    )}
                    style={{ animationDelay: `${index * 0.05}s` }}
                    onClick={() => isSelectionMode && toggleProductSelection(product.id)}
                  >
                    <div className="aspect-[4/3] bg-secondary overflow-hidden relative">
                      <img 
                        src={product.images?.[0] || product.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80'} 
                        alt={product.name} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                      />
                      {isSelectionMode && (
                        <div className="absolute top-3 left-3 z-10">
                          <Checkbox
                            checked={selectedProducts.has(product.id)}
                            onCheckedChange={() => toggleProductSelection(product.id)}
                            className="h-5 w-5 bg-white/90 border-2"
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {!isSelectionMode && (
                        <div className="absolute bottom-3 left-3 right-3 flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                          <Button
                            size="sm"
                            variant="secondary"
                            className="rounded-lg gap-1.5 shadow-lg"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenEditDialog(product);
                            }}
                          >
                            <Edit className="h-3.5 w-3.5" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="rounded-lg gap-1.5 shadow-lg"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenDeleteDialog(product);
                            }}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            Delete
                          </Button>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h3 className="font-semibold text-foreground truncate">{product.name}</h3>
                          <p className="text-sm text-muted-foreground mt-0.5">₹{product.pricePerDay}/day</p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="shrink-0 rounded-lg">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="rounded-xl">
                            <DropdownMenuItem className="gap-2 rounded-lg" onClick={() => handleOpenEditDialog(product)}>
                              <Edit className="h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 rounded-lg text-destructive" onClick={() => handleOpenDeleteDialog(product)}>
                              <Trash2 className="h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "mt-3",
                          product.available 
                            ? 'bg-green-50 text-green-700 border-green-200' 
                            : 'bg-gray-50 text-gray-600 border-gray-200'
                        )}
                      >
                        {product.available ? 'Available' : 'Reserved'}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="space-y-6 max-w-6xl ml-auto">
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                <div>
                  <h2 className="text-2xl font-display font-bold text-foreground">Order Management</h2>
                  <p className="text-muted-foreground mt-1">View and manage customer orders</p>
                </div>
                <div className="flex gap-2">
                  <Select value={orderStatusFilter} onValueChange={setOrderStatusFilter}>
                    <SelectTrigger className="w-[180px] rounded-xl">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="all">All Orders</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm" className="gap-2 rounded-xl" onClick={handleExportOrders}>
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>

              {ordersLoading ? (
                <Card className="luxury-card border-none p-12 text-center">
                  <Loader className="h-8 w-8 animate-spin mx-auto mb-4 text-accent" />
                  <p className="text-muted-foreground">Loading orders...</p>
                </Card>
              ) : orders.length === 0 ? (
                <Card className="luxury-card border-none p-12 text-center">
                  <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No orders found</h3>
                  <p className="text-muted-foreground">
                    {orderStatusFilter === 'all' ? 'No orders have been placed yet' : `No ${orderStatusFilter} orders`}
                  </p>
                </Card>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <Card key={order._id} className="luxury-card border-none">
                      <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row gap-6">
                          {/* Order Info */}
                          <div className="flex-1 space-y-4">
                            <div className="flex flex-wrap items-start justify-between gap-4">
                              <div>
                                <div className="flex items-center gap-3 mb-2">
                                  <h3 className="font-display text-lg font-semibold text-foreground">
                                    Order #{order._id.slice(-8).toUpperCase()}
                                  </h3>
                                  {getOrderStatusBadge(order.status)}
                                </div>
                                <div className="space-y-1 text-sm">
                                  <p className="text-muted-foreground">
                                    <span className="font-medium text-foreground">Customer:</span> {order.userName}
                                  </p>
                                  <p className="text-muted-foreground">
                                    <span className="font-medium text-foreground">Email:</span> {order.userEmail}
                                  </p>
                                  {order.userPhone && (
                                    <p className="text-muted-foreground">
                                      <span className="font-medium text-foreground">Phone:</span> {order.userPhone}
                                    </p>
                                  )}
                                  <p className="text-muted-foreground">
                                    <span className="font-medium text-foreground">Date:</span>{' '}
                                    {new Date(order.createdAt).toLocaleDateString('en-IN', {
                                      year: 'numeric',
                                      month: 'short',
                                      day: 'numeric',
                                      hour: '2-digit',
                                      minute: '2-digit',
                                    })}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-muted-foreground uppercase tracking-wide mb-1">Total Amount</p>
                                <p className="text-2xl font-display font-bold text-accent">
                                  ₹{order.totalAmount.toLocaleString()}
                                </p>
                              </div>
                            </div>

                            {/* Event Details */}
                            {(order.eventDate || order.eventLocation) && (
                              <div className="bg-secondary rounded-xl p-4 space-y-2">
                                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                                  Event Details
                                </h4>
                                {order.eventDate && (
                                  <p className="text-sm text-foreground flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    {new Date(order.eventDate).toLocaleDateString('en-IN', {
                                      year: 'numeric',
                                      month: 'long',
                                      day: 'numeric',
                                    })}
                                  </p>
                                )}
                                {order.eventLocation && (
                                  <p className="text-sm text-foreground flex items-center gap-2">
                                    <MapPin className="h-4 w-4" />
                                    {order.eventLocation}
                                  </p>
                                )}
                              </div>
                            )}

                            {/* Order Items */}
                            <div>
                              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                                Order Items ({order.items.length})
                              </h4>
                              <div className="space-y-2">
                                {order.items.map((item, idx) => (
                                  <div key={idx} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                                    <div className="flex items-center gap-3">
                                      {item.productImage && (
                                        <img
                                          src={item.productImage}
                                          alt={item.productName}
                                          className="w-12 h-12 rounded-lg object-cover bg-secondary"
                                        />
                                      )}
                                      <div>
                                        <p className="font-medium text-foreground">{item.productName}</p>
                                        <p className="text-xs text-muted-foreground">
                                          Qty: {item.quantity} × {item.days} days @ ₹{item.pricePerDay}/day
                                        </p>
                                      </div>
                                    </div>
                                    <p className="font-semibold text-foreground">
                                      ₹{item.totalPrice.toLocaleString()}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Notes */}
                            {order.notes && (
                              <div className="bg-secondary/50 rounded-lg p-3">
                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                                  Customer Notes
                                </p>
                                <p className="text-sm text-foreground">{order.notes}</p>
                              </div>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="lg:w-48 space-y-3">
                            <div>
                              <Label className="text-xs text-muted-foreground mb-2 block">Update Status</Label>
                              <Select
                                value={order.status}
                                onValueChange={(value) => handleUpdateOrderStatus(order._id, value)}
                              >
                                <SelectTrigger className="rounded-xl">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl">
                                  <SelectItem value="pending">Pending</SelectItem>
                                  <SelectItem value="confirmed">Confirmed</SelectItem>
                                  <SelectItem value="processing">Processing</SelectItem>
                                  <SelectItem value="delivered">Delivered</SelectItem>
                                  <SelectItem value="completed">Completed</SelectItem>
                                  <SelectItem value="cancelled">Cancelled</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <Button 
                              variant="outline" 
                              className="w-full rounded-xl gap-2" 
                              size="sm"
                              onClick={() => handleViewOrderDetails(order)}
                            >
                              <Eye className="h-4 w-4" />
                              View Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Requests Tab */}
          {activeTab === 'requests' && (
            <Card className="luxury-card border-none max-w-6xl ml-auto">
              <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="text-lg font-semibold">All Requests (Orders)</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-2 rounded-lg">
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2 rounded-lg" onClick={handleExportOrders}>
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {ordersLoading ? (
                  <div className="text-center py-12">
                    <Loader className="h-8 w-8 animate-spin mx-auto mb-4 text-accent" />
                    <p className="text-muted-foreground">Loading requests...</p>
                  </div>
                ) : rentalRequests.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">No requests found</h3>
                    <p className="text-muted-foreground">No rental requests have been received yet</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Request ID</th>
                          <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Client</th>
                          <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Items</th>
                          <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Value</th>
                          <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Date</th>
                          <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                          <th className="text-right py-4 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rentalRequests.map((request) => (
                          <tr key={request.id} className="border-b border-border/50 last:border-0 hover:bg-secondary/30 transition-colors">
                            <td className="py-4 px-4 font-mono text-sm text-foreground">{request.id}</td>
                            <td className="py-4 px-4">
                              <div>
                                <p className="font-medium text-foreground">{request.customer}</p>
                                <p className="text-xs text-muted-foreground">{request.email}</p>
                              </div>
                            </td>
                            <td className="py-4 px-4 text-foreground">{request.items}</td>
                            <td className="py-4 px-4 font-semibold text-foreground">₹{request.total.toLocaleString()}</td>
                            <td className="py-4 px-4 text-muted-foreground text-sm">{request.date}</td>
                            <td className="py-4 px-4">{getStatusBadge(request.status)}</td>
                            <td className="py-4 px-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="rounded-lg"
                                  onClick={() => handleViewOrderDetails(request.order)}
                                >
                                  View
                                </Button>
                                <Button 
                                  size="sm" 
                                  className="rounded-lg gradient-luxury text-primary-foreground"
                                  onClick={() => handleApproveRequest(request.order._id)}
                                  disabled={request.status === 'confirmed'}
                                >
                                  {request.status === 'confirmed' ? 'Approved' : 'Approve'}
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <Card className="luxury-card border-none max-w-6xl ml-auto">
              <CardContent className="p-8">
                <div className="text-center py-12">
                  <Settings className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                  <h3 className="text-xl font-display font-semibold text-foreground mb-2">Settings Panel</h3>
                  <p className="text-muted-foreground">.</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      {/* Add Product Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-display flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-luxury flex items-center justify-center">
                <Plus className="h-5 w-5 text-primary-foreground" />
              </div>
              Add New Product
            </DialogTitle>
          </DialogHeader>
          <ProductForm 
            isEdit={false}
            formData={formData}
            featuresInput={featuresInput}
            tagsInput={tagsInput}
            specificationsInput={specificationsInput}
            uploadedImages={uploadedImages}
            fileInputRef={fileInputRef}
            handleInputChange={handleInputChange}
            setFeaturesInput={setFeaturesInput}
            setTagsInput={setTagsInput}
            setSpecificationsInput={setSpecificationsInput}
            handleImageUpload={handleImageUpload}
            removeImage={removeImage}
            handleAddProduct={handleAddProduct}
            handleEditProduct={handleEditProduct}
            setIsAddDialogOpen={setIsAddDialogOpen}
            setIsEditDialogOpen={setIsEditDialogOpen}
            isSubmitting={isSubmitting}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-display flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                <Edit className="h-5 w-5 text-foreground" />
              </div>
              Edit Product
            </DialogTitle>
          </DialogHeader>
          <ProductForm 
            isEdit={true}
            formData={formData}
            featuresInput={featuresInput}
            tagsInput={tagsInput}
            specificationsInput={specificationsInput}
            uploadedImages={uploadedImages}
            existingImages={existingImages}
            deletedImageIndices={deletedImageIndices}
            removeExistingImage={removeExistingImage}
            fileInputRef={fileInputRef}
            handleInputChange={handleInputChange}
            setFeaturesInput={setFeaturesInput}
            setTagsInput={setTagsInput}
            setSpecificationsInput={setSpecificationsInput}
            handleImageUpload={handleImageUpload}
            removeImage={removeImage}
            handleAddProduct={handleAddProduct}
            handleEditProduct={handleEditProduct}
            setIsAddDialogOpen={setIsAddDialogOpen}
            setIsEditDialogOpen={setIsEditDialogOpen}
            isSubmitting={isSubmitting}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-display flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
                <Trash2 className="h-5 w-5 text-destructive" />
              </div>
              Delete Product
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-muted-foreground">
              Are you sure you want to delete <strong className="text-foreground">{selectedProduct?.name}</strong>? 
              This action cannot be undone.
            </p>
          </div>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              className="rounded-xl"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteProduct}
              className="rounded-xl"
            >
              Delete Product
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Bulk Delete Confirmation Dialog */}
      <Dialog open={isBulkDeleteDialogOpen} onOpenChange={setIsBulkDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-display flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
                <Trash2 className="h-5 w-5 text-destructive" />
              </div>
              Delete Multiple Products
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-muted-foreground">
              Are you sure you want to delete <strong className="text-foreground">{selectedProducts.size} products</strong>? 
              This action cannot be undone.
            </p>
          </div>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setIsBulkDeleteDialogOpen(false)}
              className="rounded-xl"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleBulkDelete}
              className="rounded-xl"
            >
              Delete {selectedProducts.size} Products
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Order Details Dialog */}
      <Dialog open={isOrderDetailsOpen} onOpenChange={setIsOrderDetailsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedOrder && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-display flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl gradient-luxury flex items-center justify-center">
                    <FileText className="h-5 w-5 text-primary-foreground" />
                  </div>
                  Order #{selectedOrder._id.slice(-8).toUpperCase()}
                  {getOrderStatusBadge(selectedOrder.status)}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                {/* Customer Information */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1 font-semibold">Customer Name</p>
                    <p className="text-foreground font-medium">{selectedOrder.userName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1 font-semibold">Email</p>
                    <p className="text-foreground">{selectedOrder.userEmail}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1 font-semibold">Phone</p>
                    <p className="text-foreground">{selectedOrder.userPhone || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1 font-semibold">Order Date</p>
                    <p className="text-foreground">
                      {new Date(selectedOrder.createdAt).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>

                {/* Event Details */}
                {(selectedOrder.eventDate || selectedOrder.eventLocation) && (
                  <div className="bg-secondary/50 rounded-xl p-4 space-y-3">
                    <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Event Details
                    </h4>
                    <div className="grid grid-cols-2 gap-4 ml-6">
                      {selectedOrder.eventDate && (
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Event Date</p>
                          <p className="text-foreground font-medium">
                            {new Date(selectedOrder.eventDate).toLocaleDateString('en-IN', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </p>
                        </div>
                      )}
                      {selectedOrder.eventLocation && (
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Location</p>
                          <p className="text-foreground font-medium flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            {selectedOrder.eventLocation}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Delivery Address */}
                {(selectedOrder.deliveryAddress || selectedOrder.deliveryCity || selectedOrder.deliveryPin) && (
                  <div className="bg-secondary/50 rounded-xl p-4 space-y-2">
                    <h4 className="text-sm font-semibold text-foreground">Delivery Address</h4>
                    <div className="space-y-1 text-sm text-foreground ml-2">
                      {typeof selectedOrder.deliveryAddress === 'object' && selectedOrder.deliveryAddress ? (
                        <>
                          {selectedOrder.deliveryAddress.street && <p>{selectedOrder.deliveryAddress.street}</p>}
                          {selectedOrder.deliveryAddress.city && <p>{selectedOrder.deliveryAddress.city}</p>}
                          {selectedOrder.deliveryAddress.state && <p>{selectedOrder.deliveryAddress.state}</p>}
                          {selectedOrder.deliveryAddress.pincode && <p>PIN: {selectedOrder.deliveryAddress.pincode}</p>}
                        </>
                      ) : (
                        <>
                          {selectedOrder.deliveryAddress && <p>{selectedOrder.deliveryAddress}</p>}
                          {selectedOrder.deliveryCity && <p>{selectedOrder.deliveryCity}</p>}
                          {selectedOrder.deliveryPin && <p>PIN: {selectedOrder.deliveryPin}</p>}
                        </>
                      )}
                    </div>
                  </div>
                )}

                {/* Order Items */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide">Order Items</h4>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
                        {item.productImage && (
                          <img
                            src={item.productImage}
                            alt={item.productName}
                            className="w-16 h-16 rounded object-cover"
                          />
                        )}
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{item.productName}</p>
                          <p className="text-xs text-muted-foreground">
                            Qty: {item.quantity} × {item.days} days @ ₹{item.pricePerDay}/day
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-foreground">₹{item.totalPrice.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="bg-secondary/50 rounded-xl p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground font-medium">₹{(selectedOrder.totalAmount - (selectedOrder.depositAmount || 0)).toLocaleString()}</span>
                  </div>
                  {selectedOrder.depositAmount && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Deposit Paid</span>
                      <span className="text-foreground font-medium">₹{selectedOrder.depositAmount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="border-t border-border pt-2 flex justify-between">
                    <span className="font-semibold text-foreground">Total Amount</span>
                    <span className="text-lg font-bold text-accent">₹{selectedOrder.totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="pt-2 flex items-center gap-2">
                    <span className="text-muted-foreground">Payment Status:</span>
                    <Badge variant={selectedOrder.paymentStatus === 'completed' ? 'default' : selectedOrder.paymentStatus === 'pending' ? 'secondary' : 'outline'}>
                      {selectedOrder.paymentStatus || 'pending'}
                    </Badge>
                  </div>
                </div>

                {/* Notes */}
                {selectedOrder.notes && (
                  <div className="bg-secondary/30 rounded-lg p-3">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Customer Notes</p>
                    <p className="text-sm text-foreground">{selectedOrder.notes}</p>
                  </div>
                )}

                {/* Status Update */}
                <div className="border-t border-border pt-4">
                  <Label className="text-sm font-semibold text-foreground mb-2 block">Update Order Status</Label>
                  <Select
                    value={selectedOrder.status}
                    onValueChange={(value) => {
                      handleUpdateOrderStatus(selectedOrder._id, value);
                      setIsOrderDetailsOpen(false);
                    }}
                  >
                    <SelectTrigger className="rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end gap-3 border-t border-border pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsOrderDetailsOpen(false)}
                    className="rounded-xl"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
