// base
import { BaseApiClient } from "./utils/BaseApiClient";

export const Role = {
  administrator: 1,
  player: 2,
};

/**
 * @class RoleApiClient
 * @description RoleApiClient
 */
export class RoleApiClient extends BaseApiClient {
  /**
   * create base api client
   */
  constructor() {
    super();
    this.baseUrl = "horizonRole";
  }
}
