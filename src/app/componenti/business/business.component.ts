import { HttpClient } from '@angular/common/http';
import {  Component, OnInit} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../auth/auth.service';
import { AgencyBusinessService } from '../../servizi/Company.service';
import { Router } from '@angular/router';
import { CompanyDataService } from '../../servizi/company-data.service';

@Component({
  selector: 'app-business',
  standalone: true,
  imports: [CommonModule, 
          MatFormFieldModule,
          FormsModule,
          MatIconModule,
        ],
  templateUrl: './business.component.html',
  styleUrl: './business.component.css'
})
export class BusinessComponent implements OnInit{
  nameAgency: any;
  blockVisible: boolean=false;

  constructor(private aziendaDatiService: CompanyDataService,private aziendaService: AgencyBusinessService,private router: Router){}

  search() {
     const IsAgencyPresent=this.aziendaService.checkCompany(this.nameAgency);
     if(IsAgencyPresent){
        this.aziendaDatiService.setCompanyName(this.nameAgency);
        this.router.navigate(['/dashboard/categorie/business/company']);
     }else{
      this.blockVisible=true;
     }
  }
  
  ngOnInit(): void {}

}
