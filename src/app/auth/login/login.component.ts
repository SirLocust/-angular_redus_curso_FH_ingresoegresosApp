import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  loginUsuario(formLogin){
    this.authService.loginUsuario(formLogin.email,formLogin.password)
    // console.log(formLogin)

  }

  

}
