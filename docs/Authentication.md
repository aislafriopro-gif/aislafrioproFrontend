# Documentación de Arquitectura: Módulo de Autenticación

## 1. Objetivo del Módulo

El módulo de autenticación tiene como propósito centralizar la gestión de sesiones de usuario, el manejo de credenciales, el control de tokens de acceso y la comunicación segura con los endpoints de autenticación del Backend en la aplicación Frontend de AislafrioPro.

## 2. Arquitectura Utilizada

La arquitectura del módulo sigue una separación de responsabilidades en capas dentro del ecosistema de Next.js (App Router):

- **Capa de Servicios (`src/services/`):** Encargada exclusivamente de la comunicación con la API.
- **Capa de Cliente HTTP (`src/lib/`):** Instancia centralizada de Axios configurada globalmente con interceptores y tiempos de espera.
- **Capa de Estado Global (`src/store/`):** Gestión reactiva del estado de sesión y tokens del usuario (Zustand).
- **Capa de Hooks (`src/hooks/`):** Exposición limpia y desacoplada del estado y acciones hacia los componentes mediante funciones declaradas.
- **Capa de Providers (`src/providers/`):** Proveedor de ciclo de vida e inicialización de la sesión global.

## 3. Ubicación de los Archivos Relacionados

- **Servicio de Autenticación:** `src/services/auth.service.ts`
- **Cliente HTTP Global:** `src/lib/api.ts`
- **Store de Autenticación:** `src/store/auth.store.ts`
- **Hook de Autenticación:** `src/hooks/useAuth.ts`
- **Provider de Sesión:** `src/providers/SessionProvider.tsx`
- **Documentación del Módulo:** `docs/Authentication.md`

## 4. Responsabilidad de Componentes y Capas

### `auth.service.ts`

- Centralizar todas las operaciones relacionadas con la autenticación (Login, Logout, Refresh Token).
- Utilizar funciones declaradas independientes de acuerdo con los estándares del proyecto.
- Proveer tipados estrictos (`TypeScript`) tanto para las credenciales de entrada como para las respuestas del servidor.

### `auth.store.ts`

- Administrar el estado global reactivo de la sesión utilizando Zustand con persistencia local (`auth-storage`).
- Mantener la información del usuario (`user`), el token (`token`) y el indicador booleano (`isAuthenticated`).
- Desacoplarse totalmente de la lógica de presentación y de llamadas directas a APIs o backend.

### `useAuth.ts`

- Actuar como capa intermedia (Custom Hook) exportada mediante función declarada.
- Exponer de manera limpia y tipada el estado del store y sus métodos hacia el resto de los componentes.

### `SessionProvider.tsx`

- Envolver la aplicación en el nivel superior para vigilar y asegurar el ciclo de vida de la sesión mediante el hook `useAuth`.

## 5. Relación entre `auth.service.ts` y `api.ts`

- `auth.service.ts` no realiza llamadas HTTP directas ni implementa instancias independientes de Axios.
- Utiliza exclusivamente la instancia centralizada `api` exportada desde `src/lib/api.ts` para garantizar el uso de las cabeceras comunes, el manejo unificado de errores y el soporte de interceptores.

## 6. Flujo General del Servicio en el Frontend

1. El componente o la vista interactúa con el hook de autenticación (`useAuth`).
2. El hook consume el store global de autenticación (`auth.store.ts`) o invoca las funciones declaradas en `auth.service.ts`.
3. El servicio ejecuta la petición HTTP a través del cliente centralizado `api.ts`.
4. La respuesta es procesada y devuelta al store para actualizar el estado global de la sesión del usuario en la aplicación.

---

## 7. Dependencias y Elementos Pendientes con el Backend

_A continuación se detallan los elementos que aún no pueden implementarse por completo por depender de la definición y entrega final de los contratos por parte del equipo Backend:_

- **Endpoints pendientes de autenticación:** Rutas exactas definitivas para login, logout, refresh token y obtención de perfil (actualmente en rutas preliminares `/auth/...`).
- **Contratos Request/Response pendientes:** Estructuras de datos definitivas que retornará el servidor (esquemas exactos de los objetos de usuario, campos obligatorios y opcionales).
- **Flujo de Login pendiente:** Validación definitiva del almacenamiento seguro del token (cookies HTTP-only vs localStorage) según los requerimientos de seguridad del backend.
- **Flujo de Logout pendiente:** Confirmación de si el backend requiere invalidación en servidor mediante token revocado o si es puramente del lado cliente.
- **Flujo de Refresh Token pendiente:** Mecanismo exacto de interceptación automática ante expiración del token (tiempos de expiración, reintentos de peticiones encoladas).
- **Manejo de errores pendiente:** Códigos de estado HTTP y mensajes estandarizados que enviará el backend para cada tipo de fallo en autenticación.
- **Información pendiente del Middleware:** Definición de rutas protegidas y roles específicos permitidos para la validación de acceso a nivel de enrutador/middleware en Next.js.

