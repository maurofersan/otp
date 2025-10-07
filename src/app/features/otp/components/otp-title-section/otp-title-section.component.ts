import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-otp-title-section',
  standalone: true,
  templateUrl: './otp-title-section.component.html',
  styleUrl: './otp-title-section.component.scss',
})
export class OtpTitleSectionComponent {
  @Input() titlePrefix: string = '';
  @Input() titleHighlight: string = '';
  @Input() subtitle: string = '';
}
