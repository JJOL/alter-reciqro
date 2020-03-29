import { TipoInstalacion } from './tipo-instalacion.model'

export class Lugar {
    idlugar : string
    nombre : string 
    descripcion : string
    longitud : number
    latitud : number
    codigoQr : string
    foto : string
    calle : string
    ciudad : string
    cp : number
    tipoDeInstalacion : TipoInstalacion
}
