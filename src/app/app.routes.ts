import { Routes } from '@angular/router';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { CampaignsComponent } from './pages/campaigns/campaigns.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { EmailComponent } from './pages/email/email.component';
import { HomeComponent } from './pages/home/home.component';
import { SubformsComponent } from './pages/subforms/subforms.component';
import { MenuComponent } from './pages/menu/menu.component';
import { LoyaltyCampaignsComponent } from './pages/campaigns/loyalty-campaigns/loyalty-campaigns.component';
import { PromotionsComponent } from './pages/campaigns/promotions/promotions.component';
import { EventsComponent } from './pages/events/events.component';
import { CotizacionComponent } from './pages/cotizacion/cotizacion.component';
import { MensajeriaComponent } from './pages/mensajeria/mensajeria.component';
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
    path: 'subforms',
    component: SubformsComponent,
  },
  {
    path: 'cotizacion',
    component: CotizacionComponent,
  },
  {
    path: 'mensajeria',
    component: MensajeriaComponent,
  },



  {
    path: '**',
    redirectTo: 'home',
  },
];
