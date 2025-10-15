import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Interface for text objects with dynamic keys
 */
export interface Texts {
  [key: string]: any;
}

/**
 * Service for managing internationalization (i18n) texts.
 * Provides text loading, fallback support, and parameter interpolation.
 *
 * @example
 * ```typescript
 * // Get a simple text
 * const title = this.textService.getText('otp.sms.title');
 *
 * // Get text with parameters
 * const message = this.textService.getText('welcome.message', { name: 'John' });
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class TextService {
  /** Internal storage for loaded texts */
  private _texts: Texts = {};

  /** Current language code */
  private _currentLanguage = 'es';

  /**
   * Creates an instance of TextService
   * @param http - Angular HTTP client for loading text files
   */
  constructor(private readonly http: HttpClient) {}

  /**
   * Gets text by key with fallback support
   * @param key - The text key (supports nested keys like 'otp.sms.title')
   * @param params - Optional parameters for text interpolation
   * @returns The translated text or the key if not found
   */
  getText(key: string, params?: { [key: string]: string | number }): string {
    const text = this._getNestedProperty(this._texts, key) || key;
    return this._interpolateParams(text, params);
  }

  /**
   * Loads texts from API with fallback to local assets
   * @param language - Language code to load (defaults to 'es')
   * @returns Observable with loaded texts
   */
  loadTexts(language: string = 'es'): Observable<Texts> {
    this._currentLanguage = language;

    return this.http.get<Texts>(`/assets/i18n/${language}.json`).pipe(
      map((texts) => {
        this._texts = { ...this._texts, ...texts };
        return this._texts;
      })
    );
  }

  /**
   * Sets current language and loads texts
   * @param language - Language code to set
   */
  setLanguage(language: string): void {
    this._currentLanguage = language;
    this.loadTexts(language);
  }

  /**
   * Gets current language
   * @returns Current language code
   */
  getCurrentLanguage(): string {
    return this._currentLanguage;
  }

  /**
   * Gets nested property from object using dot notation
   * @param obj - Object to search in
   * @param path - Dot-separated path (e.g., 'otp.sms.title')
   * @returns The nested property value or undefined
   * @private
   */
  private _getNestedProperty(obj: any, path: string): string {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }

  /**
   * Interpolates parameters in text using {{param}} syntax
   * @param text - Text with parameter placeholders
   * @param params - Parameters to interpolate
   * @returns Text with parameters replaced
   * @private
   */
  private _interpolateParams(
    text: string,
    params?: { [key: string]: string | number }
  ): string {
    if (!params) return text;

    return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return params[key]?.toString() || match;
    });
  }
}
