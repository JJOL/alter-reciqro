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
}
