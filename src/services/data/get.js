// @ts-check

import axios from "axios";

// headers
import { getAuth } from "../../auth/auth";

// config
import config from "../../config";

// cookies
import { getCookie } from "../../utils/functions";

/**
 *
 * @param {string} user
 * @returns
 */
export const getNations = async (user) => {
  const response = await axios.get(`${config.apiUrl}production/fetch-nations`, {
    headers: {
      ...getAuth,
      Authorization: `Bearer ${getCookie(config.basicKey)}`,
    },
  });
  const data = await response.data;
  return data;
};
