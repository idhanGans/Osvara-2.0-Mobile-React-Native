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
  TextInput,
} from 'react-native';
import { Header } from '../components/Header';
import { ProductCard } from '../components/ProductCard';
import { GoogleReviews } from '../components/GoogleReviews';
import { COLORS, PRODUCTS, CATEGORIES, formatPrice } from '../utils/constants';
import { useCartStore } from '../store/cartStore';
import { Product } from '../types';

const { width } = Dimensions.get('window');

export const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc'>(
    'popular',
  );
  const addToCart = useCartStore(state => state.addToCart);

  const isSale = (product: Product) =>
    product.originalPrice !== undefined &&
    product.originalPrice > product.price;

  const filteredProducts = useMemo(() => {
    let list = PRODUCTS;

    if (selectedCategory && selectedCategory !== 'All') {
      if (selectedCategory === 'Sale') {
        list = list.filter(isSale);
      } else {
        list = list.filter(p => p.category === selectedCategory);
      }
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      list = list.filter(
        p =>
          p.name.toLowerCase().includes(query) ||
          (p.brand?.toLowerCase() ?? '').includes(query) ||
          p.category.toLowerCase().includes(query),
      );
    }

    if (sortBy === 'price-asc') {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list = [...list].sort((a, b) => b.price - a.price);
    } else {
      list = [...list].sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [selectedCategory, searchQuery, sortBy]);

  const trendingProducts = useMemo(
    () =>
      PRODUCTS.filter(
        p => p.badge === 'Flash Sale' || p.badge === 'Best Seller',
      ),
    [],
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
        {/* Hero */}
        <View style={styles.hero}>
          <View style={styles.heroLeft}>
            <Text style={styles.heroTitle}>Premium Muslimah Fashion</Text>
            <Text style={styles.heroSubtitle}>Elegant · Quality · Timeless</Text>
            <View style={styles.heroActions}>
              <TouchableOpacity
                style={styles.primaryCta}
                activeOpacity={0.8}
                onPress={() => setSelectedCategory('Flash Sale')}
              >
                <Text style={styles.primaryCtaText}>Flash Sale</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.secondaryCta}
                activeOpacity={0.8}
                onPress={() => setSelectedCategory('Gamis')}
              >
                <Text style={styles.secondaryCtaText}>Gamis</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeText}>Premium</Text>
            <Text style={styles.heroBadgeValue}>4.8★</Text>
            <Text style={styles.heroBadgeCaption}>Best Rated</Text>
          </View>
        </View>

        {/* Search & Sort */}
        <View style={styles.searchCard}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search gamis, khimar, abaya..."
            placeholderTextColor={COLORS.silver + '80'}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <View style={styles.filterRow}>
            <TouchableOpacity
              style={[
                styles.filterChip,
                sortBy === 'popular' && styles.filterChipActive,
              ]}
              onPress={() => setSortBy('popular')}
              activeOpacity={0.75}
            >
              <Text
                style={[
                  styles.filterChipText,
                  sortBy === 'popular' && styles.filterChipTextActive,
                ]}
              >
                Populer
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterChip,
                sortBy === 'price-asc' && styles.filterChipActive,
              ]}
              onPress={() =>
                setSortBy(prev =>
                  prev === 'price-asc' ? 'price-desc' : 'price-asc',
                )
              }
              activeOpacity={0.75}
            >
              <Text
                style={[
                  styles.filterChipText,
                  sortBy === 'price-asc' || sortBy === 'price-desc'
                    ? styles.filterChipTextActive
                    : null,
                ]}
              >
                Harga {sortBy === 'price-desc' ? '↓' : '↑'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Categories */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Kategori</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesScroll}
          >
            {CATEGORIES.map(category => {
              const isActive =
                (category === 'All' && selectedCategory === null) ||
                selectedCategory === category;

              const handlePress = () => {
                if (category === 'All') {
                  setSelectedCategory(null);
                } else {
                  setSelectedCategory(category);
                }
              };

              return (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryChip,
                    isActive && styles.categoryChipActive,
                  ]}
                  onPress={handlePress}
                  activeOpacity={0.6}
                >
                  <Text
                    style={[
                      styles.categoryChipText,
                      isActive && styles.categoryChipTextActive,
                    ]}
                  >
                    {category}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Trending / Flash Sale */}
        <View style={styles.trendingSection}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Flash Sale & Trending</Text>
            <Text style={styles.sectionHint}>Diskon hingga 15%</Text>
          </View>
          <FlatList
            horizontal
            data={trendingProducts}
            keyExtractor={item => `${item.id}-trend`}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.trendingList}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.trendingCard}
                onPress={() => handleProductPress(item)}
                activeOpacity={0.8}
              >
                <View style={styles.trendingBadgeRow}>
                  {item.badge && (
                    <Text style={styles.trendingBadge}>{item.badge}</Text>
                  )}
                  {isSale(item) && (
                    <Text style={styles.trendingDiscount}>
                      {Math.round(
                        (((item.originalPrice ?? item.price) - item.price) /
                          (item.originalPrice ?? item.price)) *
                          100,
                      )}
                      %
                    </Text>
                  )}
                </View>
                <Text style={styles.trendingBrand}>
                  {item.brand ?? 'Original'}
                </Text>
                <Text style={styles.trendingName} numberOfLines={2}>
                  {item.name}
                </Text>
                <Text style={styles.trendingPrice}>
                  {formatPrice(item.price)}
                </Text>
              </TouchableOpacity>
            )}
          />
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

        {/* Customer Reviews */}
        <GoogleReviews />

        <View style={styles.spacer} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  content: {
    flex: 1,
    backgroundColor: '#000000',
  },
  hero: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    backgroundColor: '#0A0A0A',
    marginHorizontal: 16,
    marginTop: 16,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  heroLeft: {
    flex: 1,
    gap: 6,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.silver,
    letterSpacing: 0.5,
  },
  heroSubtitle: {
    fontSize: 13,
    color: COLORS.silver,
    opacity: 0.8,
  },
  heroActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
  },
  primaryCta: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryCtaText: {
    color: COLORS.black,
    fontWeight: '700',
    fontSize: 13,
    letterSpacing: 0.3,
  },
  secondaryCta: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  secondaryCtaText: {
    color: COL4,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)
    width: 108,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#ffffff08',
    borderWidth: 1,
    borderColor: '#C0C0C040',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroBadgeText: {
    color: COLORS.silver,
    fontSize: 12,
    opacity: 0.75,
  },
  heroBadgeValue: {
    color: COLORS.silver,
    fontSize: 18,
    fontWeight: '800',
    marginTop: 4,
  },
  heroBadgeCaption: {
    color: COLORS.silver,
    fontSize: 11,
    opacity: 0.65,
    marginTop: 2,
  },
  searchCard: {
    backgroundColor: '#0A0A0A',
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  searchInput: {
    backgroundColor: '#000000',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: COLORS.white,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    fontSize: 14,
  },
  filterRow: {4,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: '#000000',
  },
  filterChipActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderColor: 'rgba(255, 255, 255, 0.2)'
    backgroundColor: COLORS.dark,
  },
  filterChipActive: {
    backgroundColor: '#C0C0C01a',
    borderColor: COLORS.silver,
  },
  filterChipText: {
    color: COLORS.silver,
    fontWeight: '600',
    fontSize: 12,
  },
  filterChipTextActive: {
    color: COLORS.white,
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
  categoriesScroll: {8,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    marginRight: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
  },
  categoryChipActive: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.white,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3
    marginRight: 8,
  },
  categoryChipActive: {
    backgroundColor: COLORS.silver,
    borderColor: COLORS.silver,
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
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  sectionHint: {
    fontSize: 12,
    color: COLORS.silver,
    opacity: 0.6,
  },
  trendingSection: {
    marginTop: 22,
    marginBottom: 8,
  },
  trendingList: {
    paddingHorizontal: 10,
    gap: 10,
  },
  trendingCard: {
    width: width * 0.48,
    backgroundColor: COLORS.darkAccent,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#C0C0C030',
    marginRight: 10,
  },
  trendingBadgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  trendingBadge: {
    backgroundColor: '#C0C0C01a',
    color: COLORS.silver,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 11,
    fontWeight: '700',
  },
  trendingDiscount: {
    color: COLORS.error,
    fontWeight: '700',
    fontSize: 12,
  },
  trendingBrand: {
    color: COLORS.silver,
    fontSize: 12,
    opacity: 0.75,
  },
  trendingName: {
    color: COLORS.silver,
    fontWeight: '700',
    fontSize: 14,
    marginTop: 4,
  },
  trendingPrice: {
    color: COLORS.silver,
    fontWeight: '800',
    fontSize: 16,
    marginTop: 6,
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
