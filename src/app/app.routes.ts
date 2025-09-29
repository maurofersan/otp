import { Routes } from '@angular/router';

import { OTP_ROUTES } from './features/otp.routes';

export const routes: Routes = [
  {
    path: '',
    children: OTP_ROUTES,
  },
];
