import axios from 'axios';
import { BASE_URL } from '../config/config';
import setAuthToken from '../utils/setAuthToken';
import config from '../utils/axiosConfig';
import { setAlert } from './alertsRedux';

const reducerName = 'user';

// action name creator
const createActionName = name => `app/${reducerName}/${name}`;

export const USER_LOADED = 'app/auth/USER_LOADED';
export const DELETE_ACCOUNT = 'app/auth/DELETE_ACCOUNT';
export const LOGOUT = 'app/auth/LOGOUT';
export const AUTH_ERROR = 'app/auth/AUTH_ERROR';
export const USER_REQUEST_START = createActionName('USER_REQUEST_START');
export const USER_REQUEST_FAIL = createActionName('USER_REQUEST_FAIL');
export const USER_REQUEST_END = createActionName('USER_REQUEST_END');
export const ADD_TO_BASKET = createActionName('ADD_TO_BASKET');
export const CONCAT_BASKET = createActionName('CONCAT_BASKET');
export const CONCAT_FAVORITES = createActionName('CONCAT_FAVORITES');
export const REMOVE_FROM_BASKET = createActionName('REMOVE_FROM_BASKET');
export const ADD_TO_FAVORITES = createActionName('ADD_TO_FAVORITES');
export const REMOVE_FROM_FAVORITES = createActionName('REMOVE_FROM_FAVORITES');


/* SELECTORS */

export const getBasket = ({ user }) => user.basket;

/* ACTIONS */

export const startUserRequest = () => ({ type: USER_REQUEST_START });
export const endUserRequest = () => ({ type: USER_REQUEST_END });
export const failUserRequest = () => ({ type: USER_REQUEST_FAIL });
export const addToBasket = (payload) => ({ type: ADD_TO_BASKET, payload });
export const removeFromBasket = (payload) => ({ type: REMOVE_FROM_BASKET, payload });
export const addToFavorites = (payload) => ({ type: ADD_TO_FAVORITES, payload });
export const removeFromFavorites = (payload) => ({ type: REMOVE_FROM_FAVORITES, payload });
export const concatBasket = (payload) => ({ type: CONCAT_BASKET, payload });
export const concatFavorites = (payload) => ({ type: CONCAT_FAVORITES, payload });

/* INITIAL STATE */

const initialState = {
  _id: null,
  name: '',
  basket: [],
  favorites: [],
  isLoading: true,
  avatar: ''
};

/* REDUCER */

export default function reducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {

  case USER_REQUEST_START:
    return { ...state, isLoading: true };

  case USER_REQUEST_END:
  case USER_REQUEST_FAIL:
    return { ...state, isLoading: false };

  case USER_LOADED:
  case ADD_TO_BASKET:
  case ADD_TO_FAVORITES:
  case REMOVE_FROM_BASKET:
  case REMOVE_FROM_FAVORITES:
    return {  ...payload , isLoading: false };

  case CONCAT_FAVORITES:
    localStorage.removeItem('localFavorites');
    return { ...payload, isLoading: false };

  case CONCAT_BASKET:
    localStorage.removeItem('localBasket');
    return { ...payload, isLoading: false };

  case AUTH_ERROR:
  case LOGOUT:
  case DELETE_ACCOUNT:
    return {
      _id: null,
      name: '',
      basket: [],
      favorites: [],
      isLoading: false,
      avatar: '',
      purchasedHistory: []
    };
  default:
    return state;
  }
}

/* THUNKS */

