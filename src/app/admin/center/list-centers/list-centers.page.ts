import { Component, OnInit } from '@angular/core';
import { Lugar } from 'src/app/core/models/lugar.model';
import { LugaresService } from 'src/app/core/services/lugares.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-centers',
  templateUrl: './list-centers.page.html',
  styleUrls: ['./list-centers.page.scss'],
})
export class ListCentersPage implements OnInit {

  places : Observable<Lugar[]>;

  constructor(private centerService: LugaresService) { }

  ngOnInit() {
    
  }

  ionViewWillEnter() {
    this.places = this.centerService.getAllPlaces();
  }

}
