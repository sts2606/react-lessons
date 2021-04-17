import { stopSubmit } from 'redux-form';
import { authAPI } from '../../api/api';

const SET_USER_DATA = 'SET_USER_DATA';

let initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

const setUserData = (userId, email, login, isAuth) => {
  return { type: SET_USER_DATA, payload: { userId, email, login, isAuth } };
};

export const setUser = () => {
  return (dispatch) => {
    return authAPI.me().then((res) => {
      if (res.data.resultCode === 0) {
        let { id, login, email } = res.data.data;
        dispatch(setUserData(id, email, login, true));
      }
    });
  };
};

export const login = (email, password, rememberMe) => {
  return async (dispatch) => {
    const res = await authAPI.login(email, password, rememberMe);
    if (res.data.resultCode === 0) {
      dispatch(setUser());
    } else {
      let message =
        res.data.messages.length > 0 ? res.data.messages[0] : 'Some error';
      let action = stopSubmit('login', { _error: message });
      dispatch(action);
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    const res = await authAPI.logout();
    if (res.data.resultCode === 0) {
      dispatch(setUserData(null, null, null, false));
    }
  };
};

export default authReducer;
