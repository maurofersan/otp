import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Reusable loading spinner component.
 * Displays an animated spinner with optional text.
 *
 * @example
 * ```html
 * <app-loading-spinner
 *   [size]="'small'"
 *   [text]="'Loading...'">
 * </app-loading-spinner>
 * ```
 */
@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="loading-spinner"
      [class.loading-spinner--small]="size === 'small'"
    >
      <div class="loading-spinner__spinner"></div>
      <p class="loading-spinner__text" *ngIf="text">{{ text }}</p>
    </div>
  `,
  styles: [
    `
      .loading-spinner {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 12px;
        padding: 20px;

        &__spinner {
          width: 32px;
          height: 32px;
          border: 3px solid #f3f3f3;
          border-top: 3px solid #dc3545;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        &__text {
          margin: 0;
          font-size: 14px;
          color: #6c757d;
          text-align: center;
        }

        &--small {
          padding: 12px;

          .loading-spinner__spinner {
            width: 20px;
            height: 20px;
            border-width: 2px;
          }

          .loading-spinner__text {
            font-size: 12px;
          }
        }
      }

      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `,
  ],
})
export class LoadingSpinnerComponent {
  /** Size of the spinner */
  @Input() size: 'small' | 'medium' = 'medium';

  /** Optional text to display below the spinner */
  @Input() text: string = '';
}
