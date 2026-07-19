# 🏗️ Guía de Arquitectura Frontend

> **Proyecto:** Aislafriopro  
> **Versión:** V1.0  
> **Última actualización:** 18 de Julio 2026

---

# Objetivo

Este documento define la arquitectura oficial del Frontend del proyecto **Aislafriopro**.

Su propósito es establecer una estructura estándar para el desarrollo, garantizando que todo el equipo trabaje bajo las mismas convenciones, facilitando la escalabilidad, el mantenimiento y la incorporación de nuevos desarrolladores.

---

# Tecnologías

| Tecnología | Propósito |
|------------|-----------|
| Next.js | Framework principal |
| React | Construcción de interfaces |
| TypeScript | Tipado estático |
| Zustand | Estado global |
| TanStack Query | Gestión de datos del servidor |
| Axios | Consumo de API |

---

# Principios de la Arquitectura

Toda la arquitectura del proyecto está basada en los siguientes principios:

- Separación de responsabilidades.
- Componentes reutilizables.
- Bajo acoplamiento entre módulos.
- Escalabilidad.
- Fácil mantenimiento.
- Código limpio.
- Modularización por funcionalidades.

## Estructura General del Proyecto

La siguiente estructura define la organización oficial del proyecto Frontend. Todos los desarrolladores deberán respetar esta organización para mantener un código limpio, consistente y escalable.

# Estructura General del Proyecto

```text
AISLAFRIOPRO/
│
├── README.md                         # Presentación general del proyecto
│
├── docs/                             # Documentación técnica del proyecto
│   ├── README.md                     # Índice de la documentación
│   ├── Frontend-Architecture.md      # Arquitectura Frontend
│   ├── Backend-Architecture.md       # Arquitectura Backend
│   ├── Design-System.md              # Guía del Design System
│   ├── Git-Workflow.md               # Flujo de trabajo con Git
│   ├── Branching-Strategy.md         # Estrategia de ramas
│   ├── Coding-Standards.md           # Estándares de desarrollo
│   ├── API-Documentation.md          # Documentación de APIs
│   └── Deployment.md                 # Proceso de despliegue
│
├── public/
│   ├── images/
│   │   ├── hero/
│   │   ├── services/
│   │   ├── projects/
│   │   └── backgrounds/
│   │
│   ├── icons/
│   ├── logos/
│   ├── videos/
│   ├── favicon.ico
│   ├── robots.txt
│   └── sitemap.xml
│
├── src/
│   ├── app/
│   │   ├── (public)/                 # Home, Servicios, Contacto, Proyectos
│   │   ├── (auth)/                   # Login, Recuperar contraseña
│   │   ├── (dashboard)/              # Panel administrativo
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── loading.tsx
│   │   ├── error.tsx
│   │   └── not-found.tsx
│   │
│   ├── components/
│   │   ├── layout/                   # Navbar, Footer, Header, Sidebar
│   │   ├── home/                     # Hero, About, Services, FAQ
│   │   ├── services/                 # ServiceCard, ServiceList
│   │   ├── contact/                  # ContactForm, ContactInfo, GoogleMap
│   │   ├── common/                   # Loading, Pagination, ErrorMessage
│   │   └── ui/                       # Button, Card, Input, Modal, Toast
│   │
│   ├── features/
│   │   ├── auth/
│   │   ├── services/
│   │   ├── projects/
│   │   ├── users/
│   │   └── contact/
│   │
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useForm.ts
│   │   ├── useModal.ts
│   │   ├── usePagination.ts
│   │   ├── useDebounce.ts
│   │   └── useWindowSize.ts
│   │
│   ├── services/
│   │   ├── api.ts                    # Configuración de Axios
│   │   ├── auth.service.ts
│   │   ├── users.service.ts
│   │   ├── services.service.ts
│   │   ├── projects.service.ts
│   │   └── contact.service.ts
│   │
│   ├── store/
│   │   ├── auth.store.ts
│   │   ├── ui.store.ts
│   │   ├── filter.store.ts
│   │   └── index.ts
│   │
│   ├── providers/
│   │   ├── QueryProvider.tsx
│   │   ├── ThemeProvider.tsx
│   │   └── SessionProvider.tsx
│   │
│   ├── interfaces/                   # IUser, IService, IProject, IContact
│   ├── types/                        # UserRole, ApiStatus, Theme
│   ├── utils/                        # formatDate, validations, capitalize
│   ├── constants/                    # routes, colors, messages
│   ├── lib/                          # axios, queryClient, env
│   ├── schemas/                      # login.schema, contact.schema
│   └── styles/                       # globals.css, variables.css
│
├── middleware.ts
├── package.json
└── tsconfig.json
```
# Estructura General

```text
AISLAFRIOPRO/

├── public/
├── src/
├── middleware.ts
├── package.json
└── tsconfig.json
```

---

# Carpeta public

```text
public/

images/
icons/
logos/
videos/

favicon.ico
robots.txt
sitemap.xml
```

