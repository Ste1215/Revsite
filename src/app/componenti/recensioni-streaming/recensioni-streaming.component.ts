import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService, Recensione } from '../../auth/auth.service';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NegozioService } from '../../servizi/negozio.service';
@Component({
  selector: 'app-recensioni-streaming',
  standalone: true,
  imports: [
    MatIconModule,
    MatCardModule,FormsModule,
    CommonModule,
    MatButtonModule,
    MatChipsModule,MatDialogActions,MatDialogClose,
    MatDialogContent,MatDialogTitle,
  ],
  templateUrl: './recensioni-streaming.component.html',
  styleUrl: './recensioni-streaming.component.css'
})
export class RecensioniStreamingComponent implements OnInit {

  constructor(private authService: AuthService,private router: Router,private negozioService:NegozioService) { }
  categoria: 'streaming';
  rating: number = 0;
  stars = [1, 2, 3, 4, 5]; 
  rate(star: number) {
    this.rating = star;
  }
  get selectedAzienda(): string {
    return this.negozioService.aziendaCorrente;
  }
  recensioni: Recensione[] = [];
  mostraMessaggio: boolean= false;
  mostraMessaggioValutazioni:boolean= false;
  ngOnInit(): void {
    this.authService.getRecensioniByNegozio('Youtube').subscribe(recensioni => {
      this.recensioni = recensioni;
    });
    this.authService.getRecensioniByNegozio('Twitch').subscribe(recensioni => {
      this.recensioni = recensioni;
    });
    this.authService.getRecensioniByNegozio('Netflix').subscribe(recensioni => {
      this.recensioni = recensioni;
    });
    this.authService.getRecensioniByNegozio('Disney').subscribe(recensioni => {
      this.recensioni = recensioni;
    });
  }
  @Output() recensioneInviata = new EventEmitter<string>();
  mostraRecensione: boolean = false;
  mostraBottone: boolean = true;
  nuovaRecensione: string = '';
  negozioCorrente: string = 'Youtube';

  selezionaNegozio(negozio: string){
    this.negozioCorrente = negozio;
  }
  OnValutazioniStreaming(){
    this.router.navigate(['/dashboard/streaming/ValutazioniStreaming']);
  }
  OnRecensioniNegoziOnline(){
    this.router.navigate(['/dashboard/recensioni/recensioniNegoziOnline']);
  }
  inviaRecensione() {
    this.recensioneInviata.emit(this.nuovaRecensione);
    if (this.nuovaRecensione.trim() !== '') {
      const negozio=this.negozioCorrente;
      this.authService.aggiungiRecensione({ testo: this.nuovaRecensione, negozio: this.negozioCorrente,rating: this.rating });
      this.nuovaRecensione = '';
    }
    this.mostraMessaggio=true;
    this.mostraMessaggioValutazioni=true;
    setTimeout(() => {
      this.mostraMessaggio = false;
      this.mostraMessaggioValutazioni=false;
    }, 4000);
  }

}
