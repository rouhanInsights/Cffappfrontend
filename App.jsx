import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import RootNavigator from './navigation/RootNavigator';
import { CartProvider } from './context/CartContext'; // 🟡 Import the context

export default function App() {
  return (
    <CartProvider> {/* 🟢 Wrap CartProvider at the top */}
      <PaperProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </PaperProvider>
    </CartProvider>
  );
}
