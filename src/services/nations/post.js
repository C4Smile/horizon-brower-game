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
export const getUserData = async (user) => {
  const response = await axios.post(
    `${config.apiUrl}user/get`,
    {
      id: user,
      attributes: ["nick", "nation"],
    },
    {
      headers: {
        ...getAuth,
        Authorization: `Bearer ${getCookie(config.basicKey)}`,
      },
    }
  );
  const data = await response.data;
  return data;
};

/**
 *
 * @param {string} user
 * @returns
 */
export const getUserResources = async (user) => {
  const response = await axios.post(
    `${config.apiUrl}user/get`,
    {
      id: user,
      attributes: ["resources", "lastOnline"],
    },
    {
      headers: {
        ...getAuth,
        Authorization: `Bearer ${getCookie(config.basicKey)}`,
      },
    }
  );
  const data = await response.data;
  return data;
};
