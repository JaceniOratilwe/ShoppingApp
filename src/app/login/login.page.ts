import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { NavController, AlertController, Platform, LoadingController } from '@ionic/angular';
import { GroceryService } from '../services/grocery.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
// import { observable} from 'rxjs/observable';
import { GooglePlus } from '@ionic-native/google-plus';

import * as firebase from 'firebase';
import { from, Observable } from 'rxjs';
import { loadingController } from '@ionic/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
// import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';




@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  [x: string]: any;

  // FB_APP_ID: number = 2364902723837181;
  
  validations_form: FormGroup;
  errorMessage: string = '';
  recaptchaVerifier: auth.RecaptchaVerifier;

 

  public recaptchaVerifier2:firebase.auth.RecaptchaVerifier; //phone
  googlePlus: any;
 
  constructor(public afAuth: AngularFireAuth, private router : Router,private navCtrl: NavController,private authService: GroceryService,private formBuilder: FormBuilder, public alertCtrl:AlertController,  private platform:Platform,private splashScreen: SplashScreen,private statusBar: StatusBar, private loadingCntrl: LoadingController) { 
   
  }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });

    
  }

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ]
  };

  loginUser(value){
    this.authService.loginUser(value)
    .then(res => {
      console.log(res);
      this.errorMessage = "";
      this.navCtrl.navigateForward('/home');
    }, err => {
      this.errorMessage = err.message;
    })
  }

 
  goToRegisterPage(){
    this.navCtrl.navigateForward('/register');
  }

  //END OF EMAIL LOGIN

  ionViewDidLoad() {
    this.recaptchaVerifier2 = new firebase.auth.RecaptchaVerifier('recaptcha-container');
  }

  signIn(phoneNumber: number){
    const appVerifier = this.recaptchaVerifier;
    const phoneNumberString = "+" + phoneNumber;
    firebase.auth().signInWithPhoneNumber(phoneNumberString, appVerifier)
      .then( async confirmationResult => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        let alert = await this.alertCtrl.create({
        message: 'Enter the Confirmation code',
        inputs: [{ name: 'confirmationCode', placeholder: 'Confirmation Code' }],
        buttons: [
          { text: 'Cancel',
            handler: data => { console.log('Cancel clicked'); }
          },
          { text: 'Send',
            handler: data => {
              confirmationResult.confirm(data.confirmationCode)
              .then(function (result) {
                // User signed in successfully.
                console.log(this.route.navigateByUrl("home"));
                // ...
              }).catch(function (error) {
                // User couldn't sign in (bad verification code?)
                // ...
              });
            }
          }
        ]
      });
      await alert.present();
    })
    .catch(function (error) {
      console.error("SMS not sent", error);
    });
  
  }

  // LOGIN WITH FACEBOOK

  

}