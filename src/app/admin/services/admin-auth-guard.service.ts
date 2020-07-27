import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';
import { switchMap, map } from 'rxjs/operators';
import { UserService } from 'shared/services/user-service.service';
import { AppUser } from 'shared/models/app-user';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService) { }

  canActivate() {
    return this.auth.appUser$
      .pipe(map(
        (appUser: AppUser) => {
          return appUser.isAdmin;
        }
      ));
  }
}
