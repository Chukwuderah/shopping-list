import React from 'react';
import { motion } from 'framer-motion';

const EmptyState = () => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center border border-gray-200 p-8 mt-8 mb-8 rounded-lg bg-gray-100"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="text-4xl mb-4">🛒</div>
      <h3 className="text-lg font-medium mb-1">No items yet</h3>
      <p className="text-center max-w-sm text-gray-700">
        Add your first item to get started with your shopping list.
      </p>
    </motion.div>
  );
};

export default EmptyState;
