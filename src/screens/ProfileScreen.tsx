import React, { useCallback } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Header } from '../components/Header';
import { COLORS } from '../utils/constants';

export const ProfileScreen: React.FC<{ navigation: any }> = ({
  navigation,
}) => {
  const handleLogout = useCallback(() => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        onPress: () => {
          Alert.alert('Success', 'You have been logged out');
        },
        style: 'destructive',
      },
    ]);
  }, []);

  return (
    <View style={styles.container}>
      <Header
        onCartPress={() => navigation.navigate('Cart')}
        title="Profile"
        showCart={true}
      />

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>OV</Text>
          </View>
          <Text style={styles.userName}>Osvara Customer</Text>
          <Text style={styles.userEmail}>hello@osvara.com</Text>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          <MenuItem label="My Orders" onPress={() => {}} />
          <MenuItem label="Favorites" onPress={() => {}} />
          <MenuItem label="Delivery Address" onPress={() => {}} />
          <MenuItem label="Payment Methods" onPress={() => {}} />
          <MenuItem label="Notifications" onPress={() => {}} />
          <MenuItem label="Settings" onPress={() => {}} />
          <MenuItem label="Contact Us" onPress={() => {}} />
          <MenuItem label="Help & FAQ" onPress={() => {}} />
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>

        <View style={styles.spacer} />
      </ScrollView>
    </View>
  );
};

const MenuItem: React.FC<{
  label: string;
  onPress: () => void;
}> = ({ label, onPress }) => (
  <TouchableOpacity
    style={styles.menuItem}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Text style={styles.menuLabel}>{label}</Text>
    <Text style={styles.menuArrow}>›</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark,
  },
  content: {
    flex: 1,
  },
  profileCard: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
    marginHorizontal: 10,
    marginTop: 12,
    backgroundColor: COLORS.darkAccent,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#C0C0C030',
  },
  avatar: {
    width: 80,
    height: 80,
    backgroundColor: COLORS.dark,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: COLORS.silver,
  },
  avatarText: {
    fontSize: 22,
    color: COLORS.silver,
    fontWeight: '800',
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.silver,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 13,
    color: COLORS.silver,
    opacity: 0.6,
  },
  menuSection: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  menuItem: {
    backgroundColor: COLORS.darkAccent,
    borderWidth: 1,
    borderColor: '#C0C0C030',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.silver,
  },
  menuArrow: {
    fontSize: 18,
    color: COLORS.silver,
  },
  logoutButton: {
    marginHorizontal: 10,
    marginTop: 20,
    marginBottom: 24,
    backgroundColor: '#ff6b6b',
    paddingVertical: 12,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  spacer: {
    height: 40,
  },
});