## 8. Arquitectura y Flujo del Middleware de Autenticación

### Objetivo del Middleware

Interceptar las peticiones HTTP a nivel de enrutador en Next.js para controlar el acceso a las vistas, validar sesiones y gestionar redirecciones automáticas según el estado de autenticación del usuario.

### Responsabilidad dentro de la Aplicación

Actúa como la primera línea de defensa perimetral en el cliente/servidor Next.js, evaluando las rutas antes de que se rendericen o procesen.

### Ubicación del Archivo

- **Ruta principal:** `middleware.ts` (ubicado en la raíz del proyecto).

### Relación con otros Componentes

- **Relación con `auth.service.ts`:** El Middleware se ejecutará de forma independiente al ciclo de vida de React, por lo que requerirá verificar tokens o estados a nivel de almacenamiento seguro o cookies gestionadas por los servicios.
- **Relación con `auth.store.ts`:** El estado global en Zustand reside en el cliente, por lo que el middleware consumirá preferentemente mecanismos accesibles a nivel de servidor/cookies si el backend lo requiere.
- **Relación con `SessionProvider.tsx`:** Funciona en conjunto con el proveedor de sesión para asegurar que las restricciones de ruta coincidan con el estado reactivo del cliente.
- **Relación con rutas públicas y privadas:** Su matcher está configurado para evaluar las rutas de la aplicación y decidir el acceso según el estatus de autenticación.

### Flujo Esperado

```text
Solicitud del usuario
        │
        ▼
   middleware.ts
        │
        ▼
(Validación pendiente de Backend)
        │
        ▼
Permitir acceso o redireccionar
```

## 9. Pendiente de Definición por Backend

Los siguientes puntos del Middleware quedan sujetos a la entrega de contratos y lineamientos oficiales por parte del equipo de Backend:

- **Estrategia de autenticación**: Definición de si se utilizará autenticación basada en cookies HTTP-only, tokens en cabeceras o almacenamiento local.
- **Tipo de Token**: Estructura y formato del token de sesión (JWT, opaco, etc.).
- **Criterios de validación**: Reglas exactas para comprobar la validez de la sesión en el servidor o cliente.
- **Rutas protegidas**: Listado definitivo de endpoints o páginas que requerirán autenticación obligatoria.
- **Rutas públicas**: Listado de vistas accesibles sin sesión previa (ej. Login, Recuperación de contraseña).
- **Redirecciones**: Comportamiento y rutas de destino ante accesos no autorizados.
- **Manejo de expiración de sesión**: Acciones a tomar cuando el token caduque durante la navegación.
- **Flujo de Refresh Token**: Mecanismo de renovación automática de credenciales sin interrumpir la experiencia del usuario.

## 10. Flujo de Integración Frontend–Backend

La integración del módulo de autenticación con el servidor se estructurará de forma desacoplada en capas consecutivas. Actualmente no existen endpoints disponibles desde el Backend, por lo que no se deben implementar llamadas reales, quedando la integración pendiente hasta contar con la especificación oficial de la API.

### Esquema del Flujo de Integración

```text
[ Componente de UI ]
        │
        ▼ (Consume estado y acciones)
[ useAuth Hook ]
        │
        ▼ (Invoca mutaciones de sesión)
[ auth.store.ts ]
        │
        ▼ (Solicita operaciones de red)
[ auth.service.ts ]
        │
        ▼ (Ejecuta peticiones HTTP con interceptores)
[ api.ts (src/lib/api.ts) ]
        │
        ▼ (Petición HTTP - Pendiente)
[ API Backend (Pendiente de especificación) ]
```

### Detalle por Capa de Integración

#### 1. Componente / Vista (UI)

- **Responsabilidad**: Renderizar la interfaz de usuario y capturar las interacciones (ej. formulario de login, botón de cerrar sesión).
- **Información que recibe**: Estado reactivo de la sesión (`isAuthenticated`, `user`, `token`) y acciones a través del hook.
- **Información que entrega**: Datos ingresados por el usuario (credenciales).
- **Dependencias**: Hook de autenticación (`useAuth`).
- **Punto de interacción con Backend**: N/A (No interactúa directamente con la red; delega en las capas inferiores).

