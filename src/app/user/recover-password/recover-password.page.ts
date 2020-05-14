import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.page.html',
  styleUrls: ['./recover-password.page.scss'],
})
/**
   * USID: M4NG2  
   * USID: M4NC3
   * Page controller RecoverPasswordPage
   */
export class RecoverPasswordPage implements OnInit {
  
  updateBookingForm: FormGroup;
  /**
   * USID: M4NG2  
   * USID: M4NC3
   * Get email
   */
  get email() {
    return this.newCenterForm.get('email');
  }

  public errorMessages = {
    email: [
      { type: 'required', message: 'Email es requerido' },
      { type: 'patter', message: 'La entrada debe estar en formato de email'}
    ]
   
  };

  newCenterForm = this.formBuilder.group({
    
    email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
  
  });
  
  /**
   * @param  {ActivatedRoute} privateactivatedRoute
   * @param  {AuthService} privateauthService
   * @param  {Router} privaterouter
   * @param  {AlertController} privatealertCtrl
   * @param  {NavController} privatenavCtrl
   * @param  {FormBuilder} publicformBuilder
   * @param  {ToastController} privatetoastCtrl
   * USID: M4NG2  
   * USID: M4NC3
   * Constructor
   */
  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    public formBuilder: FormBuilder,
    private toastCtrl: ToastController
  ) { }
  /**
   * USID: M4NG2  
   * USID: M4NC3
   * Runs when the page is initiated
   */
  ngOnInit() {
  }

  /**
   * USID: M4NG2  
   * USID: M4NC3
   * Get email
   */
  public submit() {
    
    

    this.authService.sendPasswordResetEmail(this.newCenterForm.value.email)
        .then(id => {
          // use id
          this.showToast('Si tu email esta registrado te llegara un correo para restablecer tu contraseña');
          this.newCenterForm.reset();
          this.navCtrl.navigateBack(['/']);
        })
        .catch(err => {
          this.showToast('Error al de enviar correo de restauracion, el email no existe.');
          this.newCenterForm.reset();
        });
  }

  /**
   * USID: M4NG2  
   * USID: M4NC3
   * Show a toast with a message
   * @param msg string
   */
  showToast(msg: string) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'middle',
      color: 'success'
    }).then(toast => toast.present());
  }
}
