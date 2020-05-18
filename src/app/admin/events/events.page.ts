import { AlertController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/core/services/events.service';
import { EventModel } from 'src/app/core/models/event.model';
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
  events: EventModel[];
  todayDate = new Date();
  actualPage = 1;
  /**
   * User Story ID: M2NC2
   * Constructor only uses as an external service the Event Service, so that reading operations can be performed.
   * @param  {EventsService} eventService
   */
  constructor(private eventService: EventsService,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController) { }
  /**
   * User Story ID: M2NC2
   * On ngOnInit all events are loaded.
   */
  ngOnInit() {
    this.eventService.erasePastEvents();
  }
  /**
   * User Story ID: M2NC2
   * Delete method in order to remove a current event
   * @param  {} id
   */
  async delete(id) {
    await this.eventService.deleteEventByID(id);
    this.ngOnInit();

    this.alertCtrl.create ({
      header: 'Mensaje de Confirmación',
      message: '¿De verdad quieres eliminar el evento ?',
      buttons: [{
        text: 'Cancelar',
        role: 'cancel'},
      {
        text: 'Borrar',
        handler: () => {
          this.eventService.deleteEventByID(id).then(() => {
            this.eventService.getAllEvents().then(events => {
              this.showToast('Se eliminó de manera correcta');
              this.events = events;
              this.events = this.events.filter(event => event.end_date >= this.todayDate);
            });
          }).catch( () => {
            this.showToastWrong('Error al crear el evento');
          });
        }
      }]
    }).then(alertEl => {
      alertEl.present();
    });
  }

  /**
   * Listen to check if there is a change
   */
  ionViewWillEnter() {
    this.eventService.getAllEvents().then(events => {
      this.events = events;
      this.events = this.events.filter(event => event.start_date >= this.todayDate);
    });
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
