import { Component } from '@angular/core';
import { User } from './classes/user';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Login Example';

  constructor (public userService: UserService) { }
}
