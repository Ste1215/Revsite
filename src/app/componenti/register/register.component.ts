import { Component, OnInit } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormControl, FormsModule,NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  
  constructor(private authService: AuthService, private router: Router){}
  ngOnInit(): void {}
  onSubmit(form: NgForm){
    const nome= form.value.nome;
    const email =form.value.email;
    const password =form.value.password;
    this.authService.signUp(nome,email,password)
    .subscribe((data: any) => {
      console.log(data)
    })
    form.reset();
    this.router.navigate(['/login']);
  }
  atLogin(){
    this.router.navigate(['/login'])
  }
  atHome(){
    this.router.navigate(['/'])
  }
}
