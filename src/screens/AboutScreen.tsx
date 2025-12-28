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
        title="About Us"
        showCart={true}
      />

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        {/* Logo Section */}
        <View style={styles.logoSection}>
          <Text style={styles.logo}>OSVARA</Text>
          <Text style={styles.tagline}>Premium Muslimah Fashion</Text>
        </View>

        {/* About */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About OSVARA</Text>
          <Text style={styles.sectionText}>
            Osvara is a trusted e-commerce platform providing premium modern
            muslimah fashion. We are committed to offering an elegant and
            satisfying shopping experience with timeless, high-quality pieces.
          </Text>
        </View>

        {/* Mission */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Mission</Text>
          <BulletPoint text="Provide premium quality muslimah fashion with modern designs" />
          <BulletPoint text="Deliver excellent and responsive customer service" />
          <BulletPoint text="Ensure every customer is satisfied with their purchase" />
          <BulletPoint text="Promote elegant and comfortable modest fashion" />
        </View>

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why Choose Osvara?</Text>
          <FeatureItem icon="✓" label="Premium Quality Products" />
          <FeatureItem icon="✓" label="Competitive & Fair Pricing" />
          <FeatureItem icon="✓" label="Fast & Secure Shipping" />
          <FeatureItem icon="✓" label="100% Satisfaction Guarantee" />
          <FeatureItem icon="✓" label="24/7 Customer Service" />
        </View>

        {/* Contact */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          <ContactItem label="WhatsApp" value="+62 812-3456-7890" />
          <ContactItem label="Email" value="hello@osvara.com" />
          <ContactItem label="Address" value="Jakarta Selatan, Indonesia" />
        </View>

        {/* Social Media */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Follow Us</Text>
          <View style={styles.socialContainer}>
            <SocialButton
              label="Facebook"
              onPress={() => handleOpenLink('https://facebook.com/osvara')}
            />
            <SocialButton
              label="Instagram"
              onPress={() => handleOpenLink('https://instagram.com/osvara')}
            />
            <SocialButton
              label="TikTok"
              onPress={() => handleOpenLink('https://tiktok.com/osvara')}
            />
            <SocialButton
              label="WhatsApp"
              onPress={() => handleOpenLink('https://wa.me/6281234567890')}
            />
          </View>
        </View>

        {/* Version */}
        <View style={styles.versionSection}>
          <Text style={styles.versionText}>Osvara Mobile v1.0.0</Text>
          <Text style={styles.copyrightText}>
            © 2024 Osvara. All rights reserved.
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

const ContactItem: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <View style={styles.contactItem}>
    <View style={styles.contactInfo}>
      <Text style={styles.contactLabel}>{label}</Text>
      <Text style={styles.contactValue}>{value}</Text>
    </View>
  </View>
);

const SocialButton: React.FC<{
  label: string;
  onPress: () => void;
}> = ({ label, onPress }) => (
  <TouchableOpacity
    style={styles.socialButton}
    onPress={onPress}
    activeOpacity={0.7}
  >
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
    color: COLORS.silver,
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
    borderColor: '#C0C0C030',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.silver,
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
    color: COLORS.silver,
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
    color: COLORS.silver,
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
    borderColor: '#C0C0C050',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
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
    borderTopColor: '#C0C0C030',
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
