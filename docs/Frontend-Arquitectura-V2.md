# Arquitectura Oficial Frontend - V2

> **Versión:** V2
> **Proyecto:** AislafrioPro Frontend
> **Framework:** Next.js 16 (App Router)
> **Última actualización:** Sprint 1

---

# Estructura Oficial del Proyecto

```text
src/
├── app/
│   ├── page.tsx                     # Home (/)
│   ├── layout.tsx                   # Layout principal
│   ├── loading.tsx                  # Loading global
│   ├── error.tsx                    # Error global
│   ├── not-found.tsx                # Página 404
│   │
│   ├── (public)/                    # Organización de rutas públicas
│   │   ├── layout.tsx
│   │   ├── page.tsx                 # Home (/)
│   │   ├── servicios/
│   │   │   └── page.tsx
│   │   ├── contacto/
│   │   │   └── page.tsx
│   │   ├── proyectos/
│   │   │   ├── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   └── nosotros/
│   │       └── page.tsx
│   │
|   |
│   ├── (auth)/                      # Login, Recuperar contraseña
│   │   ├── login/
│   │   └── recuperar-password/
│   │
│   └── (dashboard)/                 # Panel administrativo
│       ├── dashboard/
│       ├── usuarios/
│       └── configuracion/
│
├── components/
│   ├── layout/
│   │   ├── Navbar/
│   │   ├── Footer/
│   │   ├── Header/
│   │   ├── Sidebar/
│   │   ├── Container/
│   │   └── Section/
│   │
│   ├── home/
│   │   ├── Hero/
│   │   ├── About/
│   │   ├── Services/
│   │   ├── Projects/
│   │   ├── FAQ/
│   │   └── ContactCTA/
│   │
│   ├── services/
│   │
│   ├── contact/
│   │
│   ├── common/
│   │   ├── Loading/
│   │   ├── Pagination/
│   │   ├── ErrorMessage/
│   │   └── EmptyState/
│   │
│   └── ui/
│       ├── Button/
│       ├── Card/
│       ├── Badge/
│       ├── Input/
│       ├── Modal/
│       ├── Toast/
│       └── Spinner/
│
├── features/
│   ├── auth/
│   ├── users/
│   ├── services/
│   ├── projects/
│   └── contact/
│
├── hooks/
│   ├── useAuth.ts
│   ├── useDebounce.ts
│   ├── useForm.ts
│   ├── useModal.ts
│   ├── usePagination.ts
│   └── useWindowSize.ts
│
├── services/
│   ├── auth.service.ts
│   ├── users.service.ts
│   ├── services.service.ts
│   ├── projects.service.ts
│   └── contact.service.ts
│
├── lib/
│   ├── api.ts                     # Instancia de Axios
│   ├── queryClient.ts               # Configuración TanStack Query
│   └── env.ts                       # Variables de entorno
│
├── providers/
│   ├── QueryProvider.tsx
│   ├── ThemeProvider.tsx
│   └── SessionProvider.tsx
│
├── store/
│   ├── auth.store.ts
│   ├── ui.store.ts
│   ├── filter.store.ts
│   └── index.ts
│
├── interfaces/
│
├── types/
│
├── constants/
│
├── schemas/
│
├── utils/
│
└── styles/
    ├── globals.css
    └── variables.css

middleware.ts
package.json
tsconfig.json
```

---

# Responsabilidad de cada carpeta

## app/

Contiene únicamente las rutas de la aplicación utilizando App Router.

---

## components/

Componentes reutilizables de la interfaz.

No deben contener lógica de negocio.

---

## features/

Agrupa la lógica específica de cada módulo del sistema.

---

## hooks/

Hooks personalizados reutilizables.

---

## services/

Contiene únicamente las funciones encargadas de consumir el Backend.

Ejemplo:

- auth.service.ts
- users.service.ts

Los servicios utilizan la instancia configurada de Axios ubicada en **lib/axios.ts**.

---

## lib/

Contiene configuraciones e infraestructura reutilizable del proyecto.

Ejemplos:

- axios.ts
- queryClient.ts
- env.ts

No debe contener lógica del negocio.

---

## providers/

Providers globales de React.

---

## store/

Estados globales.

---

## interfaces/

Interfaces TypeScript.

---

## types/

Tipos y enums compartidos.

---

## constants/

Constantes globales.

---

## schemas/

Validaciones (Zod).

---

## utils/

Funciones auxiliares reutilizables.

---

## styles/

Estilos globales del proyecto.

---

# Convenciones

## Componentes

Siempre utilizar funciones declaradas con nombre.

```tsx
export function Button() {

}
```

---

## Pages

Los archivos especiales de Next.js deben utilizar:

```tsx
export default function Page() {

}
```

Ejemplos:

- page.tsx
- layout.tsx
- loading.tsx
- error.tsx
- not-found.tsx

---

## Route Groups

Las carpetas:

```text
(public)
(auth)
(dashboard)
```

son únicamente organizativas.

No hacen parte de la URL.

---

# Cambios respecto a la V1

## Cambio 1

La Home pasa a estar ubicada en:

```text
src/app/page.tsx
```

Ya que `(public)` es únicamente un Route Group.

---

## Cambio 2

La configuración de Axios se mueve a:

```text
src/lib/axios.ts
```

Ya no existirá:

```text
src/services/api.ts
```

---

## Cambio 3

La carpeta `services` contendrá únicamente servicios de consumo de API.

Ejemplo:

```text
auth.service.ts
users.service.ts
projects.service.ts
```

---

## Cambio 4

Los Route Groups `(public)`, `(auth)` y `(dashboard)` se utilizarán exclusivamente para organizar rutas y no para duplicar páginas raíz.