import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { ElettronicaComponent } from "../elettronica/elettronica.component";
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
@Component({
    selector: 'app-streaming',
    standalone: true,
    templateUrl: './streaming.component.html',
    styleUrl: './streaming.component.css',
    imports: [MatButtonModule,
      ElettronicaComponent,
      CommonModule,
      MatCardModule,
      MatIconModule,
    ]
})
export class StreamingComponent implements OnInit {
  identificatore: "streaming";
  categoria: string;
  constructor(private router: Router,private route: ActivatedRoute, private authService: AuthService) { }
  onRecensioni() {
    this.router.navigate(['/dashboard/recensioni/recensioneStreaming']);
  }
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.categoria = params.get('categoria');
    });
  }





}
