import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { ElettronicaComponent } from "../elettronica/elettronica.component";

@Component({
    selector: 'app-e-commerce',
    standalone: true,
    templateUrl: './e-commerce.component.html',
    styleUrl: './e-commerce.component.css',
    imports: [ElettronicaComponent]
})
export class ECommerceComponent {
  identificatore: "Ecommerce";
  categoria: string= "Negozi Online";

  constructor(private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.categoria = params.get('categoria');
    });
  }
}
