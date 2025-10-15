import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OtpEntryComponent } from './otp-entry.component';

/**
 * Routes configuration for OTP entry module
 */
const routes: Routes = [
  {
    path: '',
    component: OtpEntryComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./otp.routes').then((m) => m.OTP_ROUTES),
      },
    ],
  },
];

/**
 * OTP Entry Module for microfrontend integration.
 * Provides routing configuration for OTP pages.
 */
@NgModule({
  declarations: [OtpEntryComponent],
  imports: [RouterModule.forChild(routes)],
})
export class OtpEntryModule {}
