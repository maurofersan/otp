import { Component, Input } from '@angular/core';

/**
 * Title section component for OTP pages.
 * Displays a title with highlighted text and subtitle.
 *
 * @example
 * ```html
 * <app-otp-title-section
 *   [titlePrefix]="'Welcome to'"
 *   [titleHighlight]="'OTP Verification'"
 *   [subtitle]="'Please enter your code'">
 * </app-otp-title-section>
 * ```
 */
@Component({
  selector: 'app-otp-title-section',
  standalone: true,
  templateUrl: './otp-title-section.component.html',
  styleUrl: './otp-title-section.component.scss',
})
export class OtpTitleSectionComponent {
  /** Prefix text for the title */
  @Input() titlePrefix: string = '';

  /** Highlighted text for the title (displayed in red) */
  @Input() titleHighlight: string = '';

  /** Subtitle text displayed below the title */
  @Input() subtitle: string = '';
}
