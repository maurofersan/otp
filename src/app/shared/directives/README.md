# Directivas ControlValueAccessor

Este directorio contiene directivas que implementan `ControlValueAccessor` para integrar componentes Stencil con Angular Forms.

## ¿Qué es ControlValueAccessor?

`ControlValueAccessor` es una interfaz que permite que componentes personalizados funcionen con el sistema de formularios de Angular (reactive forms y template-driven forms).

## ¿Por qué necesitamos `_onChange` y `_onTouched` privados?

### Flujo de ControlValueAccessor:

1. **Angular registra callbacks**: Cuando usas `[(ngModel)]` o `formControl`, Angular llama a `registerOnChange()` y `registerOnTouched()` para registrar funciones callback.

2. **Tú guardas las callbacks**: Las guardas en variables privadas (`_onChange`, `_onTouched`).

3. **Tú notificas cambios**: Cuando el valor del componente cambia, TÚ debes llamar a `_onChange(newValue)` para notificar a Angular.

4. **Tú notificas touched**: Cuando el usuario "toca" el componente, TÚ debes llamar a `_onTouched()`.

### Ejemplo de flujo:

```typescript
// 1. Angular registra callbacks
registerOnChange(fn: (value: any) => void): void {
  this._onChange = fn; // Guardamos la función de Angular
}

// 2. Cuando el usuario interactúa con el componente
private _setupEventListeners(): void {
  this.elementRef.nativeElement.addEventListener('click', () => {
    this._onChange(newValue); // Notificamos a Angular del cambio
    this._onTouched();        // Notificamos que fue "tocado"
  });
}
```

## Directivas disponibles:

### `PinInputDirective`

- **Selector**: `std-pin-input[appPinInput]`
- **Propósito**: Integra `std-pin-input` con Angular Forms
- **Uso**: `<std-pin-input appPinInput [(ngModel)]="pinValue"></std-pin-input>`

### `StdButtonDirective`

- **Selector**: `std-button[appStdButton]`
- **Propósito**: Integra `std-button` con Angular Forms
- **Uso**: `<std-button appStdButton [(ngModel)]="buttonValue"></std-button>`

## Convenciones de Sonar:

- **Métodos privados**: Prefijo `_` (ej: `_onChange`, `_setupEventListeners`)
- **JSDoc completo**: Todos los métodos públicos documentados
- **Tipos explícitos**: Todos los parámetros y retornos tipados
- **readonly**: Para dependencias inyectadas que no cambian
