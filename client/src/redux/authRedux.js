import axios from 'axios';
import { BASE_URL } from '../config/config';
import setAuthToken from '../utils/setAuthToken';
import config from '../utils/axiosConfig';
import { setAlert } from './alertsRedux';

const reducerName = 'auth';

// action name creator
const createActionName = name => `app/${reducerName}/${name}`;

export const USER_LOADED = createActionName('USER_LOADED');
export const AUTH_ERROR = createActionName('AUTH_ERROR');
export const REGISTER_SUCCESS = createActionName('REGISTER_SUCCESS');
export const LOGIN_SUCCESS = createActionName('LOGIN_SUCCESS');
export const REGISTER_FAIL = createActionName('REGISTER_FAIL');
export const LOGIN_FAIL = createActionName('LOGIN_FAIL');
export const LOGOUT = createActionName('LOGOUT');
export const DELETE_ACCOUNT = createActionName('DELETE_ACCOUNT');

/* SELECTORS */

export const getAuth = ({ auth }) => auth;

/* ACTIONS */

export const loadUser = (payload) => ({ type: USER_LOADED, payload });
export const registerSuccess = (payload) => ({ type: REGISTER_SUCCESS, payload });
export const loginSuccess = (payload) => ({ type: LOGIN_SUCCESS, payload  });
export const registerFail = () => ({ type: REGISTER_FAIL });
export const loginFail = () => ({ type: LOGIN_FAIL });
export const logout = () => ({ type: LOGOUT });
export const deleteAccount = () => ({ type: DELETE_ACCOUNT });
export const authError = () => ({ type: AUTH_ERROR });

/* INITIAL STATE */

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  token: localStorage.getItem('token'),
  user: null
};

/* REDUCER */

export default function reducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {

  case USER_LOADED:
    return { ...state, isLoading: false, user: payload, isAuthenticated: true }; 
  
  case REGISTER_SUCCESS:
  case LOGIN_SUCCESS:
    localStorage.setItem('token', payload);
    return { ...state, isLoading: false, isAuthenticated: true };

  case AUTH_ERROR:
  case REGISTER_FAIL:
  case LOGIN_FAIL:
  case LOGOUT:
  case DELETE_ACCOUNT:
    localStorage.removeItem('token');
    return {
      ...state,
      user: null,
      isLoading: false,
      isAuthenticated: false
    };
  default:
    return state;
  }
}

/* THUNKS */

export const loadUserRequest = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {

    const res = await axios.get(`${BASE_URL}/api/auth`);
    dispatch(loadUser(res.data));

  } catch (err) {
    dispatch(authError());
  }
};

export const loginUserRequest = formData => async dispatch => {
  const body = JSON.stringify(formData);

  try {

    const res = await axios.post(`${BASE_URL}/api/auth`, body, config);
    dispatch(loginSuccess(res.data.token));
    dispatch(loadUserRequest());
    dispatch(setAlert('Login Success', 'success'));

  } catch (err) {
    dispatch(loginFail());
    dispatch(setAlert('Login Success', 'danger'));
    // tu na tablicy z bleadami wykonać
  }
};

export const registerUserRequest = formData => async dispatch => {
  const body = JSON.stringify(formData);

  try {
    const res = await axios.post(`${BASE_URL}/api/users`, body, config);
    dispatch(registerSuccess(res.data.token));

    dispatch(loadUserRequest());
    dispatch(setAlert('Account created!', 'success'));

  } catch (error) {
    dispatch(registerFail());
  }

};

export const deleteAccountRequest = () => async dispatch => {

  try {
    await axios.post(`${BASE_URL}/api/users`, {}, config);
    dispatch(setAlert('Account deleted', 'success'));

  } catch (error) {
    dispatch(authError());
  }
};