import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * Card component for OTP input and resend functionality.
 * Displays contact information, PIN input area, and resend options.
 *
 * @example
 * ```html
 * <app-otp-card
 *   [title]="'Enter SMS Code'"
 *   [contactIcon]="'📱'"
 *   [maskedContact]="'*** *** 1234'"
 *   [resendCountdown]="30"
 *   [isLoading]="false"
 *   (resendClick)="onResend()">
 *   <app-otp-pin-input></app-otp-pin-input>
 * </app-otp-card>
 * ```
 */
@Component({
  selector: 'app-otp-card',
  standalone: true,
  templateUrl: './otp-card.component.html',
  styleUrl: './otp-card.component.scss',
})
export class OtpCardComponent {
  /** Card title text */
  @Input() title: string = '';

  /** Icon to display for contact type */
  @Input() contactIcon: string = '📱';

  /** Text prefix for contact information */
  @Input() sentToText: string = 'Enviado al:';

  /** Masked contact information to display */
  @Input() maskedContact: string = '';

  /** Text for resend countdown */
  @Input() resendText: string =
    '¿No recibiste el código? Volver a solicitar en';

  /** Text for resend link button */
  @Input() resendLink: string = 'Volver a solicitar código';

  /** Text for seconds unit in countdown */
  @Input() resendSecondsText: string = 'seg';

  /** Current countdown value in seconds */
  @Input() resendCountdown: number = 0;

  /** Whether the component is in loading state */
  @Input() isLoading: boolean = false;

  /** Whether there is an error state */
  @Input() hasError: boolean = false;

  /** Error message to display */
  @Input() errorMessage: string = '';

  /** Event emitted when resend button is clicked */
  @Output() resendClick = new EventEmitter<void>();

  /**
   * Handles resend button click
   * Only emits event if countdown is 0 and not loading
   */
  onResendClick(): void {
    if (this.resendCountdown === 0 && !this.isLoading) {
      this.resendClick.emit();
    }
  }
}
