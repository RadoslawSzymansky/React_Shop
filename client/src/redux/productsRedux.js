import axios from 'axios';
import { BASE_URL } from '../config/config';
import isEmpty from '../utils/isEmpty';

const reducerName = 'products';

// action name creator
const createActionName = name => `app/${reducerName}/${name}`;

export const START_PRODUCT_REQUEST = createActionName('START_PRODUCT_REQUEST');
export const START_PRODUCTS_REQUEST = createActionName('START_PRODUCTS_REQUEST');
export const LOAD_PRODUCTS = createActionName('LOAD_PRODUCTS');
export const LOAD_PRODUCTS_PER_PAGE = createActionName('LOAD_PRODUCTS_PER_PAGE');
export const LOAD_SINGLE_PRODUCT = createActionName('LOAD_SINGLE_PRODUCT');
export const LOAD_SINGLE_TO_BASKET = createActionName('LOAD_SINGLE_TO_BASKET');
export const LOAD_PRODUCTS_ERROR = createActionName('LOAD_PRODUCTS_ERROR');
export const LOAD_PRODUCT_ERROR = createActionName('LOAD_PRODUCT_ERROR');
export const END_PRODUCT_REQUEST = createActionName('END_PRODUCT_REQUEST');
export const END_PRODUCTS_REQUEST = createActionName('END_PRODUCTS_REQUEST');
export const ADD_DISCOUNT_CODES = createActionName('ADD_DISCOUNT_CODES');

/* SELECTORS */

export const getProducts = ({ products }) => products.products;
export const getSingleProduct = ({ products }) => products.singleProduct;
export const getProductsRequest = ({ products }) => products.productsRequest;
export const getSingleProductRequest = ({ products }) => products.singleProductRequest;
export const getPages = ({ products }) => Math.ceil(products.amount / products.productsPerPage);
export const getProductsCount = ({ products }) => products.products.length;
export const getBasketProducts = ({ basketProducts }) => basketProducts;

/* ACTIONS */

export const startProductsRequest = () => ({ type: START_PRODUCTS_REQUEST });
export const startSingleProductRequest = () => ({ type: START_PRODUCT_REQUEST });
export const loadProducts = (payload) => ({ type: LOAD_PRODUCTS, payload });
export const loadProductsPerPage = (payload) => ({ type: LOAD_PRODUCTS_PER_PAGE, payload });
export const loadSingleProduct = (payload) => ({ type: LOAD_SINGLE_PRODUCT, payload });
export const loadSingleToBasket = (payload) => ({ type: LOAD_SINGLE_TO_BASKET, payload });
export const loadSingleProductError = (payload) => ({ type: LOAD_PRODUCT_ERROR, payload });
export const loadProductsError = (payload) => ({ type: LOAD_PRODUCTS_ERROR, payload });
export const endProductsRequest = () => ({ type: END_PRODUCTS_REQUEST });
export const endProductRequest = () => ({ type: END_PRODUCT_REQUEST });
export const addDiscountsCodes = (payload) => ({ type: ADD_DISCOUNT_CODES, payload});

/* INITIAL STATE */

const initialState = {
  products: [],
  singleProduct: null,
  productsRequest: {
    pending: false,
    error: null,
    success: null,
  },
  singleProductRequest: {
    pending: false,
    error: null,
    success: null,
  },
  amount: 0,
  productsPerPage: 10,
  presentPage: 0,
  sort: {},
  basketProducts: {},
  discountCodes: []
};

/* REDUCER */

export default function reducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {

  case LOAD_PRODUCTS:
    return { ...state,products: payload };

  case LOAD_PRODUCTS_PER_PAGE: 
    return {
      ...state,
      products: [ ...payload.products ],
      amount: payload.amount,
      productsPerPage: payload.productsPerPage,
      presentPage: payload.presentPage,
      sort: payload.sort
    };

  case LOAD_SINGLE_PRODUCT:
    return { ...state, singleProduct: payload };

  case LOAD_SINGLE_TO_BASKET:
    return { ...state, basketProducts: { ...state.basketProducts, [payload._id]: payload } };

  case ADD_DISCOUNT_CODES: 
    return { ...state, discountCodes: payload };

  case START_PRODUCTS_REQUEST:
    return { ...state, productsRequest: { pending: true, error: null, success: null }};    

  case START_PRODUCT_REQUEST:
    return { ...state, singleProductRequest: { pending: true, error: null, success: null }}; 

  case END_PRODUCTS_REQUEST: 
    return { ...state, productsRequest: { pending: false, error: null, success: true }};    

  case END_PRODUCT_REQUEST:
    return { ...state, singleProductRequest: { pending: false, error: null, success: true }}; 

  case LOAD_PRODUCTS_ERROR:
    return { ...state, productsRequest: { pending: false, error: payload, success: false } };

  case LOAD_PRODUCT_ERROR:
    return { ...state, singleProductRequest: { pending: false, error: payload, success: false } };   

  default:
    return state;
  }
}

/* THUNKS */

export const fetchProductsRequest = () => async dispatch => {
  dispatch(startProductsRequest());

  try {
    const res = await axios.get(`${BASE_URL}/api/products`);
    dispatch(loadProducts(res.data));
    dispatch(endProductsRequest());
  } catch (error) {
    console.log(error);
    dispatch(loadProductsError(error));
  }
};

export const fetchProductsByPage = (page, productsPerPage, sort) => async (dispatch, getState) => {
  dispatch(startProductsRequest());
 
  try {
    const limit = productsPerPage || 10;
    const startAt = (page - 1) * limit;

    let name, price;
    if (!isEmpty(sort)) {
      name = sort.name;
      price = sort.price;
    } else {
      name = getState().products.sort.name;
      price = getState().products.sort.price;      
    }

    dispatch(startProductsRequest());

    const res = await axios.
      get(`
      ${BASE_URL}/api/products/range/sort/?limit=${limit}&startAt=${startAt}
      ${name ? `&name=${name}` : ''}${price ? `&price=${price}` : ''}   
      `);
    // eslint-disable-next-line require-atomic-updates
    if (isEmpty(sort)) sort = getState().products.sort;

    const payload = {
      products: res.data.products,
      amount: res.data.amount,
      productsPerPage: limit,
      presentPage: page,
      sort: sort
    };

    dispatch(loadProductsPerPage(payload));
    dispatch(endProductsRequest());
  } catch (error) {
    console.log(error);
    dispatch(loadProductsError(error));
  }
};

export const fetchSingleProductRequest = id => async dispatch => {
  dispatch(startSingleProductRequest());

  try {
    const res = await axios.get(`${BASE_URL}/api/products/${id}`);
    dispatch(loadSingleProduct(res.data));
    dispatch(endProductRequest());
  } catch (error) {
    console.log(error);
    dispatch(loadSingleProductError(error));
  }
};

export const fetchSingleToBasketRequest = id => async dispatch => {
  dispatch(startSingleProductRequest());

  try {
    const res = await axios.get(`${BASE_URL}/api/products/${id}`);
    dispatch(loadSingleToBasket(res.data));
    dispatch(endProductRequest());
  } catch (error) {
    console.log(error);
    dispatch(loadSingleProductError(error));
  }
};


export const fetchDiscountCodesRequest = () => async dispatch => {

  try {
    const res = await axios.get(`${BASE_URL}/api/products/codes`);
    console.log(res)
    dispatch(addDiscountsCodes(res.data));
  } catch (error) {
    console.log(error);
    dispatch(loadSingleProductError(error));
  }
};