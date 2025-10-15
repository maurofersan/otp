import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe that masks phone numbers for display purposes.
 * Shows only the last 4 digits, replacing the rest with asterisks.
 *
 * @example
 * ```html
 * <span>{{ phoneNumber | phoneMask }}</span>
 * <!-- Input: '+1234567890' Output: '*** *** 7890' -->
 * ```
 */
@Pipe({
  name: 'phoneMask',
  standalone: true,
})
export class PhoneMaskPipe implements PipeTransform {
  /**
   * Transforms a phone number by masking all digits except the last 4
   * @param phoneNumber - The phone number to mask
   * @returns Masked phone number string
   */
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
