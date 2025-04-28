import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import styles from '../styles/MyOrderStyles'
import NavBar from '../components/Navbar';
const orders = [
  {
    id: 'ORD12345',
    date: '2025-04-10',
    status: 'Delivered',
    paymentStatus: 'Paid',
    paymentMethod: 'UPI',
    total: 699,
    items: [
      {
        name: 'Premium Rohu Fish (1.5kg)',
        qty: 1,
        price: 699,
        image: 'https://calcuttafreshfoods.com/wp-content/uploads/2022/08/Bhetki-Paturi..jpg',
      },
    ],
  },
  {
    id: 'ORD12346',
    date: '2025-04-12',
    status: 'Out for Delivery',
    paymentStatus: 'Pending',
    paymentMethod: 'Cash on Delivery',
    total: 598,
    items: [
      {
        name: 'Chicken Breast Boneless (500g)',
        qty: 2,
        price: 299,
        image: 'https://calcuttafreshfoods.com/wp-content/uploads/2022/08/Boneless-breasts.jpeg',
      },
    ],
  },
];

export default function MyOrders() {
  return (
    <View style={{ flex: 1 }}>
        <NavBar/>
    <ScrollView style={styles.container}>
      {orders.map((order, index) => (
        <View key={order.id} style={styles.orderCard}>
          <View style={styles.headerRow}>
            <Text style={styles.orderTitle}>Order {index + 1}</Text>
            <Text style={styles.orderDate}>{order.date}</Text>
          </View>
          <View style={styles.statusRow}>
            <Text style={styles.label}>Status: </Text>
            <View style={[styles.statusBadge, order.status === 'Delivered' ? styles.greenBadge : styles.orangeBadge]}>
              <Text style={styles.badgeText}>{order.status}</Text>
            </View>
          </View>
          <Text style={styles.label}>Payment Status: <Text style={styles.value}>{order.paymentStatus}</Text></Text>
          <Text style={styles.label}>Payment Method: <Text style={styles.value}>{order.paymentMethod}</Text></Text>
          <Text style={styles.label}>Order ID: <Text style={styles.value}>#{order.id}</Text></Text>
          <Text style={styles.total}>Total Paid: ₹{order.total.toFixed(2)}</Text>

          {order.items.map((item, i) => (
            <View key={i} style={styles.productRow}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <View style={styles.productDetails}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productQty}>Qty: {item.qty}</Text>
                <Text style={styles.productPrice}>₹{item.price.toFixed(2)}</Text>
              </View>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
    </View>
  );
}
