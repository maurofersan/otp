import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface OtpRequest {
  phoneNumber?: string;
  email?: string;
  type: 'sms' | 'email';
}

export interface OtpResponse {
  success: boolean;
  message: string;
  maskedContact?: string;
}

export interface OtpVerificationRequest {
  code: string;
  type: 'sms' | 'email';
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Sends OTP code to user's contact (SMS or Email)
   */
  sendOtp(request: OtpRequest): Observable<OtpResponse> {
    return this.http.post<OtpResponse>(`${this.baseUrl}/otp/send`, request);
  }

  /**
   * Verifies the OTP code entered by user
   */
  verifyOtp(request: OtpVerificationRequest): Observable<OtpResponse> {
    return this.http.post<OtpResponse>(`${this.baseUrl}/otp/verify`, request);
  }

  /**
   * Resends OTP code
   */
  resendOtp(type: 'sms' | 'email'): Observable<OtpResponse> {
    return this.http.post<OtpResponse>(`${this.baseUrl}/otp/resend`, { type });
  }
}
