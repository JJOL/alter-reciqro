import { Component, OnInit } from '@angular/core';
import { TipoInstalacion } from 'src/app/core/models/tipo-instalacion.model';
import { PlacesService } from 'src/app/core/services/places.service';
import { ActivatedRoute } from '@angular/router';
import { WasteService } from 'src/app/core/services/waste.service';
import { WasteType, PlacesWasteTypes } from 'src/app/core/models/waste-type';

@Component({
  selector: 'app-detail-place-type',
  templateUrl: './detail-place-type.page.html',
  styleUrls: ['./detail-place-type.page.scss'],
})

/**
   * User Story Id: M1NG7
   * Allows the Detail Place Type Page to be available for imports
   * @param  
   * @returns 
   */
export class DetailPlaceTypePage implements OnInit {

  placeTypeId: string;
  loadedPlaceType: TipoInstalacion;

  wasteTypes: WasteType[];
  placeWasteType: PlacesWasteTypes[];

  /**
   * User Story Id: M1NG7
   * Allows to inject services to the model for routing and PlacesService
   * @param  {PlacesService} placeService 
   * @param  {ActivatedRoute} activatedRoute
   * @param  {WasteService} wasteService
   * @returns 
   */
  constructor(
    private activatedRoute: ActivatedRoute,
    private placesService: PlacesService,
    private wasteService: WasteService
  ) { }

  /**
   * User Story Id: M1NG7
   * Fuction that is executed when the page instantiated, which verifies that the Active Route contains the "wasteId" 
   * property and uses the getPlaceTypeByID method to loead the details of the selected Place Type
   * @param  
   * @returns 
   */
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paraMap => {
      if (!paraMap.has('wasteId')) {
        return;
      }
      const wasteId = paraMap.get('wasteId');
      if (wasteId) {
        this.placeTypeId = wasteId;
        this.placesService.getPlaceTypeByID(wasteId).then(waste => {
          this.loadedPlaceType = waste;
        });
        this.placesService.getAllWasteTypeByPlaceType(wasteId).then(data => {
          this.wasteService.getWastes().then(wastes => {
            this.wasteTypes = this.wasteService.getWastesByWasteId(data,wastes);
          });
          
        });
      }
    });
  }

}
