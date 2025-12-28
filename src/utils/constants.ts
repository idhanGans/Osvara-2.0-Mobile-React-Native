export const formatPrice = (
  price: number,
  locale: string = 'id-ID',
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);
};

export const COLORS = {
  // Osvara brand colors - from repo
  dark: '#0F0F0F',
  black: '#000000',
  white: '#FFFFFF',
  gold: '#D4AF37',
  goldLight: '#E8D9B8',
  silver: '#E8E8E8',
  grey: '#9E9E9E',
  darkAccent: '#1A1A1A',

  // Feedback colors
  error: '#E57373',
  success: '#81C784',
  warning: '#BDBDBD',
};

export const PRODUCTS: any[] = [
  // Gamis Collection
  {
    id: '1',
    name: 'Premium Silk Gamis Emerald',
    brand: 'Osvara',
    price: 450000,
    originalPrice: 550000,
    badge: 'New Arrival',
    image:
      'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=900&q=80',
    category: 'Gamis',
    rating: 4.8,
    reviewCount: 124,
    description:
      'Elegant silk gamis in beautiful emerald green. Perfect for special occasions and daily wear.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Emerald', 'Navy', 'Black', 'Maroon'],
  },
  {
    id: '2',
    name: 'Embroidered Royal Gamis',
    brand: 'Osvara',
    price: 520000,
    originalPrice: 650000,
    badge: 'Flash Sale',
    image:
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80',
    category: 'Gamis',
    rating: 4.7,
    reviewCount: 89,
    description:
      'Luxurious gamis with intricate gold embroidery. Features a flattering A-line silhouette.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Dusty Pink', 'Sage Green', 'Cream'],
  },
  {
    id: '3',
    name: 'Modern Minimalist Gamis',
    brand: 'Osvara',
    price: 380000,
    originalPrice: 450000,
    badge: 'Best Seller',
    image:
      'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=900&q=80',
    category: 'Gamis',
    rating: 4.9,
    reviewCount: 156,
    description:
      'Clean and modern gamis design perfect for everyday wear. Soft cotton blend fabric.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Grey', 'Black', 'Navy'],
  },

  // Khimar Collection
  {
    id: '4',
    name: 'Elegant Silk Khimar',
    brand: 'Osvara',
    price: 350000,
    originalPrice: 450000,
    badge: 'Popular',
    image:
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=80',
    category: 'Khimar',
    rating: 4.9,
    reviewCount: 203,
    description:
      'Premium silk khimar with beautiful draping. Easy to style and comfortable.',
    sizes: ['Standard', 'Large'],
    colors: ['Black', 'Navy', 'Brown', 'Cream', 'Dusty Pink'],
  },
  {
    id: '5',
    name: 'Instant Khimar Premium',
    brand: 'Osvara',
    price: 280000,
    originalPrice: 350000,
    badge: null,
    image:
      'https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?w=400&h=500&fit=crop',
    category: 'Khimar',
    rating: 4.8,
    reviewCount: 167,
    description:
      'Easy-to-wear instant khimar. No pins required, perfect for busy women.',
    sizes: ['Standard'],
    colors: ['Black', 'Grey', 'Navy', 'Maroon', 'Forest Green'],
  },
  {
    id: '6',
    name: 'Chiffon Layer Khimar',
    brand: 'Osvara',
    price: 320000,
    originalPrice: 400000,
    badge: 'Flash Sale',
    image:
      'https://images.unsplash.com/photo-1583391733981-8b530c8a9585?w=400&h=500&fit=crop',
    category: 'Khimar',
    rating: 4.7,
    reviewCount: 92,
    description:
      'Elegant layered chiffon khimar with beautiful flowing design.',
    sizes: ['Standard', 'Large'],
    colors: ['Champagne', 'Blush', 'Sage', 'Lilac'],
  },

  // Abaya Collection
  {
    id: '7',
    name: 'Luxury Black Abaya',
    brand: 'Osvara',
    price: 550000,
    originalPrice: 680000,
    badge: 'Best Seller',
    image:
      'https://images.unsplash.com/photo-1622398925373-3f91b1e275f5?auto=format&fit=crop&w=900&q=80',
    category: 'Abaya',
    rating: 5,
    reviewCount: 287,
    description:
      'Timeless black abaya with subtle details. Premium nidha fabric.',
    sizes: ['52', '54', '56', '58', '60'],
    colors: ['Black'],
  },
  {
    id: '8',
    name: 'Designer Embroidered Abaya',
    brand: 'Osvara',
    price: 680000,
    originalPrice: 820000,
    badge: 'New Arrival',
    image:
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=900&q=80',
    category: 'Abaya',
    rating: 4.9,
    reviewCount: 156,
    description: 'Stunning designer abaya with intricate handmade embroidery.',
    sizes: ['52', '54', '56', '58'],
    colors: ['Black with Gold', 'Navy with Silver', 'Maroon with Gold'],
  },
  {
    id: '9',
    name: 'Butterfly Sleeve Abaya',
    brand: 'Osvara',
    price: 520000,
    originalPrice: 620000,
    badge: 'Flash Sale',
    image:
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=500&fit=crop',
    category: 'Abaya',
    rating: 4.8,
    reviewCount: 112,
    description: 'Elegant butterfly sleeve abaya with flowing silhouette.',
    sizes: ['52', '54', '56', '58', '60'],
    colors: ['Black', 'Charcoal', 'Deep Purple'],
  },

  // Accessories Collection
  {
    id: '10',
    name: 'Pearl Hijab Pin Set',
    brand: 'Osvara',
    price: 85000,
    originalPrice: 120000,
    badge: null,
    image:
      'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=500&fit=crop',
    category: 'Accessories',
    rating: 4.8,
    reviewCount: 345,
    description:
      'Elegant pearl hijab pin set. Includes 6 pieces in different sizes.',
    colors: ['Gold', 'Silver', 'Rose Gold'],
  },
  {
    id: '11',
    name: 'Magnetic Hijab Pin Premium',
    brand: 'Osvara',
    price: 120000,
    originalPrice: 180000,
    badge: 'New Arrival',
    image:
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=500&fit=crop',
    category: 'Accessories',
    rating: 4.9,
    reviewCount: 278,
    description: 'Premium magnetic hijab pins. No holes in your fabric!',
    colors: ['Gold Floral', 'Silver Crystal', 'Rose Gold Pearl'],
  },
  {
    id: '12',
    name: 'Luxury Hijab Bag',
    brand: 'Osvara',
    price: 350000,
    originalPrice: 450000,
    badge: 'Flash Sale',
    image:
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=500&fit=crop',
    category: 'Accessories',
    rating: 4.6,
    reviewCount: 67,
    description:
      'Elegant leather bag perfect for carrying your hijab and essentials.',
    colors: ['Black', 'Brown', 'Cream', 'Burgundy'],
  },
];

export const CATEGORIES = [
  'All',
  'Gamis',
  'Khimar',
  'Abaya',
  'Accessories',
  'Sale',
];
