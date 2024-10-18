import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { BrowseComponent } from './pages/browse/browse.component';
import { HeaderComponent } from './core/components/header/header.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'browse',
    component: BrowseComponent,
  },
  {
    path: 'header',
    component: HeaderComponent,
  },
];
