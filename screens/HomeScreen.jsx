import React, { useState } from 'react';
import { View,  ScrollView, Text, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/HomeStyles';
import NavBar from '../components/Navbar';
import ProductSection from '../screens/ProductSection';
import Hero from '../assets/Hero.png'

const DUMMY_PRODUCTS = [
  {
    id: 1,
    name: 'Fresh Chicken Breast',
    price: 249,
    image: 'https://calcuttafreshfoods.com/wp-content/uploads/2022/08/Boneless-breasts.jpeg',
    description: 'Boneless, skinless chicken breast perfect for grilling or pan-searing.',
  },
  {
    id: 2,
    name: 'Rohu Fish (Cleaned)',
    price: 199,
    image: 'https://calcuttafreshfoods.com/wp-content/uploads/2022/03/IMG_1122-scaled.jpg',
  },
  {
    id: 3,
    name: 'Mutton Curry Cut',
    price: 499,
    image: 'https://calcuttafreshfoods.com/wp-content/uploads/2022/03/Untitled-design-61-450x450-1.png',
  },
  {
    id: 4,
    name: 'Fresh Prawns',
    price: 379,
    image: 'https://calcuttafreshfoods.com/wp-content/uploads/2022/08/PRAWNS.jpg',
  },
  {
    id: 5,
    name: 'Kolkata Bhetki Paturi Pieces',
    price: 299,
    image: 'https://calcuttafreshfoods.com/wp-content/uploads/2022/08/Bhetki-Paturi..jpg',
  },
  {
    id: 6,
    name: 'KATLA-TAIL',
    price: 229,
    image: 'https://calcuttafreshfoods.com/wp-content/uploads/2022/03/KATLA-TAIL.jpg',
  },
];

// 🆕 Hero Section Component
const HeroSection = () => (
  <View style={{ margin: 16, borderRadius: 12, overflow: 'hidden' }}>
    <ImageBackground
      source={Hero}
      style={{ width: '100%', height: 400, justifyContent: 'flex-end' }}
      resizeMode="cover"
    >
      <View style={{
        backgroundColor: 'rgba(0, 0, 0, 0.4)', // optional dark overlay for text readability
        padding: 16,
      }}>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#fff' }}>
          Get Fresh Meat & Fish Delivered to Your Door
        </Text>
        <Text style={{ fontSize: 16, marginTop: 6, color: '#eee' }}>
          High quality, hygienic, and always fresh.
        </Text>
      </View>
    </ImageBackground>
  </View>
);

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <NavBar />
      <View style={styles.container}>
      <ScrollView>
        <HeroSection /> {/* 👈 Add Hero Section here */}
        <ProductSection title="Top of Week" products={DUMMY_PRODUCTS} />
        <ProductSection title="All Products" products={DUMMY_PRODUCTS} />
        <ProductSection title="Previously Bought" products={DUMMY_PRODUCTS} />
        <ProductSection title="Exclusive Offers" products={DUMMY_PRODUCTS} />
      </ScrollView>
    </View>
    </View>
  );
};

export default HomeScreen;
