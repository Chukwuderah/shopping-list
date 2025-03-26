import React from 'react';
import { motion } from 'framer-motion';

const Header = ({ title }) => {
  return (
    <motion.header 
      className="sticky top-0 z-10 w-full py-4 bg-white text-gray-900 shadow"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container max-w-3xl mx-auto flex justify-between items-center px-4">
        <h1 className="text-2xl font-semibold">{title}</h1>
      </div>
    </motion.header>
  );
};

export default Header;