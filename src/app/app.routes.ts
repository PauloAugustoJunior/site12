import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', title: 'Nexo | Tecnologia que conecta estratégia e execução', loadComponent: () => import('./pages/home').then(module => module.Home) },
  { path: '**', redirectTo: '' },
];
