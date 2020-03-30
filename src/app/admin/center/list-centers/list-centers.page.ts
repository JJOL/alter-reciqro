import { Component, OnInit } from '@angular/core';
import { Lugar } from 'src/app/core/models/lugar.model';
import { LugaresService } from 'src/app/core/services/lugares.service';

@Component({
  selector: 'app-list-centers',
  templateUrl: './list-centers.page.html',
  styleUrls: ['./list-centers.page.scss'],
})
export class ListCentersPage implements OnInit {

  places : any[];

  constructor(private centerService: LugaresService) { 
  }

  ngOnInit() {
  }

  ionViewWillEnter() {

  }
}
