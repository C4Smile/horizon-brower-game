// base
import { BaseApiClient } from "./utils/BaseApiClient";

/**
 * @class ShipApiClient
 * @description ShipApiClient
 */
export class ShipApiClient extends BaseApiClient {

  /**
   * create base api client
   */
  constructor() {
    super();
    this.baseUrl = "ships";
  }
}
