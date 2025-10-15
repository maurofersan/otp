import {
  Component,
  Input,
  Output,
  EventEmitter,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';

/**
 * Footer component for OTP pages.
 * Displays a continue button with loading state and enabled/disabled functionality.
 *
 * @example
 * ```html
 * <app-otp-footer
 *   [isEnabled]="isPinComplete"
 *   [isLoading]="isVerifying"
 *   [continueButtonText]="'Verify Code'"
 *   (continueClick)="onContinue()">
 * </app-otp-footer>
 * ```
 */
@Component({
  selector: 'app-otp-footer',
  standalone: true,
  templateUrl: './otp-footer.component.html',
  styleUrl: './otp-footer.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class OtpFooterComponent {
  /** Whether the continue button is enabled */
  @Input() isEnabled: boolean = false;

  /** Whether the component is in loading state */
  @Input() isLoading: boolean = false;

  /** Text to display on the continue button */
  @Input() continueButtonText: string = 'Continuar';

  /** Event emitted when continue button is clicked */
  @Output() continueClick = new EventEmitter<void>();

  /**
   * Handles continue button click
   * Only emits event if button is enabled and not loading
   */
  onContinueClick(): void {
    if (this.isEnabled && !this.isLoading) {
      this.continueClick.emit();
    }
  }
}
