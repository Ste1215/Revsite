import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService, Recensione } from '../../auth/auth.service';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-recensioni-streaming',
  standalone: true,
  imports: [
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

  constructor(private authService: AuthService,private router: Router) { }
  categoria: 'streaming';
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
  OnRecensioniElettronica(){
    this.router.navigate(['/dashboard/recensioni']);
  }
  inviaRecensione() {
    this.recensioneInviata.emit(this.nuovaRecensione);
    if (this.nuovaRecensione.trim() !== '') {
      const negozio=this.negozioCorrente;
      if (this.recensioni.filter(recensione => recensione.negozio === negozio).length < 10) {
              this.authService.aggiungiRecensione({ testo: this.nuovaRecensione, negozio: this.negozioCorrente  });
      this.nuovaRecensione = '';
      }else{
        alert('sei arrivato ad un massimo di 10 recensioni, sblocca il piano pro per avere recensioni illimitate');
      }
    }
    this.mostraMessaggio=true;
    this.mostraMessaggioValutazioni=true;
    setTimeout(() => {
      this.mostraMessaggio = false;
      this.mostraMessaggioValutazioni=false;
    }, 4000);
  }

}
