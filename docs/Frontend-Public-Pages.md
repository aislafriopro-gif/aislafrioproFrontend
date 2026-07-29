# Arquitectura de páginas públicas y módulo Home

## Objetivo

Documentar la organización técnica de las páginas públicas y la implementación actual del módulo Home de AislaFrioPro.

La Arquitectura Oficial Frontend V2 es la referencia principal del módulo.

## Organización de carpetas

```text
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── (public)/
│       └── layout.tsx
└── components/
    ├── home/
    │   ├── HomePage.tsx
    │   ├── Hero/
    │   │   └── Hero.tsx
    │   ├── About/
    │   │   └── About.tsx
    │   ├── Services/
    │   │   └── Services.tsx
    │   └── FAQ/
    │       └── FAQ.tsx
    ├── layout/
    └── ui/
```

## Página Home

La página Home corresponde a:

```text
src/app/page.tsx
```

y representa la ruta `/`.

Este archivo únicamente consume `HomePage`, manteniendo separadas la definición de la ruta y la composición visual.

## Route Group público

```text
src/app/(public)/
```

se utiliza para organizar las demás rutas públicas, como servicios, contacto, proyectos y nosotros.

El nombre `(public)` no forma parte de las URL.

## Organización del módulo Home

`HomePage` es responsable de organizar las secciones de Home en el siguiente orden:

```text
HomePage
├── Hero
├── About
├── Services
└── FAQ
```

La lógica visual de cada sección permanece separada dentro de su propio componente.

## Componentes implementados

### Hero

- Objetivo: presentar la sección principal de Home.
- Responsabilidad: mostrar el mensaje principal y preparar espacios para acciones y contenido gráfico.
- Ubicación: `src/components/home/Hero/Hero.tsx`.
- Componentes reutilizados: `Section`, `Container` y `Badge`.
- Dependencias: ReactNode, componentes de Layout y Design System.
- Datos: recibe contenido estático mediante props.
- Integraciones: no consume APIs ni servicios.

### About

- Objetivo: presentar la introducción institucional de AislaFrioPro.
- Responsabilidad: organizar el título, descripción y contenido complementario de la sección Nosotros.
- Ubicación: `src/components/home/About/About.tsx`.
- Componentes reutilizados: `Section`, `Container` y `Badge`.
- Dependencias: ReactNode, componentes de Layout y Design System.
- Datos: recibe contenido estático mediante props.
- Integraciones: no consume APIs ni servicios.

### HomePage

- Objetivo: componer las secciones de la página Home.
- Responsabilidad: mantener el orden de Hero, About, Services y FAQ sin duplicar su implementación.
- Ubicación: `src/components/home/HomePage.tsx`.
- Dependencias: `Hero`, `About`, `Services` y `FAQ`.
- Reutilización: es consumido desde `src/app/page.tsx`.

## Componentes compartidos

| Componente | Ubicación | Responsabilidad |
|---|---|---|
| Section | `src/components/layout/Section/Section.tsx` | Definir secciones semánticas y espaciado vertical |
| Container | `src/components/layout/Container/Container.tsx` | Centrar y limitar el ancho del contenido |
| Badge | `src/components/ui/Badge/Badge.tsx` | Mostrar etiquetas visuales |
| Navbar | `src/components/layout/Navbar/Navbar.tsx` | Navegación principal |
| Footer | `src/components/layout/Footer/Footer.tsx` | Pie de página compartido |
| Card | `src/components/ui/Card/Card.tsx` | Presentar contenido dentro de tarjetas reutilizables |

## Definiciones pendientes de componentes

### Hero

#### Props

- `eyebrow`: etiqueta opcional.
- `title`: título principal.
- `description`: descripción principal.
- `actions`: espacio opcional para llamadas a la acción.
- `media`: espacio opcional para contenido gráfico.
- `className`: clases adicionales.

#### Composición

```text
Section
└── Container
    └── Contenido
        ├── Badge opcional
        ├── Título
        ├── Descripción
        ├── Acciones opcionales
        └── Recurso gráfico opcional
```

#### Criterios de reutilización

El componente debe recibir su contenido mediante props y no contener llamadas a APIs ni lógica de negocio.

### About

#### Props

- `eyebrow`: etiqueta opcional.
- `title`: título de la sección.
- `description`: descripción institucional.
- `additionalContent`: contenido complementario opcional.
- `media`: recurso gráfico opcional.
- `className`: clases adicionales.

