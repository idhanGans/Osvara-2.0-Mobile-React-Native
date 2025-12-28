import React, { useCallback } from 'react';
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

const HeaderComponent: React.FC<HeaderProps> = ({
  onCartPress,
  title = 'OSVARA',
  showCart = true,
}) => {
  const cartItems = useCartStore(state => state.getTotalItems());
  const handlePress = useCallback(onCartPress, [onCartPress]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.dark} />
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        {showCart && (
          <TouchableOpacity
            style={styles.cartButton}
            onPress={handlePress}
            activeOpacity={0.7}
          >
            <Text style={styles.cartIcon}>Cart</Text>
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

export const Header = React.memo(HeaderComponent);

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.dark,
  },
  container: {
    height: 56,
    backgroundColor: COLORS.dark,
    borderBottomWidth: 1,
    borderBottomColor: '#C0C0C025',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 2,
    color: COLORS.silver,
  },
  cartButton: {
    position: 'relative',
    padding: 8,
  },
  cartIcon: {
    fontSize: 16,
    color: COLORS.silver,
    fontWeight: '700',
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: COLORS.silver,
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
