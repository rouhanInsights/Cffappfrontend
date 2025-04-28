import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  FlatList,
} from 'react-native';
import styles from '../styles/CheckoutStyles';
import { useNavigation } from '@react-navigation/native';
import NavBar from '../components/Navbar';


const CheckoutScreen = () => {
  const navigation = useNavigation();

  const [isAfter9am, setIsAfter9am] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');
  const [addresses, setAddresses] = useState([
    '123 Park Street, Kolkata',
    '45B MG Road, Mumbai',
  ]);

  const cartItems = [
    { id: 1, name: 'Fresh Chicken Breast', qty:2, price: 249 },
    { id: 2, name: 'Rohu Fish (Cleaned)', qty: 1, price:199 },
  ];

  const paymentOptions = ['Cash on Delivery', 'UPI', 'Net Banking', 'Credit Card'];

  useEffect(() => {
    const hour = new Date().getHours();
    setIsAfter9am(hour >= 9);
    setDeliveryDate(hour >= 9 ? '2025-04-24' : '2025-04-23');
    setDeliveryTime('9:00 AM');
  }, []);

  const handleConfirmOrder = () => {
    if (!selectedAddress || !paymentMethod || !deliveryDate || !deliveryTime) {
      Alert.alert('Missing Info', 'Please fill all required fields.');
      return;
    }

    Alert.alert('Order Placed', 'Your order has been successfully placed!', [
      { text: 'OK', onPress: () => navigation.navigate('Home') },
    ]);
  };

  const handleAddAddress = () => {
    if (!newAddress.trim()) return;
    setAddresses((prev) => [...prev, newAddress]);
    setSelectedAddress(newAddress);
    setNewAddress('');
  };
  const subtotal = cartItems.reduce((sum, item) => sum + item.qty * item.price, 0);
const shippingFee = 30; // static for now, can be updated later
const total = subtotal + shippingFee;

  return (
    <View style={{ flex: 1 }}>
       <NavBar/>
    <ScrollView style={styles.container}>
      <View style={styles.checkoutWrapper}>
        {/* LEFT SIDE */}
        <View style={styles.leftColumn}>
          <Text style={styles.sectionTitle}>Select Address</Text>
          {addresses.map((address, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.selectBtn,
                selectedAddress === address && styles.selectBtnActive,
              ]}
              onPress={() => setSelectedAddress(address)}
            >
              <Text
                style={[
                  styles.selectBtnText,
                  selectedAddress === address && styles.selectBtnTextActive,
                ]}
              >
                {address}
              </Text>
            </TouchableOpacity>
          ))}

          <TextInput
            placeholder="Add new address"
            value={newAddress}
            onChangeText={setNewAddress}
            style={styles.input}
          />
          <TouchableOpacity style={styles.addBtn} onPress={handleAddAddress}>
            <Text style={styles.addBtnText}>Add Address</Text>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Select Delivery Date</Text>
          <View style={styles.buttonGroup}>
            {['2025-04-23', '2025-04-24', '2025-04-25'].map((date) => (
              <TouchableOpacity
                key={date}
                style={[
                  styles.selectBtn,
                  deliveryDate === date && styles.selectBtnActive,
                ]}
                onPress={() => setDeliveryDate(date)}
              >
                <Text
                  style={[
                    styles.selectBtnText,
                    deliveryDate === date && styles.selectBtnTextActive,
                  ]}
                >
                  {date}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Select Delivery Time</Text>
          <View style={styles.buttonGroup}>
            {['9:00 AM', '12:00 PM', '6:00 PM'].map((time) => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.selectBtn,
                  deliveryTime === time && styles.selectBtnActive,
                ]}
                onPress={() => setDeliveryTime(time)}
              >
                <Text
                  style={[
                    styles.selectBtnText,
                    deliveryTime === time && styles.selectBtnTextActive,
                  ]}
                >
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {isAfter9am && (
            <Text style={styles.warningText}>
              Orders after 9 AM will be delivered the next day.
            </Text>
          )}

          <Text style={styles.sectionTitle}>Additional Info</Text>
          <TextInput
            placeholder="Order Notes (Optional)"
            value={orderNotes}
            onChangeText={setOrderNotes}
            multiline
            numberOfLines={3}
            style={styles.textArea}
          />
        </View>

        {/* RIGHT SIDE */}
        <View style={styles.rightColumn}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          {cartItems.map((item) => (
            <View key={item.id} style={styles.cartItem}>
              <Text>{item.name} × {item.qty}</Text>
              <Text>₹{item.qty * item.price}</Text>
            </View>
          ))}
          <View style={styles.cartItem}>
  <Text style={{ fontWeight: '600' }}>Subtotal</Text>
  <Text>₹{subtotal}</Text>
</View>
<View style={styles.cartItem}>
  <Text style={{ fontWeight: '600' }}>Shipping</Text>
  <Text>{shippingFee === 0 ? 'Free' : `₹${shippingFee}`}</Text>
</View>
<View style={styles.cartItem}>
  <Text style={{ fontWeight: '700' }}>Total</Text>
  <Text style={{ fontWeight: '700' }}>₹{total}</Text>
</View>

          <Text style={styles.sectionTitle}>Payment Method</Text>
          {paymentOptions.map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.paymentOption,
                paymentMethod === option && styles.selectedPayment,
              ]}
              onPress={() => setPaymentMethod(option)}
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
