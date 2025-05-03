import React from 'react';
import ProductSection from '../screens/ProductSection';

const PreviouslyBoughtSection = ({ products }) => {
  return <ProductSection title="Previously Bought" products={products} />;
};

export default PreviouslyBoughtSection;