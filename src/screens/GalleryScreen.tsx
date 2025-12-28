import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  Dimensions,
  FlatList,
} from 'react-native';
import { Header } from '../components/Header';
import { COLORS } from '../utils/constants';

const { width, height } = Dimensions.get('window');

// Gallery images - Osvara Fashion Collection
const GALLERY_IMAGES = [
  {
    id: '1',
    title: 'Premium Silk Gamis Emerald',
    category: 'Gamis',
    image:
      'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: '2',
    title: 'Elegant Silk Khimar',
    category: 'Khimar',
    image:
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: '3',
    title: 'Luxury Black Abaya',
    category: 'Abaya',
    image:
      'https://images.unsplash.com/photo-1622398925373-3f91b1e275f5?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: '4',
    title: 'Embroidered Royal Gamis',
    category: 'Gamis',
    image:
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: '5',
    title: 'Chiffon Layer Khimar',
    category: 'Khimar',
    image:
      'https://images.unsplash.com/photo-1583391733981-8b530c8a9585?w=400&h=500&fit=crop',
  },
  {
    id: '6',
    title: 'Designer Embroidered Abaya',
    category: 'Abaya',
    image:
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: '7',
    title: 'Modern Minimalist Gamis',
    category: 'Gamis',
    image:
      'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: '8',
    title: 'Magnetic Hijab Pin Premium',
    category: 'Accessories',
    image:
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=500&fit=crop',
  },
  {
    id: '9',
    title: 'Butterfly Sleeve Abaya',
    category: 'Abaya',
    image:
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=500&fit=crop',
  },
];

export const GalleryScreen: React.FC<{ navigation: any }> = ({
  navigation,
}) => {
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleImagePress = (image: any) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const renderGalleryItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.galleryItem}
      onPress={() => handleImagePress(item)}
      activeOpacity={0.9}
    >
      <Image source={{ uri: item.image }} style={styles.galleryImage} />
      <View style={styles.imageOverlay}>
        <Text style={styles.imageTitle}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header onCartPress={() => navigation.navigate('Cart')} showCart={true} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Osvara Gallery</Text>
          <Text style={styles.heroSubtitle}>
            Explore our beautiful collection of elegant muslimah fashion
          </Text>
        </View>

        {/* Gallery Grid */}
        <FlatList
          data={GALLERY_IMAGES}
          renderItem={renderGalleryItem}
          keyExtractor={item => item.id}
          numColumns={2}
          scrollEnabled={false}
          contentContainerStyle={styles.galleryGrid}
          columnWrapperStyle={styles.columnWrapper}
        />
      </ScrollView>

      {/* Lightbox Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalBackground}
            activeOpacity={1}
            onPress={() => setModalVisible(false)}
          >
            <View style={styles.modalContent}>
              {selectedImage && (
                <>
                  <Image
                    source={{ uri: selectedImage.image }}
                    style={styles.modalImage}
                    resizeMode="contain"
                  />
                  <View style={styles.modalFooter}>
                    <Text style={styles.modalTitle}>{selectedImage.title}</Text>
                  </View>
                </>
              )}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
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
  galleryGrid: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  galleryItem: {
    width: (width - 30) / 2,
    height: 220,
    marginBottom: 10,
    marginHorizontal: 5,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: COLORS.darkAccent,
  },
  galleryImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 12,
  },
  imageTitle: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: width - 40,
    maxHeight: height - 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: '100%',
    height: height * 0.7,
    borderRadius: 12,
  },
  modalFooter: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  modalTitle: {
    color: COLORS.silver,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: -60,
    right: 0,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.silver,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: COLORS.dark,
    fontSize: 24,
    fontWeight: 'bold',
  },
});
