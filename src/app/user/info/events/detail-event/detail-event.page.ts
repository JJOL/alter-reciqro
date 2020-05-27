import { AuthService } from 'src/app/core/services/auth.service';
import { UserEventService } from './../../../../core/services/userevent.service';
import { AlertController, ToastController } from '@ionic/angular';
import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { EventModel } from 'src/app/core/models/event.model';
import { EventsService } from 'src/app/core/services/events.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Title,Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-event',
  templateUrl: './detail-event.page.html',
  styleUrls: ['./detail-event.page.scss'],
  providers: [DatePipe]
})
/**
 *  User Story ID: M2NC3
 * Detail page for event info
 */
export class DetailEventPage implements OnInit {
  eventLoad: EventModel;
  linkFB: string;
  email:string;
  startDate: string;
  endDate: string;
  startDay: string;
  startHour: string;
  endHour: string;
  startHourFlag: boolean;
  endHourFlag:  boolean;
  // @ViewChild('map', { static: true }) mapElement;
  @ViewChild('iframeFB', {static: false}) shareButtonFB;
  interested: boolean;
  eventId: string;

  // eslint-disable-next-line require-jsdoc
  constructor( private activatedRoute: ActivatedRoute,
               private eventService: EventsService,
               private cdRef: ChangeDetectorRef,
               private alertCtrl: AlertController,
               private toastCtrl: ToastController,
               private userEventService: UserEventService,
               private authService: AuthService,
               private titleService: Title,
               private meta:Meta,
               private router: Router
  ) { }

  
  /**
   * User Story ID: M2NC5
   * Gets the current event ID and loads such event
   */
  ngOnInit() {



    this.activatedRoute.paramMap.subscribe(paraMap => {

      if (!paraMap.has('eventId')) {
        // redirect
        return;
      }

      this.eventId = paraMap.get('eventId');
      
      if (this.eventId) {

        this.eventService.getEventByID(this.eventId).then(res => {
          this.eventLoad = res;
          this.titleService.setTitle(this.eventLoad.name)
          this.titleService.setTitle (this.eventLoad.name); 

          this.startDate = this.dateFormat(this.eventLoad.start_date, false);
          this.endDate = this.dateFormat(this.eventLoad.end_date, false);
          this.startDay = this.dateFormat(this.eventLoad.start_date, false);
          if(this.eventLoad.start_hour){
            this.startHourFlag = true;
            this.startHour = this.eventLoad.start_hour.split('T')[1].split('.')[0].split(':')[0] + ':' + this.eventLoad.start_hour.split('T')[1].split('.')[0].split(':')[1] + ' hrs';
          }else{
            this.startHourFlag = false;
          }
          if(this.eventLoad.end_hour){
            this.endHourFlag = true;
            this.endHour = this.eventLoad.end_hour.split('T')[1].split('.')[0].split(':')[0] + ':' + this.eventLoad.end_hour.split('T')[1].split('.')[0].split(':')[1] + ' hrs';
          }else{
            this.endHourFlag = false;
          }
          setTimeout(() => {
            const buttonFBShare = `<iframe src='https://www.facebook.com/plugins/share_button.php?href=https%3A%2F%2Faqropio.municipiodequeretaro.gob.mx%2Fuser%2Finfo%2Fevents%2Fdetail-event%2F${this.eventId}&layout=button_count&size=large&appId=725418228231566&width=114&height=28' width='114' height='28' style='border:none;overflow:hidden' scrolling='no' frameborder='0' allowTransparency='true' allow='encrypted-medi''></iframe>`;
            this.shareButtonFB.nativeElement.innerHTML = buttonFBShare;
          }, 100);
          this.eventId = paraMap.get('eventId');
          this.email = this.authService.getUserMail();
          this.eventLoad = res;
          if (this.email !== '') {
            this.userEventService.getUserEventByID(this.eventId, this.email).then(interested => {
              if (interested) {
                this.interested = true;
              } else {
                this.interested = false;
              }
            });
          }
        });
        this.eventService.getEventByID(this.eventId).then(res => {

          this.eventLoad = res;

          this.userEventService.getUserEventByID(this.eventId, this.email).then(interested => {
            if (interested) {
              this.interested = true;
            } else {
              this.interested = false;
            }
          });
        });

      }
    });
  }