#### Composición

```text
Section
└── Container
    └── Contenido
        ├── Badge opcional
        ├── Título
        ├── Descripción
        ├── Contenido adicional opcional
        └── Recurso gráfico opcional
```

#### Criterios de reutilización

El componente debe permanecer presentacional y aceptar contenido mediante props.

## Implementación de Services y FAQ

### Services

- Objetivo: presentar una vista inicial de los servicios ofrecidos.
- Responsabilidad: renderizar una colección de servicios mediante tarjetas reutilizables.
- Ubicación: `src/components/home/Services/Services.tsx`.
- Componentes utilizados: `Section`, `Container`, `Badge` y `Card`.
- Dependencias: tipos `IServiceItem`, componentes de Layout y Design System.
- Datos: recibe una colección tipada mediante la prop `services`.
- Integraciones: no consume APIs ni servicios.
- Información pendiente: nombres, descripciones, iconografía y catálogo definitivo.

#### Props

- `eyebrow`: etiqueta opcional.
- `title`: título de la sección.
- `description`: descripción opcional.
- `services`: colección de servicios.
- `className`: clases adicionales.

#### Composición

```text
Section
└── Container
    ├── Encabezado
    └── Grid responsive
        └── Card por cada servicio
```
#### Criterios de reutilización

Services no contiene datos oficiales ni lógica de Backend. Recibe la información mediante props y adapta las tarjetas con un grid Mobile First.

### FAQ

- Objetivo: mostrar preguntas y respuestas frecuentes.
- Responsabilidad: renderizar una colección desplegable de preguntas predefinidas.
- Ubicación: `src/components/home/FAQ/FAQ.tsx`.
- Componentes utilizados: `Section`, `Container`, `Badge` y `Card`.
- Dependencias: tipos `IFaqItem`, componentes de Layout, Design System y elementos HTML `details` y `summary`.
- Datos: recibe una colección tipada mediante la prop `faqs`.
- Integraciones: no consume APIs ni servicios.
- Información pendiente: cantidad, preguntas, respuestas y fuente de información definitivas.

#### Props

- `eyebrow`: etiqueta opcional.
- `title`: título de la sección.
- `description`: descripción opcional.
- `faqs`: colección de preguntas y respuestas.
- `className`: clases adicionales.

#### Composición

```text
Section
└── Container
    ├── Encabezado
    └── Lista de Cards
        └── details
            ├── summary
            └── Respuesta
```

## Dependencias internas

- `src/app/layout.tsx`
- `src/components/home/HomePage.tsx`
- `src/components/layout/`
- `src/components/ui/`
- `src/styles/globals.css`
- `src/styles/variables.css`

## Dependencias compartidas

- Next.js
- React
- Tailwind CSS

## Pendiente de definición

### Componentes faltantes

Según la Arquitectura V2, todavía están pendientes:

- Projects.
- ContactCTA.

### Información funcional pendiente

- Comportamiento y destino de las llamadas a la acción.
- Información institucional definitiva.
- Contenido final de las siguientes secciones.

### Recursos gráficos pendientes

- Imagen oficial del Hero.
- Imagen o recurso gráfico de About.
- Recursos optimizados para distintos tamaños de pantalla.

### Contenido pendiente

- Textos definitivos aprobados.
- Mensajes de llamadas a la acción.
- Información comercial e institucional validada.

### Integraciones futuras

- Fuentes de contenido dinámico.
- Servicios y endpoints de Backend.
- Formularios o acciones interactivas.

## Observaciones técnicas

- Home está ubicada en `src/app/page.tsx`, según la Arquitectura V2.
- `(public)` se reserva para organizar las demás rutas públicas.
- Hero, About, Services y FAQ utilizan funciones declaradas y props tipadas.
- Los componentes permanecen presentacionales.
- No se consumen APIs ni se implementa lógica de Backend.
- La implementación utiliza tokens del Design System y enfoque Mobile First.
- No se incorporaron imágenes porque todavía no existen recursos oficiales.
- Debe confirmarse cómo compartir Navbar y Footer con Home, ya que la página raíz no hereda automáticamente `src/app/(public)/layout.tsx`.
- Services y FAQ utilizan contenido temporal definido en `HomePage`.
- El contenido temporal deberá reemplazarse cuando exista información oficial.
- FAQ utiliza `details` y `summary` para mantener una interacción accesible sin estado adicional.
- No existen endpoints ni fuentes de contenido definidas para estas secciones.