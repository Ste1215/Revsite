import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NegozioService {

  constructor() { }

  negozioCorrente: string = '';
  aziendaCorrente: string= '';
  setNegozioCorrente(negozio: string) {
    this.negozioCorrente = negozio;
  }
  getNegozioCorrente(): string {
    return this.negozioCorrente;
  }
  setAziendaCorrente(azienda: string) {
    this.aziendaCorrente = azienda;
  }
  getAziendaCorrente(): string {
    return this.aziendaCorrente;
  }

}
