import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, ImageBackground, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/HomeStyles';
import NavBar from '../components/Navbar';
import ProductSection from '../screens/ProductSection';
import Hero from '../assets/Hero.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TopOfWeekSection from '../sections/TopOfWeekSection';
import AllProductsSection from '../sections/AllProductsSection';
import ExclusiveOffersSection from '../sections/ExclusiveOffersSection';
import PreviouslyBoughtSection from '../sections/PreviouslyBoughtSection';
const BASE_URL = 'http://10.0.2.2:5000'; // 👈 Change for production

const HeroSection = () => (
  <View style={{ margin: 16, borderRadius: 12, overflow: 'hidden' }}>
    <ImageBackground
      source={Hero}
      style={{ width: '100%', height: 400, justifyContent: 'flex-end' }}
      resizeMode="cover"
    >
      <View style={{
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
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
  const [products, setProducts] = useState([]);
  const [previouslyBought, setPreviouslyBought] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  const fetchData = async () => {
    try {
      const productRes = await fetch(`${BASE_URL}/api/products`);
      const productData = await productRes.json();
      if (productRes.ok) setProducts(productData);

      const token = await AsyncStorage.getItem('token');
      if (token) {
        const userRes =await fetch(`${BASE_URL}/api/orders/my-orders`,{
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = await userRes.json();
        if (userRes.ok) {
          const allItems = userData.flatMap(order => order.items || []);
          const uniqueItems = Array.from(
            new Map(allItems.map(item => [item.product_id, item])).values()
          );
          setPreviouslyBought(uniqueItems);
        }
      }
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <NavBar />
      <ScrollView style={styles.container}>
        <HeroSection />

        {loading ? (
          <ActivityIndicator size="large" color="#2e7d32" style={{ marginTop: 50 }} />
        ) : (
          <>
            <TopOfWeekSection products={products} />
            <AllProductsSection products={products} />
            <ExclusiveOffersSection products={products} />
            {previouslyBought.length > 0 && (
              <PreviouslyBoughtSection products={previouslyBought} />
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
