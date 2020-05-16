import { FormBuilder, Validators } from '@angular/forms';
import { InfoBannerService } from 'src/app/core/services/info-banner.service';
import { ToastController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-edit-info-banners',
  templateUrl: './edit-info-banners.page.html',
  styleUrls: ['./edit-info-banners.page.scss'],
})
/**
 * Edit Information banners
 */
export class EditInfoBannersPage implements OnInit {
  dateFlag;
  infoBannersForm;

  infoBannerId;
  infoBannertitle: string;
  infoBannerImageUrl: string;
  infoBannerDescription: string;
  infoBannerDate;
  // eslint-disable-next-line require-jsdoc
  constructor(private activatedRoute: ActivatedRoute,
              private toastCtrl: ToastController,
              private infoBannersService: InfoBannerService,
              private formBuilder: FormBuilder,
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
    this.infoBannersService.editInfoBanner(this.infoBannersForm.value, this.infoBannerId)
        .then(() => {
          // use id
          this.showToast('Ficha informativa se ha actualizado de manera exitosa');
          this.infoBannersForm.reset();
          this.navCtrl.navigateBack(['/admin/info-banners']);
        }).catch(() => {
          this.showToastWrong('Error al actualizar la ficha informativa');
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
   * User Story ID: M4NG8
   * Method to know checkbox state and set validations depending on the state
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
   * User Story ID: M4NG8
   * Method in charge of setting up the form, validators and getting id of the banner
   */
  ngOnInit() {
    this.infoBannersForm = this.formBuilder.group({
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      title: ['', [Validators.required, Validators.maxLength(100)]],
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      description: ['', [Validators.required, Validators.maxLength(250)]],
      date: [''],
      mainPicture: ['', Validators.pattern('^(https?:\/\/[^ ]*\.(?:gif|png|jpg|jpeg))')] /*This should be a picture*/
    });

    this.activatedRoute.paramMap.subscribe(paraMap => {
      if (!paraMap.has('updateInfoBannerId')) {
        return;
      }
      const updateInfoBannerId = paraMap.get('updateInfoBannerId');
      if (updateInfoBannerId) {
        this.infoBannerId = updateInfoBannerId;
        this.infoBannersService.getInfoBannerByID(this.infoBannerId).then(info => {
          this.infoBannertitle = info.title;
          this.infoBannerDate = info.date;
          this.infoBannerDescription = info.description;
          this.infoBannerImageUrl = info.image_url;
        });
      }
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