#### 2. Hook de Autenticación (`useAuth.ts`)

- **Responsabilidad**: Exponer de manera limpia y tipada el estado global y los métodos de autenticación hacia los componentes.
- **Información que recibe**: Estado global desde el store de Zustand.
- **Información que entrega**: Selectores de estado y funciones de acción (`login`, `logout`, etc.) optimizadas para la UI.
- **Dependencias**: Store de autenticación (`auth.store.ts`).
- **Punto de interacción con Backend**: N/A.

#### 3. Store de Autenticación (`auth.store.ts`)

- **Responsabilidad**: Administrar el estado global reactivo de la sesión del usuario y mantener la persistencia local en el cliente.
- **Información que recibe**: Datos de sesión devueltos por los servicios o acciones del usuario.
- **Información que entrega**: Estado actual de la sesión y métodos mutadores al hook.
- **Dependencias**: Servicio de autenticación (`auth.service.ts`).
- **Punto de interacción con Backend**: Coordinará el llamado a las funciones del servicio cuando el usuario intente autenticarse.

#### 4. Servicio de Autenticación (`auth.service.ts`)

- **Responsabilidad**: Centralizar las operaciones específicas del dominio de autenticación (peticiones de login, registro, refresh token, logout).
- **Información que recibe**: Credenciales u objetos de solicitud tipados (`LoginCredentials`, etc.).
- **Información que entrega**: Promesas con las respuestas procesadas del servidor (datos del usuario y tokens).
- **Dependencias**: Cliente HTTP centralizado (`src/lib/api.ts`).
- **Punto de interacción con Backend**: (Pendiente) Punto donde se invocarán las rutas oficiales (ej. `POST /auth/login`, `POST /auth/logout`).

#### 5. Cliente HTTP (`src/lib/api.ts`)

- **Responsabilidad**: Gestionar la comunicación HTTP base, configurar la URL base, tiempos de espera e interceptores de cabeceras/errores.
- **Información que recibe**: Configuración de solicitudes Axios y tokens de autorización.
- **Información que entrega**: Respuestas HTTP estandarizadas o manejo centralizado de errores (ej. códigos 401, 500).
- **Dependencias**: Librería Axios y variables de entorno (`NEXT_PUBLIC_API_URL`).
- **Punto de interacción con Backend**: (Pendiente) Canal físico de red hacia los endpoints definitivos del servidor.

### 11. Matriz de Dependencias del Módulo de Autenticación

La siguiente tabla detalla las dependencias internas, externas y los responsables arquitectónicos de cada archivo que compone el módulo de autenticación:

| Archivo                                 | Depende de                                             | Responsable (Capa / Módulo)                  |
| :-------------------------------------- | :----------------------------------------------------- | :------------------------------------------- |
| **`src/services/auth.service.ts`**      | `src/lib/api.ts`                                       | Capa de Servicios / Dominio de Autenticación |
| **`src/store/auth.store.ts`**           | Zustand (Librería externa), `auth.service.ts` (futuro) | Capa de Estado Global                        |
| **`src/hooks/useAuth.ts`**              | `src/store/auth.store.ts`                              | Capa de Hooks Personalizados                 |
| **`src/providers/SessionProvider.tsx`** | `src/hooks/useAuth.ts`                                 | Capa de Proveedores de Ciclo de Vida         |
| **`middleware.ts`**                     | Next.js Server / Configuración de Rutas                | Capa Perimetral / Enrutamiento               |
| **`src/lib/api.ts`**                    | Axios (Librería externa), Variables de Entorno         | Capa de Cliente HTTP Centralizado            |

### Dependencias Externas Pendientes (Backend)

Para que el módulo complete su funcionalidad operativa, se encuentran pendientes de entrega y definición por parte del equipo de Backend los siguientes recursos:

- **Endpoints de Login**: Rutas y contratos de solicitud/respuesta para la autenticación de usuarios.
- **Endpoints de Logout**: Rutas para la invalidación de sesiones en el servidor.
- **Endpoints de Refresh**: Mecanismo y rutas para la renovación de tokens de acceso caducados.
- **Roles**: Definición y estructura de los roles autorizados en el sistema.
- **Permisos**: Listado de permisos asociados a las vistas y operaciones de la aplicación.
- **Respuestas HTTP**: Esquemas JSON estandarizados para las respuestas exitosas de la API.
- **Códigos de error**: Catálogo oficial de códigos de estado HTTP y mensajes de error orientados al usuario y al sistema.
