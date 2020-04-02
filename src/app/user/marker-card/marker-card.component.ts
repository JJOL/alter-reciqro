import { Place } from 'src/app/core/models/lugar.model';
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

  componentView(flag){
    if(flag===true){
      console.log("entro en true");
      
      var changeView=document.getElementById("changeView");
      changeView.style.height="0%";
      changeView.style.visibility="hidden";
    }
    else{
      
      console.log("entro en false");
      var changeView=document.getElementById("changeView");
      changeView.style.height="70%";
      changeView.style.visibility="visible";
    }
  }
}
