import { InfoBannerService } from 'src/app/core/services/info-banner.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add-info-banners',
  templateUrl: './add-info-banners.page.html',
  styleUrls: ['./add-info-banners.page.scss'],
})
/**
 * Page that is in charge to add new info banners
 */
export class AddInfoBannersPage implements OnInit {
  private dateFlag;
  private infoBannersForm;
  // eslint-disable-next-line require-jsdoc
  constructor(
    private formBuilder: FormBuilder,
    private infoBannersService: InfoBannerService,
    private toastCtrl: ToastController,
    private cdRef:ChangeDetectorRef) { }

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
      { type: 'maxlength', message: 'La longitud del texto no debe ser mayor a 100 caracteres'}
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
          // use id
          this.showToast('Ficha informativa creado de manera exitosa');
          this.infoBannersForm.reset();
          // this.navCtrl.navigateBack(['/admin/center']);
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
  addValue(e): void {
    if (true == e.currentTarget.checked){
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
   */
  ngOnInit() {
    this.infoBannersForm = this.formBuilder.group({
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      title: ['', [Validators.required, Validators.maxLength(100)]],
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      description: ['', [Validators.required, Validators.maxLength(100)]],
      date: [''],
      mainPicture: ['', Validators.pattern('^(https?:\/\/[^ ]*\.(?:gif|png|jpg|jpeg))')] /*This should be a picture*/
    });
  }
  /**
   */
  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }
}
