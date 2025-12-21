import React, { useCallback } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  InteractionManager,
} from 'react-native';
import { Header } from '../components/Header';
import { COLORS, formatPrice } from '../utils/constants';
import { useCartStore } from '../store/cartStore';

export const CartScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const items = useCartStore(state => state.items);
  const removeFromCart = useCartStore(state => state.removeFromCart);
  const updateQuantity = useCartStore(state => state.updateQuantity);
  const getTotalPrice = useCartStore(state => state.getTotalPrice());
  const clearCart = useCartStore(state => state.clearCart);

  const handleCheckout = useCallback(() => {
    if (items.length === 0) {
      Alert.alert('Keranjang Kosong', 'Tambahkan produk sebelum checkout', [
        { text: 'OK', onPress: () => navigation.navigate('Home') },
      ]);
      return;
    }
    navigation.navigate('Checkout');
  }, [items.length, navigation]);

  const handleRemove = useCallback(
    (itemId: string) => {
      removeFromCart(itemId);
      Alert.alert('Dihapus', 'Produk dihapus dari keranjang');
    },
    [removeFromCart],
  );

  const handleClearCart = useCallback(() => {
    Alert.alert(
      'Kosongkan Keranjang',
      'Apakah Anda yakin ingin menghapus semua produk?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          onPress: () => clearCart(),
          style: 'destructive',
        },
      ],
    );
  }, [clearCart]);

  if (items.length === 0) {
    return (
      <View style={styles.container}>
        <Header onCartPress={() => {}} title="Keranjang" showCart={false} />
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🛒</Text>
          <Text style={styles.emptyTitle}>Keranjang Kosong</Text>
          <Text style={styles.emptyText}>
            Tambahkan produk untuk mulai belanja
          </Text>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={() => navigation.navigate('Home')}
            activeOpacity={0.8}
          >
            <Text style={styles.continueButtonText}>Lanjut Belanja</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header onCartPress={() => {}} title="Keranjang" showCart={false} />

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        {/* Items List */}
        <View style={styles.itemsSection}>
          <FlatList
            data={items}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            removeClippedSubviews={true}
            maxToRenderPerBatch={10}
            updateCellsBatchingPeriod={50}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>
                    {formatPrice(item.price)}
                  </Text>
                </View>

                <View style={styles.quantityContainer}>
                  <TouchableOpacity
                    onPress={() =>
                      updateQuantity(item.id, Math.max(1, item.quantity - 1))
                    }
                    style={styles.quantityButton}
                    activeOpacity={0.6}
                  >
                    <Text style={styles.quantityButtonText}>−</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{item.quantity}</Text>
                  <TouchableOpacity
                    onPress={() => updateQuantity(item.id, item.quantity + 1)}
                    style={styles.quantityButton}
                    activeOpacity={0.6}
                  >
                    <Text style={styles.quantityButtonText}>+</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  onPress={() => handleRemove(item.id)}
                  style={styles.deleteButton}
                  activeOpacity={0.6}
                >
                  <Text style={styles.deleteButtonText}>✕</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>

        {/* Summary */}
        <View style={styles.summarySection}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>
              {formatPrice(getTotalPrice)}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Ongkir</Text>
            <Text style={styles.summaryValue}>Gratis (Jabodetabek)</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{formatPrice(getTotalPrice)}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.clearButton}
          onPress={handleClearCart}
          activeOpacity={0.7}
        >
          <Text style={styles.clearButtonText}>Kosongkan</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={handleCheckout}
          activeOpacity={0.8}
        >
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
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
    paddingHorizontal: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.silver,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: COLORS.silver,
    opacity: 0.6,
    textAlign: 'center',
    marginBottom: 24,
  },
  continueButton: {
    backgroundColor: COLORS.gold,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 24,
  },
  continueButtonText: {
    color: COLORS.dark,
    fontSize: 16,
    fontWeight: '700',
  },
  itemsSection: {
    marginVertical: 16,
  },
  cartItem: {
    backgroundColor: COLORS.darkAccent,
    borderWidth: 1,
    borderColor: '#d4af3730',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    color: COLORS.silver,
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 4,
  },
  itemPrice: {
    color: COLORS.gold,
    fontWeight: '700',
    fontSize: 14,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.dark,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#d4af3750',
    marginHorizontal: 12,
  },
  quantityButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  quantityButtonText: {
    color: COLORS.gold,
    fontSize: 14,
    fontWeight: '700',
  },
  quantityText: {
    color: COLORS.silver,
    fontSize: 14,
    fontWeight: '600',
    paddingHorizontal: 8,
  },
  deleteButton: {
    padding: 6,
  },
  deleteButtonText: {
    color: '#ff6b6b',
    fontSize: 18,
    fontWeight: '700',
  },
  summarySection: {
    backgroundColor: COLORS.darkAccent,
    borderWidth: 1,
    borderColor: '#d4af3730',
    borderRadius: 12,
    padding: 16,
    marginVertical: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    color: COLORS.silver,
    fontSize: 14,
    opacity: 0.7,
  },
  summaryValue: {
    color: COLORS.silver,
    fontSize: 14,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#d4af3730',
    marginVertical: 12,
  },
  totalLabel: {
    color: COLORS.gold,
    fontSize: 16,
    fontWeight: '700',
  },
  totalValue: {
    color: COLORS.gold,
    fontSize: 16,
    fontWeight: '700',
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 10,
    paddingVertical: 12,
    paddingBottom: 24,
  },
  clearButton: {
    flex: 1,
    borderWidth: 2,
    borderColor: COLORS.gold,
    paddingVertical: 12,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearButtonText: {
    color: COLORS.gold,
    fontWeight: '700',
    fontSize: 16,
  },
  checkoutButton: {
    flex: 1,
    backgroundColor: COLORS.gold,
    paddingVertical: 12,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: COLORS.dark,
    fontWeight: '700',
    fontSize: 16,
  },
});
