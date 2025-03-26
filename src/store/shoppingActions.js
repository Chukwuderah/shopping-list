export const ADD_ITEM = 'ADD_ITEM';
export const TOGGLE_ITEM = 'TOGGLE_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const EDIT_ITEM = 'EDIT_ITEM';

export const addItem = (name, category) => ({
  type: ADD_ITEM,
  payload: { name, category }
});

export const toggleItem = (id) => ({
  type: TOGGLE_ITEM,
  payload: id
});

export const deleteItem = (id) => ({
  type: DELETE_ITEM,
  payload: id
});

export const editItem = (id, name) => ({
  type: EDIT_ITEM,
  payload: { id, name }
});
