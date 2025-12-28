import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import { COLORS } from '../utils/constants';

const { width } = Dimensions.get('window');

interface MockupProductProps {
  productImage: string;
  productName: string;
  onClose?: () => void;
}

export const MockupProduct: React.FC<MockupProductProps> = ({
  productImage,
  productName,
  onClose,
}) => {
  const [height, setHeight] = useState(165);
  const [weight, setWeight] = useState(55);

  // Calculate scaling based on height and weight
  const heightScale = height / 165; // base height 165cm
  const widthScale = weight / 55; // base weight 55kg

  const handleShare = () => {
    Alert.alert('Bagikan Mockup', 'Fitur berbagi mockup akan segera tersedia', [
      { text: 'OK' },
    ]);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Virtual Try-On</Text>
        <Text style={styles.subtitle}>{productName}</Text>
        {onClose && (
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Preview Area */}
      <View style={styles.previewContainer}>
        <View style={styles.previewBox}>
          <Image
            source={{ uri: productImage }}
            style={[
              styles.productImage,
              {
                transform: [{ scaleY: heightScale }, { scaleX: widthScale }],
              },
            ]}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.previewLabel}>
          Tinggi: {height} cm | Berat: {weight} kg
        </Text>
      </View>

      {/* Height Slider */}
      <View style={styles.sliderSection}>
        <Text style={styles.sliderLabel}>Tinggi Badan</Text>
        <View style={styles.sliderContainer}>
          <Text style={styles.sliderValue}>{height} cm</Text>
          <View style={styles.sliderTrack}>
            <View
              style={[
                styles.sliderFill,
                { width: `${((height - 140) / (180 - 140)) * 100}%` },
              ]}
            />
            <TouchableOpacity
              style={[
                styles.sliderThumb,
                { left: `${((height - 140) / (180 - 140)) * 100}%` },
              ]}
              onPress={() => {}}
            />
          </View>
          <View style={styles.sliderLabels}>
            <Text style={styles.sliderLabelText}>140 cm</Text>
            <Text style={styles.sliderLabelText}>180 cm</Text>
          </View>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.incrementButton}
            onPress={() => setHeight(Math.max(140, height - 5))}
          >
            <Text style={styles.incrementButtonText}>-5</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.incrementButton}
            onPress={() => setHeight(Math.min(180, height + 5))}
          >
            <Text style={styles.incrementButtonText}>+5</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Weight Slider */}
      <View style={styles.sliderSection}>
        <Text style={styles.sliderLabel}>Berat Badan</Text>
        <View style={styles.sliderContainer}>
          <Text style={styles.sliderValue}>{weight} kg</Text>
          <View style={styles.sliderTrack}>
            <View
              style={[
                styles.sliderFill,
                { width: `${((weight - 40) / (100 - 40)) * 100}%` },
              ]}
            />
            <TouchableOpacity
              style={[
                styles.sliderThumb,
                { left: `${((weight - 40) / (100 - 40)) * 100}%` },
              ]}
              onPress={() => {}}
            />
          </View>
          <View style={styles.sliderLabels}>
            <Text style={styles.sliderLabelText}>40 kg</Text>
            <Text style={styles.sliderLabelText}>100 kg</Text>
          </View>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.incrementButton}
            onPress={() => setWeight(Math.max(40, weight - 5))}
          >
            <Text style={styles.incrementButtonText}>-5</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.incrementButton}
            onPress={() => setWeight(Math.min(100, weight + 5))}
          >
            <Text style={styles.incrementButtonText}>+5</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.shareButton}
          onPress={handleShare}
          activeOpacity={0.8}
        >
          <Text style={styles.shareButtonText}>📤 Bagikan Mockup</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          💡 Sesuaikan tinggi dan berat badan untuk melihat perkiraan ukuran
          produk pada tubuh Anda
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark,
  },
  header: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.silver + '30',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.silver,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.grey,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.silver,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: COLORS.dark,
    fontSize: 20,
    fontWeight: 'bold',
  },
  previewContainer: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  previewBox: {
    width: width * 0.6,
    height: 400,
    backgroundColor: COLORS.darkAccent,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.silver + '50',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  productImage: {
    width: '80%',
    height: '80%',
  },
  previewLabel: {
    marginTop: 15,
    fontSize: 14,
    color: COLORS.grey,
    fontWeight: '600',
  },
  sliderSection: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  sliderLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.silver,
    marginBottom: 10,
  },
  sliderContainer: {
    marginBottom: 10,
  },
  sliderValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.silver,
    textAlign: 'center',
    marginBottom: 10,
  },
  sliderTrack: {
    height: 6,
    backgroundColor: COLORS.darkAccent,
    borderRadius: 3,
    position: 'relative',
  },
  sliderFill: {
    height: '100%',
    backgroundColor: COLORS.silver,
    borderRadius: 3,
  },
  sliderThumb: {
    position: 'absolute',
    top: -7,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.silver,
    marginLeft: -10,
    borderWidth: 3,
    borderColor: COLORS.dark,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  sliderLabelText: {
    fontSize: 12,
    color: COLORS.grey,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
    marginTop: 10,
  },
  incrementButton: {
    backgroundColor: COLORS.darkAccent,
    borderWidth: 1,
    borderColor: COLORS.silver,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  incrementButtonText: {
    color: COLORS.silver,
    fontSize: 16,
    fontWeight: 'bold',
  },
  actionButtons: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  shareButton: {
    backgroundColor: COLORS.silver,
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
  },
  shareButtonText: {
    color: COLORS.dark,
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoBox: {
    margin: 20,
    padding: 15,
    backgroundColor: COLORS.darkAccent,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.silver + '30',
  },
  infoText: {
    color: COLORS.grey,
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
  },
});
