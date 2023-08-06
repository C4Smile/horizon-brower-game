import axios from "axios";

// utils
import { getUserLanguage } from "some-javascript-utils/browser";

// auth
import { getAuth } from "../auth/auth";

// config
import config from "../config";

/**
 *
 * @returns
 */
export const nations = async () => {
  const response = await axios.get(
    // @ts-ignore
    `${config.apiUrl}nations/all?lang=${getUserLanguage()}`,
    {
      headers: {
        ...getAuth,
      },
    }
  );
  const data = await response.data;
  return data;
};
