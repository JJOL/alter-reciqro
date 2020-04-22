import { AuthService } from './../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { DelegationService } from '../core/services/delegation.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
/**
 * This component loads all the current user data
 */
export class UserPage implements OnInit {

  delegations: any[];
  user: any;
  userDelegation: any;

  // eslint-disable-next-line require-jsdoc
  constructor(private delegationService: DelegationService,
              private authService: AuthService ) { }
  /**
 * Loads the delegations catalog in order to show the list
 */
  ngOnInit() {
    this.authService.getCurrentUser().then( user =>{
      this.user=user;
      this.delegationService.getDelegationByID(user.delegation_id).then(delegation => {
        this.userDelegation = delegation.name;
      })
    }
    )
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
 /**
  * Update the delegation of the user
  * @param  {} delegationID
  */
  async changeDelegation(delegationID){
    await this.authService.updateCurrentUser(this.user);
    this.userDelegation = (await this.delegationService.getDelegationByID(delegationID.detail.value)).name;
}
}