import { Routes } from '@angular/router';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { CampaignsComponent } from './pages/campaigns/campaigns.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { EmailComponent } from './pages/email/email.component';
import { HomeComponent } from './pages/home/home.component';
import { SubformsComponent } from './pages/subforms/subforms.component';
import { LoyaltyCampaignsComponent } from './pages/campaigns/loyalty-campaigns/loyalty-campaigns.component';
import { PromotionsComponent } from './pages/campaigns/promotions/promotions.component';
import { EventsComponent } from './pages/events/events.component';
import { EventInsertComponent } from './pages/event-states/event-insert/event-insert.component';
import { EventUpdateComponent } from './pages/event-states/event-update/event-update.component';
import { CotizacionComponent } from './pages/cotizacion/cotizacion.component';
import { MensajeriaComponent } from './pages/mensajeria/mensajeria.component';
import { authGuard } from './auth.guard';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard]
  },
  {
    path: 'accounts',
    component: AccountsComponent,
    canActivate: [authGuard]
  },
  {
    path: 'campaigns',
    component: CampaignsComponent,
    canActivate: [authGuard]
  },
  {
    path: 'campaigns/promotions',
    component: PromotionsComponent,
    canActivate: [authGuard]
  },
  {
    path: 'campaigns/loyalty-campaigns',
    component: LoyaltyCampaignsComponent,
    canActivate: [authGuard]
  },
  {
    path: 'clients',
    component: ClientsComponent,
    canActivate: [authGuard]
  },
  {
    path: 'email',
    component: EmailComponent,
    canActivate: [authGuard]
  },
  {
    path: 'events',
    component: EventsComponent,
    canActivate: [authGuard]
  },
  {
    path: 'event-insert',
    component: EventInsertComponent,
    canActivate: [authGuard]
  },
  {
    path: 'event-update/:id',
    component: EventUpdateComponent,
    canActivate: [authGuard]
  },
  {
    path: 'subforms',
    component: SubformsComponent,
    canActivate: [authGuard]
  },
  {
    path: 'cotizacion',
    component: CotizacionComponent,
    canActivate: [authGuard]
  },
  {
    path: 'mensajeria',
    component: MensajeriaComponent,
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: '',
  },
];
