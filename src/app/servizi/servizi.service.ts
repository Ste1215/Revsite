import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ServiziService {

  constructor() { }
  private scrollToElementSource = new BehaviorSubject<string>('');

  scrollToElement$ = this.scrollToElementSource.asObservable();

  scrollToElement(id: string): void {
    this.scrollToElementSource.next(id);
  }
  
}
