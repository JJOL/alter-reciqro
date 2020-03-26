import { Injectable } from '@angular/core';
import { Lugar } from '../models/lugar.model';

@Injectable({
  providedIn: 'root'
})



export class LugaresService {

  constructor() { }

  fakePlaces : Lugar [] = [
    {
      idlugar : "1",
      nombre : "Basurero Municipal",
      descripcion : "Basurero extremo de separación de desechos",
      longitud : 100.1234,
      latitud : 100.1234,
      codigoQr : "QR",
      foto : "FOTO",
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
      foto : "FOTO",
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

  getPlaces () {

  }

  getPlaceByID () {

  }

  createPlace () {

  }

  deletePlaceByID () {

  }

  updatePlaceByID () {

  }

  getPlacesByFilter () {
    
  }



}
