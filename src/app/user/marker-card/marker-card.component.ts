import { Place } from 'src/app/core/models/place.model';
import { TipoInstalacion } from 'src/app/core/models/tipo-instalacion.model';
import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'app-marker-card',
  templateUrl: './marker-card.component.html',
  styleUrls: ['./marker-card.component.scss'],
})
export class MarkerCardComponent implements OnInit {
  @Input() loadedPlaceType: TipoInstalacion;
  @Input() placeSelected: Place;
  
  constructor() { }

  ngOnInit() {}

  


}
