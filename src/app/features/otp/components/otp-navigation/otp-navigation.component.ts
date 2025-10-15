import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * Navigation component for OTP pages.
 * Provides a back button with customizable text and disabled state.
 *
 * @example
 * ```html
 * <app-otp-navigation
 *   [backButtonText]="'Go Back'"
 *   [disabled]="false"
 *   (backClick)="onBackClick()">
 * </app-otp-navigation>
 * ```
 */
@Component({
  selector: 'app-otp-navigation',
  standalone: true,
  templateUrl: './otp-navigation.component.html',
  styleUrl: './otp-navigation.component.scss',
})
export class OtpNavigationComponent {
  /** Text to display on the back button */
  @Input() backButtonText: string = 'Volver';

  /** Whether the back button is disabled */
  @Input() disabled: boolean = false;

  /** Event emitted when back button is clicked */
  @Output() backClick = new EventEmitter<void>();

  /**
   * Handles back button click
   * Only emits event if button is not disabled
   */
  onBackClick(): void {
    if (!this.disabled) {
      this.backClick.emit();
    }
  }
}
