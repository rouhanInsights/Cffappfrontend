import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView, Alert
} from 'react-native';
import styles from '../styles/CheckoutStyles';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavBar from '../components/Navbar';
import { useCart } from '../contexts/CartContext';

const CheckoutScreen = () => {
  const navigation = useNavigation();
  const { cartItems, clearCart } = useCart();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlotId, setSelectedSlotId] = useState(null);
  const [deliveryDate, setDeliveryDate] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const [allProducts, setAllProducts] = useState([]);
  const [isAfter9am, setIsAfter9am] = useState(false);

  const BASE_URL = 'http://10.0.2.2:5000';

  useEffect(() => {
    const initCheckout = async () => {
      try {
        const token = await AsyncStorage.getItem('token');

        const addrRes = await fetch(`${BASE_URL}/api/users/addresses`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const addrData = await addrRes.json();
        if (addrRes.ok) {
          setAddresses(addrData);
          const defaultAddr = addrData.find(a => a.is_default) || addrData[0];
          setSelectedAddress(defaultAddr);
        }

        const slotRes = await fetch(`${BASE_URL}/api/slots`);
        const slotData = await slotRes.json();
        if (slotRes.ok) {
          setAvailableSlots(slotData);
          setSelectedSlotId(slotData[0]?.slot_id);
        }

        const productRes = await fetch(`${BASE_URL}/api/products`);
        const productData = await productRes.json();
        if (productRes.ok) setAllProducts(productData);

        const now = new Date();
        const after9 = now.getHours() >= 9;
        setIsAfter9am(after9);
        const baseDate = after9 ? new Date(now.setDate(now.getDate() + 1)) : now;
        setDeliveryDate(baseDate.toISOString().split('T')[0]);

      } catch (err) {
        console.error('Checkout init error:', err);
      }
    };

    initCheckout();
  }, []);

  const cartProductList = Object.entries(cartItems)
    .map(([id, qty]) => {
      const product = allProducts.find(p => p.product_id === parseInt(id));
      if (!product) return null;
      return {
        ...product,
        quantity: qty,
        price: product.sale_price || product.price
      };
    })
    .filter(Boolean);

  const subtotal = cartProductList.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );
  const shippingFee = 30;
  const total = subtotal + shippingFee;

  const paymentOptions = ['Cash on Delivery', 'UPI', 'Net Banking', 'Credit/Debit Card'];

  const handleConfirmOrder = async () => {
    if (!selectedAddress || !paymentMethod || !selectedSlotId || !deliveryDate) {
      Alert.alert('Missing Info', 'Please fill all required fields.');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');

      const items = cartProductList.map(item => ({
        id: item.product_id,
        quantity: item.quantity,
        price: item.price
      }));

      const orderPayload = {
        total,
        address: `${selectedAddress.address_line1}, ${selectedAddress.city} - ${selectedAddress.pincode}`,
        slot_id: selectedSlotId,
        slot_date: deliveryDate,
        payment_method: paymentMethod,
        items,
      };

      const res = await fetch(`${BASE_URL}/api/orders`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderPayload),
      });

      const data = await res.json();
      if (res.ok) {
        clearCart();
        navigation.reset({
          index: 0,
          routes: [{ name: 'OrderSuccess' }],
        });
      } else {
        Alert.alert('Error', data.error || 'Order placement failed');
      }
    } catch (err) {
      console.error('Order error:', err);
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <NavBar />
      <ScrollView style={styles.container}>
        <View style={styles.checkoutWrapper}>
          <View style={styles.leftColumn}>
            <Text style={styles.sectionTitle}>Select Address</Text>
            {addresses.map((addr) => (
              <TouchableOpacity
                key={addr.address_id}
                style={[styles.selectBtn, selectedAddress?.address_id === addr.address_id && styles.selectBtnActive]}
                onPress={() => setSelectedAddress(addr)}
              >
                <Text style={[styles.selectBtnText, selectedAddress?.address_id === addr.address_id && styles.selectBtnTextActive]}>
                  {addr.address_line1}, {addr.city}, {addr.pincode}
                </Text>
              </TouchableOpacity>
            ))}

            <Text style={styles.sectionTitle}>Select Delivery Date</Text>
            <View style={styles.buttonGroup}>
              {Array.from({ length: 3 }).map((_, i) => {
                const now = new Date();
                const base = now.getHours() >= 9 ? new Date(now.setDate(now.getDate() + 1)) : now;
                const date = new Date(base);
                date.setDate(base.getDate() + i);
                const formatted = date.toISOString().split('T')[0];
                return (
                  <TouchableOpacity
                    key={formatted}
                    style={[styles.selectBtn, deliveryDate === formatted && styles.selectBtnActive]}
                    onPress={() => setDeliveryDate(formatted)}
                  >
                    <Text style={[styles.selectBtnText, deliveryDate === formatted && styles.selectBtnTextActive]}>
                      {formatted}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text style={styles.sectionTitle}>Select Delivery Time</Text>
            <View style={styles.buttonGroup}>
              {availableSlots.map((slot) => (
                <TouchableOpacity
                  key={slot.slot_id}
                  style={[styles.selectBtn, slot.slot_id === selectedSlotId && styles.selectBtnActive]}
                  onPress={() => setSelectedSlotId(slot.slot_id)}
                >
                  <Text style={[styles.selectBtnText, slot.slot_id === selectedSlotId && styles.selectBtnTextActive]}>
                    {slot.slot_details}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {isAfter9am && (
              <Text style={styles.warningText}>
                Orders placed after 9 AM will be delivered the next day.
              </Text>
            )}
          </View>

          <View style={styles.rightColumn}>
            <Text style={styles.sectionTitle}>Order Summary</Text>
            {cartProductList.map((item) => (
              <View key={item.product_id} style={styles.cartItem}>
                <Text>{item.name} × {item.quantity}</Text>
                <Text>₹{item.quantity * item.price}</Text>
              </View>
            ))}

            <View style={styles.cartItem}>
              <Text style={{ fontWeight: '600' }}>Subtotal</Text>
              <Text>₹{subtotal}</Text>
            </View>
            <View style={styles.cartItem}>
              <Text style={{ fontWeight: '600' }}>Shipping</Text>
              <Text>₹{shippingFee}</Text>
            </View>
            <View style={styles.cartItem}>
              <Text style={{ fontWeight: '700' }}>Total</Text>
              <Text style={{ fontWeight: '700' }}>₹{total}</Text>
            </View>

            <Text style={styles.sectionTitle}>Payment Method</Text>
            {paymentOptions.map((option) => (
              <TouchableOpacity
                key={option}
                onPress={() => setPaymentMethod(option)}
                style={[
                  styles.paymentOption,
                  paymentMethod === option && styles.selectedPayment,
                ]}
              >
                <Text>{option}</Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirmOrder}>
              <Text style={styles.confirmText}>Place Order</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CheckoutScreen;
