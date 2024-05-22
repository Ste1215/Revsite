import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSidenavModule} from '@angular/material/sidenav';
import { AuthService } from './auth/auth.service';
import { FooterComponent } from "./componenti/footer/footer.component";
import { CategorieComponent } from "./componenti/categorie/categorie.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [
        MatSidenavModule,
        MatButtonModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        RouterOutlet,
        FooterComponent,
        CategorieComponent
    ],
})
export class AppComponent implements OnInit{
  title = 'Revsite';
 constructor(private authService: AuthService){}
  ngOnInit(): void {
    if(localStorage.getItem('user')){
      const user = JSON.parse(localStorage.getItem('user'))
      this.authService.createUser(user.email,user.nome, user.id, user._token, user._expirationDate, user.profileImage, user.profileImageUrl);
    }
  }
 onLogout(){
  this.authService.logout();
 }
}
