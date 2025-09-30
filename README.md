# OTP Microfrontend

This project demonstrates an **OTP Microfrontend (MFE)** integration
with **Angular 17** and **Module Federation**.

## Project Structure

```plaintext
mfe-otp/
├── src/
│   ├── app/
│   │   ├── core/                # Global services of this MFE
│   │   │   ├── interceptors/
│   │   │   ├── guards/
│   │   │   ├── services/
│   │   │   │   ├── api.service.ts
│   │   │   │   ├── text.service.ts   # Handles texts (API + fallback)
│   │   │   │   └── ...
│   │   │   └── core.module.ts
│   │   │
│   │   ├── features/            # Features/pages of the MFE
│   │   │   └── otp/
│   │   │       ├── components/
│   │   │       ├── pages/
│   │   │       │   ├── otp.page.ts
│   │   │       │   └── otp.page.html
│   │   │       ├── services/
│   │   │       ├── store/       # Local state (ngrx or custom reducer)
│   │   │       └── otp-entry.component.ts
│   │   │       └── otp-entry.module.ts
│   │   │       └── otp.routes.ts
│   │   │
│   │   ├── shared/              # Reusable components & pipes within this MFE
│   │   │   ├── components/
│   │   │   ├── directives/
│   │   │   └── pipes/
│   │   │
│   │   ├── app.component.ts
│   │   └── app.routes.ts
│   │
│   ├── assets/
│   │   └── i18n/                # Fallback texts
│   │       ├── es.json
│   │       ├── en.json
│   │       └── ...
│   │
│   ├── environments/            # Environment-specific configurations
│   │   ├── environment.ts
│   │   ├── environment.dev.ts
│   │   └── environment.prod.ts
│   │
│   └── index.html
│
├── webpack.config.js  # MFE configuration
├── tailwind.config.js           # (if using Tailwind)
├── angular.json
└── package.json
```

## Key Concepts

### AppComponent (Standalone)

- Used only when running the MFE in isolation (`npm run start`).
- Bootstraps the `AppComponent` directly.

### OtpComponent (Standalone Feature)

- Represents the actual feature UI (OTP flow).
- Can be lazy-loaded or routed inside the `AppComponent` (in
  isolation).

### OtpEntryModule / Module

- Acts as the **remote entry point** exposed to the Shell via Module
  Federation.
- Shell loads this module, which internally lazy-loads or
  renders `OtpComponent`.

### Shell Integration

- In the Shell, configure the `remoteEntry.js` for this MFE.

- Use routing like:

  ```ts
  {
    path: 'otp',
    loadChildren: () => loadRemoteModule({
      type: 'module',
      remoteEntry: 'http://localhost:4202/remoteEntry.js',
      exposedModule: './Module',
    }).then(m => m.OtpEntryModule)
  }
  ```

## Best Practices

- Always expose an **Entry Module/Component**
  (`OtpEntryModule`) for Shell integration, not the
  `AppModule`.
- Keep `AppComponent` and isolation setup separate from Shell
  integration.
- Use clear naming like `xxx-entry` for remote entry points.

---
