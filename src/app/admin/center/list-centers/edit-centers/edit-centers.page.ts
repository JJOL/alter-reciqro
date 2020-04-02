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
  
  place: Place={
    id : "",
    name : "", 
    description : "",
    location: {
      lat: 0,
      lng: 0
  },
    qr_code : "",
    photo : "",
    address : "",
    postal_code : 0,
    places_type : {
      id : "",
      name : "",
      icon : ""
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
    console.log()
    this.activatedRoute.paramMap.subscribe(paraMap => {
      if (!paraMap.has('centerId')) {
        //redirect
        return;
      }
      console.log()
      const placeId = paraMap.get('centerId');
      if (placeId) {
        this.placeService.getPlaceByID(placeId).then(place => {
          this.place = place;
          console.log(place)
          console.log(this.place.places_type);
          console.dir(this.place.places_type);
          console.log(this.place.location);
          
        });
      }
    });

  }

}
