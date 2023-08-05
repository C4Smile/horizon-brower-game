import axios from "axios";
import { getAuth } from "../auth/auth";
import config from "../config";

import md5 from "md5";

/**
 * Takes a user object and sends it to the backend to be authenticated
 * @param {string} users
 * @param {string} name
 * @param {string} password
 * @param {string} ci
 * @param {string} fvCI - the user password
 * @param {string} email
 * @returns The response from the server.
 */
export const signUp = async (user, name, ci, fvCI, email, password) => {
  const response = await axios.post(
    // @ts-ignore
    `${config.apiUrl}users/save`,
    { user, data: { user, pw: md5(password), name, ci, fvCI, email } },
    {
      headers: getAuth,
    }
  );
  const data = await response.data;
  return data;
};
