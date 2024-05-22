import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-piano-pro',
  standalone: true,
  imports: [FormsModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './piano-pro.component.html',
  styleUrl: './piano-pro.component.css'
})
export class PianoProComponent implements OnInit {

  messaggio: boolean;
  isValid: boolean;
  hasPianoPro: boolean = false;
  paymentData = {
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  };
  @ViewChild('paymentForm') paymentForm!: NgForm;
  MessaggioDataScadenza: boolean;
  MessaggioCVV: boolean;
  constructor(private router: Router){}
  ngOnInit(): void {
    this.checkPianoProStatus();
  }


submitPaymentForm(paymentForm:NgForm) {
  const numeroCard= paymentForm.value.cardNumber;
  const dataScadenza = this.paymentData.expiryDate;
  const cvv = this.paymentData.cvv;
  const nomeTitolare = this.paymentData.cardholderName;
  if (numeroCard.length !==16 || isNaN(parseInt(numeroCard))) {
      this.isValid =false;
       this.messaggio=true;
  }
  const [mese, anno] = dataScadenza.split('/');
  const AnnoAttuale =new Date().getFullYear() % 100;
  const MeseAttuale =new Date().getMonth() +1;
  if(isNaN(parseInt(mese)) || isNaN(parseInt(anno)) 
  || parseInt(mese)<1 || parseInt(mese) >12 || parseInt(anno)< AnnoAttuale || 
  (parseInt(anno) === AnnoAttuale && parseInt(mese) < MeseAttuale))
  {
    this.isValid=false;
    this.MessaggioDataScadenza =true;
  }
  if(cvv.length !==3 || isNaN(parseInt(cvv))){
    this.isValid=false;
    this.MessaggioCVV =true;
  }
  if(!nomeTitolare.trim()){
    this.isValid=false;
  }
  if(this.isValid){
    localStorage.setItem('hasPianoPro', 'true');
    this.router.navigate(['/dashboard/categorie']);
     this.paymentForm.resetForm();
  }
}
 checkPianoProStatus() {
  const PianoPro = localStorage.getItem('hasPianoPro');
  if (PianoPro) {
    this.router.navigate(['/dashboard/categorie']);
    this.hasPianoPro=true;
  }else{
    this.hasPianoPro=false;
  }
  }

  cancelPianoPro() {
    localStorage.removeItem('hasPianoPro');
    this.hasPianoPro=false;
  }


}
