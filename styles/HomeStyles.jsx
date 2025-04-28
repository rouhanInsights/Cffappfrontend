import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9d3d0',
    paddingHorizontal: 1,
 
  },

  // Header row with cart icon
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  // Search Bar
  searchInput: {
    backgroundColor: '#f4f4f4',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#ccc',
    color: '#333',
    elevation: 1,
  },

  // Delivery Info Card
  deliveryCard: {
    backgroundColor: '#2E7D32',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deliveryText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  addressText: {
    color: 'white',
    fontSize: 14,
    marginTop: 4,
  },
  distanceText: {
    backgroundColor: '#fff',
    color: '#2E7D32',
    fontWeight: '600',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    fontSize: 12,
  },

  // Promo Card
  promoCard: {
    backgroundColor: '#F1FDF5',
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  promoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  promoDiscount: {
    fontSize: 14,
    color: '#444',
    marginBottom: 8,
  },
  promoButton: {
    backgroundColor: '#2E7D32',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  promoButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  promoImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginLeft: 16,
  },

  // Section Title
  topTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  // Horizontal product card
  horizontalList: {
    paddingBottom: 24,
  },
  horizontalCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    marginRight: 16,
    width: 140,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
    alignItems: 'center',
  },
  horizontalImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  horizontalTitle: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  horizontalPrice: {
    fontSize: 14,
    color: '#555',
    fontWeight: '500',
  },
  navbarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  navbarWrapper: {
     paddingTop:8,
    paddingBottom: 16,
    paddingHorizontal:8,
    backgroundColor: '#f28b82',
 
    
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
   
  },
  
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '75%',
    backgroundColor: '#fff3f3',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#ffd6d6',
  },
  
  addressText: {
    fontSize: 13,
    color: '#555',
    marginLeft: 4,
    maxWidth: 200,
  },
  
  addressHighlight: {
    fontWeight: 'bold',
    color: '#FF4D4D',
  },
  cartContainer: {
    position: 'relative',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 12,
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#FF4D4D',
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
 
  qtySelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: 4,
  },
  
  qtyText: {
    fontSize: 14,
    fontWeight: '500',
    marginHorizontal: 8,
    color: '#2E7D32',
  },
  addToCartText: {
    color: '#2E7D32',
    marginLeft: 6,
    fontWeight: '600',
    fontSize: 13,
  },
  popupContainer: {
    position: 'absolute',
    bottom:90,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    padding:16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 10,
    alignItems: 'center',
    zIndex: 1000,
  },
  popupText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  popupLink: {
    color: '#e53935',
    fontSize: 15,
    fontWeight: '600',
  },
  
  

});

export default styles;
