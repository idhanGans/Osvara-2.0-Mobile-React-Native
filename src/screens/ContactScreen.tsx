import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import { Header } from '../components/Header';
import { COLORS } from '../utils/constants';

export const ContactScreen: React.FC<{ navigation: any }> = ({
  navigation,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.name || !formData.email || !formData.message) {
      Alert.alert('Error', 'Please fill in name, email, and message');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert(
        'Thank You!',
        'Your message has been sent. We will contact you soon.',
        [
          {
            text: 'OK',
            onPress: () => {
              setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: '',
              });
            },
          },
        ],
      );
    }, 1500);
  };

  const handleWhatsApp = () => {
    const phone = '6281234567890'; // Osvara WhatsApp
    const message = 'Halo Osvara, saya ingin bertanya tentang produk fashion Anda';
    const url = `whatsapp://send?phone=${phone}&text=${encodeURIComponent(
      message,
    )}`;
    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'WhatsApp tidak tersedia di perangkat ini');
    });
  };

  const handlePhone = () => {
    Linking.openURL('tel:+6281234567890');
  };

  const handleEmail = () => {
    Linking.openURL('mailto:hello@osvara.com');
  };

  const handleMaps = () => {
    const url = 'https://maps.google.com/?q=-6.200000,106.816666';
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Header onCartPress={() => navigation.navigate('Cart')} showCart={true} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Contact Osvara</Text>
          <Text style={styles.heroSubtitle}>
            Get in touch with our team. We're here to help you find the perfect pieces.
          </Text>
        </View>

        {/* Contact Cards */}
        <View style={styles.contactCards}>
          <TouchableOpacity
            style={styles.contactCard}
            onPress={handleWhatsApp}
            activeOpacity={0.7}
          >
            <Text style={styles.contactIcon}>💬</Text>
            <Text style={styles.contactCardTitle}>WhatsApp</Text>
            <Text style={styles.contactCardText}>+62 812-3456-789</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.contactCard}
            onPress={handlePhone}
            activeOpacity={0.7}
          >
            <Text style={styles.contactIcon}>📞</Text>
            <Text style={styles.contactCardTitle}>Telepon</Text>
            <Text style={styles.contactCardText}>+62 812-3456-789</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.contactCard}
            onPress={handleEmail}
            activeOpacity={0.7}
          >
            <Text style={styles.contactIcon}>✉️</Text>
            <Text style={styles.contactCardTitle}>Email</Text>
            <Text style={styles.contactCardText}>info@osvara.com</Text>
          </TouchableOpacity>
        </View>

        {/* Store Information */}
        <View style={styles.storeInfo}>
          <Text style={styles.sectionTitle}>Osvara Boutique</Text>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Address</Text>
            <Text style={styles.infoText}>
              Jl. Kemang Raya No. 123{'\n'}
              Jakarta Selatan, 12560{'\n'}
              Indonesia
            </Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Store Hours</Text>
            <Text style={styles.infoText}>
              Monday - Friday: 10:00 AM - 7:00 PM{'\n'}
              Saturday: 10:00 AM - 8:00 PM{'\n'}
              Sunday: 12:00 PM - 6:00 PM
            </Text>
          </View>

          <TouchableOpacity
            style={styles.mapsButton}
            onPress={handleMaps}
            activeOpacity={0.7}
          >
            <Text style={styles.mapsButtonText}>📍 Open in Google Maps</Text>
          </TouchableOpacity>
        </View>

        {/* Contact Form */}
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Send Us a Message</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Name *</Text>
            <TextInput
              style={styles.input}
              value={formData.name}
              onChangeText={text => handleInputChange('name', text)}
              placeholder="Your full name"
              placeholderTextColor={COLORS.grey}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email *</Text>
            <TextInput
              style={styles.input}
              value={formData.email}
              onChangeText={text => handleInputChange('email', text)}
              placeholder="email@example.com"
              placeholderTextColor={COLORS.grey}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Phone Number</Text>
            <TextInput
              style={styles.input}
              value={formData.phone}
              onChangeText={text => handleInputChange('phone', text)}
              placeholder="+62 812-3456-7890"
              placeholderTextColor={COLORS.grey}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Subject</Text>
            <TextInput
              style={styles.input}
              value={formData.subject}
              onChangeText={text => handleInputChange('subject', text)}
              placeholder="Message subject"
              placeholderTextColor={COLORS.grey}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Message *</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={formData.message}
              onChangeText={text => handleInputChange('message', text)}
              placeholder="Write your message here..."
              placeholderTextColor={COLORS.grey}
              multiline
              numberOfLines={5}
              textAlignVertical="top"
            />
          </View>

          <TouchableOpacity
            style={[
              styles.submitButton,
              isSubmitting && styles.submitButtonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={isSubmitting}
            activeOpacity={0.8}
          >
            <Text style={styles.submitButtonText}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Text>
          </TouchableOpacity>
        </View>
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
  heroSection: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.silver,
    marginBottom: 8,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 16,
    color: COLORS.grey,
    textAlign: 'center',
  },
  contactCards: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginBottom: 30,
    justifyContent: 'space-between',
  },
  contactCard: {
    flex: 1,
    backgroundColor: COLORS.darkAccent,
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.silver + '30',
  },
  contactIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  contactCardTitle: {
    color: COLORS.silver,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  contactCardText: {
    color: COLORS.grey,
    fontSize: 11,
    textAlign: 'center',
  },
  storeInfo: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.silver,
    marginBottom: 20,
  },
  infoItem: {
    marginBottom: 20,
  },
  infoLabel: {
    color: COLORS.silver,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  infoText: {
    color: COLORS.grey,
    fontSize: 14,
    lineHeight: 22,
  },
  mapsButton: {
    backgroundColor: COLORS.silver,
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  mapsButtonText: {
    color: COLORS.dark,
    fontSize: 16,
    fontWeight: '600',
  },
  formSection: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    color: COLORS.silver,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.darkAccent,
    borderRadius: 8,
    padding: 15,
    color: COLORS.white,
    fontSize: 16,
    borderWidth: 1,
    borderColor: COLORS.silver + '30',
  },
  textArea: {
    height: 120,
    paddingTop: 15,
  },
  submitButton: {
    backgroundColor: COLORS.silver,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: COLORS.dark,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