export const addToBasketRequest = productToBasket => async (dispatch, getState) => {
  dispatch(startUserRequest());

  // if not logined save in localStorage;

  if(!getState().auth.isAuthenticated) {
    const localBasket = localStorage.getItem('localBasket');
    if(localBasket) {
      let newLocalBasket;
      const localBas = JSON.parse(localBasket);

      if(localBas.some(e => e.productId === productToBasket.productId )) {  
        // if product is already in basket change it count
        newLocalBasket = localBas.map(e => {
          if(e.productId === productToBasket.productId) e.count = productToBasket.count;
          return e;
        });
      } else {
        newLocalBasket = [ ...localBas, productToBasket];
      }
    
      localStorage.setItem(
        'localBasket', 
        JSON.stringify(newLocalBasket)
      );

    } else {
      localStorage.setItem(
        'localBasket',
        JSON.stringify([ productToBasket ])
      );
    }
    dispatch(endUserRequest());

    return;
  }

  // if authorized! 


  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {

    const res = await axios.put(`${BASE_URL}/api/users/basket`, { productToBasket });
    dispatch(addToBasket(res.data));
    dispatch(endUserRequest());

  } catch (err) {
    dispatch(failUserRequest());
  }
};

export const removeFromBasketRequest = productId => async (dispatch, getState) => {
  dispatch(startUserRequest());

  // if not logined save in localStorage;
  if (!getState().auth.isAuthenticated) {

    // if not authorized 
    const localBasket = localStorage.getItem('localBasket');
    let newLocalBasket;
    const localBas = JSON.parse(localBasket);
      
    newLocalBasket = localBas.filter(e => e.productId !== productId);
    localStorage.setItem(
      'localBasket',
      JSON.stringify(newLocalBasket)
    );

    dispatch(endUserRequest());
    return;
  }

  // if authorized

  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {

    const res = await axios.delete(`${BASE_URL}/api/users/basket/${productId}`);
    console.log(res.data)
    dispatch(removeFromBasket(res.data));
    dispatch(endUserRequest());

  } catch (err) {
    dispatch(failUserRequest());
  }
};

export const addToFavoritesRequest = productId => async (dispatch, getState) => {
  dispatch(startUserRequest());

  // if not logined save in localStorage;

  if (!getState().auth.isAuthenticated) {
    const localFavorites = localStorage.getItem('localFavorites');
    if (localFavorites) {
      let newLocalFavorites;
      const localFav = JSON.parse(localFavorites);

      if (localFav.some( e =>  e === productId)) {
        // if products is already favorited, unlike it!
        newLocalFavorites = localFav.filter( e => e !== productId);
      } else {
        newLocalFavorites = [ ...localFav, productId ];
      }

      localStorage.setItem(
        'localFavorites',
        JSON.stringify(newLocalFavorites)
      );
      
    } else {
      localStorage.setItem(
        'localFavorites',
        JSON.stringify([productId])
      );
    }
    dispatch(endUserRequest());
    return;
  }

  // if authorized!


  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {

    const res = await axios.put(`${BASE_URL}/api/users/basket`, { productId });
    dispatch(addToFavorites(res.data));
    dispatch(endUserRequest());

  } catch (err) {
    dispatch(failUserRequest());
  }
};

export const removeFromFavoritesRequest = productId => async dispatch => {

  dispatch(startUserRequest());

  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {

    const res = await axios.delete(`${BASE_URL}/api/users/favorites/${productId}`);
    dispatch(removeFromFavorites(res.data));

  } catch (err) {
    dispatch(failUserRequest());
  }
};

export const concatBasketsRequest = () => async dispatch => {

  dispatch(startUserRequest());
  
  if (!localStorage.getItem('localBasket')) return dispatch(endUserRequest());
  const localBasket = [...JSON.parse(localStorage.getItem('localBasket'))];

  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {

    const res = await axios.put(`${BASE_URL}/api/users/basket/concat`, { localBasket });
    dispatch(concatBasket(res.data));

  } catch (err) {
    dispatch(failUserRequest());
  }
};

export const concatFavoritesRequest = () => async dispatch => {

  if (!localStorage.getItem('localFavorites')) return dispatch(endUserRequest());;

  const localFavorites = [...JSON.parse(localStorage.getItem('localFavorites'))];

  dispatch(startUserRequest());

  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {

    const res = await axios.put(`${BASE_URL}/api/users/basket/concat`, { localFavorites });
    dispatch(concatBasket(res.data));
    dispatch(endUserRequest());

  } catch (err) {
    dispatch(failUserRequest());
  }
};