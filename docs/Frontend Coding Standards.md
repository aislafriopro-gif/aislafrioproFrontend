# Frontend Coding Standards

## Objetivo

Este documento define las convenciones de desarrollo que deberá seguir todo el equipo Frontend de Aislafriopro para mantener un código consistente, legible y fácil de mantener.

---

# Convención de exportaciones

En el proyecto utilizaremos dos tipos de exportaciones dependiendo del tipo de archivo.

## 1. Componentes reutilizables

Todos los componentes ubicados dentro de:

```text
src/components
```

deberán utilizar funciones declaradas con nombre.

### ✅ Correcto

```tsx
export function Button() {
  return <button>Guardar</button>;
}
```

```tsx
export function Navbar() {
  return <nav>...</nav>;
}
```

```tsx
export function ContactForm() {
  return <form>...</form>;
}
```

### ❌ Evitar

```tsx
const Button = () => {
  return <button>Guardar</button>;
};

export default Button;
```

---

## ¿Por qué?

Las funciones declaradas con nombre ofrecen ventajas importantes:

- Mejor legibilidad.
- Mayor consistencia en el proyecto.
- Refactorizaciones más seguras.
- Mejor autocompletado.
- Facilitan la búsqueda de componentes.
- Evitan importar un mismo componente con nombres diferentes.

---

# Hooks

Todos los hooks personalizados deberán utilizar funciones declaradas.

### ✅ Correcto

```tsx
export function useAuth() {
}
```

```tsx
export function useModal() {
}
```

---

# Servicios

Todos los servicios deberán exportarse mediante funciones declaradas.

### ✅ Correcto

```tsx
export async function login() {

}
```

```tsx
export async function getProjects() {

}
```

---

# Utilidades

Las funciones utilitarias deberán exportarse utilizando funciones declaradas.

### ✅ Correcto

```tsx
export function formatDate() {

}
```

```tsx
export function capitalize() {

}
```

---

# Archivos especiales de Next.js

Next.js requiere que ciertos archivos tengan una exportación por defecto (`default export`), ya que el framework los detecta automáticamente.

Estos archivos **siempre** deberán utilizar:

```tsx
export default function Nombre() {

}
```

## Archivos incluidos

```text
page.tsx
layout.tsx
loading.tsx
error.tsx
not-found.tsx
default.tsx
template.tsx
global-error.tsx
```

### Ejemplo

```tsx
export default function Page() {
  return <h1>Inicio</h1>;
}
```

```tsx
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
```

---

# ¿Por qué estos archivos utilizan export default?

Estos archivos forman parte del sistema de enrutamiento (App Router) de Next.js.

El framework busca automáticamente una exportación por defecto para poder renderizar:

- páginas
- layouts
- pantallas de carga
- manejo de errores
- páginas 404

Por esta razón, **no deben utilizar `export function`**.

---

# Resumen

| Tipo de archivo | Convención |
|-----------------|------------|
| `page.tsx` | `export default function` |
| `layout.tsx` | `export default function` |
| `loading.tsx` | `export default function` |
| `error.tsx` | `export default function` |
| `not-found.tsx` | `export default function` |
| `default.tsx` | `export default function` |
| `template.tsx` | `export default function` |
| `global-error.tsx` | `export default function` |
| Componentes (`components`) | `export function` |
| Hooks (`hooks`) | `export function` |
| Servicios (`services`) | `export function` |
| Utilidades (`utils`) | `export function` |

---

# Convención oficial del proyecto

Todo el código nuevo desarrollado en Aislafriopro deberá seguir estas convenciones.

Cualquier excepción deberá ser previamente revisada y aprobada durante la revisión técnica (Code Review).