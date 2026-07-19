# 🎨 Design System

> **Proyecto:** Aislafriopro  
> **Versión:** V1.0  
> **Última actualización:** 18 de Julio 2026

---

# Objetivo

Este documento establece las reglas visuales y de construcción de interfaces para el proyecto **Aislafriopro**.

Su objetivo es mantener una experiencia visual consistente, facilitar el desarrollo mediante componentes reutilizables y servir como guía para todo el equipo de Frontend.

> **Importante:** Este documento corresponde a la primera versión del Design System y evolucionará conforme avance el proyecto.

---

# Identidad Visual

La identidad visual del proyecto está basada en el logotipo oficial de **Aislafriopro**, tomando como referencia sus colores principales para mantener coherencia en toda la aplicación.

---

# Paleta de Colores

## Color Primario

| Nombre | HEX | Uso |
|----------|----------|--------------------------------|
| Azul Corporativo | #0350BA | Botones principales, enlaces, acciones principales |

---

## Color Secundario

| Nombre | HEX | Uso |
|----------|----------|--------------------------------|
| Verde Natural | #4A8C04 | Estados positivos, elementos gráficos, botones secundarios |

---

## Color de Acento

| Nombre | HEX | Uso |
|----------|----------|--------------------------------|
| Amarillo Dorado | #F69608 | Alertas suaves, indicadores, badges, elementos de énfasis |

---

## Colores Base

| Nombre | HEX | Uso |
|----------|----------|--------------------------------|
| Blanco | #FFFFFF | Fondo principal |
| Negro | #000000 | Texto principal e iconografía |

---

## Escala de Grises

| Token | HEX | Uso |
|---------|----------|----------------------------|
| Gray-100 | #F5F5F5 | Fondos secundarios |
| Gray-200 | #E5E5E5 | Bordes |
| Gray-300 | #D4D4D4 | Líneas divisorias |
| Gray-400 | #A3A3A3 | Texto auxiliar |
| Gray-500 | #737373 | Placeholders |
| Gray-700 | #404040 | Títulos secundarios |
| Gray-900 | #171717 | Texto principal |

---

# Tipografía

## Fuente Principal

**Inter**

En caso de no estar disponible se utilizará:

```text
sans-serif
```

---

# Jerarquía Tipográfica

| Elemento | Tamaño |
|-----------|---------|
| H1 | 48px |
| H2 | 40px |
| H3 | 32px |
| H4 | 24px |
| H5 | 20px |
| H6 | 18px |
| Texto | 16px |
| Texto pequeño | 14px |

---

# Espaciados

Se utilizará una escala basada en múltiplos de **8px**.

| Token | Valor |
|---------|---------|
| xs | 4px |
| sm | 8px |
| md | 16px |
| lg | 24px |
| xl | 32px |
| xxl | 48px |

---

# Border Radius

| Token | Valor |
|---------|---------|
| sm | 4px |
| md | 8px |
| lg | 12px |
| xl | 16px |
| full | 999px |

---

# Sombras

| Token | Uso |
|---------|---------------------------|
| sm | Elementos pequeños |
| md | Cards |
| lg | Modales |

---

# Responsive Design

Todo el proyecto será desarrollado bajo el enfoque **Mobile First**.

## Breakpoints

| Dispositivo | Resolución |
|-------------|------------|
| Mobile | 320px |
| Tablet | 768px |
| Desktop | 1024px |
| Large Desktop | 1440px |

---

# Componentes Base

Todos los componentes reutilizables deberán ubicarse en:

```text
src/components/ui/
```

Los componentes mínimos del proyecto serán:

- Button
- Input
- Select
- Textarea
- Checkbox
- Radio
- Switch
- Card
- Modal
- Badge
- Toast
- Loader
- Tooltip

---

# Estados de Componentes

Todo componente interactivo deberá contemplar como mínimo los siguientes estados:

- Default
- Hover
- Focus
- Active
- Disabled
- Loading

---

# Organización de Componentes

```text
src/components/ui/

Button/
Card/
Input/
Modal/
Badge/
Toast/
Loader/
Checkbox/
Radio/
Switch/
Tooltip/
```

---

# Iconografía

Se utilizará una única librería de iconos durante todo el proyecto.

Ejemplo:

- Lucide React

No se deberán mezclar diferentes librerías de iconos.

---

# Recursos Gráficos

## Imágenes

```text
public/images/
```

## Iconos

```text
public/icons/
```

## Logos

```text
public/logos/
```

---

# Accesibilidad

Todo componente deberá cumplir como mínimo con las siguientes reglas:

- Navegación mediante teclado.
- Focus visible.
- Contraste adecuado.
- Etiquetas HTML semánticas.
- Uso de atributos ARIA cuando aplique.

---

# Convenciones

Todo componente deberá:

- Estar desarrollado en TypeScript.
- Ser reutilizable.
- Tener una única responsabilidad.
- Utilizar PascalCase para el nombre del componente.
- Recibir Props tipadas.
- Mantener consistencia visual con este Design System.

---

# Buenas Prácticas

- Reutilizar componentes antes de crear nuevos.
- Evitar duplicar componentes.
- No aplicar estilos en línea.
- Mantener una misma identidad visual.
- Respetar la paleta de colores definida.
- Respetar los espaciados y tipografía establecidos.
- Cualquier nuevo componente deberá documentarse antes de incorporarse al proyecto.

---

# Evolución del Design System

El Design System evolucionará conforme avance el proyecto.

## V1

Define:

- Identidad visual.
- Colores.
- Tipografía.
- Espaciados.
- Componentes base.
- Convenciones de desarrollo.

## V2

Incorporará:

- Componentes completos.
- Variantes visuales.
- Ejemplos de uso.
- Estados visuales.
- Patrones de diseño.

## V3

Incorporará:

- Design Tokens.
- Animaciones.
- Microinteracciones.
- Accesibilidad avanzada.
- Documentación visual completa.

---

