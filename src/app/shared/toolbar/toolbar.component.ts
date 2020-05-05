import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from './../../core/services/auth.service';
import { Component, OnInit, Input} from '@angular/core';

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
  private isLogged: boolean;
  private admin: boolean;
  private staff: boolean;
  private user: boolean;
  private rolesaux: [];
  // eslint-disable-next-line require-jsdoc
  constructor(private authService: AuthService, private menu: MenuController,
    private router: Router) {
  }
  pages = [];
  //@ViewChild(Nav) nav: Nav;
  /**
   * NgOnInit
   */
  ngOnInit() {
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
   */
  onLogout() {
    this.authService.logoutUser();
  }
  /**
   */
  ionViewWillEnter() {
    console.log("entro al view");
    if (!this.isLogged) {
      console.log("entro");
      if (this.admin ) {
        this.pages = [
          {title: 'Centros de Recolección', page: '/admin/center', icon: 'business'},
          {title: 'Información', page: '/user/info', icon: 'information-circle-outline'},
          {title: 'Incentivos', page: '/admin/goals', icon: 'star-outline'},
          {title: 'Administrar Usuarios', page: '/admin', icon: 'people-outline'},
          {title: 'Buscador de Centros', page: '/user/places-searcher-page', icon: 'business'}
        ];
        this.openPage('/user/places-searcher-page');
      } else if (this.staff && this.admin) {
        this.pages = [
          {title: 'Centros de Recolección', page: '/admin/center', icon: 'business'},
          {title: 'Información', page: '/user/info', icon: 'information-circle-outline'},
          {title: 'Incentivos', page: '/admin/goals', icon: 'star-outline'},
          {title: 'Administrar Usuarios', page: '/admin', icon: 'people-outline'},
          {title: 'Buscador de Centros', page: '/user/places-searcher-page', icon: 'business'}
        ];
        this.openPage('user/places-searcher-page');
      } else if (this.user) {
        this.pages = [
          {title: 'Iniciar Sesión', page: '/user/login', icon: 'enter-outline'},
          {title: 'Información', page: '/user/info', icon: 'information-circle-outline'},
          {title: 'Buscador de Centros', page: '/user/places-searcher-page', icon: 'business'}
        ];
        this.openPage('user/places-searcher-page');
      }
    }
  }
  /**
   * @param  {} page
   */
  openPage(page) {
    this.router.navigate(['page']);
    this.menu.close();
  }
}
