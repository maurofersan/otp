import { Routes } from '@angular/router';

import { otpRoutes } from './features/otp/otp.routes';

/**
 * Main application routes configuration.
 * Defines the routing structure for the OTP microfrontend.
 */
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
