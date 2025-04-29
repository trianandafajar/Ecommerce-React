// (1) import constants
import { USER_LOGIN, USER_LOGOUT } from "./constants";

// (2) action untuk login user
export function userLogin(user, token) {
  return {
    type: USER_LOGIN,
    user,
    token,
  };
}

// (3) action untuk logout user
export function userLogout() {
  return {
    type: USER_LOGOUT,
  };
}
