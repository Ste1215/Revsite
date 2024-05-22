import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from './snackbar.component';
@Component({
  selector: 'app-pagina3',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl:'./pagina3.component.html',
  styleUrl: './pagina3.component.css'
})
export class PianiAcquistoComponent {

 piani=[
  {tipo: "Piano Gratuito",
  prezzo: "€ 0", 
  acquistato: "in possesso",
  descrizione:"piano gratuito",
  caratteristiche:`fino a 10 recensioni al giorno`,
  caratteristiche2:`fino a 10 recensioni al giorno`,
},

  {tipo: "Piano Premium",
  prezzo: "€ 20.99",
  acquistato: "acquistabile",
  descrizione:"Piano Premium",
  caratteristiche:`Recensioni illimitate`,
  caratteristiche2:`fino a 10 recensioni al giorno`,
},

  {tipo: "Piano Pro",
  prezzo: "€ 39.99",
  acquistato: "acquistabile",
  descrizione:"Piano Pro",
  caratteristiche: "accesso a tutte le categorie",
  caratteristiche2:`fino a 10 recensioni al giorno`,
},
 
]
constructor(private _snackBar: MatSnackBar) {}
  
durationInSeconds: number = 3;

  openSnackBar(piano: number) {
     const snackBarRef = this._snackBar.openFromComponent(SnackBarComponent, {
      duration: this.durationInSeconds * 1000,
    });
  if(piano === 1) {
  snackBarRef.instance.acquistabile=true;
  snackBarRef.instance.giaInPossesso=false;
  }
  else if(piano === 2){
  snackBarRef.instance.acquistabile2=true;
  snackBarRef.instance.giaInPossesso=false;
  snackBarRef.instance.acquistabile=false;
  }
  else{
  snackBarRef.instance.giaInPossesso=true;
  snackBarRef.instance.acquistabile=false;
  }
 }
  

}
