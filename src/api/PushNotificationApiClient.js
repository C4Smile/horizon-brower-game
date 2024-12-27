// base
import { BaseApiClient } from "./utils/BaseApiClient";

/**
 * @class PushNotificationApiClient
 * @description PushNotificationApiClient
 */
export class PushNotificationApiClient extends BaseApiClient {
  /**
   * create base api client
   */
  constructor() {
    super();
    this.baseUrl = "pushNotification";
  }
}
