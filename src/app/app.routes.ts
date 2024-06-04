import { Routes } from '@angular/router';
import { DashboardComponent } from './componenti/dashboard/dashboard.component';
import { LoginComponent } from './componenti/login/login.component';
import { RegisterComponent } from './componenti/register/register.component';
import { CategorieComponent } from './componenti/categorie/categorie.component';
import { RecensioniComponent } from './componenti/recensioni/recensioni.component';
import { PianiAcquistoComponent } from './componenti/pianiAcquisto/pagina3.component';
import { AuthGuardChildren,AuthGuardParent } from './auth/auth.guard';
import { NotfoundComponent } from './componenti/notfound/notfound.component';
import { HomeComponent } from './componenti/home/home.component';
import { ElettronicaComponent } from './componenti/elettronica/elettronica.component';
import { StreamingComponent } from './componenti/streaming/streaming.component';
import { ValutazioniComponent } from './componenti/valutazioni/valutazioni.component';
import { ECommerceComponent } from './componenti/e-commerce/e-commerce.component';
import { RecensioniStreamingComponent } from './componenti/recensioni-streaming/recensioni-streaming.component';
import { ValutazioniStreamingComponent } from './componenti/valutazioni-streaming/valutazioni-streaming.component';
import { PianoProComponent } from './componenti/piano-pro/piano-pro.component';
import { BusinessComponent } from './componenti/business/business.component';
import { AziendaCercataComponent } from './componenti/azienda-cercata/azienda-cercata.component';
import { RecEcommerceComponent } from './componenti/rec-ecommerce/rec-ecommerce.component';
import { ValutazioniEcommerceComponent } from './componenti/valutazioni-ecommerce/valutazioni-ecommerce.component';


export const routes: Routes = [

    {path: '',pathMatch:'full',component: HomeComponent},
    {path: 'dashboard', component: DashboardComponent,canActivate:[AuthGuardParent],canActivateChild:[AuthGuardChildren],
    children: [
        {path:'categorie',component:CategorieComponent},
        {path:'recensioni',component:RecensioniComponent},
        {path:'piani', component: PianiAcquistoComponent},
        {path:'elettronica',component: ElettronicaComponent},
        {path:'streaming',component: StreamingComponent},
        {path:'E-commerce',component: ECommerceComponent},
        {path:'recensioni/recensioniNegoziOnline',component: RecEcommerceComponent},
        {path:'E-commerce/valutazioniNegoziOnline',component: ValutazioniEcommerceComponent},
        {path:'valutazioni',component: ValutazioniComponent},
        {path:'recensioni/recensioneStreaming',component: RecensioniStreamingComponent},
        {path:'streaming/ValutazioniStreaming',component: ValutazioniStreamingComponent},
        {path:'piani/pro',component: PianoProComponent},
        {path:'categorie/business',component:BusinessComponent},
        {path:'categorie/business/company',component:AziendaCercataComponent},
    ]},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: '404', component: NotfoundComponent},
    {path: '**', redirectTo:'/404'},
];
