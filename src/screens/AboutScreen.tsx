import React, { useCallback } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from 'react-native';
import { Header } from '../components/Header';
import { COLORS } from '../utils/constants';

export const AboutScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const handleOpenLink = useCallback((url: string) => {
    Linking.openURL(url).catch(() => {});
  }, []);

  return (
    <View style={styles.container}>
      <Header
        onCartPress={() => navigation.navigate('Cart')}
        title="Tentang Kami"
        showCart={true}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false} scrollEventThrottle={16}>
        {/* Logo Section */}
        <View style={styles.logoSection}>
          <Text style={styles.logo}>OSVARA</Text>
          <Text style={styles.tagline}>Busana Muslim Modern</Text>
        </View>

        {/* About */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tentang OSVARA</Text>
          <Text style={styles.sectionText}>
            OSVARA adalah platform e-commerce terpercaya yang menyediakan
            koleksi busana muslim modern dengan kualitas premium. Kami
            berkomitmen memberikan pengalaman belanja yang elegan dan memuaskan.
          </Text>
        </View>

        {/* Mission */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Misi Kami</Text>
          <BulletPoint text="Menyediakan busana muslim berkualitas dengan desain modern" />
          <BulletPoint text="Memberikan layanan pelanggan terbaik dan responsif" />
          <BulletPoint text="Memastikan setiap pelanggan puas dengan pembelian mereka" />
          <BulletPoint text="Mempromosikan fashion modest yang elegan dan nyaman" />
        </View>

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mengapa Pilih OSVARA?</Text>
          <FeatureItem icon="✓" label="Produk Berkualitas Premium" />
          <FeatureItem icon="✓" label="Harga Kompetitif dan Adil" />
          <FeatureItem icon="✓" label="Pengiriman Cepat dan Aman" />
          <FeatureItem icon="✓" label="Garansi 100% Kepuasan" />
          <FeatureItem icon="✓" label="Layanan Pelanggan 24/7" />
        </View>

        {/* Contact */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hubungi Kami</Text>
          <ContactItem icon="📱" label="WhatsApp" value="+62 8XX XXXX XXXX" />
          <ContactItem icon="📧" label="Email" value="hello@osvara.com" />
          <ContactItem
            icon="📍"
            label="Alamat"
            value="Jakarta Selatan, Indonesia"
          />
        </View>

        {/* Social Media */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ikuti Kami</Text>
          <View style={styles.socialContainer}>
            <SocialButton
              icon="f"
              label="Facebook"
              onPress={() => handleOpenLink('https://facebook.com')}
            />
            <SocialButton
              icon="📷"
              label="Instagram"
              onPress={() => handleOpenLink('https://instagram.com')}
            />
            <SocialButton
              icon="𝕏"
              label="Twitter"
              onPress={() => handleOpenLink('https://twitter.com')}
            />
            <SocialButton
              icon="▶"
              label="TikTok"
              onPress={() => handleOpenLink('https://tiktok.com')}
            />
          </View>
        </View>

        {/* Version */}
        <View style={styles.versionSection}>
          <Text style={styles.versionText}>OSVARA Mobile v1.0.0</Text>
          <Text style={styles.copyrightText}>
            © 2024 OSVARA. All rights reserved.
          </Text>
        </View>

        <View style={styles.spacer} />
      </ScrollView>
    </View>
  );
};

const BulletPoint: React.FC<{ text: string }> = ({ text }) => (
  <View style={styles.bulletPoint}>
    <Text style={styles.bulletDot}>•</Text>
    <Text style={styles.bulletText}>{text}</Text>
  </View>
);

const FeatureItem: React.FC<{ icon: string; label: string }> = ({
  icon,
  label,
}) => (
  <View style={styles.featureItem}>
    <Text style={styles.featureIcon}>{icon}</Text>
    <Text style={styles.featureLabel}>{label}</Text>
  </View>
);

const ContactItem: React.FC<{ icon: string; label: string; value: string }> = ({
  icon,
  label,
  value,
}) => (
  <View style={styles.contactItem}>
    <Text style={styles.contactIcon}>{icon}</Text>
    <View style={styles.contactInfo}>
      <Text style={styles.contactLabel}>{label}</Text>
      <Text style={styles.contactValue}>{value}</Text>
    </View>
  </View>
);

const SocialButton: React.FC<{
  icon: string;
  label: string;
  onPress: () => void;
}> = ({ icon, label, onPress }) => (
  <TouchableOpacity
    style={styles.socialButton}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Text style={styles.socialIcon}>{icon}</Text>
    <Text style={styles.socialLabel}>{label}</Text>
  </TouchableOpacity>
);

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
  logoSection: {
    alignItems: 'center',
    paddingVertical: 24,
    marginBottom: 8,
  },
  logo: {
    fontSize: 36,
    fontWeight: '700',
    letterSpacing: 3,
    color: COLORS.gold,
    marginBottom: 4,
  },
  tagline: {
    fontSize: 14,
    color: COLORS.silver,
    opacity: 0.7,
  },
  section: {
    backgroundColor: COLORS.darkAccent,
    borderWidth: 1,
    borderColor: '#d4af3730',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.gold,
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 14,
    color: COLORS.silver,
    lineHeight: 22,
    opacity: 0.8,
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  bulletDot: {
    color: COLORS.gold,
    fontSize: 16,
    fontWeight: '700',
    marginRight: 10,
  },
  bulletText: {
    flex: 1,
    fontSize: 13,
    color: COLORS.silver,
    lineHeight: 20,
    opacity: 0.8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureIcon: {
    fontSize: 16,
    color: COLORS.gold,
    marginRight: 10,
    fontWeight: '700',
  },
  featureLabel: {
    flex: 1,
    fontSize: 14,
    color: COLORS.silver,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  contactIcon: {
    fontSize: 18,
    marginRight: 12,
    marginTop: 2,
  },
  contactInfo: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 12,
    color: COLORS.silver,
    opacity: 0.6,
    marginBottom: 2,
  },
  contactValue: {
    fontSize: 14,
    color: COLORS.silver,
    fontWeight: '600',
  },
  socialContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  socialButton: {
    flex: 1,
    minWidth: '48%',
    backgroundColor: COLORS.dark,
    borderWidth: 1,
    borderColor: '#d4af3750',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  socialIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  socialLabel: {
    fontSize: 12,
    color: COLORS.silver,
    fontWeight: '600',
  },
  versionSection: {
    alignItems: 'center',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#d4af3730',
    marginTop: 12,
  },
  versionText: {
    fontSize: 12,
    color: COLORS.silver,
    opacity: 0.6,
    marginBottom: 4,
  },
  copyrightText: {
    fontSize: 11,
    color: COLORS.silver,
    opacity: 0.4,
  },
  spacer: {
    height: 40,
  },
});
