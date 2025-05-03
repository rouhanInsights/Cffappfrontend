import React from 'react';
import ProductSection from '../screens/ProductSection';

const TopOfWeekSection = ({ products }) => {
  return (
    <ProductSection title="Top of Week" products={products} />
  );
};

export default TopOfWeekSection;
