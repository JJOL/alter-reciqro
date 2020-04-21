/* eslint-disable require-jsdoc */
import { Component, OnInit } from '@angular/core';
import { TipoInstalacion } from 'src/app/core/models/tipo-instalacion.model';
import { PlacesService } from 'src/app/core/services/places.service';
import { ActivatedRoute } from '@angular/router';
import { WasteService } from 'src/app/core/services/waste.service';

@Component({
  selector: 'app-detail-place-type',
  templateUrl: './detail-place-type.page.html',
  styleUrls: ['./detail-place-type.page.scss'],
})
export class DetailPlaceTypePage implements OnInit {

  loadedPlaceType: TipoInstalacion;
  wastes: any[];
  flag: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private placesService: PlacesService,
    private wasteService: WasteService,
    
  ) { 
    this.flag = 0
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paraMap => {
      if (!paraMap.has('wasteId')) {
        return;
      }
      const wasteId = paraMap.get('wasteId');
      if (wasteId) {
        this.placesService.getPlaceTypeByID(wasteId).then(waste => {
          this.loadedPlaceType = waste;
        });

        this.wasteService.getWastes().then( waste => {
          this.wastes = waste;
        });
      }
    });
    
  }
  ngAfterContentChecked(){

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    if(this.wastes !== undefined && this.loadedPlaceType !== undefined && 0 === this.flag){
      console.log(this.wastes);
      console.log(this.loadedPlaceType);
      this.flag = 1;
    }
    
  }
}
