import React, { useRef, useEffect, useState } from 'react';
import { View, Text, FlatList, Image, ScrollView, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import styles from '../styles/LoginStyles';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const slides = [
  {
    id: '1',
    title: 'Fresh Meat Delivered',
    image: require('../assets/slider1.png'),
  },
  {
    id: '2',
    title: 'Quality Fish Daily',
    image: require('../assets/slider2.png'),
  },
  {
    id: '3',
    title: 'Hygienic & Fast Delivery',
    image: require('../assets/slider3.png'),
  },
];

export default function LoginScreen({ navigation }) {
  const flatListRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [contact, setContact] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const BASE_URL = 'http://10.0.2.2:5000'; // 🔁 Replace with your actual local IP

  // Slider autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % slides.length;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const sendOtp = async () => {
    if (contact.trim() === '') {
      Alert.alert('Error', 'Please enter phone number or email');
      return;
    }

    const body = contact.includes('@') ? { email: contact } : { phone: contact };

    try {
      const response = await fetch(`${BASE_URL}/api/users/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        setOtpSent(true);
        Alert.alert('Success', data.message || 'OTP sent!');
      } else {
        Alert.alert('Error', data.error || 'OTP failed');
      }
    } catch (err) {
      console.error('Send OTP Error:', err);
      Alert.alert('Error', 'Network error');
    }
  };

  const verifyOtp = async () => {
    if (otp.trim() === '') {
      Alert.alert('Error', 'Enter OTP');
      return;
    }

    const body = contact.includes('@')
      ? { email: contact, otp_code: otp }
      : { phone: contact, otp_code: otp };

    try {
      const response = await fetch(`${BASE_URL}/api/users/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
       await AsyncStorage.setItem('token', data.token);
        Alert.alert('Success', 'Login successful');

        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Main' }],
          })
        );
      } else {
        Alert.alert('Error', data.error || 'Invalid OTP');
      }
    } catch (err) {
      console.error('Verify OTP Error:', err);
      Alert.alert('Error', 'Network error');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <FlatList
        ref={flatListRef}
        data={slides}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={true}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Image source={item.image} style={styles.image} />
          </View>
        )}
      />

      <View style={styles.container}>
        <TextInput
          label="Phone or Email"
          value={contact}
          onChangeText={setContact}
          style={styles.input}
          keyboardType="email-address"
        />

        {otpSent && (
          <TextInput
            label="Enter OTP"
            value={otp}
            onChangeText={setOtp}
            style={styles.input}
            keyboardType="numeric"
          />
        )}

        <Button mode="contained" onPress={otpSent ? verifyOtp : sendOtp} style={styles.link}>
          {otpSent ? 'Verify OTP' : 'Send OTP'}
        </Button>
      </View>
    </ScrollView>
  );
}
