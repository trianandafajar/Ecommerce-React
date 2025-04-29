import { USER_LOGIN, USER_LOGOUT } from "./constants";

const initialState = {
  user: null,
  token: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        user: action.user,
        token: action.token,
      };

    case USER_LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
      };

    default:
      return state;
  }
}
