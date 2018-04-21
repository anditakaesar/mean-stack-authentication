import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Login Example';

  checkLogin(uName: string, uPass: string): void {
    // create user object
    // let user: User = new User();
    // user.username = uName;
    // user.password = uPass;

    // this.userService.checkLogin(user);
  }
}
