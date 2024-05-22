import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecensioniSService {

  constructor() { }
  private _companyNumberRecSubject = new BehaviorSubject<number>(0);
  companyNumberRec$ = this._companyNumberRecSubject.asObservable();

  updateCompanyNumberRec(numberRec: number) {
    this._companyNumberRecSubject.next(numberRec);
  }
}
