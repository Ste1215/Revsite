import { Component, Input, inject } from "@angular/core";
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from "@angular/common";
import { AuthService } from "../../auth/auth.service";
import { Route, Router } from "@angular/router";


@Component({
    selector: 'snackbar',
    templateUrl: './snackbar.component.html',
    styleUrl: './snackbar.component.css',
    standalone: true,
    imports:[
      CommonModule,
      MatFormFieldModule,
      MatInputModule,
      FormsModule,
      MatButtonModule,
    ],
  })
export class SnackBarComponent {
constructor(private authService: AuthService,private router: Router){}
@Input() giaInPossesso: boolean = false;
@Input() acquistabile: boolean = false;
@Input() acquistabile2: boolean = false;
snackBarRef = inject(MatSnackBarRef);

onPianoPro(){
this.router.navigate(['dashboard/piani/pro']);
}



    
}