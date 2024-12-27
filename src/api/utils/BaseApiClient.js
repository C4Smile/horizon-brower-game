// services
import { makeRequest } from "../../db/services";

// utils
import { fromLocal } from "../../utils/local";

// config
import config from "../../config";

/**
 * @class BaseApiClient
 * @description it has all base method
 */
export class BaseApiClient {
  baseUrl = "";

  /**
   * @description Get all objects
   * @param {object} query - query parameters
   * @returns {Promise<object[]> | object} Result list
   */
  async getAll(query = { sortingBy: "id", sortingOrder: "asc", currentPage: 0, pageSize: 50 }) {
    const { sortingBy, sortingOrder, currentPage, pageSize } = query;
    const { data, error, status } = await makeRequest(
      `${this.baseUrl}?sort=${sortingBy}&order=${sortingOrder}&page=${currentPage}&count=${pageSize}`,
    );
    if (error !== null) return { status, error: { message: error.message } };
    return data;
  }

  /**
   * @description Get entity by id
   * @param {string} id - object id
   * @returns {Promise<object>} object
   */
  async getById(id) {
    const { data, error, status } = await makeRequest(`${this.baseUrl}/${id}`, "GET", null, {
      Authorization: "Bearer " + fromLocal(config.user, "object")?.token,
    });
    if (error !== null) return { status, error: { message: error.message } };
    return data[0];
  }
}
