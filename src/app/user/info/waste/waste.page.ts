import { Component, OnInit } from '@angular/core';
import { WasteService } from 'src/app/core/services/waste.service';
/**
 * User Story ID: M1NC3
 * Function that shuffles an generic array. It is used so cards are never presented the same.
 * @param  {} arra1
 */
export function shuffle(arra1) {
  let ctr = arra1.length, temp, index;

  // While there are elements in the array
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
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

/**
 * Waste page class, provides methods for Angular loading.
*/
export class WastePage implements OnInit {

  wastes: any[];
  /**
   * User Story ID: M1NC3
   * Constructor only uses as an external service the Waste Service, so that reading operations can be performed.
   * @param  {WasteService} privatewasteService
   */
  constructor(private wasteService: WasteService) { }
  /**
   * User Story ID: M1NC3
   * On ngOnInit all wastes are loaded and shuffled.
   */
  ngOnInit() {
    this.wasteService.getWastes().then(waste => {
      this.wastes = waste;
      this.wastes = shuffle(this.wastes);
    });
  }
  /**
   * User Story ID: M1NC3
   * Function that is executed for autoplaying the slider.
   * @param  {} BannerSlider
   */
  slidesDidLoad(BannerSlider){
    BannerSlider.startAutoplay();
  }
}
