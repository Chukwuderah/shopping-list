import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from 'sonner';
import { useAppSelector } from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { addItem, toggleItem, deleteItem, editItem } from '../store/shoppingActions';
import ListItem from './ListItem';
import AddItemForm from './AddItemForm';
import EmptyState from './EmptyState';

const CATEGORIES = ['Grocery', 'Household', 'Electronics', 'Clothing'];

const ShoppingList = () => {
  const items = useAppSelector(state => state.shopping.items);
  const dispatch = useAppDispatch();

  const handleAddItem = (name, category) => {
    dispatch(addItem(name, category));
    toast.success('Item added to your list');
  };

  const handleToggleItem = (id) => {
    dispatch(toggleItem(id));
  };

  const handleDeleteItem = (id) => {
    dispatch(deleteItem(id));
    toast.info('Item removed from your list');
  };

  const handleEditItem = (id, newName) => {
    dispatch(editItem(id, newName));
    toast.success('Item updated');
  };

  const pendingItems = items.filter(item => !item.completed);
  const completedItems = items.filter(item => item.completed);

  return (
    <div className="container max-w-3xl py-6 px-4 mx-auto">
      {items.length === 0 ? (
        <EmptyState />
      ) : (
        <motion.div 
          layout
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          <AnimatePresence mode="popLayout">
            {pendingItems.length > 0 && (
              <motion.div 
                key="pending"
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-lg font-medium mb-3">Items to Buy ({pendingItems.length})</h2>
                <ul>
                  <AnimatePresence initial={false}>
                    {pendingItems.map(item => (
                      <ListItem
                        key={item.id}
                        item={item}
                        onToggle={handleToggleItem}
                        onDelete={handleDeleteItem}
                        onEdit={handleEditItem}
                      />
                    ))}
                  </AnimatePresence>
                </ul>
              </motion.div>
            )}

            {completedItems.length > 0 && (
              <motion.div 
                key="completed"
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-lg font-medium mb-3 text-gray-500">Completed ({completedItems.length})</h2>
                <ul>
                  <AnimatePresence initial={false}>
                    {completedItems.map(item => (
                      <ListItem
                        key={item.id}
                        item={item}
                        onToggle={handleToggleItem}
                        onDelete={handleDeleteItem}
                        onEdit={handleEditItem}
                      />
                    ))}
                  </AnimatePresence>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      <AddItemForm onAddItem={handleAddItem} categories={CATEGORIES} />
    </div>
  );
};

export default ShoppingList;
