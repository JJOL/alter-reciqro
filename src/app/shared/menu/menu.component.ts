import { AuthService } from 'src/app/core/services/auth.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})

/**
 * Menu Component for all the project
 */
export class MenuComponent implements OnInit {
  
  private isLogged: boolean;
  private admin: boolean;
  private staff: boolean;
  private user: boolean;
  // eslint-disable-next-line require-jsdoc
  constructor(private authService: AuthService) {
    
    /*if (this.isLogged) {
      this.authService.userRoles.asObservable().subscribe(roles => {
        console.log("aqui tan los roles",roles);
        this.admin = roles [1];
        this.staff = roles [2];
        this.user = roles[3];
      });
    }*/
  }
  /**
   */
  ngOnInit() {
    /*this.authService.isUserLoggedIn.asObservable().subscribe(value => {
      this.isLogged = value;
      console.log("checar en el tool2",this.authService.isUserLoggedIn.value);
    });
    this.authService.userRoles.asObservable().subscribe(roles => {
      console.log("aqui tan los roles2",roles);
      this.admin = roles [1];
      this.staff = roles [2];
      this.user = roles[3];
    });*/
  } 

  /**
   * Salir de la sesion
   */
  onLogout() {
    this.authService.logoutUser();
  }

}
