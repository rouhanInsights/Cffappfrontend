import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useCart } from '../contexts/CartContext';
import styles from '../styles/HomeStyles';
import { useNavigation } from '@react-navigation/native';
import CartBar from '../components/CartBar'; // ✅ Import CartBar

const ProductSection = ({ title, products }) => {
  const { cartItems, addToCart, incrementQty, decrementQty } = useCart();
  const navigation = useNavigation();

  const calculateCartTotal = (cartObj) =>
    Object.values(cartObj).reduce((sum, qty) => sum + qty, 0);

  const handleIncrement = (id) => {
    incrementQty(id);
  };

  const handleDecrement = (id) => {
    decrementQty(id);
  };

  const renderProduct = ({ item }) => {
    const quantity = cartItems[item.product_id] || 0;

    return (
      <View style={styles.horizontalCard}>
        <View style={{ position: 'relative', alignItems: 'center' }}>
          <Image source={{ uri: item.image_url }} style={styles.horizontalImage} />

          {item.sale_price && (
            <View style={styles.ribbonContainer}>
              <Text style={styles.ribbonText}>SALE</Text>
            </View>
          )}
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { product: item })}>
          <Text style={styles.horizontalTitle}>{item.name}</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 4 }}>
          {item.sale_price ? (
            <>
              <Text style={[styles.horizontalPrice, { textDecorationLine: 'line-through', color: '#999', marginRight: 4 }]}>
                ₹{item.price}
              </Text>
              <Text style={[styles.horizontalPrice, { color: '#d32f2f' }]}>₹{item.sale_price}</Text>
            </>
          ) : (
            <Text style={styles.horizontalPrice}>₹{item.price}</Text>
          )}
        </View>

        {quantity === 0 ? (
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={() => {
              addToCart(item.product_id);
            }}
          >
            <Ionicons name="cart-outline" size={20} color="#fff" />
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.qtySelector}>
            <TouchableOpacity onPress={() => handleDecrement(item.product_id)}>
              <Ionicons name="remove-circle-outline" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.qtyText}>{quantity}</Text>
            <TouchableOpacity onPress={() => handleIncrement(item.product_id)}>
              <Ionicons name="add-circle-outline" size={24} color="#000" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={localStyles.wrapper}>
      <Text style={styles.topTitle}>All Products</Text>
      <FlatList
        data={[...products.slice(0, 5), { isViewAll: true }]}
        keyExtractor={(item, index) => {
          if (item?.isViewAll) return `viewAll-${index}`;
          return item?.product_id?.toString?.() || `item-${index}`;
        }}
        renderItem={({ item }) =>
          item.isViewAll ? (
            <TouchableOpacity
              style={styles.viewAllCard}
              onPress={() => navigation.navigate('ViewAllProducts', { title, products })}
            >
              <Text style={styles.viewAllText}>View All</Text>
              <Ionicons name="chevron-forward-circle" size={28} color="#81991f" />
            </TouchableOpacity>
          ) : (
            renderProduct({ item })
          )
        }
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
      />

      {/* ✅ Blinkit-style cart bar at bottom */}
    </View>
  );
};

const localStyles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'relative',
    paddingBottom: 20, // To prevent cart bar from overlapping FlatList
  },
});

export default ProductSection;
