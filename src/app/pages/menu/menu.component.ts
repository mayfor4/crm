import { Component, inject, computed, signal, effect } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);

  
  user = signal<User | null>(null);

  constructor() {
    this.authService.user$.subscribe(this.user.set);
  }

  salir() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigateByUrl('');
      },
      error: (error) => {
        console.log('Error ', error);
      }
    });
  }
}
