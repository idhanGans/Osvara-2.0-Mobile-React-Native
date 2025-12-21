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
  dark: '#0b0b0f',
  darkAccent: '#0f0f12',
  gold: '#d4af37',
  silver: '#e8e8e8',
  goldLight: '#f5f5dc',
  error: '#ff6b6b',
  success: '#51cf66',
  warning: '#ffd93d',
};

export const PRODUCTS: any[] = [
  {
    id: '1',
    name: 'Premium Silk Gamis',
    price: 450000,
    image:
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    category: 'Gamis',
    rating: 4.8,
    description:
      'Gamis berkualitas premium dari sutra pilihan dengan desain elegan dan nyaman.',
  },
  {
    id: '2',
    name: 'Elegant Khimar Set',
    price: 350000,
    image:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    category: 'Khimar',
    rating: 4.9,
    description:
      'Set khimar lengkap dengan desain mewah dan bahan berkualitas tinggi.',
  },
  {
    id: '3',
    name: 'Luxury Black Abaya',
    price: 550000,
    image:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    category: 'Abaya',
    rating: 5,
    description:
      'Abaya hitam mewah dengan detail bordir eksklusif dan jahitan sempurna.',
  },
  {
    id: '4',
    name: 'Embroidered Gamis',
    price: 520000,
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80',
    category: 'Gamis',
    rating: 4.7,
    description:
      'Gamis dengan bordir tangan yang indah dan elegan untuk acara spesial.',
  },
];

export const CATEGORIES = [
  'Wanita',
  'Pria',
  'Anak',
  'Sport',
  'Modest',
  'Aksesoris',
  'Sale',
];
