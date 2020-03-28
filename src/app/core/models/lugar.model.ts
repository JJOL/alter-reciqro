import { TipoInstalacion } from './tipo-instalacion.model copy'

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


    // distanceTo(otherLat: number, otherLng: number): number {
    //     const latSqrd = Math.pow(this.latitud - otherLat, 2);
    //     const lngSqrd = Math.pow(this.longitud - otherLng, 2);
        
    //     return Math.sqrt(latSqrd + lngSqrd);
    // }
}
