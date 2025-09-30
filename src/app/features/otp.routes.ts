import { Routes } from '@angular/router';

export const OTP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'sms',
    pathMatch: 'full',
  },
  {
    path: 'sms',
    loadComponent: () =>
      import('./otp/pages/otp-sms/otp-sms.page').then(
        (m) => m.OtpSmsPageComponent
      ),
  },
  {
    path: 'email',
    loadComponent: () =>
      import('./otp/pages/otp-email/otp-email.page').then(
        (m) => m.OtpEmailPageComponent
      ),
  },
];
