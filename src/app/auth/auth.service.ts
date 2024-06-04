import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { User } from '../modelli/user.models';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { ArticleInterface } from '../modelli/cercaArticoli.models';
import { environment } from '../../environments/environment.development';
export interface Recensione {
  testo: string;
  negozio: string;
  rating: number;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService{
  recensioniCount: number = 0;
  recensioni: string[] = [];
  APIkey=environment.firebaseAPIKey
  signUpURL=`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.APIkey}`
  signInURL=`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.APIkey}`
  isLoggedIn: boolean;
  user : User
  credenzialiErrate: boolean=false;

  constructor(private http: HttpClient, private router: Router) {}
   isUserSignedInWithGoogle(): boolean {
     const user = JSON.parse(localStorage.getItem('user'));
     if (user && user.providerData) {
       return user.providerData.some((provider: { providerId: string; }) => provider.providerId === 'google.com');
     } 
     return false;
   }

  isAuthenticated(){
    return this.isLoggedIn
  }
  signUp(nome:string,email: string, password: string): Observable<any>{
    return this.http.post(this.signUpURL,{nome: nome, email: email, password: password, returnSecureToken: true})
  }
  signIn(email: string, password: string): Observable<any>{
    return this.http.post(this.signInURL,{email: email, password: password, returnSecureToken: true})
    .pipe(
      catchError((error: any) => {
        this.credenzialiErrate = true;
        setTimeout(() => {
          this.credenzialiErrate = false;
        }, 3000);
        return throwError(() => error);
      })
    );
  }
  createUser(nome: string,email: string, id: string, token: string, expirationDate: Date, profileImage: string,profileImageUrl: string){
    this.user = new User(nome || 'default',email,id,token,expirationDate,profileImage,profileImageUrl);
    this.isLoggedIn = true;
  }
  logout(){
    this.isLoggedIn= false
    this.user= null
    localStorage.removeItem('user')
    this.router.navigate(['/'])
  }
useDefaultProfileImage(): void {
  this.user.profileImage = 'assets/img/user.png';
}
updateProfileImage(imageUrl: string): void {
  this.user.profileImage = imageUrl;
}
  pathLogin(){
    this.router.navigate(['/login'])
  }
  pathRegister(){
    this.router.navigate(['/register'])
  }
  getNameFromEmail(email: string){
    const parts =email.split('@');
    const username = parts[0];
    if (username.includes('.')) {
        return username.split('.')[0];
    } else {
        return username;
    }
  }
  getId(){
    return this.user.id;
  }
  //recensioni 
  private recensioniSubjects: { [negozio: string]: BehaviorSubject<Recensione[]> } = {};
  private recensioniSubject = new BehaviorSubject<Recensione[]>([]);
  recensioni$ = this.recensioniSubject.asObservable();

  private recensioneSubject = new BehaviorSubject<Recensione>(null);
  recensione$ = this.recensioneSubject.asObservable();
  
  getRecensioniByNegozio(negozio: string): Observable<Recensione[]> {
    if (!this.recensioniSubjects[negozio]) {
      this.recensioniSubjects[negozio] = new BehaviorSubject<Recensione[]>([]);
    }
    return this.recensioniSubjects[negozio].asObservable();
  }
  aggiungiRecensione(recensione: Recensione) {
    const negozio = recensione.negozio;
    if (!this.recensioniSubjects[negozio]) {
      this.recensioniSubjects[negozio] = new BehaviorSubject<Recensione[]>([]);
    }
    const recensioniAttuali = this.recensioniSubjects[negozio].value;
    const nuoveRecensioni = [...recensioniAttuali, recensione];
    this.recensioniSubjects[negozio].next(nuoveRecensioni);
  }

  inviaRecensione(recensione: Recensione) {
    this.recensioneSubject.next(recensione);
  }
  getRecensioniByCategoria(categoria: string): Observable<Recensione[]> {
    if (!this.recensioniSubjects[categoria]) {
      this.recensioniSubjects[categoria] = new BehaviorSubject<Recensione[]>([]);
    }
    return this.recensioniSubjects[categoria].asObservable();
  }
}
