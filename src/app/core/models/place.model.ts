/* eslint-disable max-params */
/* In this case we are disabling camelcase to agree with firebase recommended naming convention.*/
/* eslint-disable camelcase */
import { TipoInstalacion } from './tipo-instalacion.model';
/**
   * Class that defines the model for the place, indicating its fields.
   */
export class Place {
  
  /**
   *  User Story ID: M4NG1
   * Constructor takes as arguments all the information for a center (place).
   * @param  {string} id
   * @param  {string} name
   * @param  {string} description
   * @param  {lat:number} location
   * @param  {number} lng
   * @param  {string} publicreadonlyaddress
   * @param  {number} publicreadonlypostal_code
   * @param  {TipoInstalacion} publicreadonlyplaces_type
   * @param  {string} publicreadonlyphoto
   * @param  {string} publicreadonlyqr_code
   */
  constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly description: string,
        public readonly location: {
            lat: number,
            lng: number
        },
        public readonly address: string,
        public readonly postal_code: number,
        public readonly places_type: TipoInstalacion,
        public readonly photo: string,
        public readonly qr_code: string,
        public readonly schedule: string,
  ) {}
}
