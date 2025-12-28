import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { COLORS, formatPrice } from '../utils/constants';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onPress: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

const { width } = Dimensions.get('window');
const cardWidth = (width - 20 - 8) / 2;

const ProductCardComponent: React.FC<ProductCardProps> = ({
  product,
  onPress,
  onAddToCart,
}) => {
  const discountPercent = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;

  return (
    <TouchableOpacity
      style={[styles.card, { width: cardWidth }]}
      onPress={() => onPress(product)}
      activeOpacity={0.7}
    >
      {/* Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>
            {product.badge ?? product.category}
          </Text>
        </View>
        {product.originalPrice && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-{discountPercent}%</Text>
          </View>
        )}
      </View>

      {/* Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.brandText}>{product.brand ?? 'Original'}</Text>
        <Text style={styles.productName} numberOfLines={2}>
          {product.name}
        </Text>

        {/* Rating */}
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>
            {'★'.repeat(Math.floor(product.rating))}
            {'☆'.repeat(5 - Math.floor(product.rating))}
          </Text>
          <Text style={styles.ratingValue}>{product.rating.toFixed(1)}</Text>
        </View>

        {/* Price and Button */}
        <View style={styles.priceContainer}>
          <View style={styles.priceBlock}>
            <Text style={styles.price}>{formatPrice(product.price)}</Text>
            {product.originalPrice && (
              <Text style={styles.originalPrice}>
                {formatPrice(product.originalPrice)}
              </Text>
            )}
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => onAddToCart(product)}
            activeOpacity={0.7}
          >
            <Text style={styles.addButtonText}>ADD</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const ProductCard = React.memo(
  ProductCardComponent,
  (prevProps, nextProps) => {
    return (
      prevProps.product.id === nextProps.product.id &&
      prevProps.onPress === nextProps.onPress &&
      prevProps.onAddToCart === nextProps.onAddToCart
    );
  },
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#0A0A0A',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    overflow: 'hidden',
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  imageContainer: {
    position: 'relative',
    height: 200,
    backgroundColor: '#000',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  categoryBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(10px)',
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.silver,
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#ff6b6b',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFFFFF20',
  },
  discountText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#fff',
  },
  infoContaine4,
    gap: 8,
    backgroundColor: '#0A0A0A'g: 12,
    gap: 8,
  },
  brandText: {
    color: COLORS.silver,
    opacity: 0.65,
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  productName: {
    color: COLORS.silver,
    fontWeight: '600',
    fontSize: 14,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    color: COLORS.silver,
  },
  ratingValue: {
    fontSize: 11,
    color: COLORS.silver,
    opacity: 0.6,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
    gap: 10,
  },
  priceBlock: {
    flex: 1,
    gap: 2,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.silver,
  },
  originalPrice: {
    fontSize: 12,
    color: COLORS.silver,
    opacity: 0.5,
    textDecorationLine: 'line-through',
  },
  addButton: {.5,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    padding: 7,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
  },
  addButtonText: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.white,
    letterSpacing: 0.5
    color: COLORS.silver,
  },
});
