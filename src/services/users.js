import axios from "axios";

import md5 from "md5";

// auth
import { getAuth } from "../auth/auth";

// utils
import { getUserName } from "../utils/auth";

// config
import config from "../config";

/**
 * Takes a user object and sends it to the backend to be authenticated
 * @param {string} users
 * @param {string} password
 * @param {string} email
 * @returns The response from the server.
 */
export const signUp = async (user, email, password) => {
  const response = await axios.post(
    // @ts-ignore
    `${config.apiUrl}users/save`,
    { user, data: { user, pw: md5(password), email } },
    {
      headers: getAuth,
    }
  );
  const data = await response.data;
  return data;
};

/**
 *
 * @param {string} nation
 * @returns
 */
export const saveNation = async (nation) => {
  const response = await axios.post(
    // @ts-ignore
    `${config.apiUrl}users/select-nation`,
    { user: getUserName(), nation },
    {
      headers: getAuth,
    }
  );
  const data = await response.data;
  return data;
};

/**
 *
 * @param {string} nick
 * @returns
 */
export const saveNick = async (nick) => {
  const response = await axios.post(
    // @ts-ignore
    `${config.apiUrl}users/set-nick`,
    { user: getUserName(), nick },
    {
      headers: getAuth,
    }
  );
  const data = await response.data;
  return data;
};
