import { Component, Input, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService, Recensione } from '../../auth/auth.service';
import { RecensioniComponent } from "../recensioni/recensioni.component";
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';

@Component({
    selector: 'app-elettronica',
    standalone: true,
    templateUrl: './elettronica.component.html',
    styleUrl: './elettronica.component.css',
    imports: [
      MatDialogModule,
      MatFormFieldModule,
      MatInputModule,
      MatTableModule,
        CommonModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        RecensioniComponent,
    ]
})
export class ElettronicaComponent implements OnInit{

  negozi =[
    {nome: "Mediaworld", numeroRecensioni: 0},
    {nome: "Euronics", numeroRecensioni: 0},
    {nome: "Unieuro", numeroRecensioni: 0},
  ];
  aziende=[
    {nome: "Youtube", numeroRecensioni: 0},
    {nome: "Twitch", numeroRecensioni: 0},
    {nome: "Netflix", numeroRecensioni: 0},
  ];
  numeroRecensioni: number = 0;
  recensioneInseritaDallUtente: string;
  isElettronicaPage: boolean;
@Input() categoria: string;
@Input() identificatore: string;

  
  constructor(public dialog: MatDialog,private route: ActivatedRoute,private router: Router,public authService: AuthService){}
  ngOnInit(): void {
    this.isElettronicaPage = this.router.url.includes('/elettronica');
  if(this.isElettronicaPage ){
      this.route.paramMap.subscribe(params => {
      this.categoria = params.get('categoria');
    });
    this.authService.getRecensioniByNegozio('Mediaworld').subscribe(recensioni => {
      this.negozi[0].numeroRecensioni = recensioni.length;
    });
    this.authService.getRecensioniByNegozio('Euronics').subscribe(recensioni => {
      this.negozi[1].numeroRecensioni = recensioni.length;
    });
    this.authService.getRecensioniByNegozio('Unieuro').subscribe(recensioni => {
      this.negozi[2].numeroRecensioni = recensioni.length;
    });
    this.authService.recensione$.subscribe(recensione => {
      if (recensione) {
        const negozioIndex = this.negozi.findIndex(negozio => negozio.nome === recensione.negozio);
        if (negozioIndex !== -1) {
          this.negozi[negozioIndex].numeroRecensioni++;
        }
      }
    });
    }
    //Streaming componente logica aziende(non negozio)
    this.route.paramMap.subscribe(params => {
      this.categoria = params.get('categoria');
    });
    this.authService.getRecensioniByNegozio('Youtube').subscribe(recensioni => {
      this.aziende[0].numeroRecensioni = recensioni.length;
    });
    this.authService.getRecensioniByNegozio('Twitch').subscribe(recensioni => {
      this.aziende[1].numeroRecensioni = recensioni.length;
    });
    this.authService.getRecensioniByNegozio('Netflix').subscribe(recensioni => {
      this.aziende[2].numeroRecensioni = recensioni.length;
    });
    this.authService.recensione$.subscribe(recensione => {
      if (recensione) {
        const negozioIndex = this.negozi.findIndex(negozio => negozio.nome === recensione.negozio);
        if (negozioIndex !== -1) {
          this.negozi[negozioIndex].numeroRecensioni++;
        }
      }
    });
    
}
gestisciNuovaRecensioneInviata(nuovaRecensione: string, negozio: string) {
      this.numeroRecensioni++;
      const recensione: Recensione = {
        testo: nuovaRecensione,
        negozio: negozio,
      };
      this.authService.aggiungiRecensione(recensione);
    }

  // gestisciNuovaRecensioneInviata(nuovaRecensione: string) {
  //   this.numeroRecensioni++;
  //   const recensione: Recensione ={
  //     testo: nuovaRecensione,
  //     negozio: 'Mediaworld',
  //   }
  //   this.authService.aggiungiRecensione(recensione);
  //  }
   
   
   //this.recensioneInseritaDallUtente;
  color= "orange";
  onRecensioni(){
    this.router.navigate(['/dashboard/recensioni']);
  }
  onRecensioniStreaming(){
    this.router.navigate(['/dashboard/recensioni/recensioneStreaming']);
  }
  onValutazioni(){
    this.router.navigate(['/dashboard/valutazioni']);
  }
  onValutazioniStreaming() {
 this.router.navigate(['/dashboard/streaming/ValutazioniStreaming']); 
}
}
