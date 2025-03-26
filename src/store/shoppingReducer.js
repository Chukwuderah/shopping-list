import { v4 as uuid } from 'uuid';
import {
  ADD_ITEM,
  TOGGLE_ITEM,
  DELETE_ITEM,
  EDIT_ITEM
} from './shoppingActions';

const loadInitialState = () => {
  try {
    const savedItems = localStorage.getItem('shoppingItems');
    if (savedItems) {
      return JSON.parse(savedItems).map(item => ({
        ...item,
        createdAt: new Date(item.createdAt)
      }));
    }
  } catch (e) {
    console.error('Failed to parse items:', e);
  }
  return [];
};

const initialState = {
  items: loadInitialState()
};

const shoppingReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM: {
      const newItem = {
        id: uuid(),
        name: action.payload.name,
        category: action.payload.category,
        completed: false,
        createdAt: new Date()
      };
      const updatedItems = [newItem, ...state.items];
      localStorage.setItem('shoppingItems', JSON.stringify(updatedItems));
      return { ...state, items: updatedItems };
    }

    case TOGGLE_ITEM: {
      const updatedItems = state.items.map(item =>
        item.id === action.payload ? { ...item, completed: !item.completed } : item
      );
      localStorage.setItem('shoppingItems', JSON.stringify(updatedItems));
      return { ...state, items: updatedItems };
    }

    case DELETE_ITEM: {
      const updatedItems = state.items.filter(item => item.id !== action.payload);
      localStorage.setItem('shoppingItems', JSON.stringify(updatedItems));
      return { ...state, items: updatedItems };
    }

    case EDIT_ITEM: {
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id ? { ...item, name: action.payload.name } : item
      );
      localStorage.setItem('shoppingItems', JSON.stringify(updatedItems));
      return { ...state, items: updatedItems };
    }

    default:
      return state;
  }
};

export default shoppingReducer;
