import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-otp',
  imports: [RouterOutlet],
  template: `
    <h1>Otp Flow</h1>
    <router-outlet></router-outlet>
  `,
})
export class OtpComponent {}
