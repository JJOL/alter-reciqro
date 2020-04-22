import { TipoInstalacion } from './tipo-instalacion.model';
/**
   * Definición del modelo de lugar
   */
export class Place {
  /**
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
  ) {}
}
