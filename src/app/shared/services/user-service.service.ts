import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFirestore) { }

  save(user: firebase.User) {
    this.db.collection('users').doc(user.uid).set({
      name: user.displayName,
      email: user.email,
      isAdmin: (user.uid === 'AKZaWCm4TJXfjflIV1OvZRshl7s2') ? true : false
    }); 
  }

  get(uid: string) {
    return this.db.collection('users').doc(uid).valueChanges();
  }
}
