import { useState } from 'react';
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
  LayoutDashboard,
  TrendingUp,
  DollarSign,
  Filter,
  Download,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { products } from '@/lib/products';
import { cn } from '@/lib/utils';

type TabType = 'dashboard' | 'products' | 'requests' | 'settings';

const Admin = () => {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  const rentalRequests = [
    { id: 'REQ-001', customer: 'Reliance Industries', email: 'events@ril.com', items: 24, total: 485000, status: 'pending', date: '2024-01-15' },
    { id: 'REQ-002', customer: 'Tata Events', email: 'procurement@tata.com', items: 12, total: 185500, status: 'approved', date: '2024-01-14' },
    { id: 'REQ-003', customer: 'Infosys Conference', email: 'events@infosys.com', items: 38, total: 892000, status: 'completed', date: '2024-01-13' },
    { id: 'REQ-004', customer: 'Wipro Annual Meet', email: 'corporate@wipro.com', items: 8, total: 124200, status: 'pending', date: '2024-01-12' },
  ];

  const stats = [
    { label: 'Total Revenue', value: '₹24.5L', change: '+12.5%', icon: DollarSign, color: 'bg-green-500/10 text-green-600' },
    { label: 'Active Rentals', value: '28', change: '+8', icon: ShoppingCart, color: 'bg-blue-500/10 text-blue-600' },
    { label: 'Products', value: products.length.toString(), change: '+3', icon: Package, color: 'bg-purple-500/10 text-purple-600' },
    { label: 'Clients', value: '156', change: '+24', icon: Users, color: 'bg-amber-500/10 text-amber-600' },
  ];

  const getStatusBadge = (status: string) => {
    const config = {
      pending: { class: 'bg-amber-50 text-amber-700 border-amber-200', icon: Clock },
      approved: { class: 'bg-green-50 text-green-700 border-green-200', icon: CheckCircle },
      completed: { class: 'bg-blue-50 text-blue-700 border-blue-200', icon: CheckCircle },
      rejected: { class: 'bg-red-50 text-red-700 border-red-200', icon: XCircle },
    };
    const statusConfig = config[status as keyof typeof config] || config.pending;
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
    { id: 'requests', label: 'Requests', icon: ShoppingCart },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

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
              onClick={() => setActiveTab(item.id as TabType)}
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
              <Button className="gap-2 h-11 rounded-xl gradient-luxury text-primary-foreground shadow-lg">
                <Plus className="h-4 w-4" />
                Add Product
              </Button>
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
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
                  <CardTitle className="text-lg font-semibold">Recent Requests</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2 rounded-lg">
                      <Filter className="h-4 w-4" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2 rounded-lg">
                      <Download className="h-4 w-4" />
                      Export
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
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
                        {rentalRequests.map((request) => (
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
                </CardContent>
              </Card>
            </div>
          )}

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <Card 
                  key={product.id} 
                  className="luxury-card overflow-hidden border-none group"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="aspect-[4/3] bg-secondary overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
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
                          <DropdownMenuItem className="gap-2 rounded-lg">
                            <Edit className="h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 rounded-lg text-destructive">
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
          )}

          {/* Requests Tab */}
          {activeTab === 'requests' && (
            <Card className="luxury-card border-none">
              <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="text-lg font-semibold">All Requests</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-2 rounded-lg">
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2 rounded-lg">
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
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
                              <Button variant="outline" size="sm" className="rounded-lg">View</Button>
                              <Button size="sm" className="rounded-lg gradient-luxury text-primary-foreground">Respond</Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <Card className="luxury-card border-none">
              <CardContent className="p-8">
                <div className="text-center py-12">
                  <Settings className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                  <h3 className="text-xl font-display font-semibold text-foreground mb-2">Settings Panel</h3>
                  <p className="text-muted-foreground">Connect Lovable Cloud to enable account settings and preferences.</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default Admin;
