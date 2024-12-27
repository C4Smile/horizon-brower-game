// base
import { BaseApiClient } from "./utils/BaseApiClient";

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
}
