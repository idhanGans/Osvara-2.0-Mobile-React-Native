import { create } from 'zustand';
import { CartItem, Product } from '../types';

interface CartStore {
  items: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],

  addToCart: (product, quantity) =>
    set(state => {
      const existingItem = state.items.find(item => item.id === product.id);
      if (existingItem) {
        return {
          items: state.items.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          ),
        };
      }
      return {
        items: [...state.items, { ...product, quantity }],
      };
    }),

  removeFromCart: productId =>
    set(state => ({
      items: state.items.filter(item => item.id !== productId),
    })),

  updateQuantity: (productId, quantity) =>
    set(state => ({
      items: state.items.map(item =>
        item.id === productId ? { ...item, quantity } : item,
      ),
    })),

  clearCart: () => set({ items: [] }),

  getTotalPrice: () => {
    return get().items.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  },

  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },
}));
