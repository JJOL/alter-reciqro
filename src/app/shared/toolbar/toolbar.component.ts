import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from './../../core/services/auth.service';
import { Component, OnInit, Input, ViewChild} from '@angular/core';
import { AlertController,IonBackButtonDelegate } from '@ionic/angular';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})

/**
 * Toolbar for all the UIs
 */
export class ToolbarComponent implements OnInit {

  @Input() title: string;
  @Input() backButton: boolean;
  @Input() routePath: string;
  @Input() login: boolean;
  @Input() editPage: boolean
  @ViewChild(IonBackButtonDelegate, { static: false }) backButtonA: IonBackButtonDelegate;
  isLogged: boolean;
  admin: boolean;
  staff: boolean;
  user: boolean;
  rolesaux: [];
  // eslint-disable-next-line require-jsdoc
  constructor(private authService: AuthService, private menu: MenuController,
    private router: Router,public alertController: AlertController) {
  }

  /**
   */
  ionViewDidEnter() {
    console.log('ionViewDidEnter');
    this.setUIBackButtonAction();
    
  }
  pages = [];
  //@ViewChild(Nav) nav: Nav;
  /**
   * NgOnInit
   */
  ngOnInit() {
    
    console.log(this.editPage)
    this.authService.isUserLoggedIn.asObservable().subscribe(value => {
      this.isLogged = value;
    });
    this.authService.userRoles.asObservable().subscribe(roles => {
      this.rolesaux = roles;
      this.admin = roles [1];
      this.staff = roles [2];
      this.user = roles[3];
    });
  }
  /**
   * Presentar alerta de confirmación cuando se este saliendo de un edit
   */
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Mensaje de Confirmación',
      message: '¿Quieres cerrar sin guardar los cambios?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Confirmar',
          handler: () => {
            console.log('Confirm Okay');
            this.router.navigate([this.routePath])
          }
        }
      ]
    });

    await alert.present();
  }
  
  /**
   */
  setUIBackButtonAction() {
    this.backButtonA.onClick = () => {
      if(this.editPage){
        this.presentAlertConfirm()
      }else{
        this.router.navigate([this.routePath])
      }
    };
  }
}
