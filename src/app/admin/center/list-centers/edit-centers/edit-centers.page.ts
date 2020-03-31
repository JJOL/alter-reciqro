import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { FormGroup, FormBuilder } from "@angular/forms";
import { LugaresService } from 'src/app/core/services/lugares.service';
import { Place } from 'src/app/core/models/lugar.model';
@Component({
  selector: 'app-edit-centers',
  templateUrl: './edit-centers.page.html',
  styleUrls: ['./edit-centers.page.scss'],
})
export class EditCentersPage implements OnInit {
  updateBookingForm: FormGroup;
  loadedPlace: Place={
    id : "",
    name : "", 
    description : "",
    location: [],
    qr_code : "",
    photo : "",
    address : "",
    postal_code : 0,
    places_type : {
      id : "",
      name : "",
      description : ""
    }
  };


  constructor(
    private activatedRoute: ActivatedRoute,
    private placeService: LugaresService,
    private router: Router,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    public fb: FormBuilder
    ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paraMap => {
      if (!paraMap.has('centerId')) {
        //redirect
        return;
      }
      const centerId = paraMap.get('centerId');
      if (centerId) {
        this.placeService.getPlaceByID(centerId).then(place => {
          this.loadedPlace = place;
          console.log(this.loadedPlace.places_type);
          console.dir(this.loadedPlace.places_type);
          console.log(this.loadedPlace.location);
          
        });
      }
    });

  }

}
