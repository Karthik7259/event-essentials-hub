/**
 * API Service for authentication and user-related endpoints
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const apiCall = async (endpoint, method = 'GET', body = null, token = null) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['token'] = token;
  }

  const options = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

/**
 * User Authentication APIs
 */
export const authAPI = {
  // Login user
  login: (email, password) =>
    apiCall('/api/user/login', 'POST', { email, password }),

  // Register user
  register: (name, email, password) =>
    apiCall('/api/user/register', 'POST', { name, email, password }),

  // Admin login
  adminLogin: (email, password) =>
    apiCall('/api/user/admin', 'POST', { email, password }),

  // Forgot password - send OTP
  forgotPassword: (email) =>
    apiCall('/api/user/forgot-password', 'POST', { email }),

  // Verify OTP
  verifyOTP: (email, otp) =>
    apiCall('/api/user/verify-otp', 'POST', { email, otp }),

  // Reset password after OTP verification
  resetPassword: (email, otp, password) =>
    apiCall('/api/user/reset-password', 'POST', { email, otp, password }),

  // Verify token
  verifyToken: (token) =>
    apiCall('/api/user/verify-token', 'GET', null, token),
};

/**
 * Product APIs
 */
export const productAPI = {
  // Get all products
  getAllProducts: () =>
    apiCall('/api/product/list', 'GET'),

  // Get product by ID
  getProductById: (id) =>
    apiCall(`/api/product/${id}`, 'GET'),

  // Get products by category
  getProductsByCategory: (category) =>
    apiCall(`/api/product/category/${category}`, 'GET'),

  // Search products
  searchProducts: (query) =>
    apiCall(`/api/product/search?query=${encodeURIComponent(query)}`, 'GET'),

  // Add product (admin only)
  addProduct: (formData, token) => {
    const headers = {};
    if (token) {
      headers['token'] = token;
    }

    const options = {
      method: 'POST',
      headers,
      body: formData, // multipart/form-data
    };

    return fetch(`${API_BASE_URL}/api/product/add`, options)
      .then(response => response.json())
      .catch(error => {
        console.error('API call failed:', error);
        throw error;
      });
  },

  // Update product (admin only)
  updateProduct: (id, formData, token) => {
    const headers = {};
    if (token) {
      headers['token'] = token;
    }

    const options = {
      method: 'PUT',
      headers,
      body: formData, // multipart/form-data
    };

    return fetch(`${API_BASE_URL}/api/product/update/${id}`, options)
      .then(response => response.json())
      .catch(error => {
        console.error('API call failed:', error);
        throw error;
      });
  },

  // Delete product (admin only)
  deleteProduct: (id, token) =>
    apiCall(`/api/product/delete/${id}`, 'DELETE', null, token),

  // Update availability (admin only)
  updateAvailability: (id, data, token) =>
    apiCall(`/api/product/availability/${id}`, 'PUT', data, token),

  // Add review (user authenticated)
  addReview: (id, review, token) =>
    apiCall(`/api/product/review/${id}`, 'POST', review, token),
};

/**
 * Order APIs
 */
export const orderAPI = {
  // Create new order (user authenticated)
  createOrder: (orderData, token) =>
    apiCall('/api/order/create', 'POST', orderData, token),

  // Get user's orders (user authenticated)
  getUserOrders: (token) =>
    apiCall('/api/order/user', 'GET', null, token),

  // Get order by ID (user authenticated)
  getOrderById: (id, token) =>
    apiCall(`/api/order/${id}`, 'GET', null, token),

  // Get all orders (admin only)
  getAllOrders: (token, filters = {}) => {
    // Filter out undefined/null values
    const cleanFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== undefined && value !== null && value !== '')
    );
    const queryParams = new URLSearchParams(cleanFilters).toString();
    const endpoint = queryParams ? `/api/order/admin/all?${queryParams}` : '/api/order/admin/all';
    return apiCall(endpoint, 'GET', null, token);
  },

  // Get order statistics (admin only)
  getOrderStats: (token) =>
    apiCall('/api/order/admin/stats', 'GET', null, token),

  // Update order status (admin only)
  updateOrderStatus: (id, statusData, token) =>
    apiCall(`/api/order/admin/status/${id}`, 'PUT', statusData, token),

  // Update payment status (admin only)
  updatePaymentStatus: (id, paymentData, token) =>
    apiCall(`/api/order/admin/payment/${id}`, 'PUT', paymentData, token),

  // Delete order (admin only)
  deleteOrder: (id, token) =>
    apiCall(`/api/order/admin/${id}`, 'DELETE', null, token),
};

export default authAPI;
