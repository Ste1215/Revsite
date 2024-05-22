import { Component, ElementRef, OnInit } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { FirebaseService } from '../../servizi/firebase.service';
import {MatTabsModule} from '@angular/material/tabs';
import { CategorieInterface } from '../../modelli/categorie.models';
import {  ReactiveFormsModule } from '@angular/forms';
import { ArticleInterface } from '../../modelli/cercaArticoli.models';
import { ServiziService } from '../../servizi/servizi.service';
import { CarouselComponent } from "../carousel/carousel.component";
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
const enterTransition = transition(':enter',[
  style({
    opacity: 0,
  }),
  animate('1s ease-in',style({opacity: 1})),
]);
const exitTransition = transition(':leave',[
  style({
    opacity: 1,
  }),
  animate('1s ease-out',style({opacity: 0})),
]);
const fadeIn =trigger('fadeIn',[enterTransition]);
const fadeOut =trigger('fadeOut',[exitTransition]);
@Component({
    selector: 'app-categorie',
    standalone: true,
    templateUrl: './categorie.component.html',
    styleUrl: './categorie.component.css',
    animations: [fadeIn, fadeOut],
    imports: [
      MatDividerModule,
       MatButtonModule,
        MatTabsModule,
        FormsModule,
        RouterModule,
        MatIconModule,
        MatToolbarModule,
        CommonModule,
        ReactiveFormsModule,
        CarouselComponent
    ]
})
export class CategorieComponent implements OnInit  {

  constructor(private servizi: ServiziService,private elRef: ElementRef){}
  slides: any[] =[
    {
      url: 'assets/img/sliderImg.jpg',
    },
    {
      url: 'assets/img/sliderImg3.png',
    },
    {
      url: 'assets/img/sliderImg2.jpg',
    },
  ];
  
  
  ngOnInit(): void {
    this.servizi.scrollToElement$.subscribe(id => {
      if (id){
        const element = this.elRef.nativeElement.querySelector('#' + id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  }

}
