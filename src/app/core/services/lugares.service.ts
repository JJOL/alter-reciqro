import { Injectable } from '@angular/core';
import { Lugar } from '../models/lugar.model';
import { TipoInstalacion } from '../models/tipo-instalacion.model';

@Injectable({
  providedIn: 'root'
})

export class LugaresService {

  constructor() { }

  _fakePlacetypes: TipoInstalacion[] = [
    {
      idTipoInstalacion : "1",
      nombre : "Separación de desechos",
      descripcion : "Separación de desechos de cualquier tamaño"
    },
    {
      idTipoInstalacion : "2",
      nombre : "Papelera Monumentalísima del Norte",
      descripcion : "Recolección de cartón y papel"
    }
  ];

  fakePlaces : Lugar [] = [
    {
      idlugar : "1",
      nombre : "Basurero Municipal",
      descripcion : "Basurero extremo de separación de desechos",
      longitud : 100.1234,
      latitud : 100.1234,
      codigoQr : "QR",
      foto : "https://i2.wp.com/www2.municipiodequeretaro.gob.mx/wp-content/uploads/2017/05/prensa_1494002771103.jpg?w=1245&ssl=1",
      calle : "Bernardo Quintana",
      ciudad : "Querétaro",
      cp : 76146,
      tipoDeInstalacion : {
        idTipoInstalacion : "1",
        nombre : "Separación de desechos",
        descripcion : "Separación de desechos de cualquier tamaño"
      }
    },
    {
      idlugar : "2",
      nombre : "Papelera San Juan",
      descripcion : "Recolección masiva de cartón y papel",
      longitud : 444.1234,
      latitud : 500.1234,
      codigoQr : "QR",
      foto : "https://www.diariodequeretaro.com.mx/incoming/yxmvyc-papelera-monumental.jpg/ALTERNATES/LANDSCAPE_1140/Papelera%20monumental.JPG",
      calle : "Arteaga",
      ciudad : "Querétaro",
      cp : 76145,
      tipoDeInstalacion : {
        idTipoInstalacion : "2",
        nombre : "Papelera",
        descripcion : "Recolección de cartón y papel"
      } 
    },
  ];

  getAllPlaces () {
    return [...this.fakePlaces];
  }

  getPlaceByID (placeId: string) {
    return {
      ...this.fakePlaces.find( place => {
        return place.idlugar === placeId;
    })};
  }

  deletePlaceByID (placeId: string) {
    this.fakePlaces = this.fakePlaces.filter(place => {
      return place.idlugar !== placeId;
    });
  }

  createPlace () {

  }

  updatePlaceByID () {

  }

  getPlacesByFilter () {
    
  }

  getPlacesByPosition(lat: number, lng: number, radius: number): Lugar[] {
    return [...this.fakePlaces.filter(place => this.distanceBetween(place.latitud, place.longitud, lat, lng) <= radius )];
  }

  private distanceBetween(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const latSqrd = Math.pow(lat1 - lat2, 2);
    const lngSqrd = Math.pow(lng1 - lng2, 2);
        
    return Math.sqrt(latSqrd + lngSqrd);
  }
  allPlaceTypes(){
    return [...this._fakePlacetypes];
  }
  allPlaces(){
    return [...this.fakePlaces];
  }

}