## Responsabilidad

Contiene todos los recursos estáticos utilizados por la aplicación.

### No debe contener

- Componentes
- Lógica de negocio
- Archivos TypeScript

---

# Carpeta src

Todo el desarrollo del Frontend se realizará dentro de esta carpeta.

```text
src/

app/
components/
features/
hooks/
services/
store/
providers/
interfaces/
types/
utils/
constants/
lib/
schemas/
styles/
```

---

# App Router

```text
app/

(public)
(auth)
(dashboard)

layout.tsx
page.tsx
loading.tsx
error.tsx
not-found.tsx
```

## (public)

Contiene todas las páginas públicas del sitio.

Ejemplo:

- Home
- Nosotros
- Servicios
- Contacto
- Proyectos

---

## (auth)

Contiene todas las páginas relacionadas con autenticación.

Ejemplo:

- Login
- Recuperar contraseña

---

## (dashboard)

Contiene todo el panel administrativo.

---

# Components

Los componentes representan piezas reutilizables de la interfaz.

```text
components/

layout/
home/
services/
contact/
common/
ui/
```

## layout

Componentes estructurales.

- Navbar
- Sidebar
- Header
- Footer

---

## home

Componentes exclusivos de la página principal.

- Hero
- About
- Services
- FAQ

---

## services

Componentes propios del módulo de servicios.

---

## contact

Formulario y componentes de contacto.

---

## common

Componentes reutilizados por toda la aplicación.

Ejemplo:

- Loading
- Pagination
- ErrorMessage

---

## ui

Componentes base del Design System.

Ejemplo:

- Button
- Input
- Card
- Modal
- Toast
- Badge
- Spinner

Todos los componentes reutilizables deberán construirse primero aquí.

---

# Features

Cada funcionalidad importante del sistema debe tener su propio módulo.

```text
features/

auth/
services/
projects/
users/
contact/
```

Cada Feature encapsula:

- Componentes
- Hooks
- Servicios
- Interfaces
- Tipos

Siempre que sea posible.

---

# Hooks

Contiene todos los Hooks personalizados.

```text
useAuth.ts
useForm.ts
useModal.ts
usePagination.ts
useDebounce.ts
useWindowSize.ts
```

No deben contener lógica visual.

---

# Services

Todos los llamados al Backend deberán realizarse únicamente desde esta carpeta.

```text
api.ts
auth.service.ts
users.service.ts
services.service.ts
projects.service.ts
contact.service.ts
```

Está prohibido consumir APIs directamente desde los componentes.

---

# Store

Administra el estado global mediante Zustand.

```text
auth.store.ts
ui.store.ts
filter.store.ts
```

Responsabilidades:

- Usuario autenticado
- Sidebar
- Tema
- Preferencias
- Filtros globales

---

# Providers

Inicializan todos los Providers globales.

```text
QueryProvider.tsx
ThemeProvider.tsx
SessionProvider.tsx
```

---

# Interfaces

Define los contratos de datos utilizados por la aplicación.

Ejemplo:

```text
IUser
IProject
IService
IContact
```

---

# Types

Tipos reutilizables.

```text
UserRole
Theme
ApiStatus
```

---

# Utils

Funciones auxiliares reutilizables.

Ejemplos:

- formatDate
- capitalize
- validations

---

# Constants

Constantes globales.

Ejemplos:

- routes
- colors
- messages

---

# Schemas

Esquemas de validación.

Ejemplo:

```text
login.schema.ts
contact.schema.ts
```

---

# Styles

```text
globals.css
variables.css
```

Aquí únicamente vivirán los estilos globales.

---

# Gestión del Estado

| Herramienta | Responsabilidad |
|------------|-----------------|
| Zustand | Estado global |
| TanStack Query | Datos provenientes del Backend |
| Context API | Providers globales |
| useState | Estado local |
| useReducer | Estados complejos del componente |

---

# Route Groups

| Grupo | Responsabilidad |
|--------|-----------------|
| (public) | Sitio público |
| (auth) | Autenticación |
| (dashboard) | Panel administrativo |

> **Importante:** Los Route Groups únicamente organizan el código y **no hacen parte de la URL**.

---

# Convenciones de Desarrollo

## Componentes

- PascalCase para componentes.
- Un componente por archivo.

## Variables

- camelCase.

## Interfaces

Siempre iniciarán con la letra **I**.

Ejemplo:

```ts
IUser
IService
```

## Hooks

Siempre iniciarán con **use**.

Ejemplo:

```ts
useAuth()
useModal()
```

## Servicios

Siempre terminarán con:

```text
.service.ts
```

---

# Buenas Prácticas

- Mantener componentes pequeños.
- Evitar lógica de negocio dentro de los componentes.
- Reutilizar componentes antes de crear nuevos.
- Mantener una sola responsabilidad por archivo.
- Utilizar TypeScript en todo el proyecto.
- Seguir la estructura definida en esta guía.

---
