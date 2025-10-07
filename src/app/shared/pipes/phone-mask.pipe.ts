import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneMask',
  standalone: true,
})
export class PhoneMaskPipe implements PipeTransform {
  transform(phoneNumber: string): string {
    if (!phoneNumber) {
      return '';
    }

    // Remove all non-digit characters
    const digits = phoneNumber.replace(/\D/g, '');

    // If less than 10 digits, return as is
    if (digits.length < 10) {
      return phoneNumber;
    }

    // Format as *** *** XXXX (last 4 digits visible)
    const lastFour = digits.slice(-4);
    return `*** *** ${lastFour}`;
  }
}
