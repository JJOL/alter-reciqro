import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/core/services/events.service';
import { DatePipe } from '@angular/common';
import { EventModel } from 'src/app/core/models/event.model';

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
  events: EventModel[];
  todayDate = new Date();
  lengthEvents=-1
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
      console.log(this.events)
      this.events = event.filter(event => event.start_date >= this.todayDate);
      this.lengthEvents=this.events.length
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
