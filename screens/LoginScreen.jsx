import React, { useRef, useEffect, useState } from 'react';
import { View, Text, FlatList, Image, ScrollView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import styles from '../styles/LoginStyles'; // your extracted styles

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

  // Autoplay slider
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % slides.length;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const sendOtp = () => {
    if (contact.trim() !== '') {
      setOtpSent(true);
      alert('OTP sent successfully to ' + contact);
    } else {
      alert('Please enter phone number or email');
    }
  };

  const verifyOtp = () => {
    if (otp === '123456') {
      navigation.replace('Main');
    } else {
      alert('Invalid OTP. Try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Slider */}
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

      {/* Login Form */}
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

        <Text onPress={() => navigation.navigate('Signup')} style={styles.link}>
          Don't have an account? Sign up
        </Text>
      </View>
    </ScrollView>
  );
}
