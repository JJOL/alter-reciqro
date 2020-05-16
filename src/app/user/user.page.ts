import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../core/services/auth.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DelegationService } from '../core/services/delegation.service';
import { ToastController, NavController } from '@ionic/angular';


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
  nickNameForm;
  nickNameId;
  currentNickName: string;
  /**
   * Constructor for the class, the external services required are the Form Builder for forms, 
   * Delegation Service for adding to the databse and the Toast Controller for showing a toast.
   * @param  {DelegationService} privatedelegationService
   * @param  {AuthService} privateauthService
   * @param  {ToastController} privatetoastCtrl
   */
  constructor(private delegationService: DelegationService,
              private authService: AuthService,
              private toastCtrl: ToastController,
              private formBuilder: FormBuilder,
              private cdRef: ChangeDetectorRef,
              private navCtrl: NavController) { }

  /**
   * Function that returns the nickname field on the nick name form.
   */
  get nickName() {
    return this.nickNameForm.get('nickName');
  }
  public errorMessages = {
    nickName: [
      { type: 'required', message: 'Alias es requerido' },
      { type: 'maxlength', message: 'La longitud del texto no debe ser mayor a 50 caracteres'}
    ]
  };

  /**
   * Function for submiting the form of the new place.
   */
  public submit() {
    this.delegationService.changeNickName(this.nickNameForm.value, this.nickNameId)
        .then(() => {
          // use id
          this.showToast('Alias se ha actualizado de manera exitosa');
          this.nickNameForm.reset();
          this.navCtrl.navigateBack(['/user/']);
          this.authService.getCurrentUser()
              .then(user => {
                if (user) {
                  this.currentNickName = user.alias;
                  this.nickNameId = user.id;
                }
              }).catch(() => {
                this.currentNickName = '';
              });
        }).catch(() => {
          this.showToastWrong('Error al actualizar alias');
          this.nickNameForm.reset();
        });
  }
  /**
   * User Story ID:M4NC5
   * Loads the delegations catalog in order to show the list
   */
  ngOnInit() {
    this.nickNameForm = this.formBuilder.group({
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      nickName: ['', [Validators.required, Validators.maxLength(100)]]
    });
    this.delegationService.getDelegations().then(delegation => {
      this.delegations = delegation;
    });
    this.authService.getCurrentUser().then( user =>{
      this.user = user;
      this.delegationService.getDelegationByID(user.delegation_id).then(delegation => {
        this.userDelegation = delegation.name;
      });
    }
    );
  }
  /**
   * Look for changes in delegation and alias changes
   */
  ionViewWillEnter() {
    this.authService.getCurrentUser()
        .then(user => {
          if (user) {
            this.currentNickName = user.alias;
            this.nickNameId = user.id;
          }
        }).catch(() => {
          this.currentNickName = '';
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
  /**
   * User Story ID: M4NG8
   * Function for showing the toast to the user.
   * @param  {} msg
   */
  public showToastWrong(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'middle',
      color: 'danger'
    }).then(toast => toast.present());
  }
  /**
   * Method that enables changes using change detector reference
   */
  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

}
