import { Component } from '@angular/core';
import { faChevronDown, faChevronUp, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-email',
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './email.component.html',
  styleUrl: './email.component.css'
})
export class EmailComponent {
  faChevronDown = faChevronDown;
  faChevronUp = faChevronUp;
  showNotifications = true;
  

  notifications = [
    {
      title: 'Invitación al webinar: «Marketing: diferentes enfoques para nutrir los leads de tus clientes»',
      subject: 'Webinar «Marketing: diferentes enfoques para nutrir los leads de tus clientes»',
      campaign: null,
      recipients: 0,
      category: 'Usando un flujo de campaña',
      type: 'event',
    },
    {
      title: 'Invitación al seminario web "Obtención de información analítica al trabajar con 7.X"',
      subject: 'Invitación al seminario web "Obtención de información analítica al trabajar con 7.X"',
      campaign: 'Captación de audiencia para webinar: «Marketing: diferentes enfoques...»',
      recipients: 148,
      category: 'Usando un flujo de campaña',
      type: 'promo',
    },
    {
      title: 'Invitación al seminario web: "Nutrición de leads de clientes"',
      subject: 'Invitación al seminario web: "Nutrición de leads de clientes"',
      campaign: 'Nutrir una necesidad: capturar para el evento',
      recipients: 0,
      category: 'Usando un flujo de campaña',
      type: 'reminder',
    }
  ];

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }
}