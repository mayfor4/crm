import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Frecuente } from '../../../models/frecuentes.model';
import { CampaignsService } from '../../../services/campaigns.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-loyalty-campaigns',
  templateUrl: './loyalty-campaigns.component.html',
  imports: [CommonModule],
  styleUrls: ['./loyalty-campaigns.component.css']
})
export class LoyaltyCampaignsComponent {
  
  frecuentes: any;
  frecuente = new Frecuente();

  constructor(private campaignsService: CampaignsService){
    this.getCampaigns();
  }

  async getCampaigns():Promise<void>{
    this.frecuentes = await firstValueFrom(this.campaignsService.getFrecuentes());
  }

  createCampaign(tipo: string): void {
    alert(`Crear campaña de ${tipo}`);
  }

}