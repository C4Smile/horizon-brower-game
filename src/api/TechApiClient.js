// base
import { BaseApiClient } from "./utils/BaseApiClient";

/*
 * @class TechApiClient
 * @description TechApiClient
 */
export class TechApiClient extends BaseApiClient {

  /**
   * create base api client
   */
  constructor() {
    super();
    this.baseUrl = "techs";
  }
}
