// base
import { BaseApiClient } from "./utils/BaseApiClient";

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
}
