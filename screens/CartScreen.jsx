import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    Animated,
} from 'react-native';
import { useCart } from '../context/CartContext';
import styles from '../styles/CartStyles';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NavBar from '../components/Navbar';

const RELATED_PRODUCTS = [
    { id: 10, name: 'Boneless Chicken Breasts', price: 259, image: 'https://calcuttafreshfoods.com/wp-content/uploads/2022/08/Boneless-breasts.jpeg' },
    { id: 11, name: 'Hilsa Fish', price: 349, image: 'https://calcuttafreshfoods.com/wp-content/uploads/2022/08/hilsha.jpg' },
    { id: 12, name: 'Mutton Keema', price: 399, image: 'https://calcuttafreshfoods.com/wp-content/uploads/2022/08/Mutton-Keemas.jpg' },
];

const DUMMY_PRODUCTS = [
    {
        id: 1,
        name: 'Fresh Chicken Breast',
        price: 249,
        image: 'https://calcuttafreshfoods.com/wp-content/uploads/2022/08/Boneless-breasts.jpeg',
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

const CartScreen = () => {
    const { cartItems, addToCart, incrementQty, decrementQty } = useCart();
    const navigation = useNavigation();

    const productList = Object.entries(cartItems)
        .map(([productId, qty]) => {
            const product = DUMMY_PRODUCTS.find(p => p.id === parseInt(productId)) || RELATED_PRODUCTS.find(p => p.id === parseInt(productId));
            if (!product) return null;
            return { ...product, quantity: qty };
        })
        .filter(Boolean);

    const totalAmount = productList.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const renderItem = ({ item }) => (
        <View style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.cartImage} />
            <View style={{ flex: 1 }}>
                <Text style={styles.itemName}>{item.name}</Text>
                <View style={styles.qtyControl}>
                    <TouchableOpacity onPress={() => decrementQty(item.id)}>
                        <Text style={styles.qtyBtn}>−</Text>
                    </TouchableOpacity>
                    <Text style={styles.qtyText}>{item.quantity}</Text>
                    <TouchableOpacity onPress={() => incrementQty(item.id)}>
                        <Text style={styles.qtyBtn}>＋</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    const renderSuggestion = ({ item }) => {
        const quantity = cartItems[item.id] || 0;

        return (
            <View style={styles.suggestionCard}>
                <Image source={{ uri: item.image }} style={styles.suggestionImage} />
                <Text style={styles.suggestionName}>{item.name}</Text>
                <Text style={styles.suggestionPrice}>₹{item.price}</Text>

                {quantity === 0 ? (
                    <TouchableOpacity
                        style={styles.addToCartButton}
                        onPress={() => addToCart(item.id)}
                    >
                        <Ionicons name="cart-outline" size={20} color="#fff" />
                        <Text style={styles.addToCartText}>Add to Cart</Text>
                    </TouchableOpacity>
                ) : (
                    <View style={styles.qtySelector}>
                        <TouchableOpacity onPress={() => decrementQty(item.id)}>
                            <Ionicons name="remove-circle-outline" size={24} color="#000" />
                        </TouchableOpacity>
                        <Text style={styles.qtyText}>{quantity}</Text>
                        <TouchableOpacity onPress={() => incrementQty(item.id)}>
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
            <FlatList
                data={productList}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.container}
                ListHeaderComponent={
                    <>
                        <Text style={styles.title}>My Cart</Text>
                    </>
                }
                ListFooterComponent={
                    <>
                        <View style={styles.totalSection}>
                            <Text style={styles.totalText}>Total: ₹{totalAmount}</Text>
                            <TouchableOpacity
                                style={styles.checkoutBtn}
                                onPress={() => navigation.navigate('Checkout')}
                            >
                                <Text style={styles.checkoutText}>Proceed to Checkout</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.suggestionTitle}>You may also like</Text>
                        <FlatList
                            data={RELATED_PRODUCTS}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={renderSuggestion}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.suggestionList}
                        />
                    </>
                }
            />
        </View>
    );
};

export default CartScreen;
