import { AuthService } from './../../core/services/auth.service';
import { Component, OnInit, Input } from '@angular/core';

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
  private isLogged: boolean;
  private admin: boolean;
  private staff: boolean;
  private user: boolean;
  // eslint-disable-next-line require-jsdoc
  constructor(private authService: AuthService) { }
  /**
   * Ng onInit
   */
  ngOnInit() {
    this.authService.isUserLoggedIn.asObservable().subscribe(value => {
      this.isLogged = value;
      console.log("toolbar",this.authService.isUserLoggedIn.value);
      /*this.authService.userRoles.asObservable().subscribe(roles => {
        console.log("entro a los roles");
        this.admin = roles [1];
        this.staff = roles [2];
        this.user = roles[3];
      });*/
    });
  }

}
