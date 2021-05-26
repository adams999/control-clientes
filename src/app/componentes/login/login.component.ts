import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(
    private route: Router,
    private flashMessages: FlashMessagesService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.loginService.getAuth().subscribe((auth) => {
      if (auth) {
        this.route.navigate(['/']);
      }
    });
  }

  login() {
    this.loginService
      .login(this.email, this.password)
      .then((res) => {
        this.route.navigate(['/']);
      })
      .catch((err) => {
        this.flashMessages.show(err.message, {
          cssClass: 'alert-danger',
          timeout: 4000,
        });
      });
  }
}
