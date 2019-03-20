import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hide: boolean = true;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  btnClickNavigate(links: Array<string>) {
    this.router.navigate(links);
  }
}
