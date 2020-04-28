import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/core/services/events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
/**
 * Event page class, provides methods for Angular loading.
*/
export class EventsPage implements OnInit {
  events: any[];
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
    });
  }
}
