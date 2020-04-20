import { Component, OnInit } from '@angular/core';
import { TipoInstalacion } from 'src/app/core/models/tipo-instalacion.model';
import { PlacesService } from 'src/app/core/services/places.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-place-type',
  templateUrl: './detail-place-type.page.html',
  styleUrls: ['./detail-place-type.page.scss'],
})
export class DetailPlaceTypePage implements OnInit {

  loadedPlaceType: TipoInstalacion;

  constructor(
    private activatedRoute: ActivatedRoute,
    private placeService: PlacesService,
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paraMap => {
      if (!paraMap.has('wasteId')) {
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
