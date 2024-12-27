// services
import { makeRequest } from "../db/services";

// utils
import { fromLocal, toLocal } from "../utils/local";

// config
import config from "../config.js";

export class GameBasicsApiClient {
  constructor() {

  }

  /**
   * @description Get game data
   * @returns {Promise<object[]> | object} Result list
   */
  async gameData() {
    const { data, error, status } = await makeRequest(
      `game?hash=${fromLocal(config.hash) ?? ""}`
    );
    if (error !== null) return { status, error: { message: error.message } };

    // saving game data
    toLocal(config.hash, data);
    return data;
  }
}