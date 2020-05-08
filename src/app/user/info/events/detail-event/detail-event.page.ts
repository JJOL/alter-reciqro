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
  startDate: String;
  endDate:String;
  


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
          this.startDate=dateFormat(this.eventLoad.start_date)
          this.endDate=dateFormat(this.eventLoad.end_date)
          
        });
      }
    });

    /**
   * USID: M2NC3 
   * @param  {} date
   */
    function dateFormat (date:Date) {
      var monthNames = [
        "Enero", "Febrero", "Marzo",
        "Abril", "Mayo", "Junio", "Julio",
        "Agosto", "Septiembre", "Octubre",
        "Noviembre", "Diciembre"
      ];
    
      var day = date.getDate();
      var monthIndex = date.getMonth();
      var year = date.getFullYear();
      var hour = date.getHours();
      var minutes= date.getMinutes();
    
      return day + ' ' + monthNames[monthIndex] + ' ' + year + ' ' +  hour + ':' + minutes;
    }

  }

}
