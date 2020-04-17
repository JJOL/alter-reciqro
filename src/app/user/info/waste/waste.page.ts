import { Component, OnInit } from '@angular/core';
import { WasteService } from 'src/app/core/services/waste.service';
import { WasteType } from 'src/app/core/models/waste-type';

function shuffle(arra1) {
  let ctr = arra1.length, temp, index;

  // While there are elements in the array
  while (ctr > 0) {
    // Pick a random index
    index = Math.floor(Math.random() * ctr);
    // Decrease ctr by 1
    ctr--;
    // And swap the last element with it
    temp = arra1[ctr];
    arra1[ctr] = arra1[index];
    arra1[index] = temp;
  }
  return arra1;
}

@Component({
  selector: 'app-waste',
  templateUrl: './waste.page.html',
  styleUrls: ['./waste.page.scss'],
})
export class WastePage implements OnInit {

  wastes: any[];

  constructor(private wasteService: WasteService) { }

  ngOnInit() {
    this.wasteService.getWastes().then( waste => {
      this.wastes = waste;
      this.wastes = shuffle(this.wastes);
    });
  }
}
