import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/EditProfileStyles';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';


export default function EditProfileScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [alternateEmail, setAlternateEmail] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSave = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) return Alert.alert('Error', 'Not authenticated');

      const response = await fetch('http://10.0.2.2:5000/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          alternate_email: alternateEmail,
          gender,
          dob,
          profile_image: profileImage,
        }),
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
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) return;

        const res = await fetch('http://10.0.2.2:5000/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (res.ok) {
          setName(data.name || '');
          setEmail(data.email || '');
          setPhone(data.phone || '');
          setAlternateEmail(data.alternate_email || '');
          setGender(data.gender || '');
          setDob(data.dob || '');
          setProfileImage(data.profile_image || '');
        }
      } catch (err) {
        console.error('Fetch Profile Error:', err);
      }
    };

    fetchProfile();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileImageWrapper}>
        <Image
          source={{ uri: profileImage || 'https://i.pravatar.cc/150?img=10' }}
          style={styles.profileImage}
        />
      </View>

      <Text style={styles.title}>Edit Profile</Text>

      <Text style={styles.label}>Name</Text>
      <TextInput value={name} onChangeText={setName} style={styles.input} placeholder="Enter name" />

      <Text style={styles.label}>Email</Text>
      <TextInput value={email} onChangeText={setEmail} style={styles.input} placeholder="Enter email" keyboardType="email-address" />

      <Text style={styles.label}>Phone</Text>
      <TextInput value={phone} onChangeText={setPhone} style={styles.input} placeholder="Enter phone" keyboardType="phone-pad" />

      <Text style={styles.label}>Alternate Email</Text>
      <TextInput value={alternateEmail} onChangeText={setAlternateEmail} style={styles.input} placeholder="Enter alternate email" keyboardType="email-address" />

      <Text style={styles.label}>Gender</Text>
<Picker
  selectedValue={gender}
  onValueChange={(value) => setGender(value)}
  style={styles.input}
>
  <Picker.Item label="Select gender" value="" />
  <Picker.Item label="Male" value="Male" />
  <Picker.Item label="Female" value="Female" />
  <Picker.Item label="Other" value="Other" />
</Picker>

<Text style={styles.label}>Date of Birth</Text>
<TouchableOpacity
  style={styles.input}
  onPress={() => setShowDatePicker(true)}
>
  <Text>{dob ? dob : 'Select Date'}</Text>
</TouchableOpacity>
{showDatePicker && (
  <DateTimePicker
    value={dob ? new Date(dob) : new Date()}
    mode="date"
    display="default"
    maximumDate={new Date()}
    onChange={(event, selectedDate) => {
      setShowDatePicker(false);
      if (selectedDate) {
        const iso = selectedDate.toISOString().split('T')[0];
        setDob(iso);
      }
    }}
  />
)}

      <Text style={styles.label}>Profile Image URL</Text>
      <TextInput value={profileImage} onChangeText={setProfileImage} style={styles.input} placeholder="Paste image URL" />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
