import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  constructor( public authService: AuthService) { }

  ngOnInit(): void {
  }

  onSumit(formData):void{
    this.authService.crearUsuario(formData.nombre, formData.email, formData.password);
  }

}
