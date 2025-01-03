import config from "../config.js";

/**
 *
 * @param {string} string - string
 * @returns {string} static url photo
 */
export const staticUrlPhoto = (string) => `${config.apiUrl}public/images/${string}`;