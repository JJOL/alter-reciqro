import { InfoBannerService } from 'src/app/core/services/info-banner.service';
import { Component, OnInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastController, NavController } from '@ionic/angular';

import { MAX_DESCRIPTION_FIELD_LENGTH, MAX_TITLE_FIELD_LENGTH } from 'src/app/core/constants';

@Component({
  selector: 'app-add-info-banners',
  templateUrl: './add-info-banners.page.html',
  styleUrls: ['./add-info-banners.page.scss'],
})
/**
 * Page that is in charge to add new info banners
 */
export class AddInfoBannersPage implements OnInit, AfterViewChecked {
  dateFlag;
  infoBannersForm;
  
  // eslint-disable-next-line require-jsdoc
  constructor(
    private formBuilder: FormBuilder,
    private infoBannersService: InfoBannerService,
    private toastCtrl: ToastController,
    private cdRef: ChangeDetectorRef,
    private navCtrl: NavController) { }

  /**
   * User Story ID: M2NG8
   * Function that returns the title field on the add infobanners form.
   */
  get title() {
    return this.infoBannersForm.get('title');
  }

  /**
   * User Story ID: M2NG8
   * Function that returns the description field on the add infobanners form.
   */
  get description() {
    return this.infoBannersForm.get('description');
  }
  /**
   * User Story ID: M2NG8
   * Function that returns the main picture field on the add infobanners form.
   */
  get mainPicture() {
    return this.infoBannersForm.get('mainPicture');
  }
  /**
   * User Story ID: M2NG8
   * Function that returns the date field on the add infobanners form.
   */
  get date() {
    return this.infoBannersForm.get('date');
  }

  public errorMessages = {
    title: [
      { type: 'required', message: 'Título es requerido' },
      { type: 'maxlength', message: 'La longitud del texto no debe ser mayor a 100 caracteres'}
    ],
    description: [
      { type: 'required', message: 'Descripción es requerida' },
      { type: 'maxlength', message: 'La longitud del texto no debe ser mayor a 1,000 caracteres'}
    ],
    date: [
      { type: 'required', message: 'Fecha requerida' }
    ],
    mainPicture: [
      { type: 'pattern', message: 'El URL no es correcto'}
    ]
  };
  /**
   * User Story ID: M4NG8
   * Function for submiting the form of the new place.
   */
  public submit() {
    this.infoBannersService.createInfoBanner(this.infoBannersForm.value)
        .then(() => {
          this.showToast('Banner creado de manera exitosa');
          this.infoBannersForm.reset();
          this.navCtrl.navigateBack(['/admin/info-banners']);
        }).catch(() => {
          this.showToastWrong('Error al crear la ficha informativa');
          this.infoBannersForm.reset();
        });
  }

  /**
   * User Story ID: M4NG8
   * Function for showing the toast to the user.
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
   * Method to know checkbox state
   * @param  {} e
   */
  onChangeCheckbox(e): void {
    if (true === e.currentTarget.checked){
      this.dateFlag = true;
      this.infoBannersForm.get('date').setValidators(Validators.required);
    }
    else {
      this.dateFlag = false;
      this.infoBannersForm.get('date').clearValidators();
      this.infoBannersForm.get('date').setValue('');
    }
  }

  /**
   * User Story ID: M4NG8
   * Method in charge of setting up the form, validators and getting id of the banner
   */
  ngOnInit() {
    this.infoBannersForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(MAX_TITLE_FIELD_LENGTH)]],
      description: ['', [Validators.required, Validators.maxLength(1000)]],
      date: [''],
      mainPicture: [''] /*This should be a picture*/
    });
  }
  /**
   * User Story ID: M4NG8
   * Method that enables changes into ion-checkbox using change detector reference
   */
  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }
}
