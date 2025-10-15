import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { TextService } from './core/services/text.service';
import { ApiService } from './core/services/api.service';

/**
 * Application configuration for the OTP microfrontend.
 * Provides routing, HTTP client, and core services.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    TextService,
    ApiService,
  ],
};
