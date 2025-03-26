import { createStore, combineReducers } from 'redux';
import shoppingReducer from './shoppingReducer';

const rootReducer = combineReducers({
  shopping: shoppingReducer
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
