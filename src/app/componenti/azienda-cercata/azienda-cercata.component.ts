import { Component, OnDestroy, OnInit } from '@angular/core';
import { CompanyDataService } from '../../servizi/company-data.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RecensioniSService } from '../../servizi/recensioni-s.service';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-azienda-cercata',
  standalone: true,
  imports: [CommonModule,MatIconModule],
  templateUrl: './azienda-cercata.component.html',
  styleUrl: './azienda-cercata.component.css'
})
export class AziendaCercataComponent implements OnDestroy,OnInit{
  companyName: string = '';
  companyNumberRec: number;
  private companyNameSubscription: Subscription;
  private companyRecSubscription: Subscription;
  constructor(private companyDataService: CompanyDataService,private recensioniService: RecensioniSService) {}
  ngOnInit() {
    this.companyNameSubscription = this.companyDataService.getCompanyName().subscribe(name => {
      this.companyName = name;
    });
    this.companyRecSubscription = this.recensioniService.companyNumberRec$.subscribe(numberRec => {
      this.companyNumberRec = numberRec;
    });
  }
  ngOnDestroy(): void {
    this.companyNameSubscription.unsubscribe();
    this.companyRecSubscription.unsubscribe();
  }

}
