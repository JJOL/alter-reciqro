import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/core/services/events.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
  providers: [DatePipe]
})
/**
 * Event page class, provides methods for Angular loading.
*/
export class EventsPage implements OnInit {
  events: any[];
  todayDate = new Date();
  /**
   * User Story ID: M2NC2
   * Constructor only uses as an external service the Event Service, so that reading operations can be performed.
   * @param  {EventsService} eventService
   */
  constructor(private eventService: EventsService) { }
  /**
   * User Story ID: M2NC2
   * On ngOnInit all events are loaded.
   */
  ngOnInit() {
    this.eventService.getAllEvents().then(event => {
      this.events = event;
      this.events = this.events.filter(event => event.start_date >= this.todayDate);
    });
  }
  /**
   * User Story Id: M2NC2
   * Fuction that is executed for autoplaying the slider
   * @param  
   * @returns 
   */
  slidesDidLoad(BannerSlider){
    BannerSlider.startAutoplay();
  }
}
