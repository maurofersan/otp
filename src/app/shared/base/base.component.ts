import { OnDestroy, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * Abstract base component that provides common functionality for destroy management.
 * Automatically handles subscription cleanup using RxJS Subject pattern.
 *
 * @example
 * ```typescript
 * export class MyComponent extends BaseComponent implements OnInit {
 *   ngOnInit(): void {
 *     this.someService.getData()
 *       .pipe(takeUntil(this.destroy$))
 *       .subscribe(data => console.log(data));
 *   }
 * }
 * ```
 */
@Injectable()
export abstract class BaseComponent implements OnDestroy {
  /** Subject used for managing component destruction and subscription cleanup */
  protected readonly destroy$ = new Subject<void>();

  /**
   * Angular lifecycle hook - cleans up subscriptions
   * Automatically called when component is destroyed
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
