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
 * User Story ID: M2NC1
 * Event page class, provides methods for Angular loading.
*/
export class EventsPage implements OnInit {
  events: EventModel[];
  pastEvents: EventModel[];
  listEvents: EventModel[];
  todayDate = new Date();
  estatus: boolean = false;
  lengthEvents=-1;
  actualPage = 1;
  /**
   * User Story ID: M2NC1, M2NC2
   * Constructor only uses as an external service the Event Service, so that reading operations can be performed.
   * @param  {EventsService} eventService
   */
  constructor(private eventService: EventsService) { }
  /**
   * User Story ID: M2NC1, M2NC2
   * On ngOnInit all events are loaded.
   */
  ngOnInit() {
    this.eventService.getAllEvents().then(event => {
      this.events = event;
      this.listEvents = this.events;
      this.eventService.getPastEvents().then(events2 => {
        this.pastEvents = events2;
        this.lengthEvents=this.events.length + this.pastEvents.length;
      })
      
    });
  }

  /**
   * Listen to check if there is a change
   */
  ionViewWillEnter() {
    this.eventService.getAllEvents().then(events => {
      this.events = events;
      this.eventService.getPastEvents().then( events2 => {
        this.pastEvents = events2;
        this.lengthEvents = this.events.length + this.pastEvents.length;
        if(this.estatus && this.lengthEvents > 0){
          this.listEvents = this.pastEvents;
        }else{
          this.listEvents = this.events;
        }
      })
    });
   
  }

  /**
   * User Story I: M2NC1, M2NC2
   * Fuction that is executed for autoplaying the slider when the assets are already loaded
   * @param  
   * @returns 
   */
  slidesDidLoad(BannerSlider){
    BannerSlider.startAutoplay();
  }

  /**
   * User Story ID: M2NC1, M2NC2
   * This function retrieves all past events
   */
  seePastEvents(event){
    if(event.detail.checked){
      this.estatus = true;
      this.listEvents = this.pastEvents;
    }else{
      this.estatus = false;
      this.listEvents = this.events;
    }
  }
}
