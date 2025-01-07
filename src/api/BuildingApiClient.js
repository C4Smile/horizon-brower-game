// services
import { makeRequest } from "../db/services";

// base
import { BaseApiClient } from "./utils/BaseApiClient";

// utils
import { fromLocal } from "../utils/local";

// config
import config from "../config";

export const BuildingQueueActions = {
  Building: 0,
  Upgrading: 1,
  Downgrading: 2,
  Demolishing: 3,
};

export const BuildingQueueState = {
  Enqueued: 0,
  Started: 1,
  Cancelled: 2,
  Completed: 3,
  Failed: 4,
};

export const BuildingState = {
  Constructing: 0,
  Working: 1,
  Demolished: 2,
  Inactive: 3,
};

/**
 * @class BuildingApiClient
 * @description BuildingApiClient
 */
export class BuildingApiClient extends BaseApiClient {
  /**
   * create base api client
   */
  constructor() {
    super();
    this.baseUrl = "buildings";
  }

  async getMyBuildings(userId) {
    const { data, error, status } = await makeRequest(`${this.baseUrl}/player/${userId}`, "GET", null, {
      Authorization: "Bearer " + fromLocal(config.user, "object")?.token,
    });
    if (error !== null) return { status, error: { message: error.message } };

    return data;
  }

  async getMyQueue(userId) {
    const { data, error, status } = await makeRequest(
      `${this.baseUrl}/queue/player/${userId}`,
      "GET",
      null,
      {
        Authorization: "Bearer " + fromLocal(config.user, "object")?.token,
      },
    );
    if (error !== null) return { status, error: { message: error.message } };

    return data;
  }

  async enqueue(dto) {
    const { data, error, status } = await makeRequest(`${this.baseUrl}/enqueue`, "POST", dto, {
      Authorization: "Bearer " + fromLocal(config.user, "object")?.token,
    });

    return { data, error, status };
  }
}
