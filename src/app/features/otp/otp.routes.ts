import { Routes } from '@angular/router';

export const otpRoutes: Routes = [
  {
    path: 'sms',
    loadComponent: () =>
      import('./pages/otp-sms/otp-sms.page').then((m) => m.OtpSmsPageComponent),
  },
  {
    path: 'email',
    loadComponent: () =>
      import('./pages/otp-email/otp-email.page').then(
        (m) => m.OtpEmailPageComponent
      ),
  },
  {
    path: '',
    redirectTo: 'sms',
    pathMatch: 'full',
  },
];
