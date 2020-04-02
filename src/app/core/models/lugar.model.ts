import { TipoInstalacion } from './tipo-instalacion.model'

export class Place {
    id : string
    name : string 
    description : string
    location: {
        lat: number,
        lng: number
    }
    qr_code : string
    photo : string
    address : string
    postal_code : number
    places_type : TipoInstalacion
}
