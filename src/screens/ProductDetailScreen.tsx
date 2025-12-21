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
} from 'react-native';
import { Header } from '../components/Header';
import { COLORS, formatPrice } from '../utils/constants';
import { useCartStore } from '../store/cartStore';

export const ProductDetailScreen: React.FC<{ navigation: any; route: any }> = ({
  navigation,
  route,
}) => {
  const { product } = route.params;
  const [quantity, setQuantity] = useState(1);
  const addToCart = useCartStore(state => state.addToCart);

  const handleAddToCart = useCallback(() => {
    addToCart(product, quantity);
    InteractionManager.runAfterInteractions(() => {
      Alert.alert('Berhasil', `${product.name} ditambahkan ke keranjang`);
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

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false} scrollEventThrottle={16}>
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

          <Text style={styles.category}>{product.category}</Text>
          <Text style={styles.price}>{formatPrice(product.price)}</Text>

          {/* Description */}
          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>Deskripsi</Text>
            <Text style={styles.description}>
              {product.description || 'Produk berkualitas premium dari Osvara.'}
            </Text>
          </View>

          {/* Details */}
          <View style={styles.detailsSection}>
            <Text style={styles.sectionTitle}>Detail Produk</Text>
            <DetailRow label="Material" value="100% Katun Premium" />
            <DetailRow label="Ukuran" value="All Size" />
            <DetailRow label="Warna" value="Sesuai Foto" />
            <DetailRow label="Garansi" value="100% Kepuasan" />
          </View>

          {/* Quantity */}
          <View style={styles.quantitySection}>
            <Text style={styles.sectionTitle}>Jumlah</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
                style={styles.quantityButton}
              >
                <Text style={styles.quantityButtonText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.quantityValue}>{quantity}</Text>
              <TouchableOpacity
                onPress={() => setQuantity(quantity + 1)}
                style={styles.quantityButton}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.spacer} />
        </View>
      </ScrollView>

      {/* Action Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
          <Text style={styles.addButtonText}>Tambah ke Keranjang</Text>
        </TouchableOpacity>
      </View>
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
    color: COLORS.gold,
  },
  category: {
    fontSize: 12,
    color: COLORS.silver,
    opacity: 0.6,
    marginBottom: 12,
  },
  price: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.gold,
    marginBottom: 20,
  },
  descriptionSection: {
    marginBottom: 24,
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
    borderBottomColor: '#d4af3720',
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
    borderColor: '#d4af3750',
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  quantityButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  quantityButtonText: {
    color: COLORS.gold,
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
  spacer: {
    height: 40,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: 24,
  },
  addButton: {
    backgroundColor: COLORS.gold,
    paddingVertical: 14,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: COLORS.dark,
    fontSize: 16,
    fontWeight: '700',
  },
});
