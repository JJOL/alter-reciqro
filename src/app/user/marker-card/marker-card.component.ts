import { Place } from 'src/app/core/models/place.model';
import { TipoInstalacion } from 'src/app/core/models/tipo-instalacion.model';
import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
@Component({
  selector: 'app-marker-card',
  templateUrl: './marker-card.component.html',
  styleUrls: ['./marker-card.component.scss'],
})

// eslint-disable-next-line require-jsdoc
export class MarkerCardComponent implements OnInit {
  @Input() loadedPlaceType: TipoInstalacion;
  @Input() placeSelected: Place;
  classname = {
    'card-title': true,
    'ion-text-center': true
  };

  // eslint-disable-next-line require-jsdoc
  constructor() { }
  /**
   *
   
  ngOnChanges(changes: SimpleChanges){
    console.log(this.loadedPlaceType);
  }*/




}
