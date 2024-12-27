// base
import { BaseApiClient } from "./utils/BaseApiClient";

/**
 * @class SkillApiClient
 * @description SkillApiClient
 */
export class SkillApiClient extends BaseApiClient {
  /**
   * create base api client
   */
  constructor() {
    super();
    this.baseUrl = "skills";
  }
}
