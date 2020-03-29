import { Component, OnInit } from '@angular/core';

import { FBLugaresService } from '../core/services/lugares-fb.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  constructor(private lugaresService: FBLugaresService) { }

  async ngOnInit() {
    let places = await this.lugaresService.getAllPlaces();
    console.log(places);
    
  }

}
