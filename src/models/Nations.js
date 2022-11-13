/* eslint-disable no-unused-vars */
// @ts-check
import Building from "./Building";
import Technology from "./Technology";
import Ship from "./Ships";

export default class Nation {
  /**
   *
   * @param {string} id
   * @param {string} name
   * @param {Building[]} buildings
   * @param {Ship[]} ships
   * @param {Technology[]} technologies
  
   */
  constructor(id, name, buildings, ships, technologies) {
    this.id = id;
    this.name = name;
    this.buildings = buildings;
    this.ships = ships;
    this.technologies = technologies;
  }

  createNation(
    options = {
      id: "",
      name: "",
      buildings: [],
      ships: [],
      technologies: [],
    }
  ) {
    const { id, name, buildings, ships, technologies } = options;
    this.id = id;
    this.name = name;
    this.buildings = buildings;
    this.ships = ships;
    this.technologies = technologies;
  }

  get Id() {
    return this.id;
  }

  get Name() {
    return this.name;
  }

  get Building() {
    return this.buildings;
  }

  get Ships() {
    return this.ships;
  }

  get Technologies() {
    return this.technologies;
  }
}
