import { Component, OnInit } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { AuthService, Recensione } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatBadgeModule} from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-valutazioni',
  standalone: true,
  imports: [
    MatTabsModule,
    CommonModule,
    MatCardModule,
    MatBadgeModule,
    MatIconModule,
  ],
  templateUrl: './valutazioni.component.html',
  styleUrl: './valutazioni.component.css'
})
export class ValutazioniComponent implements OnInit {
  recensioni: string[] = [];
  userNome: string;
  negozi: string[] = ['Mediaworld', 'Euronics', 'Unieuro'];
  recensioniPerNegozi: { [key: string]: Recensione[] } = {};
        constructor(public authService: AuthService){}
  ngOnInit(): void {
    this.negozi.forEach(negozio => {
      this.authService.getRecensioniByNegozio(negozio).subscribe(recensioni => {
        this.recensioniPerNegozi[negozio] = recensioni;
      });
    });
  }
   getNome(){
    return this.authService.user.nome;
  }
 
  

}
