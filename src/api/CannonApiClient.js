
// base
import { BaseApiClient } from "./utils/BaseApiClient";

/**
 * @class CannonApiClient
 * @description CannonApiClient
 */
export class CannonApiClient extends BaseApiClient {

  /**
   * create base api client
   */
  constructor() {
    super();
    this.baseUrl = "cannons";
  }
}
