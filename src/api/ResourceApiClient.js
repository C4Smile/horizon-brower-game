// services
import { makeRequest } from "../db/services";

// base
import { BaseApiClient } from "./utils/BaseApiClient";

// utils
import { fromLocal } from "../utils/local";

// config
import config from "../config.js";

/**
 * @class ResourceApiClient
 * @description ResourceApiClient
 */
export class ResourceApiClient extends BaseApiClient {
  gameResources = null;
  playerResources = null;

  /**
   * create base api client
   */
  constructor() {
    super();
    this.baseUrl = "resources";
  }

  async geyMyResources(userId) {
    const { data, error, status } = await makeRequest(`resources/${userId}`, "GET", null, {
      Authorization: "Bearer " + fromLocal(config.user, "object")?.token,
    });
    if (error !== null) return { status, error: { message: error.message } };

    return data;
  }
}
