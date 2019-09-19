import { Injectable, NgZone } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { NgModel } from '@angular/forms';
import { Observable, from, of } from 'rxjs';
import * as firebase from 'firebase';
import { switchMap } from 'rxjs/operators';
// import { User } from './grocery.service
import { User } from './model';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Facebook } from '@ionic-native/facebook/ngx';

// AuthenticateService

@Injectable({
  providedIn: 'root'
})
export class GroceryService {
list;
writePost;
key;

//user$: Observable<any>;

item: Observable<item>;

successMsg = 'Data successfully saved.';

private itemDoc: AngularFirestoreDocument<item>; //item is the name of class you created
 

  constructor(private angularFireStore:AngularFirestore, private afAuth : AngularFireAuth,private router:Router) {
    
  }

   
  registerUser(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(
        res => resolve(res),
        err => reject(err))
    })
   }

   loginUser(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(
        res => resolve(res),
        err => reject(err))
    })
   }
   logoutUser(){
    return new Promise((resolve, reject) => {
      if(firebase.auth().currentUser){
        firebase.auth().signOut()
        .then(() => {
          console.log("LOG Out");
          resolve();
        }).catch((error) => {
          reject();
        });
      }
    })
  }
 
  userDetails(){
    return firebase.auth().currentUser;
  }




   getItem() //first create this method then inject on constructor
      {
   return this.angularFireStore.collection('grocery').valueChanges();// grocery is the name of the service that you used
   }

   post(item,alert)
   {

    this.writePost= this.angularFireStore.collection('grocery');

    this.writePost.add(item).then(()=>{
    });

  }

  update(key,item){
    this.angularFireStore.doc<item>('grocery/' + key).update(item);
  }

  delete(key){
    this.angularFireStore.doc<item>('grocery/' + key).delete();
    this.itemDoc.delete();
  }


  getItem2()
  {
   return this.angularFireStore.collection('grocery').snapshotChanges();
 }

}
  



