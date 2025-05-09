import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Animated,
  FlatList,
} from 'react-native';
import { useCart } from '../contexts/CartContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../styles/ProductDetailsStyles';
import { useNavigation } from '@react-navigation/native';
import NavBar from '../components/Navbar';

const BASE_URL = 'http://10.0.2.2:5000'; // Update to your backend IP or domain

const ProductDetails = ({ route }) => {
  const { product } = route.params;
  const { addToCart, incrementQty, decrementQty, cartItems } = useCart();
  const navigation = useNavigation();

  const quantity = cartItems[product.product_id] || 0;
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const slideAnim = useRef(new Animated.Value(100)).current;
  const [relatedItems, setRelatedItems] = useState([]);

  const getTotalItems = () =>
    Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);

  const handleAddToCart = (productId) => {
    addToCart(productId);
    triggerPopup(`${getTotalItems() + 1} item${getTotalItems() + 1 > 1 ? 's' : ''} in cart`);
  };

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
    }, 2000);
  };

  const fetchRelatedItems = async () => {
    try {
      const res = await fetch(
        `${BASE_URL}/api/products/related/${product.category_id}/${product.product_id}`
      );
      const data = await res.json();
      if (res.ok) setRelatedItems(data);
    } catch (err) {
      console.error('Failed to fetch related items:', err);
    }
  };

  useEffect(() => {
    fetchRelatedItems();
  }, [product]);

  return (
    <View style={{ flex: 1 }}>
      <NavBar />
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={{ uri: product.image_url }} style={styles.image} />

        <View style={styles.detailCard}>
          <Text style={styles.title}>{product.name}</Text>
          <View style={styles.priceContainer}>
            {product.sale_price ? (
              <>
                <Text style={[styles.price, styles.originalPrice]}>
                  ₹{product.price}
                </Text>
                <Text style={[styles.price, styles.salePrice]}>
                  ₹{product.sale_price}
                </Text>
              </>
            ) : (
              <Text style={styles.price}>
                ₹{product.price}
              </Text>
            )}
          </View>

          <Text style={styles.description}>
            {product.description ||
              'Delicious and freshly sourced item to make your meals delightful.'}
          </Text>

          <View style={styles.badgeContainer}>
            <View style={styles.badge}><Text style={styles.badgeText}>Hygienic</Text></View>
            <View style={styles.badge}><Text style={styles.badgeText}>Farm Fresh</Text></View>
            <View style={styles.badge}><Text style={styles.badgeText}>Ready to Cook</Text></View>
          </View>



          <View style={styles.cartActionContainer}>
            {quantity === 0 ? (
              <TouchableOpacity style={styles.addBtn} onPress={() => handleAddToCart(product.product_id)}>
                <Ionicons name="cart-outline" size={20} color="#fff" />
                <Text style={styles.addBtnText}>Add to Cart</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.qtySelector}>
                <TouchableOpacity onPress={() => decrementQty(product.product_id)}>
                  <Ionicons name="remove-circle-outline" size={26} color="#000" />
                </TouchableOpacity>
                <Text style={styles.qtyText}>{quantity}</Text>
                <TouchableOpacity onPress={() => incrementQty(product.product_id)}>
                  <Ionicons name="add-circle-outline" size={26} color="#000" />
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* ✅ Related Items Section */}
          {relatedItems.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Related Items</Text>
              <FlatList
                data={relatedItems}
                keyExtractor={(item) => item.product_id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: 12 }}
                renderItem={({ item }) => {
                  const relatedQty = cartItems[item.product_id] || 0;
                  return (
                    <View style={styles.relatedCard}>
                      <Image source={{ uri: item.image_url }} style={styles.relatedImage} />
                      <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { product: item })}>


                        <Text style={styles.relatedName} numberOfLines={1}>
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                      <Text style={styles.relatedPrice}>₹{item.sale_price || item.price}</Text>

                      {relatedQty === 0 ? (
                        <TouchableOpacity
                          style={styles.addBtn}
                          onPress={() => handleAddToCart(item.product_id)}
                        >
                          <Ionicons name="cart-outline" size={18} color="#fff" />
                          <Text style={styles.addBtnText}>Add</Text>
                        </TouchableOpacity>
                      ) : (
                        <View style={styles.qtySelector}>
                          <TouchableOpacity onPress={() => decrementQty(item.product_id)}>
                            <Ionicons name="remove-circle-outline" size={22} color="#000" />
                          </TouchableOpacity>
                          <Text style={styles.qtyText}>{relatedQty}</Text>
                          <TouchableOpacity onPress={() => incrementQty(item.product_id)}>
                            <Ionicons name="add-circle-outline" size={22} color="#000" />
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                  );
                }}
              />
            </>
          )}
        </View>

        {/* ✅ Popup */}
        {showPopup && (
          <Animated.View
            style={[styles.popupContainer, { transform: [{ translateY: slideAnim }] }]}
          >
            <Text style={styles.popupText}>{popupMessage}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
              <Text style={styles.popupLink}>View Cart</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </ScrollView>
    </View>
  );
};

export default ProductDetails;
