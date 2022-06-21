import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/utils/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  constructor(public router: Router, public authService :  AuthService) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['weather']);
    }
  }

}
