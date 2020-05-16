import { AuthService } from './../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { DelegationService } from '../core/services/delegation.service';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
/**
 * User Story ID:M4NC5
 * This component loads all the current user data
 */
export class UserPage implements OnInit {

  delegations: any[];
  user: any;
  userDelegation: any;
  /**
   * Constructor for the class, the external services required are the Form Builder for forms, 
   * Delegation Service for adding to the databse and the Toast Controller for showing a toast.
   * @param  {DelegationService} privatedelegationService
   * @param  {AuthService} privateauthService
   * @param  {ToastController} privatetoastCtrl
   */
  constructor(private delegationService: DelegationService,
              private authService: AuthService,
              private toastCtrl: ToastController) { }
  /**
 * User Story ID:M4NC5
 * Loads the delegations catalog in order to show the list
 * 
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
    
  }
 
  /**
   * User Story ID: M4NC5
  * Update the delegation of the user
  * @param  {} delegationID
  */
  async changeDelegation(delegationID){
    this.user.delegation_id = delegationID.detail.value;
    await this.authService.updateCurrentUser(this.user);
    this.userDelegation = (await this.delegationService.getDelegationByID(delegationID.detail.value)).name;
    this.showToast(this.userDelegation + ' es tu nueva delegación');
  }

  /**
   * User Story ID: M4NC5
   * Creates and shows the toast to the user.
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

  
}
