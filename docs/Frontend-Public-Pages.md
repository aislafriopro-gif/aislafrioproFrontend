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

## Páginas públicas independientes implementadas

| Página | Ruta | Ubicación | Estado |
|---|---|---|---|
| Nosotros | `/nosotros` | `src/app/(public)/nosotros/page.tsx` | Estructura visual implementada |
| Servicios | `/servicios` | `src/app/(public)/servicios/page.tsx` | Estructura visual implementada |
| Proyectos | `/proyectos` | `src/app/(public)/proyectos/page.tsx` | Estructura visual implementada |
| Contacto | `/contacto` | `src/app/(public)/contacto/page.tsx` | Estructura visual implementada |

Las páginas utilizan el layout público compartido, Navbar, Footer y componentes del Design System. La implementación es responsive, no consume APIs y utiliza contenido provisional hasta recibir información oficial.

## Propuesta visual implementada

- Nosotros utiliza una composición responsive de contenido e imagen.
- Servicios reutiliza tarjetas para mostrar icono, título, descripción y acción.
- Proyectos incorpora categorías visuales, tarjetas provisionales y llamada a la acción.
- Contacto incorpora canales informativos, formulario visual y espacio reservado para ubicación.
- Se utilizan tokens oficiales de color, tipografía, espaciado, bordes y breakpoints.
- Los recursos no disponibles se representan mediante placeholders.
- Los SVG provisionales de servicios se almacenan en `public/icons/services/`.

## Observaciones y definiciones pendientes

### Layout público de Home

- Sección identificada: Home.
- Información pendiente: mecanismo oficial para compartir Navbar y Footer con `src/app/page.tsx`.
- Propuesta Frontend: crear un componente estructural reutilizable `PublicShell` consumido por Home y por `src/app/(public)/layout.tsx`.
- Justificación técnica: evita duplicación y evita incorporar Navbar y Footer en autenticación y dashboard.

### Navbar público

- Información pendiente: logo oficial, dimensiones y destino definitivo de “Cotizar ahora”.
- Propuesta Frontend: utilizar las props `brand` y `action` existentes en Navbar.
- Justificación técnica: mantiene el componente reutilizable y su comportamiento responsive.

### Acciones de navegación

- Se encuentra pendiente definir un componente `ButtonLink`.
- Actualmente los enlaces con apariencia de botón utilizan `Link` y tokens del Design System.
- El componente permitiría compartir variantes visuales con `Button` manteniendo la semántica correcta de navegación.

### Contenido empresarial pendiente

- Información institucional definitiva.
- Misión, visión y valores oficiales.
- Catálogo definitivo de servicios.
- Proyectos realizados y fotografías autorizadas.
- Teléfono, correo y ubicación oficiales.
- Textos y destinos definitivos de las llamadas a la acción.

### Recursos gráficos pendientes

- Logo oficial.
- Imágenes del Hero.
- Imagen institucional de Nosotros.
- Fotografías oficiales de servicios y proyectos.
- Recurso o integración oficial para ubicación.

### Integraciones futuras

- Envío del formulario de contacto.
- Validaciones funcionales del formulario.
- Fuente de datos para servicios y proyectos.
- Filtrado funcional de proyectos.
- Integración de mapa, si es aprobada.

## Dependencias futuras con Backend 31/07/2026

| Página | Información requerida | Endpoint pendiente | Tipo de información esperada | Observaciones técnicas |
|---|---|---|---|---|
| Nosotros | Información institucional, enfoque de trabajo y recurso gráfico | Por definir con Backend | Contenido descriptivo e imagen institucional | Actualmente utiliza contenido provisional y un placeholder visual |
| Servicios | Catálogo, descripciones, iconos y beneficios | Por definir con Backend | Colección de servicios y beneficios asociados | La interfaz ya recibe una colección tipada mediante `IServiceItem` |
| Proyectos | Categorías, proyectos, descripciones e imágenes | Por definir con Backend | Colección de categorías y proyectos | Las categorías son actualmente informativas y no ejecutan filtrado |
| Contacto | Teléfono, correo, ubicación y recurso de mapa | Por definir con Backend | Información pública de contacto | Actualmente se muestran valores pendientes de confirmación |
| Contacto | Envío del formulario | Por definir con Backend | Datos de nombre, correo y mensaje | El botón utiliza `type="button"` y no realiza solicitudes HTTP |

Esta matriz registra las dependencias de Backend identificadas para la estructura inicial. Podrá ampliarse conforme se incorporen nuevas secciones y se definan los requerimientos funcionales definitivos.

## Arquitectura de las páginas públicas independientes 31/07/2026

### Nosotros

- Objetivo: presentar información institucional de AislaFrioPro.
- Responsabilidad: organizar contenido descriptivo, puntos institucionales y un recurso gráfico.
- Ubicación: `src/app/(public)/nosotros/page.tsx`.
- Layout utilizado: `src/app/(public)/layout.tsx`.
- Componentes utilizados: `About`.
- Componentes reutilizados: `Section`, `Container` y `Badge`, utilizados internamente por `About`.
- Dependencias: React, componentes Home, Layout y Design System.
- Integraciones: no consume APIs ni servicios.
- Información pendiente: contenido institucional e imagen oficial.

### Servicios

- Objetivo: presentar el catálogo inicial de servicios.
- Responsabilidad: mostrar servicios y beneficios mediante colecciones visuales.
- Ubicación: `src/app/(public)/servicios/page.tsx`.
- Layout utilizado: `src/app/(public)/layout.tsx`.
- Componentes utilizados: `Services`, `Section` y `Container`.
- Componentes reutilizados: `Badge`, `Card` e imágenes SVG.
- Dependencias: Next.js Image, componentes Home, Layout y Design System.
- Integraciones: no consume APIs ni servicios.
- Información pendiente: catálogo, descripciones, iconografía y beneficios definitivos.

