import axios from 'axios';
import { BASE_URL } from '../config/config';
import setAuthToken from '../utils/setAuthToken';
import { setAlert } from './alertsRedux';
import history from '../utils/history';

const reducerName = 'user';

// action name creator
const createActionName = (name) => `app/${reducerName}/${name}`;

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
export const ADD_DISCOUNT_CODE = createActionName('ADD_DISCOUNT_CODE');
export const LOAD_BASKET_VALUE = createActionName('LOAD_BASKET_VALUE');
export const BUY_PRODUCTS = createActionName('BUY_PRODUCTS');
export const GET_PURCHASED_PRODUCTS = createActionName('GET_PURCHASED_PRODUCTS');


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
export const setBasketValue = (payload) => ({ type: LOAD_BASKET_VALUE, payload });
export const buyProducts = (payload) => ({ type: BUY_PRODUCTS, payload });
export const getPurchasedProducts = (payload) => ({ type: GET_PURCHASED_PRODUCTS, payload });

/* INITIAL STATE */

const initialState = {
  _id: null,
  name: '',
  basket: [],
  favorites: [],
  isLoading: true,
  avatar: '',
  code: null,
  basketValue: 0,
  purchasedProducts: [],
  purchasedHistory: [],
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
  case BUY_PRODUCTS:
    return { ...state, ...payload, isLoading: false };

  case CONCAT_FAVORITES:
    localStorage.removeItem('localFavorites');
    return { ...state, ...payload, isLoading: false };

  case CONCAT_BASKET:
    localStorage.removeItem('localBasket');
    return { ...state, ...payload, isLoading: false };

  case GET_PURCHASED_PRODUCTS:
    return { ...state, purchasedProducts: payload };

  case ADD_DISCOUNT_CODE:
    return { ...state, code: payload };

  case LOAD_BASKET_VALUE:
    return { ...state, basketValue: payload };

  case AUTH_ERROR:
  case LOGOUT:
  case DELETE_ACCOUNT:
    return {
      ...state,
      _id: null,
      name: '',
      basket: [],
      favorites: [],
      isLoading: false,
      avatar: '',
      purchasedHistory: [],
    };
  default:
    return state;
  }
}

/* THUNKS */

export const getBasketValue = () => (dispatch, getState) => {
  const { discountCodes } = getState().products;
  const { code: userCode } = getState().user;
  let totalPrice = 0;

  let basket;

  if (!getState().auth.isAuthenticated) {
    basket = JSON.parse(localStorage.getItem('localBasket')) || [];
  } else {
    basket = getState().user.basket || [];
  }

  basket.forEach((prod) => {
    if (!prod.avaibleDiscounts) {
      totalPrice += prod.count * prod.price;
      return;
    }

    if (prod.avaibleDiscounts.length && userCode) {
      let discountsPercentage = 0;
      prod.avaibleDiscounts.forEach((discount) => {
        discountCodes.forEach((code) => {
          if (code.name === discount && userCode.name === discount) {
            discountsPercentage = code.discountPercent;
          }
        });
      });
      totalPrice += prod.count * (prod.price - (prod.price * (discountsPercentage / 100)));
    } else {
      totalPrice += prod.count * prod.price;
    }
  });
  dispatch(setBasketValue(totalPrice));
};

export const addToBasketRequest = (productToBasket) => async (dispatch, getState) => {
  dispatch(startUserRequest());

  // if not logined save in localStorage;

  if (!getState().auth.isAuthenticated) {
    const localBasket = localStorage.getItem('localBasket');
    if (localBasket) {
      let newLocalBasket;
      const localBas = JSON.parse(localBasket);

      if (localBas.some((e) => e.productId === productToBasket.productId)) {
        // if product is already in basket change it count
        newLocalBasket = localBas.map((e) => {
          if (e.productId === productToBasket.productId) e.count = productToBasket.count;
          return e;
        });
      } else {
        newLocalBasket = [...localBas, productToBasket];
      }

      localStorage.setItem(
        'localBasket',
        JSON.stringify(newLocalBasket),
      );
    } else {
      localStorage.setItem(
        'localBasket',
        JSON.stringify([productToBasket]),
      );
    }


    if (!getState().user.basket.some((e) => e.productId === productToBasket.productId)) {
      dispatch(setAlert('Product count updated', 'success', 1000));
    }

    dispatch(getBasketValue());
    dispatch(endUserRequest());
    return;
  }

  // if authorized!

  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.put(`${BASE_URL}/api/users/basket`, { productToBasket });

    if (!getState().user.basket.some((e) => e.productId === productToBasket.productId)) {
      dispatch(setAlert('Product added to basket', 'success', 1000));
    }

    dispatch(addToBasket(res.data));
    dispatch(endUserRequest());
    dispatch(getBasketValue());
  } catch (err) {
    dispatch(failUserRequest());
  }
};

