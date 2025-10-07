import { Routes } from '@angular/router';

import { otpRoutes } from './features/otp/otp.routes';

export const routes: Routes = [
  {
    path: 'otp',
    children: otpRoutes,
  },
  {
    path: '',
    redirectTo: '/otp',
    pathMatch: 'full',
  },
];
