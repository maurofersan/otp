import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emailMask',
  standalone: true,
})
export class EmailMaskPipe implements PipeTransform {
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