  /**
   * User Story ID: M2NC7
   * Method to show Sign in page when a non registered user clicks on "INTERESADO"
   * @param  {} e
   */
  register(): void {
    this.alertCtrl.create ({
      header: '¿Te interesa este evento?',
      // tslint:disable-next-line: max-line-length
      message: 'Inicia sesión para mantenerte informado.',
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          this.interested = !this.interested;
        } },
      {
        text: 'Iniciar sesión',
        handler: () => {
          this.showToast('Por favor inicie sesión');
          this.interested = true;
          this.router.navigate(['/user/login'])
        }
      }]
    }).then(alertEl => {
      alertEl.present();
    });
  }


  /**
   * User Story ID: M2NC7
   * Method to get interested in an event
   * Method to know checkbox state
   * @param  {} e
   */
  addValue(e): void {
    this.interested = !this.interested;
    if(this.interested) {
      this.alertCtrl.create ({
        header: 'Mensaje de Confirmación',
        // tslint:disable-next-line: max-line-length
        message: 'Al hacer click, usted esta aceptando recibir información sobre el evento (en caso de que se cancelara o algún cambio) vía correo',
        buttons: [{
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.interested = !this.interested;
          } },
        {
          text: 'Aceptar',
          handler: () => {
            this.userEventService.createUserEvent(this.eventId, this.email).then(() => {
              this.showToast('Has aceptado recibir información sobre el evento');
              this.interested = true;
            });
          }
        }]
      }).then(alertEl => {
        alertEl.present();
      });
    } else {
      this.alertCtrl.create ({
        header: 'Mensaje de Confirmación',
        // tslint:disable-next-line: max-line-length
        message: 'Al hacer click, usted esta aceptando YA NO recibirá información sobre el evento vía correo',
        buttons: [{
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.interested = !this.interested;
          }},
        {
          text: 'Aceptar',
          handler: () => {
            this.userEventService.getUserEventByID(this.eventId, this.email).then(interested => {
              if (interested) {
                const id = interested.id;
                this.userEventService.deleteUserEventByID(id).then(() => {
                  this.showToast('Has aceptado YA NO recibir información sobre el evento');
                  this.interested = false;
                });
              }
            });
          }
        }]
      }).then(alertEl => {
        alertEl.present();
      });
    }
  }

  /**
   */
  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

  /**
   * User Story ID: M4NG8
   * Function for showing the toast to the user.
   * @param  {} msg
   */
  public showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'middle',
      color: 'success'
    }).then(toast => toast.present());
  }
  /**
   * User Story ID: M4NG8
   * Function for showing the toast to the user.
   * @param  {} msg
   */
  public showToastWrong(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'middle',
      color: 'danger'
    }).then(toast => toast.present());
  }
  /**
   * User Story ID: M2NC3
   * @param  {} date
   */
  dateFormat(date: Date, flag: boolean) {
    let monthNames = [
      'Enero', 'Febrero', 'Marzo',
      'Abril', 'Mayo', 'Junio', 'Julio',
      'Agosto', 'Septiembre', 'Octubre',
      'Noviembre', 'Diciembre'
    ];

    let day = date.getDate();
    let monthIndex = date.getMonth();
    let year = date.getFullYear();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    if (flag) {
      if (0 === minutes) {
        return `${day} ${monthNames[monthIndex]} ${year} ${hour}:${minutes}0 hrs`;
      }

      return `${day} ${monthNames[monthIndex]} ${year} ${hour}:${minutes} hrs`;
    } else {
      return `${day} ${monthNames[monthIndex]} ${year}`;
    }

  }



}
