import React, { useEffect, useState } from 'react';
import {
  View, Text, Image,  ScrollView, ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NavBar from '../components/Navbar';
import styles from "../styles/MyOrderStyles"

const BASE_URL = 'http://10.0.2.2:5000';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`${BASE_URL}/api/orders/my-orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setOrders(data);
    } catch (err) {
      console.error('Order fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <NavBar />
      <ScrollView style={styles.container}>
        <Text style={styles.heading}>My Orders</Text>

        {loading && <ActivityIndicator size="large" color="#2e7d32" style={{ marginTop: 50 }} />}

        {!loading && orders.length === 0 && (
          <Text style={styles.emptyText}>You have not placed any orders yet.</Text>
        )}

        {orders.map((order, index) => (
          <View key={order.order_id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.orderId}>#{order.order_id}</Text>
              <Text style={styles.orderDate}>{order.order_date?.split('T')[0]}</Text>
            </View>

            <Text style={styles.status}>
              <Ionicons name="checkbox" color="#2e7d32" size={16} /> {order.status}
            </Text>

            <Text style={styles.paymentInfo}>
              Payment: {order.payment_method} ({order.payment_status})
            </Text>

            <Text style={styles.deliveryInfo}>Delivered to: {order.address}</Text>
            <Text style={styles.slotInfo}>Time Slot: {order.slot_details}</Text>

            <View style={styles.divider} />

            {order.items.map((item, i) => (
              <View key={i} style={styles.itemRow}>
                <Image source={{ uri: item.image_url }} style={styles.itemImage} />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemQty}>Qty: {item.quantity}</Text>
                  <Text style={styles.itemPrice}>₹{item.price}</Text>
                </View>
              </View>
            ))}

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total Paid:</Text>
              <Text style={styles.totalAmount}>₹{order.total}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
