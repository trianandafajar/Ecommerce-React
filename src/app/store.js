import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import authReducer from '../features/Auth/reducer';
import productReducer from '../features/Products/reducer';
import cartReducer from '../features/Cart/reducer';

// Gunakan Redux DevTools jika tersedia di browser
const composerEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Gabungkan semua reducer
const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  products: productReducer,
});

// Buat store dengan middleware thunk
const store = createStore(
  rootReducer,
  composerEnhancer(applyMiddleware(thunk))
);

export default store;
