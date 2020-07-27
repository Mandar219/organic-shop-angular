import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { UserService } from 'shared/services/user-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(private userService: UserService,
     private afAuth: AngularFireAuth,
     private route: ActivatedRoute,
     private router: Router) { 
    this.user$ = afAuth.authState;
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    var provider = new firebase.auth.GoogleAuthProvider();
    this.afAuth.signInWithPopup(provider).then(result => {
      let token = result.credential.providerId;
      let user = result.user;
    });
  }

  logout() {
    this.afAuth.signOut();
    this.router.navigate(['/']);
  }

  get appUser$() {
    return this.user$.pipe(
      switchMap(
        user => {
          if(user) 
            return this.userService.get(user.uid);

          return of(null);
        }
      )
    );
  }
}
