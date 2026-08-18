# Documentación de Arquitectura: Módulo de Autenticación

## 1. Objetivo del Módulo
El módulo de autenticación tiene como propósito centralizar la gestión de sesiones de usuario, el manejo de credenciales, el control de tokens de acceso y la comunicación segura con los endpoints de autenticación del Backend en la aplicación Frontend de AislafrioPro.

---

## 2. Arquitectura Utilizada
La arquitectura del módulo sigue una separación de responsabilidades en capas dentro del ecosistema de Next.js (App Router):

*   **Capa de Servicios (`src/services/`):** Encargada exclusivamente de la comunicación con la API.
*   **Capa de Cliente HTTP (`src/lib/`):** Instancia centralizada de Axios configurada globalmente con interceptores y tiempos de espera.
*   **Capa de Componentes (`src/components/auth/`):** Formularios independientes (UI) que manejan el estado local de la interacción del usuario.
*   **Capa de Rutas (`src/app/(auth)/`):** Archivos `page.tsx` que sirven como punto de entrada y renderizan los componentes de UI correspondientes.

---

## 3. Ubicación de los Archivos Relacionados
*   **Rutas de Autenticación:** `src/app/(auth)/login/page.tsx`, `src/app/(auth)/register/page.tsx`
*   **Componentes UI:** `src/components/auth/LoginForm/`, `src/components/auth/RegisterForm/`
*   **Servicio de Autenticación:** `src/services/auth.service.ts`
*   **Cliente HTTP Global:** `src/lib/api.ts`
*   **Documentación del Módulo:** `docs/Authentication.md`

---

## 4. Flujo de Autenticación y Manejo de Sesión
El manejo de sesión en AislaFrioPro se basa en el estándar de tokens (Token-based authentication).

*   **Persistencia:** Los tokens (`token` y `refreshToken`) se almacenan en el `localStorage` del navegador.
*   **Inyección en peticiones:** La instancia global de Axios (`api.ts`) es responsable de interceptar las peticiones salientes e inyectar el token en las cabeceras de autorización.
*   **Intercepción de errores:** Si el backend responde con un error `401 Unauthorized`, el sistema puede desencadenar el flujo de *refresh* o redirigir al usuario al login.

---

## 5. Operaciones de Autenticación

### Login
El flujo de inicio de sesión verifica las credenciales de un usuario existente.
*   El componente `LoginForm` recopila el correo y la contraseña.
*   Se invoca la función `login(credentials)` del servicio `auth.service.ts`.
*   Se realiza un `POST` al endpoint `/auth/login`.
*   Si es exitoso, el servicio extrae el `token` y `refreshToken` de la respuesta, los guarda en `localStorage` y retorna los datos.
*   El componente redirige al usuario a la ruta principal (`/`).

### Register
El flujo de registro crea una nueva cuenta de usuario en la plataforma.
*   El componente `RegisterForm` recopila nombre, correo y contraseña.
*   Se invoca la función `register(credentials)` del servicio `auth.service.ts`.
*   Se realiza un `POST` al endpoint `/users`.
*   Al registrarse exitosamente, el backend retorna automáticamente los tokens de sesión.
*   El servicio guarda los tokens en `localStorage`, autenticando al usuario inmediatamente.
*   El componente muestra un mensaje de éxito y redirige a la ruta principal.

### Logout
El flujo de cierre de sesión destruye las credenciales locales del usuario.
*   Se invoca la función `logout()` del servicio `auth.service.ts`.
*   La función elimina los valores `token` y `refreshToken` del `localStorage`.
*   Opcionalmente, se redirige al usuario a la vista de `/login`.

### Refresh
El flujo de renovación actualiza un token de acceso caducado sin solicitar credenciales nuevamente.
*   Se invoca la función `refreshToken()` en `auth.service.ts`.
*   Se recupera el `refreshToken` actual del `localStorage`.
*   Se realiza un `POST` al endpoint `/auth/refresh`.
*   El nuevo `token` recibido reemplaza al anterior en el `localStorage`.

---

## 6. Relación entre auth.service.ts, las Interfaces y las Rutas
La integración de la autenticación sigue un flujo estricto y tipado para garantizar la consistencia de datos entre la UI y el Backend.

### Las Interfaces (Contratos de Datos)
Definidas en `auth.service.ts`, dictan exactamente qué datos entran y salen:
*   **`LoginCredentials`**: Exige `email` y `password`.
*   **`RegisterCredentials`**: Exige `name`, `email` y `password`.
*   **`AuthResponse`**: Define la estructura de respuesta exitosa, asegurando la existencia de un `token`, `user` y opcionalmente un `refreshToken`.

### El Servicio (`auth.service.ts`)
*   Actúa como puente. Recibe datos tipados mediante las interfaces (`LoginCredentials` o `RegisterCredentials`).
*   Utiliza la instancia de `api.ts` para ejecutar la petición HTTP.
*   Gestiona el efecto secundario de interactuar con el `localStorage`.
*   Retorna una promesa con el tipo `AuthResponse`.

### Las Rutas y Componentes
*   Las rutas (ej. `app/(auth)/login/page.tsx`) son extremadamente limpias; su única responsabilidad es renderizar el componente.
*   Los componentes UI (`LoginForm.tsx`, `RegisterForm.tsx`) importan las interfaces para tipar sus estados locales (ej. `formData`).
*   Los componentes importan las funciones del servicio (`login`, `register`) y las ejecutan en sus manejadores de eventos (ej. `handleSubmit`), controlando los estados de carga (`isLoading`) y los mensajes de error devueltos por la promesa.