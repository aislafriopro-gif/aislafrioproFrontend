# Arquitectura Oficial Frontend - V2

> **Versión:** V2
>
> **Proyecto:** AislafrioPro Frontend
>
> **Framework:** Next.js 16 (App Router)
>
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
│   ├── (public)/                   # Organizacion de las rutas publicas
│   │   ├── layout.tsx
│   │   ├── page.tsx                #Home/
│   │   ├── nosotros/
│   │   │   └── page.tsx
│   │   ├── servicios/
│   │   │   └── page.tsx
│   │   ├── contacto/
│   │   │   └── page.tsx
│   │   ├── proyectos/
│   │   │   ├── page.tsx
│   │   │   └── [id]/
│   │   │       ├── page.tsx
│   │   │       ├── loading.tsx
│   │   │       ├── error.tsx
│   │   │       └── not-found.tsx
│   │   └── tienda/
│   │       ├── page.tsx
│   │       └── [slug]/
│   │           └── page.tsx
│   │
│   ├── (auth)/                      # Rutas relacionadas con autenticación
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── register/
│   │   │   └── page.tsx
│   │   └── recuperar-password/
│   │       └── page.tsx
│   │
│   └── (dashboard)/                # Panel administrativo
│       ├── layout.tsx
│       ├── dashboard/
│       │   └── page.tsx
│       ├── usuarios/
│       │   └── page.tsx
│       ├── configuracion/
│       │   └── page.tsx
│       └── cotizaciones/
│           └── page.tsx
│
├── components/
│   ├── auth/                        # UI de autenticación
│   │   ├── LoginForm/
│   │   │   └── LoginForm.tsx
│   │   └── RegisterForm/
│   │       └── RegisterForm.tsx
│   │
│   ├── dashboard/
│   │   ├── DataTable/
│   │   │   └── DataTable.tsx
│   │   ├── MetricCard/
│   │   │   └── MetricCard.tsx
│   │   └── PageHeader/
│   │       └── PageHeader.tsx
│   │
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
    └── services/
        └── quote-requests.service.ts
│   │
│   ├── contact/
│   │
│   ├── common/
│   │   ├── Loading/
│   │   ├── Pagination/
│   │   ├── ErrorMessage/
│   │   └── EmptyState/
│   │
│   ├── products/
│   │   ├── ProductGrid/
│   │   ├── ProductCard/
│   │   └── ProductInquiryForm/
│   │
│   ├── quote-requests/
│   │   └── QuoteRequestForm/
│   │       └── QuoteRequestForm.tsx
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
│   ├── useWindowSize.ts
│   ├── useProducts.ts
│   ├── useProduct.ts
│   └── useDashboardStats.ts
│
├── services/
│   ├── auth.service.ts
│   ├── users.service.ts
│   ├── services.service.ts
│   ├── projects.service.ts
│   ├── contact.service.ts
│   ├── products.service.ts
│   ├── quote-requests.service.ts
│   └── dashboard.service.ts
│
├── lib/
│   ├── api.ts                       # Instancia de Axios
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
│   └── quote-request.schema.ts
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

* **Rutas de Autenticación `(auth)`:** Contiene las rutas relacionadas con autenticación. El archivo `page.tsx` dentro de cada directorio (ej. `login/page.tsx`, `register/page.tsx`) se utiliza únicamente como entrada de la ruta y no debe contener lógica compleja ni de UI.

---

## components/

Componentes reutilizables de la interfaz. No deben contener lógica de negocio profunda, sino manejar la presentación y los estados locales de UI.

* **UI de Autenticación (`components/auth/`):** Toda la UI de autenticación se mantiene centralizada aquí. Los componentes como `LoginForm` y `RegisterForm` son independientes, encapsulan su propio estado visual y son 100% reutilizables.

---

## features/
Agrupa la lógica específica de cada módulo del sistema.

Gestión de Cotizaciones (features/quote-requests/): Módulo encargado de la lógica de negocio, tipos y funciones auxiliares para la gestión de solicitudes de cotización.

## hooks/

Hooks personalizados reutilizables.

---

## services/

Contiene únicamente las funciones encargadas de consumir el Backend.

Ejemplos:

* `auth.service.ts`
* `users.service.ts`

Los servicios utilizan la instancia configurada de Axios ubicada en `lib/axios.ts` (o `lib/api.ts`).

---

## lib/

Contiene configuraciones e infraestructura reutilizable del proyecto.

Ejemplos:

* `axios.ts / api.ts`
* `queryClient.ts`
* `env.ts`

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

## Pages

Los archivos especiales de Next.js deben utilizar `export default function` con el nombre adecuado de la página:

```tsx
export default function Page() {

}
```

Ejemplos:

* `page.tsx`
* `layout.tsx`
* `loading.tsx`
* `error.tsx`
* `not-found.tsx`

---

## Route Groups

Las carpetas:

* `(public)`
* `(auth)`
* `(dashboard)`

son únicamente organizativas. No hacen parte de la URL generada en el navegador.

---

# Cambios respecto a la V1

## Cambio 1

La Home pasa a estar ubicada en:

```text
src/app/page.tsx
```

Ya que `(public)` es únicamente un Route Group.

## Cambio 2

La configuración de Axios se mueve a:

```text
src/lib/api.ts (o axios.ts)
```

Ya no existirá la instancia en:

```text
src/services/api.ts
```

## Cambio 3

La carpeta `services` contendrá únicamente servicios de consumo de API aislados.

Ejemplos:

```text
auth.service.ts
users.service.ts
projects.service.ts
```

## Cambio 4

Los Route Groups `(public)`, `(auth)` y `(dashboard)` se utilizarán exclusivamente para organizar rutas y agrupar lógicas/layouts similares, y no para duplicar páginas raíz.

Cambio 5
Se ha añadido el módulo quote-requests para dar soporte a la funcionalidad de gestión de cotizaciones:

src/components/quote-requests/: Contiene la interfaz visual para la gestión de cotizaciones.

src/features/quote-requests/: Módulo de lógica de negocio para cotizaciones.

src/app/(dashboard)/cotizaciones/: Ruta administrativa para visualizar y gestionar las solicitudes de cotización.


---

### **Notas de implementación para el equipo:**
1. He registrado el módulo en las secciones de `features` y estructura del proyecto.
2. He añadido la nueva ruta `src/app/(dashboard)/cotizaciones/`.
3. He documentado que `quote-requests` es el módulo responsable de toda la funcionalidad relacionada con la gestión y el flujo de cotizaciones del sistema.
