import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  Alert,
  Dimensions,
  InteractionManager,
} from 'react-native';
import { Header } from '../components/Header';
import { ProductCard } from '../components/ProductCard';
import { COLORS, PRODUCTS, CATEGORIES } from '../utils/constants';
import { useCartStore } from '../store/cartStore';
import { Product } from '../types';

const { width } = Dimensions.get('window');

export const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const addToCart = useCartStore(state => state.addToCart);

  const filteredProducts = useMemo(
    () =>
      selectedCategory
        ? PRODUCTS.filter(p => p.category === selectedCategory)
        : PRODUCTS,
    [selectedCategory],
  );

  const handleAddToCart = useCallback(
    (product: Product) => {
      addToCart(product, 1);
      InteractionManager.runAfterInteractions(() => {
        Alert.alert('Berhasil', `${product.name} ditambahkan ke keranjang`);
      });
    },
    [addToCart],
  );

  const handleProductPress = useCallback(
    (product: Product) => {
      InteractionManager.runAfterInteractions(() => {
        navigation.navigate('ProductDetail', { product });
      });
    },
    [navigation],
  );

  return (
    <View style={styles.container}>
      <Header onCartPress={() => navigation.navigate('Cart')} showCart={true} />

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        {/* Banner */}
        <View style={styles.banner}>
          <Text style={styles.bannerText}>Koleksi Terbaru Kami</Text>
          <Text style={styles.bannerSubText}>
            Busana muslim modern dengan sentuhan elegan
          </Text>
        </View>

        {/* Categories */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Kategori</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesScroll}
          >
            <TouchableOpacity
              style={[
                styles.categoryChip,
                selectedCategory === null && styles.categoryChipActive,
              ]}
              onPress={() => setSelectedCategory(null)}
              activeOpacity={0.6}
            >
              <Text
                style={[
                  styles.categoryChipText,
                  selectedCategory === null && styles.categoryChipTextActive,
                ]}
              >
                Semua
              </Text>
            </TouchableOpacity>
            {CATEGORIES.map(category => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryChip,
                  selectedCategory === category && styles.categoryChipActive,
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    selectedCategory === category &&
                      styles.categoryChipTextActive,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Products Grid */}
        <View style={styles.productsSection}>
          <Text style={styles.sectionTitle}>Produk Pilihan</Text>
          <FlatList
            data={filteredProducts}
            keyExtractor={item => item.id}
            numColumns={2}
            columnWrapperStyle={styles.row}
            scrollEnabled={false}
            removeClippedSubviews={true}
            maxToRenderPerBatch={10}
            updateCellsBatchingPeriod={50}
            initialNumToRender={6}
            renderItem={({ item }) => (
              <ProductCard
                product={item}
                onPress={handleProductPress}
                onAddToCart={handleAddToCart}
              />
            )}
          />
        </View>

        <View style={styles.spacer} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark,
  },
  content: {
    flex: 1,
  },
  banner: {
    backgroundColor: COLORS.darkAccent,
    paddingHorizontal: 20,
    paddingVertical: 32,
    marginHorizontal: 10,
    marginTop: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#d4af3730',
  },
  bannerText: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.gold,
    marginBottom: 8,
  },
  bannerSubText: {
    fontSize: 14,
    color: COLORS.silver,
    opacity: 0.7,
  },
  categoriesSection: {
    paddingHorizontal: 10,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.silver,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  categoriesScroll: {
    marginHorizontal: 10,
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#d4af3740',
    marginRight: 8,
  },
  categoryChipActive: {
    backgroundColor: COLORS.gold,
    borderColor: COLORS.gold,
  },
  categoryChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.silver,
  },
  categoryChipTextActive: {
    color: COLORS.dark,
  },
  productsSection: {
    paddingHorizontal: 10,
    marginTop: 24,
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    gap: 8,
  },
  spacer: {
    height: 40,
  },
});
