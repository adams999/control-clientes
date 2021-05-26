import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  email!:string;
  password!: string;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private fashMessage: FlashMessagesService
  ) {}

  ngOnInit(): void {
    this.loginService.getAuth().subscribe((auth) => {
      if (auth) {
        this.router.navigate(['/']);
      }
    });
  }

  registro() {
    this.loginService
      .registrarse(this.email, this.password)
      .then((res) => {
        this.router.navigate(['/']);
      })
      .catch((err) => {
        this.fashMessage.show(err.message, {
          cssClass: 'alert-danger',
          timeaut: 4000,
        });
      });
  }
}
