import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

/**
 * Interface for OTP send request
 */
export interface OtpRequest {
  /** Phone number for SMS OTP */
  phoneNumber?: string;
  /** Email address for Email OTP */
  email?: string;
  /** Type of OTP to send */
  type: 'sms' | 'email';
}

/**
 * Interface for OTP API response
 */
export interface OtpResponse {
  /** Whether the operation was successful */
  success: boolean;
  /** Response message */
  message: string;
  /** Masked contact information for display */
  maskedContact?: string;
}

/**
 * Interface for OTP verification request
 */
export interface OtpVerificationRequest {
  /** The OTP code entered by user */
  code: string;
  /** Type of OTP being verified */
  type: 'sms' | 'email';
}

/**
 * Service for handling OTP-related API calls.
 * Provides methods for sending, verifying, and resending OTP codes.
 *
 * @example
 * ```typescript
 * // Send SMS OTP
 * this.apiService.sendOtp({ phoneNumber: '+1234567890', type: 'sms' })
 *   .subscribe(response => console.log(response));
 *
 * // Verify OTP
 * this.apiService.verifyOtp({ code: '123456', type: 'sms' })
 *   .subscribe(response => console.log(response));
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  /** Base URL for API endpoints */
  private readonly _baseUrl = environment.apiUrl;

  /**
   * Creates an instance of ApiService
   * @param http - Angular HTTP client for API calls
   */
  constructor(private readonly http: HttpClient) {}

  /**
   * Sends OTP code to user's contact (SMS or Email)
   * @param request - OTP request containing contact info and type
   * @returns Observable with OTP response
   */
  sendOtp(request: OtpRequest): Observable<OtpResponse> {
    return this.http.post<OtpResponse>(`${this._baseUrl}/otp/send`, request);
  }

  /**
   * Verifies the OTP code entered by user
   * @param request - Verification request containing code and type
   * @returns Observable with verification response
   */
  verifyOtp(request: OtpVerificationRequest): Observable<OtpResponse> {
    return this.http.post<OtpResponse>(`${this._baseUrl}/otp/verify`, request);
  }

  /**
   * Resends OTP code
   * @param type - Type of OTP to resend ('sms' or 'email')
   * @returns Observable with resend response
   */
  resendOtp(type: 'sms' | 'email'): Observable<OtpResponse> {
    return this.http.post<OtpResponse>(`${this._baseUrl}/otp/resend`, { type });
  }
}
