// services
import { makeRequest } from "../../db/services";

// utils
import { fromLocal } from "../../utils/local";

// config
import config from "../../config";

/**
 * @class BaseManyApiClient
 * @description BaseManyApiClient
 */
export class BaseManyApiClient {
  baseUrl = "";
  idAttribute = "";
  idsAttribute = "";

  /**
   *
   * @param {string} baseUrl string url
   * @param {string} idAttribute id url
   * @param {string} idsAttribute ids url
   */
  constructor(baseUrl, idAttribute, idsAttribute) {
    this.baseUrl = baseUrl;
    this.idAttribute = idAttribute;
    this.idsAttribute = idsAttribute;
  }

  /**
   * @param {number} entityId id of the entity
   * @returns many relationships
   */
  async get(entityId) {
    // call service
    const { error, data, status } = await makeRequest(`${this.baseUrl}/${entityId}`, "GET", null, {
      Authorization: "Bearer " + fromLocal(config.user, "object")?.token,
    });

    return { error, items: data, status: status === 204 ? 201 : status };
  }
}
