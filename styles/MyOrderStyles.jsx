import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    container: {
      padding: 10,
      backgroundColor: '#f9d3d0',
    },
    orderCard: {
      backgroundColor: '#f9f9f9',
      borderRadius: 12,
      padding: 15,
      marginBottom: 20,
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowRadius: 5,
      elevation: 3,
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    orderTitle: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    orderDate: {
      fontWeight: 'bold',
      color: '#333',
    },
    statusRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 5,
    },
    label: {
      fontWeight: '600',
      marginBottom: 2,
    },
    value: {
      fontWeight: '400',
    },
    total: {
      fontWeight: '600',
      marginTop: 10,
      marginBottom: 5,
    },
    statusBadge: {
      paddingHorizontal: 10,
      paddingVertical: 3,
      borderRadius: 12,
      marginLeft: 5,
    },
    greenBadge: {
      backgroundColor: '#b2f2bb',
    },
    orangeBadge: {
      backgroundColor: '#ffe066',
    },
    badgeText: {
      fontWeight: 'bold',
      color: '#000',
    },
    productRow: {
      flexDirection: 'row',
      marginTop: 10,
      alignItems: 'center',
    },
    productImage: {
      width: 70,
      height: 70,
      borderRadius: 8,
      marginRight: 10,
    },
    productDetails: {
      flex: 1,
    },
    productName: {
      fontWeight: '600',
    },
    productQty: {
      marginVertical: 2,
      color: '#555',
    },
    productPrice: {
      fontWeight: 'bold',
      color: '#e60000',
    },
  });
  export default styles;
  