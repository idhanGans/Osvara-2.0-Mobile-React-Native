import React from 'react';
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { COLORS } from '../utils/constants';

interface Review {
  id: string;
  name: string;
  rating: number;
  date: string;
  comment: string;
  image?: string;
}

const MOCK_REVIEWS: Review[] = [
  {
    id: '1',
    name: 'Siti Nurhaliza',
    rating: 5,
    date: '2 minggu lalu',
    comment:
      'Kualitas produk sangat bagus! Bahan nyaman dan jahitan rapi. Pengiriman cepat dan pelayanan ramah.',
    image: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: '2',
    name: 'Fatimah Az-Zahra',
    rating: 5,
    date: '1 bulan lalu',
    comment:
      'Toko yang recommended! Koleksinya lengkap dan desainnya modern. Pasti bakal order lagi.',
    image: 'https://i.pravatar.cc/150?img=5',
  },
  {
    id: '3',
    name: 'Aisyah Rahman',
    rating: 4,
    date: '1 bulan lalu',
    comment:
      'Produknya sesuai dengan foto. Ukurannya pas dan bahannya adem. Harganya juga terjangkau.',
    image: 'https://i.pravatar.cc/150?img=9',
  },
  {
    id: '4',
    name: 'Maryam Salsabila',
    rating: 5,
    date: '2 bulan lalu',
    comment:
      'Sangat puas dengan pembelian saya. Gamis nya elegant dan cocok untuk berbagai acara.',
    image: 'https://i.pravatar.cc/150?img=20',
  },
];

export const GoogleReviews: React.FC = () => {
  const renderStars = (rating: number) => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map(star => (
          <Text key={star} style={styles.star}>
            {star <= rating ? '⭐' : '☆'}
          </Text>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Ulasan Pelanggan</Text>
        <Text style={styles.subtitle}>Apa kata mereka tentang kami</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.reviewsContainer}
      >
        {MOCK_REVIEWS.map(review => (
          <View key={review.id} style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              {review.image && (
                <Image source={{ uri: review.image }} style={styles.avatar} />
              )}
              <View style={styles.reviewInfo}>
                <Text style={styles.reviewName}>{review.name}</Text>
                <Text style={styles.reviewDate}>{review.date}</Text>
              </View>
            </View>
            {renderStars(review.rating)}
            <Text style={styles.reviewComment}>{review.comment}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>⭐ Rating rata-rata: 4.8 dari 5.0</Text>
        <Text style={styles.footerSubtext}>Berdasarkan 150+ ulasan</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
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
  reviewsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  reviewCard: {
    width: 300,
    backgroundColor: COLORS.darkAccent,
    borderRadius: 12,
    padding: 16,
    marginRight: 15,
    borderWidth: 1,
    borderColor: COLORS.silver + '30',
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  reviewInfo: {
    flex: 1,
  },
  reviewName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.silver,
    marginBottom: 2,
  },
  reviewDate: {
    fontSize: 12,
    color: COLORS.grey,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  star: {
    fontSize: 16,
    marginRight: 2,
  },
  reviewComment: {
    fontSize: 14,
    color: COLORS.grey,
    lineHeight: 20,
  },
  footer: {
    paddingHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.silver,
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
    color: COLORS.grey,
  },
});
