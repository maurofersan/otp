import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-otp-navigation',
  standalone: true,
  templateUrl: './otp-navigation.component.html',
  styleUrl: './otp-navigation.component.scss',
})
export class OtpNavigationComponent {
  @Input() backButtonText: string = 'Volver';
  @Input() disabled: boolean = false;
  @Output() backClick = new EventEmitter<void>();

  onBackClick(): void {
    if (!this.disabled) {
      this.backClick.emit();
    }
  }
}