export const removeFromBasketRequest = (productId) => async (dispatch, getState) => {
  dispatch(startUserRequest());

  // if not logined save in localStorage;
  if (!getState().auth.isAuthenticated) {
    // if not authorized
    const localBasket = localStorage.getItem('localBasket');
    const localBas = JSON.parse(localBasket);

    const newLocalBasket = localBas.filter((e) => e.productId !== productId);
    localStorage.setItem(
      'localBasket',
      JSON.stringify(newLocalBasket),
    );

    dispatch(endUserRequest());
    dispatch(getBasketValue());
    dispatch(setAlert('Product removed from', 'success', 1500));

    return;
  }

  // if authorized

  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.delete(`${BASE_URL}/api/users/basket/${productId}`);
    dispatch(removeFromBasket(res.data));
    dispatch(endUserRequest());
    dispatch(getBasketValue());
  } catch (err) {
    dispatch(failUserRequest());
  }
};

export const addToFavoritesRequest = (productId) => async (dispatch, getState) => {
  dispatch(startUserRequest());

  // if not logined save in localStorage;
  if (!getState().auth.isAuthenticated) {
    const localFavorites = localStorage.getItem('localFavorites');
    if (localFavorites) {
      const localFav = JSON.parse(localFavorites);
      const newLocalFavorites = [...localFav, productId];

      localStorage.setItem(
        'localFavorites',
        JSON.stringify(newLocalFavorites),
      );
    } else {
      localStorage.setItem(
        'localFavorites',
        JSON.stringify([productId]),
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
    const res = await axios.put(`${BASE_URL}/api/users/favorites/${productId}`);
    dispatch(addToFavorites(res.data));
    dispatch(endUserRequest());
  } catch (err) {
    dispatch(failUserRequest());
  }
};

export const removeFromFavoritesRequest = (productId) => async (dispatch, getState) => {
  dispatch(startUserRequest());

  // if not logined save in localStorage;
  if (!getState().auth.isAuthenticated) {
    const localFavorites = localStorage.getItem('localFavorites');
    if (localFavorites) {
      const localFav = JSON.parse(localFavorites);

      const newLocalFavorites = localFav.filter((e) => e !== productId);

      localStorage.setItem(
        'localFavorites',
        JSON.stringify(newLocalFavorites),
      );
    }
    dispatch(endUserRequest());
  }

  // if authorized!

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

export const concatBasketsRequest = () => async (dispatch) => {
  dispatch(startUserRequest());

  if (!localStorage.getItem('localBasket')) return dispatch(endUserRequest());
  const localBasket = [...JSON.parse(localStorage.getItem('localBasket'))];

  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.put(`${BASE_URL}/api/users/basket/concat`, { localBasket });
    dispatch(concatBasket(res.data));
    dispatch(getBasketValue());
    return dispatch(endUserRequest());
  } catch (err) {
    return dispatch(failUserRequest());
  }
};

export const concatFavoritesRequest = () => async (dispatch) => {
  if (!localStorage.getItem('localFavorites')) return dispatch(endUserRequest());

  const localFavorites = [...JSON.parse(localStorage.getItem('localFavorites'))];

  dispatch(startUserRequest());

  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.put(`${BASE_URL}/api/users/favorites/concat`, { localFavorites });
    dispatch(concatFavorites(res.data));
    return dispatch(endUserRequest());
  } catch (err) {
    return dispatch(failUserRequest());
  }
};

export const addDiscountCode = (code) => (dispatch, getState) => {
  const { discountCodes } = getState().products;
  if (discountCodes.some((e) => e.name === code)) {
    discountCodes.forEach((e) => {
      if (e.name === code) dispatch({ type: ADD_DISCOUNT_CODE, payload: e });
    });
    if (getState().user.code === null) {
      dispatch(setAlert(`Discount code: ${code} added!`, 'success'));
      dispatch(getBasketValue());
    } else {
      dispatch(setAlert(`Discount code updated to ${code}!`, 'success'));
      dispatch(getBasketValue());
    }
  } else {
    dispatch(setAlert('This code is not working!', 'warning'));
  }
};


export const buyProductsRequest = () => async (dispatch) => {
  dispatch(startUserRequest());
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.patch(`${BASE_URL}/api/users/basket/buy`);
    history.push('/user-panel');
    dispatch(endUserRequest());
    dispatch(buyProducts(res.data));
    dispatch(setAlert('Congratulation, you successfully bought products! Check your shop history in User Panel'));

    setTimeout(() => {
      history.push('/');
      history.goBack();
    }, 300);
  } catch (error) {
    dispatch(failUserRequest());
  }
};

export const deleteUserRequest = () => async (dispatch) => {
  dispatch(startUserRequest());
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.patch(`${BASE_URL}/api/users/basket/buy`);
    history.push('/user-panel');

    dispatch(endUserRequest());
    dispatch(buyProducts(res.data));
    dispatch(setAlert('Congratulation, you successfully bought products! Check your shop history in User Panel'));

    setTimeout(() => {
      history.push('/');
      history.goBack();
    }, 300);
  } catch (error) {
    dispatch(failUserRequest());
  }
};

export const getPurchasedProductsRequest = () => async (dispatch) => {
  dispatch(startUserRequest());

  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(`${BASE_URL}/api/users/history/all`);
    dispatch(getPurchasedProducts(res.data));
    dispatch(endUserRequest());
  } catch (error) {
    dispatch(failUserRequest());
  }
};
