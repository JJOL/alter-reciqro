import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
@Component({
  selector: 'app-center',
  templateUrl: './center.page.html',
  styleUrls: ['./center.page.scss'],
})

/**
 * Class for Angular CenterPage module.
 */
export class CenterPage implements OnInit {
  isLogged: boolean;
  roles:string[]
  staff: boolean;
  user: boolean;
  /**
   * Constructor for the center admin page
   * @param  {AuthService} privateauthService
   */
  constructor(private authService:AuthService){
    this.authService.isUserLoggedIn.asObservable().subscribe(value => {
      this.isLogged = value;
    });
    this.authService.userRoles.asObservable().subscribe(roles => {
      this.roles=roles
    });
  }
  /**
   *  Function not implemented but forced by angular.
   */
  ngOnInit() { }
}
