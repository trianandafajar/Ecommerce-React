import isEqual from 'lodash.isequal';
import store from './store';
import { saveCart } from '../api/cart';

let currentAuth;
let currentCart;

function listener() {
  const previousAuth = currentAuth;
  const previousCart = currentCart;

  currentAuth = store.getState().auth;
  currentCart = store.getState().cart;

  const { token } = currentAuth;

  if (!isEqual(currentAuth, previousAuth)) {
    localStorage.setItem('auth', JSON.stringify(currentAuth));
    saveCart(token, currentCart);
  }

  if (!isEqual(currentCart, previousCart)) {
    localStorage.setItem('cart', JSON.stringify(currentCart));
    saveCart(token, currentCart);
  }
}

function listen() {
  store.subscribe(listener);
}

export { listen };
