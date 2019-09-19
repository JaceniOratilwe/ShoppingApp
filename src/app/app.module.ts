import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { GroceryService } from './services/grocery.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Firebase } from '@ionic-native/firebase/ngx';
import { environment } from 'src/environments/environment.prod';
// import { GooglePlus } from '@ionic-native/google-plus';



const firebaseConfig = {
  apiKey: "AIzaSyASc2vmwfkFb5L3T7FyA3ChbzMk2-3tczc",
  authDomain: "shoppingapp-bb319.firebaseapp.com",
  databaseURL: "https://shoppingapp-bb319.firebaseio.com",
  projectId: "shoppingapp-bb319",
  storageBucket: "shoppingapp-bb319.appspot.com",
  messagingSenderId: "1033294551796",
  appId: "1:1033294551796:web:d13d0e950c31b46e"
};
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, AngularFireModule.initializeApp(firebaseConfig,environment), AngularFirestoreModule,  AngularFireDatabaseModule,AngularFireAuthModule,ReactiveFormsModule,
   IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    GroceryService,
   Firebase,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  
}
