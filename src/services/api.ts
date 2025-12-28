import axios, { AxiosInstance, AxiosResponse } from 'axios';

// API Base URL - Change this to your actual backend URL
const BASE_URL = __DEV__
  ? 'http://localhost:5000/api'
  : 'https://your-production-api.com/api';

// Create axios instance with default config
const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth tokens or logging
apiClient.interceptors.request.use(
  config => {
    // Add auth token if available
    // const token = await AsyncStorage.getItem('authToken');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      // Server responded with error
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      // Request made but no response
      console.error('Network Error:', error.message);
    } else {
      // Something else happened
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  },
);

// API Service Types
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  description: string;
  badge?: string;
  brand?: string;
}

export interface Order {
  id: string;
  products: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  status: 'pending' | 'paid' | 'shipped' | 'delivered';
  paymentIntentId?: string;
  createdAt: string;
}

export interface PaymentIntent {
  clientSecret: string;
  paymentIntentId: string;
}

export interface WhatsAppMessage {
  phone: string;
  message: string;
}

// API Service
class ApiService {
  // Products
  async getProducts(category?: string): Promise<Product[]> {
    try {
      const params = category ? { category } : {};
      const response: AxiosResponse<Product[]> = await apiClient.get(
        '/products',
        { params },
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  async getProductById(id: string): Promise<Product> {
    try {
      const response: AxiosResponse<Product> = await apiClient.get(
        `/products/${id}`,
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  }

  // Orders
  async createOrder(orderData: {
    products: Array<{ productId: string; quantity: number; price: number }>;
    customerInfo: {
      name: string;
      email: string;
      phone: string;
      address: string;
    };
    total: number;
  }): Promise<Order> {
    try {
      const response: AxiosResponse<Order> = await apiClient.post(
        '/orders',
        orderData,
      );
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }

  async getOrderById(id: string): Promise<Order> {
    try {
      const response: AxiosResponse<Order> = await apiClient.get(
        `/orders/${id}`,
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  }

  // Payments (Stripe)
  async createPaymentIntent(data: {
    amount: number;
    orderId: string;
  }): Promise<PaymentIntent> {
    try {
      const response: AxiosResponse<PaymentIntent> = await apiClient.post(
        '/payments/create-intent',
        data,
      );
      return response.data;
    } catch (error) {
      console.error('Error creating payment intent:', error);
      throw error;
    }
  }

  async confirmPayment(data: {
    paymentIntentId: string;
    orderId: string;
  }): Promise<{ success: boolean; order: Order }> {
    try {
      const response: AxiosResponse<{ success: boolean; order: Order }> =
        await apiClient.post('/payments/confirm', data);
      return response.data;
    } catch (error) {
      console.error('Error confirming payment:', error);
      throw error;
    }
  }

  // WhatsApp
  async sendWhatsAppMessage(data: WhatsAppMessage): Promise<{
    success: boolean;
    url: string;
  }> {
    try {
      const response: AxiosResponse<{ success: boolean; url: string }> =
        await apiClient.post('/whatsapp/send', data);
      return response.data;
    } catch (error) {
      console.error('Error sending WhatsApp message:', error);
      throw error;
    }
  }

  // Newsletter
  async subscribeNewsletter(email: string): Promise<{ success: boolean }> {
    try {
      const response: AxiosResponse<{ success: boolean }> =
        await apiClient.post('/newsletter/subscribe', { email });
      return response.data;
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      throw error;
    }
  }

  // Contact Form
  async sendContactForm(data: {
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
  }): Promise<{ success: boolean }> {
    try {
      const response: AxiosResponse<{ success: boolean }> =
        await apiClient.post('/contact', data);
      return response.data;
    } catch (error) {
      console.error('Error sending contact form:', error);
      throw error;
    }
  }
}

export default new ApiService();
