import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
 // Expo or vector-icons
import styles from '../styles/ProfileStyles';
import { useNavigation } from '@react-navigation/native';
export default function ProfileScreen() {
     const navigation = useNavigation();
    const ProfileItem = ({ icon, label, iconColor = '#333', onPress }) => (
        <TouchableOpacity style={styles.item} onPress={onPress}>
            <MaterialIcons name={icon} size={24} color={iconColor} />
            <Text style={styles.itemText}>{label}</Text>
            <Ionicons name="chevron-forward" size={20} color="#aaa" style={{ marginLeft: 'auto' }} />
        </TouchableOpacity>
    );
    return (
        <ScrollView style={styles.container}>
            {/* Profile Header */}
            <View style={styles.profileHeader}>
                <Image
                    source={{ uri: 'https://www.gravatar.com/avatar/?d=mp&s=150' }}
                    style={styles.avatar}
                />
                <View>
                    <Text style={styles.userName}>John Doe</Text>
                    <Text style={styles.userPhone}>+91 XXXXXXXXXX</Text>
                </View>
            </View>

            {/* Section: Account */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Account</Text>
                <ProfileItem
                    icon="person"
                    label="Edit Profile"
                    onPress={() => navigation.navigate('EditProfile')}
                />
                {/* <ProfileItem icon="receipt" label="My Orders" /> */}
                <ProfileItem icon="location-on" label="My Addresses" />
                <ProfileItem icon="credit-card" label="Payments" />
            </View>

            {/* Section: Support */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Support</Text>
                <ProfileItem icon="help-outline" label="Help Center" />
                <ProfileItem icon="info-outline" label="About Us" />
                <ProfileItem icon="contact-mail" label="Contact Us" />
            </View>

            {/* Section: Other */}
            <View style={styles.section}>
                <ProfileItem icon="logout" label="Logout" iconColor="red" />
            </View>
        </ScrollView>
    );
}

// Reusable item
const ProfileItem = ({ icon, label, iconColor = '#333' }) => (
    <TouchableOpacity style={styles.item}>
        <MaterialIcons name={icon} size={24} color={iconColor} />
        <Text style={styles.itemText}>{label}</Text>
        <Ionicons name="chevron-forward" size={20} color="#aaa" style={{ marginLeft: 'auto' }} />
    </TouchableOpacity>
);
