/* eslint-disable no-use-before-define */
// @ts-check

import config from "../config";
import { validateBasicKey } from "../services/auth";

// @ts-ignore
import {
  deleteCookie,
  getCookie,
} from "some-javascript-utils/browser";

export const fromLocal = () => {
  const user = {};
  user.user = localStorage.getItem(config.user);
  user.nick = localStorage.getItem(config.userNick);
  user.nation = localStorage.getItem(config.userNation);
  user.photo = localStorage.getItem(config.userPhoto);
  return user;
};

export const getUserName = () => {
  let name = "";

  // @ts-ignore
  const local = localStorage.getItem(config.user);

  name = local !== null ? local : "";
  if (!name) {
    // @ts-ignore
    const session = sessionStorage.getItem(config.user);
    name = session !== null ? session : "";
  }
  return name;
};

export const isAdmin = async () => {
  const value = await validateBasicKey("admin");
  if (value) return true;
  return false;
};

/**
 * If the user is logged in, return true, otherwise return false.
 */
export const userLogged = () =>
  // @ts-ignore
  getCookie(config.basicKey).length > 0;

export const logoutUser = () => {
  // @ts-ignore
  deleteCookie(config.basicKey);
  localStorage.removeItem(config.user);
  localStorage.removeItem(config.userNick);
  localStorage.removeItem(config.userNation);
  localStorage.removeItem(config.userPhoto);
};

/**
 * If remember is true, it stores user data to localStorage, otherwise it stores it in sessionStorage
 * @param {boolean} remember - a boolean value that determines whether the user should be remembered or not.
 * @param {object} data - The user object that you want to store in the browser.
 */
export const logUser = (remember, data) => {
  if (data.user) localStorage.setItem(config.user, data.user);
  if (data.nick) localStorage.setItem(config.userNick, data.nick);
  if (data.nation) localStorage.setItem(config.userNation, data.nation);
  if (data.photo) localStorage.setItem(config.userPhoto, data.photo);
};
