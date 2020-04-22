/* eslint-disable max-params */
/* In this case we are disabling camelcase to agree with firebase recommended naming convention.*/
/* eslint-disable camelcase */
/**
 * Class that defines the model for the waste type, indicating its fields.
 */
export class WasteType {
  /**
   * User Story ID: M1NC3
   * Constructor takes as arguments all the information for a waste type.
   * @param  {string} publicreadonlyid
   * @param  {string} publicreadonlyname
   * @param  {string} publicreadonlydescription
   * @param  {string} publicreadonlyicon
   */
  constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly description: string,
        public readonly icon: string,
  ) {}
}
/**
 * Class that defines the model for the place<->waste table, indicating its fields.
 */
export class PlacesWasteTypes {
    place: string;
    waste_type: string;
}

