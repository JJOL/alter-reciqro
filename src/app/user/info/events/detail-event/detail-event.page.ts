/* eslint-disable require-jsdoc */
import { Component, OnInit,ViewChild } from '@angular/core';
import { EventModel } from 'src/app/core/models/event.model';
import { EventsService } from 'src/app/core/services/events.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-detail-event',
  templateUrl: './detail-event.page.html',
  styleUrls: ['./detail-event.page.scss'],
  providers: [DatePipe]
})
export class DetailEventPage implements OnInit {
  eventLoad: EventModel;
  linkFB:String;
  idE:string;
  startDate:string;
  endDate:string;
  startDay:string;
  // @ViewChild('map', { static: true }) mapElement;
  @ViewChild('iframeFB',{static:false}) shareButtonFB;
  // eslint-disable-next-line require-jsdoc
  constructor( private activatedRoute: ActivatedRoute,
    private eventService: EventsService
  ) { 
    
  }

  // eslint-disable-next-line require-jsdoc
  ngOnInit() {

    

    this.activatedRoute.paramMap.subscribe(paraMap => {

      if (!paraMap.has('eventId')) {
        // redirect
        return;
      }

      const eventId = paraMap.get('eventId');
      this.idE=eventId
      
      
      if (eventId) {
        
        this.eventService.getEventByID(eventId).then(res => {
          
          this.eventLoad = res;
          // this.linkFB = `https://www.facebook.com/plugins/share_button.php?href=https%3A%2F%2Fitesm-ca2020.web.app%2Fuser%2Finfo%2Fevents%2F${this.eventLoad.id}&layout=button_count&size=large&appId=725418228231566&width=88&height=28`
          this.startDate = this.dateFormat(this.eventLoad.start_date,true)
          this.endDate = this.dateFormat(this.eventLoad.end_date,true)
          this.startDay =this.dateFormat(this.eventLoad.start_date,false)
          console.log(this.shareButtonFB)
          setTimeout(()=>{
            let buttonFBShare=`<iframe src='https://www.facebook.com/plugins/share_button.php?href=https%3A%2F%2Fitesm-ca2020.web.app%2Fuser%2Finfo%2Fevents%2F${eventId}&layout=button_count&size=large&appId=725418228231566&width=88&height=28' width='88' height='28' style='border:none;overflow:hidden' scrolling='no' frameborder='0' allowTransparency='true' allow='encrypted-medi''></iframe>`
            this.shareButtonFB.nativeElement.innerHTML=buttonFBShare
          },1000)
        });
      }
    });

   
  }
  /**
   * USID: M2NC3 
   * @param  {} date
   */
  dateFormat (date:Date,flag:boolean) {
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
    if(flag){
      if(minutes==0){
        return `${day} ${monthNames[monthIndex]} ${year} ${hour}:${minutes}0 hrs`;
      }
    
      return `${day} ${monthNames[monthIndex]} ${year} ${hour}:${minutes} hrs`;
    }
    else{
      return `${day} ${monthNames[monthIndex]} ${year}`;
    }
    
  }
  
  

}
