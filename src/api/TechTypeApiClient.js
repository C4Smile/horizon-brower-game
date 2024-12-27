// base
import { BaseApiClient } from "./utils/BaseApiClient";

/**
 * @class TechTypeApiClient
 * @description TechTypeApiClient
 */
export class TechTypeApiClient extends BaseApiClient {
  /**
   * create base api client
   */
  constructor() {
    super();
    this.baseUrl = "techTypes";
  }
}
