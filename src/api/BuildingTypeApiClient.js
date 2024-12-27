// base
import { BaseApiClient } from "./utils/BaseApiClient";


/**
 * @class BuildingTypeApiClient
 * @description BuildingTypeApiClient
 */
export class BuildingTypeApiClient extends BaseApiClient {
  /**
   * create base api client
   */
  constructor() {
    super();
    this.baseUrl = "buildingTypes";
  }
}
