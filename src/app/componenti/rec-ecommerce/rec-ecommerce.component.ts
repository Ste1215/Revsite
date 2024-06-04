import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AuthService, Recensione } from '../../auth/auth.service';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-rec-ecommerce',
  standalone: true,
  imports: [MatButtonModule,
    MatIconModule,
    MatChipsModule,
    FormsModule,
    CommonModule,
    MatCardModule,MatDialogContent,MatDialogTitle,MatDialogClose,MatDialogActions,
  ],
  templateUrl: './rec-ecommerce.component.html',
  styleUrl: './rec-ecommerce.component.css'
})
export class RecEcommerceComponent implements OnInit{

  recensioni: Recensione[] = [];
  @Output() recensioneInviata = new EventEmitter<string>();
  mostraMessaggio: boolean= false;
  mostraRecensione: boolean = false;
  mostraBottone: boolean = true;
  nuovaRecensione: string = '';
  negozioCorrente: string = 'Amazon';
  mostraMessaggioValutazioni:boolean= false;
  categoria: 'Negozi Online';
  rating: number = 0;
  stars = [1, 2, 3, 4, 5]; 
  rate(star: number) {
    this.rating = star;
  }
constructor(private authService:AuthService,private router: Router){}
selezionaNegozio(site: string){
  this.negozioCorrente = site;
}
ngOnInit(): void {
  this.authService.getRecensioniByNegozio('Amazon').subscribe(recensioni => {
    this.recensioni = recensioni;
  });
  this.authService.getRecensioniByNegozio('eBay').subscribe(recensioni => {
    this.recensioni = recensioni;
  });
  this.authService.getRecensioniByNegozio('Etsy').subscribe(recensioni => {
    this.recensioni = recensioni;
  });
  this.authService.getRecensioniByNegozio('Zalando').subscribe(recensioni => {
    this.recensioni = recensioni;
  });
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

  onCat(){
  this.router.navigate(['/dashboard/categorie'])
}
OnValutazioniEcommerce() {
  this.router.navigate(['/dashboard/E-commerce/valutazioniNegoziOnline']); 
}


}
