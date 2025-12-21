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
          <Text style={styles.categoryText}>{product.category}</Text>
        </View>
        <View style={styles.newBadge}>
          <Text style={styles.newText}>Baru</Text>
        </View>
      </View>

      {/* Info */}
      <View style={styles.infoContainer}>
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
          <Text style={styles.price}>{formatPrice(product.price)}</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => onAddToCart(product)}
          >
            <Text style={styles.addButtonText}>🛒</Text>
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
    backgroundColor: COLORS.darkAccent,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#d4af3733',
    overflow: 'hidden',
    marginBottom: 12,
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
    top: 8,
    left: 8,
    backgroundColor: 'rgba(15, 15, 18, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#d4af3750',
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.silver,
  },
  newBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: COLORS.gold,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  newText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.dark,
  },
  infoContainer: {
    padding: 12,
    gap: 8,
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
    color: COLORS.gold,
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
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.gold,
  },
  addButton: {
    borderWidth: 1,
    borderColor: '#d4af3750',
    padding: 6,
    borderRadius: 50,
  },
  addButtonText: {
    fontSize: 14,
  },
});
