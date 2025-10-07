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
  selector: 'app-otp-email-page',
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
  templateUrl: './otp-email.page.html',
  styleUrl: './otp-email.page.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class OtpEmailPageComponent extends BaseComponent implements OnInit {
  isPinComplete = false;
  isLoading = false;
  errorMessage = '';
  resendCountdown = 30;
  maskedEmailAddress = '*******sa64@**...';
  currentPin = '';

  private resendTimer$ = timer(1000, 1000);

  private textService = inject(TextService);
  private apiService = inject(ApiService);
  private router = inject(Router);

  ngOnInit(): void {
    console.log('init:::');
    this.startResendCountdown();
  }

  /**
   * Gets text by key with fallback support
   */
  getText(key: string, params?: { [key: string]: string | number }): string {
    return this.textService.getText(key, params);
  }

  /**
   * Handles pin input change from std-pin-input changeEvent
   */
  onPinChange(event: any): void {
    const pin = event.detail || event;
    this.currentPin = pin;
    this.isPinComplete = pin.length === 6;
    console.log('Email Pin changed:', pin, 'isComplete:', this.isPinComplete);
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
      type: 'email',
    };

    // this.apiService
    //   .verifyOtp(request)
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe({
    //     next: (response) => {
    //       console.log('Email OTP verification response:', response);
    //       if (response?.success) {
    //         this.router.navigate(['/success']);
    //       } else {
    //         this.errorMessage = this.getText('otp.common.invalidCode');
    //       }
    //       this.isLoading = false;
    //     },
    //     error: (error) => {
    //       console.error('Email OTP verification error:', error);
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
    //   .resendOtp('email')
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
    //       console.error('Resend Email OTP error:', error);
    //       this.errorMessage = this.getText('otp.common.error');
    //       this.isLoading = false;
    //     },
    //   });
  }

  /**
   * Navigates back to SMS OTP page
   */
  goBack(): void {
    this.router.navigate(['/otp/sms']);
  }

  /**
   * Starts the resend countdown timer
   */
  private startResendCountdown(): void {
    this.resendTimer$.pipe(takeUntil(this.destroy$)).subscribe(() => {
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
