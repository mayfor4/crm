import { Routes } from '@angular/router';
import { AccountsComponent } from './pages/accounts/accounts.component'; 
import { CampaignsComponent } from './pages/campaigns/campaigns.component'; 
import { ContactsComponent } from './pages/contacts/contacts.component'; 
import { EmailComponent } from './pages/email/email.component'; 
import { HomeComponent } from './pages/home/home.component';
import { SubformsComponent } from './pages/subforms/subforms.component';
import { MenuComponent } from './pages/menu/menu.component';
import { EventsComponent } from './pages/events/events.component';


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
        path: 'contacts',
        component: ContactsComponent,

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
        path: '**',
        redirectTo: 'home',
    },
];
