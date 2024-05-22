import { Component,OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatToolbarModule} from '@angular/material/toolbar';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { getAuth, GoogleAuthProvider, signInWithPopup , AuthProvider} from 'firebase/auth';
import { User } from '../../modelli/user.models';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatIconModule,
    CommonModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  hide = true;
  loading = false;
  constructor(public authService: AuthService,private router: Router){}
  ngOnInit(): void {}
  
  onSubmit(form: NgForm){
    this.loading=true;
    const email =form.value.email;
    const password =form.value.password;
    this.authService.signIn(email,password)
    .subscribe((data: any) => {
     const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)
      this.authService.createUser(data.email, data.nome, data.localId, data.idToken,data.expiresIn, 'assets/img/user.png',data.profileImageUrl)
     localStorage.setItem('user',JSON.stringify(this.authService.user))
     this.router.navigate(['/dashboard/categorie']);
    })
    .add(() => {
      this.loading = false;
      form.reset();
    });
  }

  async loginWithGoogle() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user) {
        localStorage.setItem('user', JSON.stringify({
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL
        }));
        await this.router.navigate(['/dashboard/categorie']);
      }
    } catch (error) {
      console.error(error);
    }
  }

  
atLogin(){
    this.router.navigate(['/register'])
  }



}
