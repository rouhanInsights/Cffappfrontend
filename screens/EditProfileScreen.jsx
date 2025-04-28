import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import styles from '../styles/EditProfileStyles';

const genders = ['Male', 'Female', 'Other'];

export default function EditProfileScreen({ navigation }) {
  const [name, setName] = useState('Priya Sharma');
  const [email, setEmail] = useState('priya@example.com');
  const [gender, setGender] = useState('Female');

  const handleSave = () => {
    if (!name.trim() || !email.trim()) {
      Alert.alert('Error', 'Name and email cannot be empty.');
      return;
    }

    Alert.alert('Profile Updated', `Name: ${name}\nEmail: ${email}\nGender: ${gender}`);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Profile Image */}
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

      <Text style={styles.label}>Gender</Text>
      <View style={styles.genderContainer}>
        {genders.map((g) => (
          <TouchableOpacity
            key={g}
            style={[styles.genderButton, gender === g && styles.genderSelected]}
            onPress={() => setGender(g)}
          >
            <Text style={gender === g ? styles.genderSelectedText : styles.genderText}>{g}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
}
