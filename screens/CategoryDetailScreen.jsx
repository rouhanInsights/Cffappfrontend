import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../styles/CategoryDetailStyles';
import NavBar from '../components/Navbar';
import { useCart } from '../context/CartContext';

const mockProducts = {
  'Exclusive Fish & Meat': [
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
  ],
  'Fish & Seafood': [
    {
      id: 4,
      name: 'Fresh Prawns',
      price: 379,
      image: 'https://calcuttafreshfoods.com/wp-content/uploads/2022/08/PRAWNS.jpg',
    },
    {
      id: 2,
      name: 'Rohu Fish (Cleaned)',
      price: 199,
      image: 'https://calcuttafreshfoods.com/wp-content/uploads/2022/03/IMG_1122-scaled.jpg',
    },
  ],
  Mutton: [
    {
      id: 3,
      name: 'Mutton Curry Cut',
      price: 499,
      image: 'https://calcuttafreshfoods.com/wp-content/uploads/2022/03/Untitled-design-61-450x450-1.png',
    },
  ],
  Poultry: [
    {
      id: 1,
      name: 'Fresh Chicken Breast',
      price: 249,
      image: 'https://calcuttafreshfoods.com/wp-content/uploads/2022/08/Boneless-breasts.jpeg',
    },
  ],
  'Steak & Fillets': [
    {
      id: 7,
      name: 'Salmon Fillet',
      price: 899,
      image: 'https://via.placeholder.com/100',
    },
  ],
};

const CategoryDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const initialCategory = route.params.category;
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { cartItems, addToCart, incrementQty, decrementQty } = useCart();

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [slideAnim] = useState(new Animated.Value(100));

  const triggerPopup = (message) => {
    setPopupMessage(message);
    setShowPopup(true);

    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(slideAnim, {
        toValue: 100,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setShowPopup(false));
    }, 2500);
  };

  const calculateCartTotal = (cartObj) =>
    Object.values(cartObj).reduce((sum, qty) => sum + qty, 0);

  const handleIncrement = (id) => {
    incrementQty(id);
    const total = calculateCartTotal(cartItems) + 1;
    triggerPopup(`${total} item${total > 1 ? 's' : ''} in cart`);
  };

  const handleDecrement = (id) => {
    decrementQty(id);
    const total = Math.max(calculateCartTotal(cartItems) - 1, 0);
    triggerPopup(`${total} item${total !== 1 ? 's' : ''} in cart`);
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setProducts(mockProducts[selectedCategory] || []);
      setLoading(false);
    }, 500);
  }, [selectedCategory]);

  const renderProduct = ({ item }) => {
    const quantity = cartItems[item.id] || 0;

    return (
      <View style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>₹{item.price}</Text>

          {quantity === 0 ? (
            <TouchableOpacity
              style={styles.addToCartButton}
              onPress={() => {
                addToCart(item.id);
                const total = calculateCartTotal(cartItems) + 1;
                triggerPopup(`${total} item${total > 1 ? 's' : ''} in cart`);
              }}
            >
              <Ionicons name="cart-outline" size={20} color="#fff" />
              <Text style={styles.addToCartText}>Add to Cart</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.qtySelector}>
              <TouchableOpacity onPress={() => handleDecrement(item.id)}>
                <Ionicons name="remove-circle-outline" size={24} color="#000" />
              </TouchableOpacity>
              <Text style={styles.qtyText}>{quantity}</Text>
              <TouchableOpacity onPress={() => handleIncrement(item.id)}>
                <Ionicons name="add-circle-outline" size={24} color="#000" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <NavBar />
      <View style={styles.headerRow}>
        <Text style={styles.heading}>Category:</Text>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}
          style={styles.picker}
          dropdownIconColor="#fff"
        >
          {Object.keys(mockProducts).map((cat) => (
            <Picker.Item label={cat} value={cat} key={cat} />
          ))}
        </Picker>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#2e7d32" />
      ) : products.length > 0 ? (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderProduct}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      ) : (
        <Text style={styles.emptyText}>No products found.</Text>
      )}

      {showPopup && (
        <Animated.View
          style={[
            styles.popupContainer,
            {
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.popupText}>{popupMessage}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <Text style={styles.popupLink}>View Cart</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
};

export default CategoryDetailScreen;
