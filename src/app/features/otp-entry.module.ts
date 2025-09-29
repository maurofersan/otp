import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OtpEntryComponent } from './otp-entry.component';

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

@NgModule({
  declarations: [OtpEntryComponent],
  imports: [RouterModule.forChild(routes)],
})
export class OtpEntryModule {}
