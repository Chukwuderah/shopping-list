import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const AddItemForm = ({ onAddItem, categories }) => {
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (itemName.trim()) {
      onAddItem(itemName, category || undefined);
      setItemName('');
      setCategory('');
      inputRef.current?.focus();
    }
  };

  return (
    <motion.div 
      className="sticky bottom-6 w-full px-4 sm:px-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <form 
  onSubmit={handleSubmit}
  className={`w-full md:max-w-3xl mx-auto p-3 md:p-4 rounded-xl shadow-md hover:shadow-xl hover:translate-y-1 transition-all duration-200 ${
    isFocused ? 'ring-1 ring-blue-500' : ''
  }`}
>
  <div className="flex flex-col-reverse md:flex-row-reverse items-stretch md:items-center gap-2">
    <button
      type="submit"
      className="md:px-3 py-2 text-lg md:text-sm w-[40%] mx-auto md:w-auto md:m-0 rounded-lg bg-blue-600 text-white flex-shrink-0 hover:bg-blue-700"
      aria-label="Add item"
    >
      Add Item
    </button>

    <div className="flex-1 flex flex-col sm:flex-row gap-2">
      <input
        ref={inputRef}
        type="text"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Add an item..."
        className="flex-1 bg-transparent md:px-3 py-2 text-sm md:text-base rounded-md text-black placeholder-gray-400 outline-none focus:outline-none focus:ring-0 focus:border-transparent border-none"
        autoComplete="off"
      />

      {categories.length > 0 && (
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="md:px-3 py-2 text-sm md:text-base rounded-md text-black outline-none focus:outline-none focus:ring-0 focus:border-transparent border-none"
        >
          <option value="">No category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      )}
    </div>
  </div>
</form>

    </motion.div>
  );
};

export default AddItemForm;
