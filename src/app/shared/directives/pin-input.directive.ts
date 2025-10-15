import {
  Directive,
  ElementRef,
  forwardRef,
  Input,
  OnInit,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * Directive that provides ControlValueAccessor functionality for std-pin-input component.
 * This allows std-pin-input to work seamlessly with Angular reactive forms.
 *
 * @example
 * ```html
 * <std-pin-input appPinInput [(ngModel)]="pinValue"></std-pin-input>
 * ```
 */
@Directive({
  selector: 'std-pin-input[appPinInput]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PinInputDirective),
      multi: true,
    },
  ],
  standalone: true,
})
export class PinInputDirective implements ControlValueAccessor, OnInit {
  /** Number of PIN input fields */
  @Input() length: number = 6;

  /** Callback function registered by Angular to notify value changes */
  private _onChange = (value: string): void => {};

  /** Callback function registered by Angular to notify when component is touched */
  private _onTouched = (): void => {};

  /**
   * Creates an instance of PinInputDirective
   * @param elementRef - Reference to the DOM element
   */
  constructor(private readonly elementRef: ElementRef) {}

  /**
   * Angular lifecycle hook - sets up event listeners
   */
  ngOnInit(): void {
    this._setupEventListeners();
  }

  /**
   * Sets up event listeners for the std-pin-input component
   * @private
   */
  private _setupEventListeners(): void {
    this.elementRef.nativeElement.addEventListener(
      'changeEvent',
      (event: CustomEvent) => {
        const value = event.detail || '';
        this._onChange(value);
        this._onTouched();
      }
    );

    this.elementRef.nativeElement.addEventListener('input', (event: Event) => {
      const target = event.target as any;
      const value = target.value || '';
      this._onChange(value);
    });
  }

  /**
   * Writes a value to the component (called by Angular)
   * @param value - The value to write
   */
  writeValue(value: string): void {
    if (this.elementRef.nativeElement) {
      this.elementRef.nativeElement.value = value || '';
    }
  }

  /**
   * Registers a callback function to be called when the value changes
   * @param fn - The callback function
   */
  registerOnChange(fn: (value: string) => void): void {
    this._onChange = fn;
  }

  /**
   * Registers a callback function to be called when the component is touched
   * @param fn - The callback function
   */
  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  /**
   * Sets the disabled state of the component
   * @param isDisabled - Whether the component should be disabled
   */
  setDisabledState(isDisabled: boolean): void {
    if (this.elementRef.nativeElement) {
      this.elementRef.nativeElement.disabled = isDisabled;
    }
  }
}
