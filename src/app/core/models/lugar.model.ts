import { TipoInstalacion } from './tipo-instalacion.model'

export class Lugar {
    id : string
    name : string 
    description : string
    //longitud : number
    //latitud : number
    location: any []
    qrCode : string
    urlPhoto : string
    street : string
    delegation : string
    zipCode : number
    centreType : TipoInstalacion
    
}
