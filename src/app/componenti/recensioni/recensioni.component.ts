import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { AuthService } from '../../auth/auth.service'
import { FormsModule } from '@angular/forms';
import{ ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatChipsModule} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatIconModule} from '@angular/material/icon';
import {AsyncPipe} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common'; 
import { Router } from '@angular/router';
import { RecensioniSService } from '../../servizi/recensioni-s.service';

@Component({
  selector: 'app-recensioni',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatButtonModule,
    FormsModule,
    MatDialogTitle,
     MatDialogContent,
      MatDialogActions, 
      MatDialogClose,
      MatChipsModule,
      MatFormFieldModule,
      MatChipsModule,
      MatIconModule,
      MatAutocompleteModule,
      ReactiveFormsModule,
      AsyncPipe,
  ],
  templateUrl: './recensioni.component.html',
  styleUrl: './recensioni.component.css'
})
export class RecensioniComponent implements OnInit{
  @Output() recensioneInviata = new EventEmitter<string>();
  recensioni: {testo: string; negozio: string;}[] = [];
  ngOnInit(): void {}
  constructor(private recensioniService: RecensioniSService,private authService: AuthService,private router: Router) {}
  mostraRecensione: boolean = false;
  mostraBottone: boolean = true;
  nuovaRecensione: string = '';
  negozioCorrente: string = 'Mediaworld';
  mostraMessaggio:boolean=false;
  mostraMessaggioValutazioni:boolean=false;



  selezionaNegozio(negozio: string){
    this.negozioCorrente = negozio;
  }
  inviaRecensione() {
    // evento con la nuova recensione
    this.recensioneInviata.emit(this.nuovaRecensione);
    // reset del textArea (dove inserisco la recensione)
    if (this.nuovaRecensione.trim() !== '') {
      const negozio = this.negozioCorrente;
    const nuovaRecensione ={ testo: this.nuovaRecensione, negozio: this.negozioCorrente};
      this.authService.aggiungiRecensione(nuovaRecensione);
      this.recensioni.push(nuovaRecensione);
      this.nuovaRecensione = '';
      this.recensioniService.updateCompanyNumberRec(this.recensioni.length);
    }
    this.mostraMessaggio=true;
    this.mostraMessaggioValutazioni=true;
    setTimeout(() => {
      this.mostraMessaggio = false;
      this.mostraMessaggioValutazioni= false;
    }, 4000);
  }
  pathSteamingCategoria(){
    this.router.navigate(['/dashboard/recensioni/recensioneStreaming']);
  }
  onValutazioni(){
    this.router.navigate(['/dashboard/valutazioni']);
  }

}