### Proyectos

- Objetivo: preparar la presentación de proyectos realizados.
- Responsabilidad: mostrar categorías, tarjetas provisionales y una llamada a la acción.
- Ubicación: `src/app/(public)/proyectos/page.tsx`.
- Layout utilizado: `src/app/(public)/layout.tsx`.
- Componentes utilizados: `Section`, `Container`, `Badge` y `Card`.
- Componentes reutilizados: componentes de Layout y Design System.
- Dependencias: Next.js Link, Layout y Design System.
- Integraciones: no consume APIs ni servicios.
- Información pendiente: proyectos reales, categorías, imágenes y comportamiento de filtrado.

### Contacto

- Objetivo: preparar los canales de contacto y el formulario público.
- Responsabilidad: mostrar información de contacto, formulario visual y espacio para ubicación.
- Ubicación: `src/app/(public)/contacto/page.tsx`.
- Layout utilizado: `src/app/(public)/layout.tsx`.
- Componentes utilizados: `Section`, `Container`, `Badge`, `Card`, `Input`, `Textarea` y `Button`.
- Componentes reutilizados: componentes de Layout y Design System.
- Dependencias: React, Layout y Design System.
- Integraciones: no consume APIs ni envía formularios.
- Información pendiente: datos oficiales, ubicación, validaciones e integración del formulario.

## Validación técnica 31/07/2026

- ESLint ejecutado sin errores.
- TypeScript validado mediante `npx tsc --noEmit`.
- Build de producción generado correctamente.
- Las cuatro rutas públicas fueron prerenderizadas como contenido estático.
- Navegación entre páginas verificada.
- Diseño responsive verificado en móvil, tablet y escritorio.
- Las páginas reutilizan el layout público y los componentes compartidos.
- No existen llamadas HTTP ni dependencias actuales con Backend.

## Propuesta de interfaz para FAQ 04/08/2026

- Sección identificada: Preguntas frecuentes del Home.
- Interfaz propuesta: acordeón accesible con preguntas expandibles y colapsables.
- Estado inicial: todas las preguntas cerradas.
- Comportamiento: mantener una sola pregunta abierta a la vez.
- Estilos: utilizar colores, espaciados, tipografía y estados de foco definidos en el Design System.
- Datos: el componente continuará recibiendo una colección tipada mediante props.
- Integraciones futuras: el origen dinámico de las preguntas queda pendiente de definición por Backend.
- Justificación técnica: facilita la lectura, reduce la saturación visual y mantiene el componente reutilizable.

### Observación de integración en Home

Actualmente Home implementa Hero, About, Services y FAQ. La UI Guidelines ubica FAQ después de otras secciones que todavía no han sido desarrolladas. Para no modificar ni crear secciones fuera del alcance de SCRUM-220, FAQ se mantiene después de Services, como última sección disponible. Su posición definitiva deberá ajustarse cuando se incorporen las secciones intermedias.

## Propuesta de interfaz para Benefits y Testimonials 05/08/2026

- Secciones identificadas: Benefits y Testimonials del Home.
- Benefits se interpretará como la sección “Beneficios técnicos” definida en UI Guidelines.
- Testimonials se relacionará con la sección “Clientes”, sin reemplazar a “Proyectos realizados”.
- Benefits utilizará tarjetas reutilizables y recibirá una colección tipada mediante props.
- Testimonials utilizará tarjetas reutilizables con imagen y datos de autor opcionales.
- El contenido actual de Benefits y Testimonials es demostrativo y se utiliza para evaluar la composición visual. Deberá reemplazarse cuando exista información oficial validada.
- No se incorporarán nombres, fotografías ni opiniones atribuidas a clientes sin información oficial.
- Ambas secciones quedarán preparadas para recibir contenido dinámico cuando se definan contratos de Backend.
- En el Home actual, Benefits se ubicará después de Services y Testimonials antes de FAQ, conservando el orden relativo definido en UI Guidelines.
- No se consumirán APIs ni se asumirán endpoints.

## Propuesta de animaciones suaves 06/08/2026

- Alcance: componentes y secciones del Home.
- Cards: animación reutilizable y opcional mediante la prop `animated`.
- Movimiento de cards: duración de 700 ms con curva progresiva y transformación acelerada por GPU.
- Botones y enlaces: transiciones breves de color, sombra y desplazamiento.
- Acordeón: transición de color y rotación del indicador.
- Hero: conserva transiciones suaves entre slides y controles.
- Rendimiento: se priorizan transformaciones y opacidad, evitando animaciones pesadas.
- Accesibilidad: las animaciones respetan `prefers-reduced-motion`.
- Dependencias: no se incorporaron librerías externas.
- Estado: propuesta pendiente de incorporación formal al Design System.

## Propuesta de integración de Home con el layout público 11/08/2026

- Situación identificada: Home no heredaba Navbar y Footer porque su ruta se encontraba en `src/app/page.tsx`.
- Propuesta Frontend: trasladar únicamente la ruta Home a `src/app/(public)/page.tsx`.
- La composición visual permanece en `src/components/home/HomePage.tsx`.
- La ruta pública continúa siendo `/` porque `(public)` es un Route Group.
- Beneficio: Home reutiliza el mismo Navbar y Footer de las demás páginas públicas sin duplicar código.
- Auth y Dashboard conservan sus layouts independientes.
- Estado: implementado en la rama `miguel`, pendiente de Code Review y aprobación del PR.
- Evolución: incorporar esta definición en la siguiente actualización oficial de la arquitectura o en la Arquitectura V3.