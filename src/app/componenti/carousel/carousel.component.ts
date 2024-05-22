import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule,
    MatIconModule,
  ],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent {
  @Input() slides: any[] = [];
  @Input() indicatorsVisible = true;
  @Input() animationSpeed = 200;
  @Input() autoPlay= true;
  @Input() autoPlaySpeed = 3000;
  CurrentSlide=0;
  hidden=false;
  next(){
    let CurrentSlide=  (this.CurrentSlide + 1) % this.slides.length;
    this.jumpToSlide(CurrentSlide);
  }
  prev(){
      let  CurrentSlide=(this.CurrentSlide - 1 + this.slides.length) % this.slides.length;
      this.jumpToSlide(CurrentSlide);
  }
  jumpToSlide(index :number){
    this.hidden=true;
    setTimeout(() => {
       this.CurrentSlide=index;
       this.hidden=false;
    },this.animationSpeed);
  }

  constructor(){
     if(this.autoPlay){
       setInterval(() =>{
          this.next();
       },this.autoPlaySpeed);
     }
    }
}
