import {
  Directive,
  ElementRef,
  forwardRef,
  Input,
  OnInit,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * Directive that provides ControlValueAccessor functionality for std-button component.
 * This allows std-button to work seamlessly with Angular reactive forms.
 *
 * @example
 * ```html
 * <std-button appStdButton [(ngModel)]="myValue"></std-button>
 * ```
 */
@Directive({
  selector: 'std-button[appStdButton]',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StdButtonDirective),
      multi: true,
    },
  ],
})
export class StdButtonDirective implements ControlValueAccessor, OnInit {
  /** Whether the button is disabled */
  @Input() disabled: boolean = false;

  /** Callback function registered by Angular to notify value changes */
  private _onChange = (value: any): void => {};

  /** Callback function registered by Angular to notify when component is touched */
  private _onTouched = (): void => {};

  /**
   * Creates an instance of StdButtonDirective
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
   * Sets up click event listener for the std-button
   * @private
   */
  private _setupEventListeners(): void {
    this.elementRef.nativeElement.addEventListener('click', (event: Event) => {
      if (!this.disabled) {
        this._onChange(true);
        this._onTouched();
      }
    });
  }

  /**
   * Writes a value to the component (called by Angular)
   * @param value - The value to write
   */
  writeValue(value: any): void {
    // The std-button handles its own state internally
  }

  /**
   * Registers a callback function to be called when the value changes
   * @param fn - The callback function
   */
  registerOnChange(fn: (value: any) => void): void {
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
    this.disabled = isDisabled;
    this.elementRef.nativeElement.disabled = isDisabled;
  }
}
