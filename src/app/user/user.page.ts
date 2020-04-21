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
  /**
   * NgInit: 
   * Obtiene todos las delegaciones para poder mostrarlas en el html
   */
  ngOnInit() {
    this.delegationService.getDelegations().then(delegation => {
      this.delegations = delegation;
    });
  }
  /**
   * Metodo para cerrar sesion
   */
  logout() {
    this.authService.logoutUser();
  }


}
