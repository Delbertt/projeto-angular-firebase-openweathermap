import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import * as auth from 'firebase/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
   }

   get isLoggedIn(): Boolean {
     const user = JSON.parse(localStorage.getItem('user')!);
     return (user !== null && user.emailVerified !== false ? true : false); 
   }

   GoogleAuth() {
     return this.AuthLogin(new auth.GoogleAuthProvider())
     .then((res: any) => {
       if (res) {
         this.router.navigate(['weather']);
       }
     })
   }

   AuthLogin(provider: any) {
     return this.afAuth
     .signInWithPopup(provider)
     .then((result) => {
       this.ngZone.run(() => {
        setTimeout(() => {this.router.navigate(['weather']);}, 1000) // condicional p/ enviroment.production ?? 
       });
       this.SetUserData(result.user);
     })
     .catch((error) => {
       window.alert(error);
     })
   }

   SetUserData(user: any) {
     const userRef: AngularFirestoreDocument<any> = this.afs.doc(
       `users/${user.uid}`
     )
     const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true
    })
   }

   SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }
}
