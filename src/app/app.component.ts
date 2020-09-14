import { Store } from '@ngrx/store';
import { AuthService } from './auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ingresoEgresoApp';
  constructor( private authService:AuthService ,
              private store:Store){
  }
  ngOnInit(){

    
    this.authService.initAuthListerer()
    
  }
}
