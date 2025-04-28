import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    Animated,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useCart } from '../context/CartContext';
import styles from '../styles/HomeStyles';
import { useNavigation } from '@react-navigation/native';

const ProductSection = ({ title, products }) => {
    const { cartItems, addToCart, incrementQty, decrementQty } = useCart();
    const navigation = useNavigation();

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
            }).start(() => {
                setShowPopup(false);
            });
        }, 2500);
    };

    const calculateCartTotal = (cartObj) =>
        Object.values(cartObj).reduce((sum, qty) => sum + qty, 0);
      
      const handleIncrement = (id) => {
        incrementQty(id);
        setTimeout(() => {
          const total = calculateCartTotal(cartItems) + 1; // anticipating increment
          triggerPopup(`${total} item${total > 1 ? 's' : ''} in cart`);
        }, 100);
      };
      
      const handleDecrement = (id) => {
        decrementQty(id);
        setTimeout(() => {
          const total = Math.max(calculateCartTotal(cartItems) - 1, 0); // anticipating decrement
          triggerPopup(`${total} item${total !== 1 ? 's' : ''} in cart`);
        }, 100);
      };

    const renderProduct = ({ item }) => {
        const quantity = cartItems[item.id] || 0;

        return (
            <View style={styles.horizontalCard}>
                <Image source={{ uri: item.image }} style={styles.horizontalImage} />
                <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { product: item })}>
  <Text style={styles.horizontalTitle}>{item.name}</Text>
</TouchableOpacity>
                <Text style={styles.horizontalPrice}>₹{item.price}</Text>

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
        );
    };

    return (
        <View>
            <Text style={styles.topTitle}>{title}</Text>
            <FlatList
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderProduct}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalList}
            />

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

export default ProductSection;
