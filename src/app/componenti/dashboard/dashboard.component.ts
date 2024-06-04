import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit,Renderer2,ViewChild } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav'; 
import {MatButtonModule} from '@angular/material/button';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatListModule} from '@angular/material/list';
import { Router, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { AuthService } from '../../auth/auth.service'; 
import { CommonModule } from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { ServiziService } from '../../servizi/servizi.service';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  defaultProfileImageUrl: string = '../../../assets/img/user.png';
  profileImageUrl: string = this.defaultProfileImageUrl;
showResetButton: boolean=false;
onChangeProfileImageClick() {
    const fileInput = document.querySelector('.file-input') as HTMLElement;
    fileInput.click();
}
onFileSelected(event: any) {
  const file: File = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.profileImageUrl = e.target.result;
      this.showResetButton=true;
      localStorage.setItem('profileImageUrl', this.profileImageUrl);
      this.cdr.detectChanges();
    };
    reader.readAsDataURL(file);
  }
}
resetProfileImage() {
  this.profileImageUrl = this.defaultProfileImageUrl;
  this.showResetButton = false;
  localStorage.removeItem('profileImageUrl');
}
  @ViewChild('profil') profilRef: ElementRef;
customImageSelected: boolean = false;
isMenuVisible: boolean = false;
profileImageUrlGoogle: string;
EmailGoogle:string;
panelOpenState = false;
  isHamburgerMenuVisible: boolean =false;
GetEmailGoogle(){
   const userDataGoogle=localStorage.getItem('user');
  if(userDataGoogle){
      const user = JSON.parse(userDataGoogle);
       this.EmailGoogle = user.email;
  }
}
  constructor(private cdr: ChangeDetectorRef,private renderer: Renderer2,private elementRef: ElementRef,public authService: AuthService, private router: Router,private servizi: ServiziService){ 
    this.profileImageUrl = localStorage.getItem('profileImageUrl') || '../../../assets/img/user.png';
  }
  scrollToElement(): void {
    this.servizi.scrollToElement('destinazione');
  }

ngOnInit(): void { 
    const userData = localStorage.getItem('user');
     if (userData) {
       const user = JSON.parse(userData);
       this.profileImageUrlGoogle = user.photoURL;
     }
  if(this.authService.isAuthenticated()){
    this.router.navigate(['/dashboard/categorie']);   
  }
  else if(this.authService.isUserSignedInWithGoogle()){
    window.location.reload();
  }else{
  this.router.navigate(['/']) 
  }
}



toggleHamburgerMenu() {
  this.isHamburgerMenuVisible = !this.isHamburgerMenuVisible;
}
toggleMenu() {
  this.isMenuVisible = !this.isMenuVisible;
}
closeMenu() {
  this.isMenuVisible = false;
}
menuClick(event: MouseEvent) {
  event.stopPropagation(); 
}
onLogOut(){
    this.authService.logout();   
}
pathLogin(){
    this.authService.pathLogin();
}
onCategorie(){
    this.router.navigate(['/dashboard/categorie']);
}
onHome(){
    this.router.navigate(['/']);
}
}
