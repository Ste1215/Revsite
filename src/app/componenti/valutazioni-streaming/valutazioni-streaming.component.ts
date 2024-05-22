import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatBadgeModule} from '@angular/material/badge';
import {MatTabsModule} from '@angular/material/tabs';
import { AuthService, Recensione } from '../../auth/auth.service';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-valutazioni-streaming',
  standalone: true,
  imports: [MatTabsModule,CommonModule,MatCardModule,MatBadgeModule,MatIconModule,],
  templateUrl: './valutazioni-streaming.component.html',
  styleUrl: './valutazioni-streaming.component.css'
})
export class ValutazioniStreamingComponent {

  negozi: string[] = ['Youtube', 'Twitch', 'Netflix'];
  recensioniPerNegozi: { [key: string]: Recensione[] } = {};
  userNome: string;
        constructor(public authService: AuthService){}
  ngOnInit(): void {
    this.negozi.forEach(negozio => {
      this.authService.getRecensioniByNegozio(negozio).subscribe(recensioni => {
        this.recensioniPerNegozi[negozio] = recensioni;
      });
    });
  }
  
}
