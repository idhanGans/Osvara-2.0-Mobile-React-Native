import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { COLORS } from '../utils/constants';
import { useCartStore } from '../store/cartStore';

interface HeaderProps {
  onCartPress: () => void;
  title?: string;
  showCart?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onCartPress,
  title = 'OSVARA',
  showCart = true,
}) => {
  const cartItems = useCartStore(state => state.getTotalItems());

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.dark} />
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        {showCart && (
          <TouchableOpacity
            style={styles.cartButton}
            onPress={onCartPress}
            activeOpacity={0.7}
          >
            <Text style={styles.cartIcon}>🛒</Text>
            {cartItems > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{cartItems}</Text>
              </View>
            )}
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.dark,
  },
  container: {
    height: 56,
    backgroundColor: COLORS.dark,
    borderBottomWidth: 1,
    borderBottomColor: '#d4af3725',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 2,
    color: COLORS.gold,
  },
  cartButton: {
    position: 'relative',
    padding: 8,
  },
  cartIcon: {
    fontSize: 24,
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: COLORS.gold,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: COLORS.dark,
    fontWeight: '700',
    fontSize: 11,
  },
});
