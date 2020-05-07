/* eslint-disable require-jsdoc */
import { Component, OnInit,ViewChild } from '@angular/core';
import { EventModel } from 'src/app/core/models/event.model';
import { EventsService } from 'src/app/core/services/events.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-event',
  templateUrl: './detail-event.page.html',
  styleUrls: ['./detail-event.page.scss'],
  providers: [DatePipe]
})
export class DetailEventPage implements OnInit {
  eventLoad: EventModel;
  
  


  // eslint-disable-next-line require-jsdoc
  constructor( private activatedRoute: ActivatedRoute,
    private eventService: EventsService,
  ) { }

  // eslint-disable-next-line require-jsdoc
  ngOnInit() {


    this.activatedRoute.paramMap.subscribe(paraMap => {

      if (!paraMap.has('eventId')) {
        // redirect
        return;
      }

      const eventId = paraMap.get('eventId');
      
      if (eventId) {
        
        this.eventService.getEventByID(eventId).then(res => {
          
          this.eventLoad = res;
          
          
        });
      }
    });



  }

}
