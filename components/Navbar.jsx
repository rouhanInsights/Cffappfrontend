import React, { useState } from 'react';
import { View, TouchableOpacity, Text, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../context/CartContext';
import styles from '../styles/HomeStyles';

const NavBar = () => {
  const navigation = useNavigation();
  const { getTotalQuantity } = useCart();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={styles.navbarWrapper}>
      {/* Top Row: Address and Cart */}
      <View style={styles.navbarContainer}>
        <TouchableOpacity
          style={styles.addressContainer}
          onPress={() => navigation.navigate('Location')}
          activeOpacity={0.7}
        >
          <Entypo name="location-pin" size={20} color="#FF4D4D" />
          <Text style={styles.addressText} numberOfLines={1}>
            Deliver to: <Text style={styles.addressHighlight}>123, MG Road</Text>
          </Text>
          <Ionicons name="chevron-down" size={18} color="#444" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <View style={styles.cartContainer}>
            <Ionicons name="cart-outline" size={26} color="#333" />
            {getTotalQuantity() > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{getTotalQuantity()}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>

      {/* Bottom Row: Search */}
      <TextInput
        placeholder="Search on Calcutta Fresh Foods"
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchInput}
      />
    </View>
  );
};

export default NavBar;
