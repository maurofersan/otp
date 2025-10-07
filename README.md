# OTP Microfrontend (MFE)

A standalone Angular microfrontend for One-Time Password (OTP) verification flows, supporting both SMS and Email verification methods.

## 🏗️ Architecture

This project follows a clean architecture pattern with the following structure:

```
src/
├── app/
│   ├── core/                    # Global services and utilities
│   │   ├── services/           # API and text services
│   │   └── core.module.ts      # Core module configuration
│   ├── features/               # Feature modules
│   │   └── otp/               # OTP verification feature
│   │       ├── pages/         # OTP pages (SMS & Email)
│   │       ├── components/    # Feature-specific components
│   │       └── otp.routes.ts  # Feature routing
│   ├── shared/                # Reusable components and pipes
│   │   ├── components/        # Shared UI components
│   │   └── pipes/            # Custom pipes
│   └── app.component.*        # Main app component
├── assets/
│   └── i18n/                  # Internationalization files
│       ├── es.json           # Spanish texts (fallback)
│       └── en.json           # English texts
└── environments/              # Environment configurations
    ├── environment.ts        # Default environment
    ├── environment.dev.ts    # Development environment
    └── environment.prod.ts   # Production environment
```

## 🎨 Design System

- **Methodology**: BEM (Block Element Modifier) for CSS class naming
- **Styling**: SCSS with mobile-first responsive design
- **Components**: Stencil web components (`std-pin-input`)
- **Accessibility**: WCAG 2.1 AA compliant
- **Browser Support**: Modern browsers (ES2020+)

## 🚀 Features

### OTP SMS Flow

- 6-digit PIN input using Stencil components
- Real-time validation and error handling
- Resend functionality with countdown timer
- Masked phone number display
- Mobile-optimized UI

### OTP Email Flow

- 6-digit PIN input using Stencil components
- Real-time validation and error handling
- Resend functionality with countdown timer
- Masked email address display
- Consistent UI with SMS flow

### Core Services

- **TextService**: Internationalization with fallback support
- **ApiService**: HTTP client for OTP operations
- **Error Handling**: Comprehensive error management
- **Loading States**: User feedback during async operations

## 🛠️ Development

### Prerequisites

- Node.js 18+
- Angular CLI 17+
- npm or yarn

### Installation

```bash
npm install
```

### Development Server

```bash
npm start
# or
ng serve --port 4201
```

### Build

```bash
npm run build
# or
ng build
```

### Testing

```bash
npm test
# or
ng test
```

## 🌐 Internationalization

The application supports multiple languages with fallback to Spanish:

- **Spanish (es)**: Default language with complete translations
- **English (en)**: Secondary language support
- **Fallback**: Automatic fallback to Spanish if translations are missing

Texts are managed through the `TextService` and stored in `src/assets/i18n/`.

## 🔧 Configuration

### Environment Variables

Configure API endpoints and other settings in the environment files:

```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: "http://localhost:3000/api",
  appName: "OTP MFE",
  version: "1.0.0",
};
```

### API Integration

The `ApiService` provides methods for:

- `sendOtp()`: Send OTP to user's contact
- `verifyOtp()`: Verify entered OTP code
- `resendOtp()`: Resend OTP code

## 📱 Mobile-First Design

The application is designed with mobile-first principles:

- Responsive breakpoints for different screen sizes
- Touch-friendly interface elements
- Optimized for mobile performance
- Dark mode support

## 🧪 Testing

The project includes:

- Unit tests for components and services
- Integration tests for API interactions
- E2E tests for complete user flows

## 📦 Dependencies

### Core Dependencies

- Angular 17.3.0
- RxJS 7.8.0
- Stencil Library (local package)

### Development Dependencies

- Angular CLI 17.3.17
- TypeScript 5.4.2
- Karma & Jasmine for testing

## 🚀 Deployment

The microfrontend can be deployed as:

- Standalone application
- Module Federation microfrontend
- Static assets for CDN deployment

## 📄 License

This project is part of the Santander Consumer application suite.
