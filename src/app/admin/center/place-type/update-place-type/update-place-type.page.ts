import { Component, OnInit } from '@angular/core';
import { TipoInstalacion } from 'src/app/core/models/tipo-instalacion.model';
import { PlacesService } from 'src/app/core/services/places.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-place-type',
  templateUrl: './update-place-type.page.html',
  styleUrls: ['./update-place-type.page.scss'],
})
export class UpdatePlaceTypePage implements OnInit {

  loadedPlaceType: TipoInstalacion;

  constructor(
    private activatedRoute: ActivatedRoute,
    private placeService: PlacesService
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paraMap => {
      if (!paraMap.has('updatePlaceTypeId')) {
        return;
      }
      const wasteId = paraMap.get('updatePlaceTypeId');
      if (wasteId) {
        this.placeService.getPlaceTypeByID(wasteId).then(waste => {
          this.loadedPlaceType = waste;
          console.log(this.loadedPlaceType);
        });
      }
    });
  }

}
