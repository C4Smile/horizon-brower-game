import axios from "axios";
import { getAuth } from "../auth/auth";
import config from "../config";
import { getUserLanguage } from "some-javascript-utils/browser";

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
