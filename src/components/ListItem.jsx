import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ListItem = ({ item, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(item.name);

  const handleToggle = () => onToggle(item.id);
  const handleDelete = () => onDelete(item.id);
  const startEditing = () => {
    setEditValue(item.name);
    setIsEditing(true);
  };

  const saveEdit = () => {
    if (editValue.trim()) {
      onEdit(item.id, editValue);
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      saveEdit();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditValue(item.name);
    }
  };

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className={`border-gray-200 p-4 rounded-lg mb-3 transition-all ${item.completed ? 'bg-gray-100' : 'bg-white shadow'}`}
    >
      <div className="flex items-center gap-3">
        <button
          onClick={handleToggle}
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${item.completed ? 'border-blue-500 bg-blue-500 text-white' : 'border-gray-400'}`}
          aria-label={item.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {item.completed && (
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path
                d="M2 5L4 7L8 3"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>

        <div className="flex-1">
          <AnimatePresence mode="wait">
            {isEditing ? (
              <motion.div
                key="editing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onBlur={saveEdit}
                  onKeyDown={handleKeyDown}
                  className="w-full border px-3 py-1 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  autoFocus
                />
              </motion.div>
            ) : (
              <motion.div
                key="display"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center"
              >
                <span
                  onClick={startEditing}
                  className={`text-base cursor-pointer ${item.completed ? 'text-gray-400 line-through' : 'text-gray-900'}`}
                >
                  {item.name}
                </span>
                {item.category && (
                  <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-gray-200 text-gray-600">
                    {item.category}
                  </span>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button
          onClick={handleDelete}
          className="text-gray-400 hover:text-red-500 p-1.5 rounded-full transition-colors"
          aria-label="Delete item"
        >
          🗑️
        </button>
      </div>
    </motion.li>
  );
};

export default ListItem;