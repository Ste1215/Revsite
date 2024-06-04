import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
import { NegozioService } from '../../servizi/negozio.service';

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
  
  negozi = [
    { nome: "Mediaworld", numeroRecensioni: 0 ,icona: '/assets/img/logo_mediaworld.png' },
    { nome: "Euronics", numeroRecensioni: 0   ,icona: '/assets/img/logo_euronics.png'},
    { nome: "Unieuro", numeroRecensioni: 0    ,icona: '/assets/img/uniero logo.png'},
    { nome: "Apple", numeroRecensioni: 0      ,icona: '/assets/img/1724px-Apple_logo_grey.svg-removebg-preview.png'},
  ];

  aziende=[
    {nome: "Youtube", numeroRecensioni: 0,icona: '/assets/img/yt.png'},
    {nome: "Twitch", numeroRecensioni: 0,icona: '/assets/img/twitch-logo.png'},
    {nome: "Netflix", numeroRecensioni: 0,icona: '/assets/img/netflix-logo.png'},
    {nome: "Disney", numeroRecensioni: 0,icona: '/assets/img/disneyPlus.png'},
  ];
  sites = [
    {nome: "Amazon", numeroRecensioni: 0  ,icona: '/assets/img/Amazon-logo.png'},
    {nome: "eBay", numeroRecensioni: 0    ,icona: '/assets/img/eb.png'},
    {nome: "Etsy", numeroRecensioni: 0    ,icona: '/assets/img/Etsy-logo.png'},
    {nome: "Zalando", numeroRecensioni: 0 ,icona: '/assets/img/logo-zalando.png'},
  ];

  numeroRecensioni: number = 0;
  recensioneInseritaDallUtente: string;
  isElettronicaPage: boolean;
@Input() categoria: string;
@Input() identificatore: string;
@Output() recensioneSelezionata = new EventEmitter<string>();
  isStreamingPage: boolean;
  isEcommercePage: boolean;
stars= Array(5);
  
  constructor(private negozioService: NegozioService,public dialog: MatDialog,private route: ActivatedRoute,private router: Router,public authService: AuthService){}
  ngOnInit(): void {
  this.categoria = this.route.snapshot.paramMap.get('categoria');
  this.isStreamingPage=this.router.url.includes('/streaming');
  this.isElettronicaPage = this.router.url.includes('/elettronica');
  this.isEcommercePage = this.router.url.includes('/E-commerce');
  if(this.isElettronicaPage ){
    this.negozi.forEach((negozio, index) => {
      this.authService.getRecensioniByNegozio(negozio.nome).subscribe(recensioni => {
        this.negozi[index].numeroRecensioni = recensioni.length;
      });
    });
    this.authService.recensione$.subscribe(recensione => {
      if (recensione) {
        const negozioIndex = this.negozi.findIndex(negozio => negozio.nome === recensione.negozio);
        if (negozioIndex !== -1) {
          this.negozi[negozioIndex].numeroRecensioni++;
        }
      }
    });
    }else if (this.isStreamingPage) {
    //Streaming componente logica aziende(non negozio)
    this.aziende.forEach((azienda, index) => {
      this.authService.getRecensioniByNegozio(azienda.nome).subscribe(recensioni => {
        this.aziende[index].numeroRecensioni = recensioni.length;
      });
    });
    this.authService.recensione$.subscribe(recensione => {
      if (recensione) {
        const aziendaIndex = this.aziende.findIndex(azienda => azienda.nome === recensione.negozio);
        if (aziendaIndex !== -1) {
          this.aziende[aziendaIndex].numeroRecensioni++;
        }
      }
    });
  }else if(this.isEcommercePage){
    this.sites.forEach((site, index) => {
      this.authService.getRecensioniByNegozio(site.nome).subscribe(recensioni => {
        this.sites[index].numeroRecensioni = recensioni.length;
      });
    });
    this.authService.recensione$.subscribe(recensione => {
      if (recensione) {
        const siteIndex = this.sites.findIndex(site => site.nome === recensione.negozio);
        if (siteIndex !== -1) {
          this.sites[siteIndex].numeroRecensioni++;
        }
      }
    });
  }
}
gestisciNuovaRecensioneInviata(nuovaRecensione: string, negozio: string,rating: number) {
      this.numeroRecensioni++;
      const recensione: Recensione = {
        testo: nuovaRecensione,
        negozio: negozio,
        rating: rating
      };
      this.authService.aggiungiRecensione(recensione);
    }
  color= "gold";
  onRecensioni(negozio: string){
    this.router.navigate(['/dashboard/recensioni'], { queryParams: { negozio: negozio } });
  }
  onRecensioniStreaming(azienda: string){
    this.router.navigate(['/dashboard/recensioni/recensioneStreaming'], { queryParams: { azienda: azienda } });
  }
  onRecensioniEcommerce(site: string){
    this.router.navigate(['/dashboard/recensioni/recensioniNegoziOnline'], {queryParams: { site: site } });
  }
  onValutazioniNegoziOnline() {
  this.router.navigate(['/dashboard/E-commerce/valutazioniNegoziOnline']); 
  }
  onValutazioni(){
    this.router.navigate(['/dashboard/valutazioni']);
  }
  onValutazioniStreaming() {
 this.router.navigate(['/dashboard/streaming/ValutazioniStreaming']); 
}

}
