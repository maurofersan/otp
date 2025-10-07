import {
  Directive,
  ElementRef,
  forwardRef,
  Input,
  OnInit,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: 'std-pin-input',
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
  @Input() length: number = 6;

  private onChange = (value: string) => {};
  private onTouched = () => {};

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    this.elementRef.nativeElement.addEventListener(
      'changeEvent',
      (event: CustomEvent) => {
        const value = event.detail || '';
        this.onChange(value);
        this.onTouched();
      }
    );

    this.elementRef.nativeElement.addEventListener('input', (event: Event) => {
      const target = event.target as any;
      const value = target.value || '';
      this.onChange(value);
    });
  }

  // ControlValueAccessor implementation
  writeValue(value: string): void {
    if (this.elementRef.nativeElement) {
      this.elementRef.nativeElement.value = value || '';
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (this.elementRef.nativeElement) {
      this.elementRef.nativeElement.disabled = isDisabled;
    }
  }
}
