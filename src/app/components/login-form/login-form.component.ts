import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/utils/services/auth.service';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  @Input()
  googleLoginButtonLoading : Boolean = false;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  onGoogleLogin () {
    this.googleLoginButtonLoading = true;
    this.authService.GoogleAuth()
    .then(() => {this.googleLoginButtonLoading = false;});
  }

}
