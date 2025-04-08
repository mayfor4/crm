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

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'accounts',
    component: AccountsComponent,
  },
  {
    path: 'campaigns',
    component: CampaignsComponent,
  },
  {
    path: 'campaigns/promotions',
    component: PromotionsComponent,
  },
  {
    path: 'campaigns/loyalty-campaigns',
    component: LoyaltyCampaignsComponent,
  },
  {
    path: 'clients',
    component: ClientsComponent,
  },
  {
    path: 'email',
    component: EmailComponent,
  },
  {
    path: 'events',
    component: EventsComponent,
  },
  {
    path: 'event-insert',
    component: EventInsertComponent
  },
  {
    path: 'event-update/:id',
    component: EventUpdateComponent
  },
  {
    path: 'subforms',
    component: SubformsComponent,
  },
  {
    path: 'cotizacion',
    component: CotizacionComponent,
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
