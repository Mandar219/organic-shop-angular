import { Component, OnInit } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'shared/services/user-service.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isDesktop: boolean;

  constructor(
    private auth: AuthService, 
    router: Router, 
    private userService: UserService,
    private detectorService: DeviceDetectorService) {
    auth.user$.subscribe(user => {
      if(user) {
        userService.save(user);
        
        let returnUrl = localStorage.getItem('returnUrl');
        if(returnUrl) {
          localStorage.removeItem('returnUrl');
          router.navigateByUrl(returnUrl);
        }
      }
    });
  }

  ngOnInit() {
    this.isDesktop = this.detectorService.isDesktop();
  }
}
