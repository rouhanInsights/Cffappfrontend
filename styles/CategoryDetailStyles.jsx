import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 12,
    paddingTop: 10,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 10,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 30,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    marginHorizontal: 8,
    elevation: 3,
    shadowColor: '#aaa',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 10,
    resizeMode: 'cover',
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  price: {
    fontSize: 15,
    marginBottom: 8,
  },
  strike: {
    color: '#888',
    textDecorationLine: 'line-through',
  },
  sale: {
    color: '#e53935',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#2e7d32',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  qtySelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  qtyText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  filterButton: {
    borderWidth: 1,
    borderColor: '#2e7d32',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    backgroundColor: '#fff',
  },
  filterButtonText: {
    color: '#2e7d32',
    fontWeight: '500',
  },
});
