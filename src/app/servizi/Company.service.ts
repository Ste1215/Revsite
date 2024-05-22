import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AgencyBusinessService {

  constructor(private authService: AuthService){}


  checkCompany(name: string): boolean {
    const companies = this.getCompanies();
    return companies.some(company => company.nome.toLowerCase() === name.toLowerCase());
  }
  private getCompanies():{nome: string, numeroRecensioni: number }[]{
    return [
      {nome: "Mediaworld", numeroRecensioni: 0},
      {nome: "Euronics", numeroRecensioni: 0},
      {nome: "Unieuro", numeroRecensioni: 0},
      {nome: "Youtube", numeroRecensioni: 0},
      {nome: "Twitch", numeroRecensioni: 0},
      {nome: "Netflix", numeroRecensioni: 0},
    ];
  }
}
