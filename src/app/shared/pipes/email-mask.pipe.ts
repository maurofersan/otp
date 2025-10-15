import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe that masks email addresses for display purposes.
 * Shows only the first 2 and last 2 characters of the local part,
 * and the first 2 characters of the domain.
 *
 * @example
 * ```html
 * <span>{{ email | emailMask }}</span>
 * <!-- Input: 'john.doe@example.com' Output: 'jo****oe@ex**...' -->
 * ```
 */
@Pipe({
  name: 'emailMask',
  standalone: true,
})
export class EmailMaskPipe implements PipeTransform {
  /**
   * Transforms an email address by masking most characters
   * @param email - The email address to mask
   * @returns Masked email address string
   */
  transform(email: string): string {
    if (!email) {
      return '';
    }

    const [localPart, domain] = email.split('@');

    if (!localPart || !domain) {
      return email;
    }

    // Mask local part: show first 2 and last 2 characters
    const maskedLocal =
      localPart.length > 4
        ? `${localPart.slice(0, 2)}****${localPart.slice(-2)}`
        : '****';

    // Mask domain: show first 2 characters
    const maskedDomain = domain.length > 2 ? `${domain.slice(0, 2)}**` : '**';

    return `${maskedLocal}@${maskedDomain}...`;
  }
}
