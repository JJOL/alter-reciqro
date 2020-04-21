import { AuthService } from './../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { DelegationService } from '../core/services/delegation.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
// eslint-disable-next-line require-jsdoc
export class UserPage implements OnInit {

  delegations: any[];

  // eslint-disable-next-line require-jsdoc
  constructor(private delegationService: DelegationService,
              private authService: AuthService ) { }
<<<<<<< HEAD
  /**
   * NgInit: 
   * Obtiene todos las delegaciones para poder mostrarlas en el html
   */
=======
/**
 * Loads the delegations catalog in order to show the list
 */
>>>>>>> 9aa390e731e7a2f7bd28de29ecac5c980b13107e
  ngOnInit() {
    this.delegationService.getDelegations().then(delegation => {
      this.delegations = delegation;
    });
   // this.authService.getUserByUID("yBM2MxbTmHfPt0hTh0ek19i01W73").then(user => console.log(user))
  }
  /**
   * Logout methos to close fireauth
   */
  logout() {
    this.authService.logoutUser();
  }


}
