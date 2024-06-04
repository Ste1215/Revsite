import { Component, OnInit } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { AuthService, Recensione } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatBadgeModule} from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-valutazioni-ecommerce',
  standalone: true,
  imports: [CommonModule,MatCardModule,
    MatBadgeModule,MatIconModule,
    MatTabsModule,],
  templateUrl: './valutazioni-ecommerce.component.html',
  styleUrl: './valutazioni-ecommerce.component.css'
})
export class ValutazioniEcommerceComponent implements OnInit{
  profileImageUrl: string='../../../assets/img/user.png';
  constructor(public authService: AuthService){}
  recensioni: string[] = [];
  userNome: string;
  sites: string[] = ['Amazon', 'eBay', 'Etsy','Zalando'];
  recensioniPerSite: { [key: string]: Recensione[] } = {};
  ngOnInit(): void {
    this.sites.forEach(site => {
      this.authService.getRecensioniByNegozio(site).subscribe(recensioni => {
        this.recensioniPerSite[site] = recensioni;
      });
    });
  }
}
