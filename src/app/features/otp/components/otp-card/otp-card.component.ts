import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-otp-card',
  standalone: true,
  templateUrl: './otp-card.component.html',
  styleUrl: './otp-card.component.scss',
})
export class OtpCardComponent {
  @Input() title: string = '';
  @Input() contactIcon: string = '📱';
  @Input() sentToText: string = 'Enviado al:';
  @Input() maskedContact: string = '';
  @Input() resendText: string =
    '¿No recibiste el código? Volver a solicitar en';
  @Input() resendLink: string = 'Volver a solicitar código';
  @Input() resendSecondsText: string = 'seg';
  @Input() resendCountdown: number = 0;
  @Input() isLoading: boolean = false;

  @Output() resendClick = new EventEmitter<void>();

  onResendClick(): void {
    if (this.resendCountdown === 0 && !this.isLoading) {
      this.resendClick.emit();
    }
  }
}
