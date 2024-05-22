import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private http: HttpClient,private authService: AuthService) {}


  insertPersona(url: string,body: {} ){
    return this.http.post(url, body)
  }
  getPersone(url: string){
    return this.http.get(`${url}?auth=${this.authService.user.token}`)   
  }
  deletePersona(url: string, id: string){
  return this.http.delete(`${url}/${id}.json`)
  }
  patchPersona(url: string, id: string, body: {}){
    return this.http.patch(`${url}/${id}.json`,body)
  }
  putPersona(url: string, id: string, body:{}){
    return this.http.put(`${url}/${id}.json`,body)
  }
}
