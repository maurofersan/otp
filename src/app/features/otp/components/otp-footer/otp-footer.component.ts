import {
  Component,
  Input,
  Output,
  EventEmitter,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';

@Component({
  selector: 'app-otp-footer',
  standalone: true,
  templateUrl: './otp-footer.component.html',
  styleUrl: './otp-footer.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class OtpFooterComponent {
  @Input() isEnabled: boolean = false;
  @Input() isLoading: boolean = false;
  @Input() continueButtonText: string = 'Continuar';

  @Output() continueClick = new EventEmitter<void>();

  onContinueClick(): void {
    if (this.isEnabled && !this.isLoading) {
      this.continueClick.emit();
    }
  }
}
