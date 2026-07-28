# Arquitectura de páginas públicas

## Objetivo

El módulo de páginas públicas organiza las vistas accesibles sin autenticación del proyecto AislaFrioPro.

Su objetivo es proporcionar una estructura visual reutilizable y consistente, basada en la arquitectura oficial, el Design System y las UI Guidelines.

## Responsabilidades

Las páginas públicas deberán:

- Presentar la información pública del proyecto.
- Reutilizar los componentes existentes.
- Compartir un mismo Navbar y Footer.
- Respetar el enfoque Mobile First.
- Mantenerse separadas de las páginas de autenticación y administración.
- No consumir APIs hasta que se definan las integraciones correspondientes.

## Organización de carpetas

```text
src/
├── app/
│   ├── layout.tsx
│   └── (public)/
│       ├── layout.tsx
│       └── page.tsx
├── components/
│   ├── layout/
│   ├── home/
│   └── ui/
├── constants/
│   └── routes.ts
└── styles/
    ├── globals.css
    └── variables.css
```

### `src/app/(public)/`

Route Group de Next.js destinado a las páginas públicas. Su nombre no forma parte de la URL.

### `src/components/home/`

Ubicación prevista para futuros componentes específicos del Home. Actualmente no está implementada.

## Layout público

`src/app/(public)/layout.tsx` comparte la siguiente estructura:

```text
Navbar
└── main
    └── Página pública
Footer
```

El Navbar proporciona la navegación principal y el Footer presenta información institucional y navegación secundaria.

## Componentes utilizados

| Componente | Ubicación | Responsabilidad | Reutilización |
|---|---|---|---|
| Navbar | `src/components/layout/Navbar/Navbar.tsx` | Navegación principal | Todas las páginas públicas |
| Footer | `src/components/layout/Footer/Footer.tsx` | Pie de página compartido | Todas las páginas públicas |
| Container | `src/components/layout/Container/Container.tsx` | Centrar y limitar el contenido | Secciones públicas |
| Section | `src/components/layout/Section/Section.tsx` | Organizar contenido semántico | Secciones públicas |
| Badge | `src/components/ui/Badge/Badge.tsx` | Mostrar una etiqueta visual | Home y otras interfaces |

No se crearon componentes duplicados.

## Dependencias

### Dependencias internas

- `src/app/layout.tsx`
- `src/constants/routes.ts`
- `src/components/layout/`
- `src/components/ui/`
- `src/styles/globals.css`
- `src/styles/variables.css`

### Dependencias compartidas

- Next.js
- React
- Tailwind CSS

### Dependencias pendientes

- Contenido definitivo del Home.
- Componentes específicos de `src/components/home/`.
- Recursos gráficos oficiales.
- Integraciones con Backend.
- Demás páginas públicas.

## Observaciones técnicas

- Home corresponde a la ruta `/`.
- El layout público está anidado dentro del layout raíz.
- Home funciona como Server Component.
- Navbar utiliza comportamiento de cliente para el menú móvil.
- No existe lógica de negocio ni consumo de APIs.
- Los componentes nuevos deberán documentarse antes de crearse.