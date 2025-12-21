import React from 'react';
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
  const handleLogout = () => {
    Alert.alert('Logout', 'Apakah Anda yakin ingin logout?', [
      { text: 'Batal', style: 'cancel' },
      {
        text: 'Logout',
        onPress: () => {
          Alert.alert('Berhasil', 'Anda telah logout');
        },
        style: 'destructive',
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Header
        onCartPress={() => navigation.navigate('Cart')}
        title="Profil"
        showCart={true}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>👤</Text>
          </View>
          <Text style={styles.userName}>Nama Pengguna</Text>
          <Text style={styles.userEmail}>user@email.com</Text>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          <MenuItem icon="📦" label="Pesanan Saya" onPress={() => {}} />
          <MenuItem icon="❤️" label="Favorit" onPress={() => {}} />
          <MenuItem icon="📍" label="Alamat Pengiriman" onPress={() => {}} />
          <MenuItem icon="💳" label="Metode Pembayaran" onPress={() => {}} />
          <MenuItem icon="🔔" label="Notifikasi" onPress={() => {}} />
          <MenuItem icon="⚙️" label="Pengaturan" onPress={() => {}} />
          <MenuItem icon="📞" label="Hubungi Kami" onPress={() => {}} />
          <MenuItem icon="❓" label="Bantuan" onPress={() => {}} />
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>

        <View style={styles.spacer} />
      </ScrollView>
    </View>
  );
};

const MenuItem: React.FC<{
  icon: string;
  label: string;
  onPress: () => void;
}> = ({ icon, label, onPress }) => (
  <TouchableOpacity
    style={styles.menuItem}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Text style={styles.menuIcon}>{icon}</Text>
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
    borderColor: '#d4af3730',
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
    borderColor: COLORS.gold,
  },
  avatarText: {
    fontSize: 40,
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
    borderColor: '#d4af3730',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  menuLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.silver,
  },
  menuArrow: {
    fontSize: 18,
    color: COLORS.gold,
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
