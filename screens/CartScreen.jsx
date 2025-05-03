import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useCart } from '../contexts/CartContext';
import styles from '../styles/CartStyles';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NavBar from '../components/Navbar';

const BASE_URL = 'http://10.0.2.2:5000';

const CartScreen = () => {
  const { cartItems, addToCart, incrementQty, decrementQty } = useCart();
  const navigation = useNavigation();
  const [allProducts, setAllProducts] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/products`);
        const data = await res.json();
        if (res.ok) setAllProducts(data);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      }
    };

    fetchProducts();
  }, []);

  const productList = Object.entries(cartItems)
    .map(([productId, qty]) => {
      const product = allProducts.find(p => p.product_id === parseInt(productId));
      if (!product) return null;
      return { ...product, quantity: qty };
    })
    .filter(Boolean);

  const totalAmount = productList.reduce((sum, item) => {
    const price = item.sale_price || item.price;
    return sum + price * item.quantity;
  }, 0);

  useEffect(() => {
    const fetchRelated = async () => {
      if (productList.length === 0) return;
      const firstItem = productList[0];

      try {
        const res = await fetch(
          `${BASE_URL}/api/products/related/${firstItem.category_id}/${firstItem.product_id}`
        );
        const data = await res.json();
        if (res.ok) setRelatedProducts(data);
      } catch (err) {
        console.error('Failed to fetch related products:', err);
      }
    };

    fetchRelated();
  }, [productList]);

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image_url }} style={styles.cartImage} />
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={styles.itemName}>{item.name}</Text>
        <View style={{ flexDirection: 'row', gap: 8, marginTop: 4 }}>
          {item.sale_price ? (
            <>
              <Text style={{ color: '#888', textDecorationLine: 'line-through' }}>
                ₹{item.price}
              </Text>
              <Text style={{ color: '#d32f2f', fontWeight: 'bold' }}>
                ₹{item.sale_price}
              </Text>
            </>
          ) : (
            <Text style={{ color: '#333', fontWeight: '600' }}>
              ₹{item.price}
            </Text>
          )}
        </View>
        <View style={styles.qtyControl}>
          <TouchableOpacity onPress={() => decrementQty(item.product_id)}>
            <Text style={styles.qtyBtn}>−</Text>
          </TouchableOpacity>
          <Text style={styles.qtyText}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => incrementQty(item.product_id)}>
            <Text style={styles.qtyBtn}>＋</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderSuggestion = ({ item }) => {
    const quantity = cartItems[item.product_id] || 0;

    return (
      <View style={styles.suggestionCard}>
        <Image source={{ uri: item.image_url }} style={styles.suggestionImage} />
        <Text style={styles.suggestionName}>{item.name}</Text>
        <Text style={styles.suggestionPrice}>₹{item.sale_price || item.price}</Text>

        {quantity === 0 ? (
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={() => addToCart(item.product_id)}
          >
            <Ionicons name="cart-outline" size={20} color="#fff" />
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.qtySelector}>
            <TouchableOpacity onPress={() => decrementQty(item.product_id)}>
              <Ionicons name="remove-circle-outline" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.qtyText}>{quantity}</Text>
            <TouchableOpacity onPress={() => incrementQty(item.product_id)}>
              <Ionicons name="add-circle-outline" size={24} color="#000" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <NavBar />

      {productList.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>🛒 Your cart is empty</Text>
          <Text style={styles.emptySubtext}>Add fresh items to start your order!</Text>
        </View>
      ) : (
        <FlatList
          data={productList}
          keyExtractor={(item) => item.product_id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.container}
          ListHeaderComponent={<Text style={styles.title}>My Cart</Text>}
          ListFooterComponent={
            <>
              <View style={styles.totalSection}>
                <Text style={styles.totalText}>Total: ₹{totalAmount.toFixed(2)}</Text>
                <TouchableOpacity
                  style={styles.checkoutBtn}
                  onPress={() => navigation.navigate('Home', {
                    screen: 'CheckoutScreen'
                  })}>
                
                  <Text style={styles.checkoutText}>Proceed to Checkout</Text>
                </TouchableOpacity>
              </View>

              {relatedProducts.length > 0 && (
                <>
                  <Text style={styles.suggestionTitle}>You may also like</Text>
                  <FlatList
                    data={relatedProducts}
                    keyExtractor={(item) => item.product_id.toString()}
                    renderItem={renderSuggestion}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.suggestionList}
                  />
                </>
              )}
            </>
          }
        />
      )}
    </View>
  );
};

export default CartScreen;
