import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyDataService{
  private companyNameSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  setCompanyName(name: string) {
    this.companyNameSubject.next(name);
  }

  getCompanyName(){
    return this.companyNameSubject.asObservable();
  }

}
