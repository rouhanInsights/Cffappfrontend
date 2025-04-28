import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  cartItem: {
    flexDirection: 'row',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingBottom: 12,
  },
  cartImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  cartDetails: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 4,
  },
  qtyBtn: {
    fontSize: 20,
    // width: 10,
    textAlign: 'center',
    color: '#007bff',
  },
  qtyText: {
    fontSize: 16,
    marginHorizontal: 10,
    minWidth: 10,

  },
  itemPrice: {
    fontWeight: 'bold',
    color: '#333',
  },
  totalSection: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  checkoutBtn: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  suggestionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 20,
  },
  suggestionList: {
    paddingBottom: 20,
  },
  suggestionCard: {
    marginRight: 14,
    width: 160,
    backgroundColor:'#fff',
    borderRadius:10,
    height:200
  },
  suggestionImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
  suggestionName: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: '500',
  },
  suggestionPrice: {
    fontSize: 13,
    color: '#888',
  },
  qtyControl: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 30,
    // marginTop: 6,
    // elevation: 3, // For Android shadow
    // // shadowColor: '#000', // For iOS shadow
    // // shadowOffset: { width: 0, height: 2 },
    // // shadowOpacity: 0.1,
    // // shadowRadius: 4,
    // borderWidth: 1,
    // borderColor: '#e0e0e0',
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
  addToCartButton: {
    marginTop: 8,
    backgroundColor: '#d32f2f',
    padding:2,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 1,
  },
  addToCartText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 14,
  },
});
