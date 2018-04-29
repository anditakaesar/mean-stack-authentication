import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(public userService: UserService, public router: Router) { }

  ngOnInit() {
  }

  login() {
    this.userService.login().subscribe(() => {
      // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        let redirect = this.userService.redirectUrl ? this.userService.redirectUrl : '/user';

        // Set our navigation extras object
        // that passes on our global query params and fragment
        let navigationExtras: NavigationExtras = {
          queryParamsHandling: 'preserve',
          preserveFragment: true
        };

        // Redirect the user
        this.router.navigate([redirect], navigationExtras);
    });
  }

  logout() {
    this.userService.logout();
  }

}
