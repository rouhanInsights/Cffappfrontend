import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/EditProfileStyles';

export default function EditProfileScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSave = async () => {
    if (!name.trim() || !email.trim()) {
      Alert.alert('Error', 'Name and email cannot be empty.');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');

      const response = await fetch('http://10.0.2.2:5000/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, email }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Profile updated successfully.');
        navigation.goBack();
      } else {
        Alert.alert('Error', data.error || 'Failed to update profile');
      }
    } catch (err) {
      console.error('Update Profile Error:', err);
      Alert.alert('Error', 'Something went wrong');
    }
    console.log('Fetched token:', token);

  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const res = await fetch('http://10.0.2.2:5000/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (res.ok) {
          setName(data.name || '');
          setEmail(data.email || '');
        }
      } catch (err) {
        console.error('Fetch Profile Error:', err);
      }
      console.log('Fetched token:', token);

    };

    fetchProfile();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.profileImageWrapper}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/150?img=10' }}
          style={styles.profileImage}
        />
      </View>

      <Text style={styles.title}>Edit Profile</Text>

      <Text style={styles.label}>Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
        style={styles.input}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        style={styles.input}
        keyboardType="email-address"
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
}
