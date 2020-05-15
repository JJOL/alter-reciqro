import { AuthService } from 'src/app/core/services/auth.service';
import { UserEventService } from './../../../../core/services/userevent.service';
import { UserEvent } from './../../../../core/models/userevent.model';
import { AlertController, ToastController } from '@ionic/angular';
import { ChangeDetectorRef } from '@angular/core';
/* eslint-disable require-jsdoc */
import { Component, OnInit, ViewChild } from '@angular/core';
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
  interested: boolean;
  email = this.authService.getUserMail();
  eventId: string;

  // eslint-disable-next-line require-jsdoc
  constructor( private activatedRoute: ActivatedRoute,
               private eventService: EventsService,
               private cdRef: ChangeDetectorRef,
               private alertCtrl: AlertController,
               private toastCtrl: ToastController,
               private userEventService: UserEventService,
               private authService: AuthService
  ) { }

  // eslint-disable-next-line require-jsdoc
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

    ;
  }


  /**
   * Method to know checkbox state
   * @param  {} e
   */
  addValue(e): void {
    this.interested = !this.interested;
    if (this.interested) {
      this.alertCtrl.create ({
        header: 'Mensaje de Confirmación',
        // tslint:disable-next-line: max-line-length
        message: 'Al hacer click, usted esta aceptando recibir información sobre el evento (en caso de que se cancelara o algún cambio) vía correo',
        buttons: [{
          text: 'Cancelar',
          role: 'cancel'},
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
          role: 'cancel'},
        {
          text: 'Aceptar',
          handler: () => {
            this.userEventService.getUserEventByID(this.eventId, this.email).then(interested => {
              if (interested) {
                let id = interested.id;
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

}
