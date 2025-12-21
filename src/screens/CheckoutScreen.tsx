import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Switch,
} from 'react-native';
import { Header } from '../components/Header';
import { COLORS, formatPrice } from '../utils/constants';
import { useCartStore } from '../store/cartStore';

export const CheckoutScreen: React.FC<{ navigation: any }> = ({
  navigation,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [useWhatsApp, setUseWhatsApp] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const items = useCartStore(state => state.items);
  const getTotalPrice = useCartStore(state => state.getTotalPrice());
  const clearCart = useCartStore(state => state.clearCart);

  const handleCheckout = async () => {
    if (!name || !email || !phone || !address) {
      Alert.alert('Error', 'Semua field harus diisi');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        'Pesanan Berhasil',
        `Terima kasih telah berbelanja! Pesanan akan dikirim ke ${address}.\n\nNo. Pesanan: #${Date.now()}`,
        [
          {
            text: 'OK',
            onPress: () => {
              clearCart();
              navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
              });
            },
          },
        ],
      );
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <Header onCartPress={() => {}} title="Checkout" showCart={false} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Order Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ringkasan Pesanan</Text>
          {items.map(item => (
            <View key={item.id} style={styles.summaryItem}>
              <Text style={styles.summaryItemName}>
                {item.name} x{item.quantity}
              </Text>
              <Text style={styles.summaryItemPrice}>
                {formatPrice(item.price * item.quantity)}
              </Text>
            </View>
          ))}
          <View style={styles.divider} />
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{formatPrice(getTotalPrice)}</Text>
          </View>
        </View>

        {/* Customer Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informasi Pengiriman</Text>
          <TextInput
            style={styles.input}
            placeholder="Nama Lengkap"
            placeholderTextColor={COLORS.silver + '60'}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={COLORS.silver + '60'}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="No. Telepon"
            placeholderTextColor={COLORS.silver + '60'}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
          <TextInput
            style={[styles.input, styles.addressInput]}
            placeholder="Alamat Pengiriman"
            placeholderTextColor={COLORS.silver + '60'}
            value={address}
            onChangeText={setAddress}
            multiline
            numberOfLines={3}
          />
        </View>

        {/* Communication */}
        <View style={styles.section}>
          <View style={styles.whatsappRow}>
            <View>
              <Text style={styles.sectionTitle}>Hubungi via WhatsApp</Text>
              <Text style={styles.whatsappDesc}>
                Terima notifikasi pesanan melalui WhatsApp
              </Text>
            </View>
            <Switch
              value={useWhatsApp}
              onValueChange={setUseWhatsApp}
              trackColor={{ false: '#d4af3740', true: '#d4af3750' }}
              thumbColor={useWhatsApp ? COLORS.gold : '#666'}
            />
          </View>
        </View>

        <View style={styles.spacer} />
      </ScrollView>

      {/* Checkout Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.checkoutButton,
            isLoading && styles.checkoutButtonDisabled,
          ]}
          onPress={handleCheckout}
          disabled={isLoading}
        >
          <Text style={styles.checkoutButtonText}>
            {isLoading ? 'Memproses...' : 'Konfirmasi Pesanan'}
          </Text>
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
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  section: {
    backgroundColor: COLORS.darkAccent,
    borderWidth: 1,
    borderColor: '#d4af3730',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.silver,
    marginBottom: 16,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryItemName: {
    fontSize: 14,
    color: COLORS.silver,
    flex: 1,
  },
  summaryItemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.gold,
  },
  divider: {
    height: 1,
    backgroundColor: '#d4af3730',
    marginVertical: 12,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.silver,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.gold,
  },
  input: {
    backgroundColor: COLORS.dark,
    borderWidth: 1,
    borderColor: '#d4af3750',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: COLORS.silver,
    marginBottom: 12,
    fontSize: 14,
  },
  addressInput: {
    textAlignVertical: 'top',
    paddingTop: 12,
    minHeight: 80,
  },
  whatsappRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  whatsappDesc: {
    fontSize: 12,
    color: COLORS.silver,
    opacity: 0.6,
    marginTop: 4,
  },
  spacer: {
    height: 40,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: 24,
  },
  checkoutButton: {
    backgroundColor: COLORS.gold,
    paddingVertical: 14,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkoutButtonDisabled: {
    opacity: 0.6,
  },
  checkoutButtonText: {
    color: COLORS.dark,
    fontSize: 16,
    fontWeight: '700',
  },
});
