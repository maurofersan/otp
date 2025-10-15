import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { timer, takeUntil } from 'rxjs';
import { BaseComponent } from '../../../../shared/base/base.component';

import { TextService } from '../../../../core/services/text.service';
import {
  ApiService,
  OtpVerificationRequest,
} from '../../../../core/services/api.service';
import { OtpNavigationComponent } from '../../components/otp-navigation/otp-navigation.component';
import { OtpTitleSectionComponent } from '../../components/otp-title-section/otp-title-section.component';
import { OtpCardComponent } from '../../components/otp-card/otp-card.component';
import { OtpFooterComponent } from '../../components/otp-footer/otp-footer.component';
import { PinInputDirective } from '../../../../shared/directives/pin-input.directive';
import { ErrorMessageComponent } from '../../../../shared/components/error-message/error-message.component';

@Component({
  selector: 'app-otp-sms-page',
  standalone: true,
  imports: [
    CommonModule,
    OtpNavigationComponent,
    OtpTitleSectionComponent,
    OtpCardComponent,
    OtpFooterComponent,
    PinInputDirective,
    ErrorMessageComponent,
  ],
  templateUrl: './otp-sms.page.html',
  styleUrl: './otp-sms.page.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class OtpSmsPageComponent extends BaseComponent implements OnInit {
  isPinComplete = false;
  isLoading = false;
  errorMessage = '';
  resendCountdown = 30;
  maskedPhoneNumber = '*** *** 194';
  currentPin = '';

  private _resendTimer$ = timer(1000, 1000);

  private _textService = inject(TextService);
  private _apiService = inject(ApiService);
  private _router = inject(Router);

  ngOnInit(): void {
    console.log('init sms::');
    this._startResendCountdown();
  }

  /**
   * Gets text by key with fallback support
   */
  getText(key: string, params?: { [key: string]: string | number }): string {
    return this._textService.getText(key, params);
  }

  /**
   * Handles pin input change from std-pin-input changeEvent
   */
  onPinChange(event: any): void {
    const pin = event.detail || event;
    this.currentPin = pin;
    this.isPinComplete = pin.length === 6;
    console.log('SMS Pin changed:', pin, 'isComplete:', this.isPinComplete);
    this.clearError();
  }

  /**
   * Verifies the entered OTP code
   */
  verifyCode(): void {
    if (!this.isPinComplete || this.isLoading) {
      return;
    }

    this.isLoading = true;
    this.clearError();

    const request: OtpVerificationRequest = {
      code: this.currentPin,
      type: 'sms',
    };

    this._router.navigate(['/otp/email']);
    // this.apiService
    //   .verifyOtp(request)
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe({
    //     next: (response) => {
    //       console.log('OTP verification response:', response);
    //       if (response?.success) {
    //         // Navigate to email OTP page
    //         this._router.navigate(['/otp/email']);
    //       } else {
    //         this.errorMessage = this.getText('otp.common.invalidCode');
    //       }
    //       this.isLoading = false;
    //     },
    //     error: (error) => {
    //       console.error('OTP verification error:', error);
    //       this.errorMessage = this.getText('otp.common.error');
    //       this.isLoading = false;
    //     },
    //   });
  }

  /**
   * Resends the OTP code
   */
  resendCode(): void {
    if (this.resendCountdown > 0 || this.isLoading) {
      return;
    }

    this.isLoading = true;
    this.clearError();

    // this.apiService
    //   .resendOtp('sms')
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe({
    //     next: (response) => {
    //       if (response?.success) {
    //         this.resendCountdown = 30;
    //         this.startResendCountdown();
    //       } else {
    //         this.errorMessage = this.getText('otp.common.error');
    //       }
    //       this.isLoading = false;
    //     },
    //     error: (error) => {
    //       console.error('Resend OTP error:', error);
    //       this.errorMessage = this.getText('otp.common.error');
    //       this.isLoading = false;
    //     },
    //   });
  }

  /**
   * Navigates back to previous page
   */
  goBack(): void {
    this._router.navigate(['/']);
  }

  /**
   * Starts the resend countdown timer
   */
  private _startResendCountdown(): void {
    this._resendTimer$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      if (this.resendCountdown > 0) {
        this.resendCountdown--;
      }
    });
  }

  /**
   * Clears error message
   */
  clearError(): void {
    this.errorMessage = '';
  }
}
