import React, { useState, useCallback } from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  InteractionManager,
  Modal,
} from 'react-native';
import { Header } from '../components/Header';
import { MockupProduct } from '../components/MockupProduct';
import { COLORS, formatPrice } from '../utils/constants';
import { useCartStore } from '../store/cartStore';

export const ProductDetailScreen: React.FC<{ navigation: any; route: any }> = ({
  navigation,
  route,
}) => {
  const { product } = route.params;
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(
    product.sizes?.[0] || null,
  );
  const [selectedColor, setSelectedColor] = useState<string | null>(
    product.colors?.[0] || null,
  );
  const [showMockup, setShowMockup] = useState(false);
  const addToCart = useCartStore(state => state.addToCart);
  const discountPercent = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;

  const handleAddToCart = useCallback(() => {
    addToCart(product, quantity);
    InteractionManager.runAfterInteractions(() => {
      Alert.alert('Success', `${product.name} added to cart`);
      navigation.goBack();
    });
  }, [addToCart, product, quantity, navigation]);

  return (
    <View style={styles.container}>
      <Header
        onCartPress={() => navigation.navigate('Cart')}
        title={product.name}
        showCart={true}
      />

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        {/* Image */}
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Info */}
        <View style={styles.infoSection}>
          <View style={styles.headerRow}>
            <Text style={styles.name}>{product.name}</Text>
            <Text style={styles.rating}>★ {product.rating}</Text>
          </View>

          <View style={styles.metaRow}>
            <Text style={styles.category}>{product.category}</Text>
            {product.brand && <Text style={styles.brand}>{product.brand}</Text>}
            {product.badge && <Text style={styles.badge}>{product.badge}</Text>}
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.price}>{formatPrice(product.price)}</Text>
            {product.originalPrice && (
              <Text style={styles.originalPrice}>
                {formatPrice(product.originalPrice)}
              </Text>
            )}
            {discountPercent > 0 && (
              <Text style={styles.discount}>-{discountPercent}%</Text>
            )}
          </View>

          {/* Description */}
          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>
              {product.description || 'Premium quality product from Osvara.'}
            </Text>
          </View>

          {/* Sizes */}
          {product.sizes && product.sizes.length > 0 && (
            <View style={styles.optionsSection}>
              <Text style={styles.sectionTitle}>Size</Text>
              <View style={styles.optionsContainer}>
                {product.sizes.map((size: string) => (
                  <TouchableOpacity
                    key={size}
                    style={[
                      styles.optionButton,
                      selectedSize === size && styles.optionButtonSelected,
                    ]}
                    onPress={() => setSelectedSize(size)}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.optionButtonText,
                        selectedSize === size &&
                          styles.optionButtonTextSelected,
                      ]}
                    >
                      {size}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <View style={styles.optionsSection}>
              <Text style={styles.sectionTitle}>Color</Text>
              <View style={styles.optionsContainer}>
                {product.colors.map((color: string) => (
                  <TouchableOpacity
                    key={color}
                    style={[
                      styles.optionButton,
                      selectedColor === color && styles.optionButtonSelected,
                    ]}
                    onPress={() => setSelectedColor(color)}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.optionButtonText,
                        selectedColor === color &&
                          styles.optionButtonTextSelected,
                      ]}
                    >
                      {color}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Details */}
          <View style={styles.detailsSection}>
            <Text style={styles.sectionTitle}>Product Details</Text>
            <DetailRow label="Material" value="Premium Fabric" />
            <DetailRow label="In Stock" value="Yes" />
            <DetailRow label="Guarantee" value="100% Satisfaction" />
            <DetailRow label="Brand" value={product.brand || 'Osvara'} />
          </View>

          {/* Quantity */}
          <View style={styles.quantitySection}>
            <Text style={styles.sectionTitle}>Quantity</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
                style={styles.quantityButton}
                activeOpacity={0.6}
              >
                <Text style={styles.quantityButtonText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.quantityValue}>{quantity}</Text>
              <TouchableOpacity
                onPress={() => setQuantity(quantity + 1)}
                style={styles.quantityButton}
                activeOpacity={0.6}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Virtual Try-On Button */}
          <TouchableOpacity
            style={styles.tryOnButton}
            onPress={() => setShowMockup(true)}
            activeOpacity={0.8}
          >
            <Text style={styles.tryOnButtonText}>👗 Try Virtual</Text>
          </TouchableOpacity>

          <View style={styles.spacer} />
        </View>
      </ScrollView>

      {/* Action Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddToCart}
          activeOpacity={0.8}
        >
          <Text style={styles.addButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>

      {/* Virtual Try-On Modal */}
      <Modal
        visible={showMockup}
        animationType="slide"
        onRequestClose={() => setShowMockup(false)}
      >
        <MockupProduct
          productImage={product.image}
          productName={product.name}
          onClose={() => setShowMockup(false)}
        />
      </Modal>
    </View>
  );
};

const DetailRow: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark,
  },
  content: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 300,
    backgroundColor: '#000',
  },
  infoSection: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.silver,
    flex: 1,
    marginRight: 12,
  },
  rating: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.silver,
  },
  category: {
    fontSize: 12,
    color: COLORS.silver,
    opacity: 0.6,
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
    marginBottom: 8,
  },
  brand: {
    fontSize: 13,
    color: COLORS.silver,
    opacity: 0.8,
    fontWeight: '600',
  },
  badge: {
    fontSize: 12,
    color: COLORS.silver,
    backgroundColor: '#C0C0C01a',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#C0C0C030',
  },
  price: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.white,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  originalPrice: {
    fontSize: 14,
    color: COLORS.silver,
    opacity: 0.5,
    textDecorationLine: 'line-through',
  },
  discount: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.success,
  },
  descriptionSection: {
    marginBottom: 24,
  },
  optionsSection: {
    marginBottom: 24,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  optionButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: COLORS.silver + '40',
    backgroundColor: COLORS.darkAccent,
  },
  optionButtonSelected: {
    borderColor: COLORS.white,
    backgroundColor: COLORS.white + '20',
  },
  optionButtonText: {
    color: COLORS.silver,
    fontSize: 13,
    fontWeight: '600',
  },
  optionButtonTextSelected: {
    color: COLORS.white,
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.silver,
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: COLORS.silver,
    lineHeight: 22,
    opacity: 0.8,
  },
  detailsSection: {
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#C0C0C020',
  },
  detailLabel: {
    fontSize: 14,
    color: COLORS.silver,
    opacity: 0.6,
  },
  detailValue: {
    fontSize: 14,
    color: COLORS.silver,
    fontWeight: '600',
  },
  quantitySection: {
    marginBottom: 24,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C0C0C050',
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  quantityButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  quantityButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '700',
  },
  quantityValue: {
    color: COLORS.silver,
    fontSize: 16,
    fontWeight: '700',
    minWidth: 40,
    textAlign: 'center',
  },
  tryOnButton: {
    backgroundColor: COLORS.darkAccent,
    borderWidth: 2,
    borderColor: COLORS.silver,
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  tryOnButtonText: {
    color: COLORS.silver,
    fontSize: 16,
    fontWeight: 'bold',
  },
  spacer: {
    height: 40,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: 24,
  },
  addButton: {
    backgroundColor: COLORS.white,
    paddingVertical: 14,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: '700',
  },
});
