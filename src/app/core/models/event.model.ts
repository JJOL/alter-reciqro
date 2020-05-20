/* eslint-disable max-params */
/* In this case we are disabling camelcase to agree with firebase recommended naming convention.*/
/* eslint-disable camelcase */
/**
 * Class that defines the model for the waste type, indicating its fields.
 */
export class EventModel {
    
  /**
   * Constructor for the event model
     * @param  {string} publicreadonlyid
     * @param  {string[]} publicreadonlyage
     * @param  {string} publicreadonlyname
     * @param  {string} publicreadonlydescription
     * @param  {Date} publicreadonlystart_date
     * @param  {Date} publicreadonlyend_date
     * @param  {Date} publicreadonlystart_hour
     * @param  {Date} publicreadonlyend_hour
     * @param  {string} publicreadonlyicon
     * @param  {lat:number} publicreadonlylocation
     * @param  {number} lng
     */
  constructor(
        public readonly id: string,
        public readonly age: string[],
        public readonly name: string,
        public readonly description: string,
        public readonly link: string,
        public readonly start_date: Date,
        public readonly end_date: Date,
        public readonly start_hour: string,
        public readonly end_hour: string,
        public readonly icon: string,
        public readonly location: {
            lat: number,
            lng: number
        }
  ) {}
}
  
  