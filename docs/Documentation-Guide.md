# 📝 Documentation Guide

> **Proyecto:** Aislafriopro  
> **Versión:** V1.0  
> **Última actualización:** 18 de Julio 2026

---

# Objetivo

Este documento define las reglas para mantener actualizada la documentación técnica del proyecto.

Su propósito es garantizar que toda la documentación refleje únicamente decisiones importantes del proyecto y no el avance diario del desarrollo.

---

# Principio General

La documentación **no registra el trabajo diario** de los desarrolladores.

La documentación registra únicamente aquellas decisiones que se convierten en un estándar para todo el proyecto.

---

# ¿Cuándo se debe actualizar la documentación?

Se deberá actualizar un documento cuando exista alguno de los siguientes cambios:

- Cambio en la arquitectura del proyecto.
- Nueva estructura de carpetas.
- Incorporación de una nueva librería.
- Cambio de una librería existente.
- Nueva convención de desarrollo.
- Nuevo estándar técnico.
- Cambio en el flujo de desarrollo.
- Cambio en la identidad visual.
- Nuevo componente reutilizable.
- Nueva guía visual aprobada.

---

# ¿Cuándo NO se debe actualizar la documentación?

No es necesario actualizar la documentación cuando se realicen actividades como:

- Finalizar una tarea de Jira.
- Crear una nueva pantalla.
- Desarrollar un formulario.
- Crear un botón.
- Corregir un error (Bug).
- Ajustar estilos.
- Refactorizar código sin modificar la arquitectura.
- Implementar una funcionalidad que no cambie los estándares del proyecto.

Estas actividades ya quedan registradas mediante:

- Jira.
- Commits de Git.
- Pull Requests.
- Historial del repositorio.

---

# Responsabilidad

El desarrollador que implemente un cambio que modifique un estándar del proyecto será responsable de actualizar la documentación correspondiente.

Toda actualización deberá ser revisada y aprobada por el líder técnico antes de integrarse a la rama principal.

---

# ¿Qué documento debo actualizar?

## Frontend-Architecture.md

Actualizar cuando cambie:

- Arquitectura.
- Estructura del proyecto.
- Organización de carpetas.
- Flujo de desarrollo.
- Convenciones técnicas.
- Librerías principales.

---

## Design-System.md

Actualizar cuando cambie:

- Paleta de colores.
- Tipografía.
- Espaciados.
- Border Radius.
- Componentes reutilizables.
- Estados de componentes.
- Reglas visuales.

---

## UI-Guidelines.md

Actualizar cuando cambie:

- Dirección visual.
- Navegación.
- Estructura de páginas.
- Componentes visuales.
- Referencias oficiales.
- Experiencia de usuario.
- Nuevos lineamientos de diseño.

---

# Versionado de la Documentación

La documentación evolucionará conforme avance el proyecto.

## Cambios menores

Se consideran cambios menores:

- Corrección de texto.
- Ajustes de formato.
- Aclaraciones.
- Inclusión de ejemplos.

Ejemplo:

```text
V1.0 → V1.1
```

---

## Cambios mayores

Se consideran cambios mayores:

- Cambio de arquitectura.
- Cambio del Design System.
- Cambio de la guía visual.
- Incorporación de nuevos estándares.
- Reestructuración importante del proyecto.

Ejemplo:

```text
V1.9 → V2.0
```

---

# Flujo de Actualización

```text
Se identifica un cambio

↓

Se determina si modifica un estándar del proyecto

↓

Sí

↓

Se actualiza el documento correspondiente

↓

Se realiza Pull Request

↓

Merge a DEVELOP

↓

Revisión del Líder Técnico

↓

Aprobación


↓

Posteriormente se integra a MAIN según el flujo del proyecto
```

---

# Buenas Prácticas

- Mantener la documentación simple y actualizada.
- Documentar únicamente decisiones importantes.
- Evitar información duplicada.
- Utilizar un lenguaje claro.
- Mantener consistencia entre todos los documentos.
- Revisar la documentación antes de aprobar cambios importantes.

---

# Regla General

> **La documentación del proyecto no registra el trabajo diario de los desarrolladores; registra únicamente las decisiones técnicas y funcionales que se convierten en estándares para todo el equipo.**

---

