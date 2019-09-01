import uuid from 'uuid';

const reducerName = 'alerts';

// action name creator
const createActionName = name => `app/${reducerName}/${name}`;

export const SET_ALERT = createActionName('SET_ALERT');
export const REMOVE_ALERT = createActionName('REMOVE_ALERT');

/* SELECTORS */

export const getProducts = ({ alerts }) => alerts;

/* ACTIONS */

export const setAlert = (msg, alertType, timeout = 2500) => dispatch => {
  const id = uuid.v4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }
  });
  setTimeout(() => dispatch({
    type: REMOVE_ALERT,
    payload: id
  }), timeout);
};

/* INITIAL STATE */

const initialState = [];

/* REDUCER */

export default function reducer (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
  case SET_ALERT:
    return [...state, payload];
  case REMOVE_ALERT:
    return state.filter(alert => alert.id !== payload);
  default:
    return state;
  }
}
