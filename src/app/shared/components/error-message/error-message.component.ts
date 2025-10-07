import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="error-message" *ngIf="message">
      <div class="error-message__icon">⚠️</div>
      <p class="error-message__text">{{ message }}</p>
      <button
        class="error-message__close"
        *ngIf="dismissible"
        (click)="onDismiss()"
        aria-label="Cerrar mensaje de error"
      >
        ×
      </button>
    </div>
  `,
  styles: [
    `
      .error-message {
        display: flex;
        align-items: center;
        gap: 12px;
        background-color: #f8d7da;
        color: #721c24;
        padding: 12px 16px;
        border-radius: 8px;
        border: 1px solid #f5c6cb;
        margin: 16px 0;

        &__icon {
          font-size: 16px;
          flex-shrink: 0;
        }

        &__text {
          flex: 1;
          margin: 0;
          font-size: 14px;
          font-weight: 500;
          line-height: 1.4;
        }

        &__close {
          background: none;
          border: none;
          color: #721c24;
          font-size: 18px;
          font-weight: bold;
          cursor: pointer;
          padding: 0;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: background-color 0.2s ease;

          &:hover {
            background-color: rgba(114, 28, 36, 0.1);
          }
        }
      }
    `,
  ],
})
export class ErrorMessageComponent {
  @Input() message: string = '';
  @Input() dismissible: boolean = true;

  onDismiss(): void {
    this.message = '';
  }
}
