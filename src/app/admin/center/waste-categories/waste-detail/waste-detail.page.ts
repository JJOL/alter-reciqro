import { Component, OnInit } from '@angular/core';
import { TipoInstalacion } from 'src/app/core/models/tipo-instalacion.model';
import { LugaresService } from 'src/app/core/services/lugares.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-waste-detail',
  templateUrl: './waste-detail.page.html',
  styleUrls: ['./waste-detail.page.scss'],
})
export class WasteDetailPage implements OnInit {

  loadedPlaceType: TipoInstalacion;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private placeService: LugaresService
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paraMap => {
      if (!paraMap.has('wasteId')) {
        //redirect
        return;
      }
      const wasteId = paraMap.get('wasteId');
      if (wasteId) {
        this.placeService.getPlaceTypeByID(wasteId).then(waste => {
          this.loadedPlaceType = waste;
          console.log(this.loadedPlaceType);
        });
      }
    });
  }

}
