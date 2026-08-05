# Documentación del Módulo: Public-Content

## 1. Estado Actual

Este documento detalla el estado de integración y los puntos pendientes correspondientes al módulo de contenidos públicos del proyecto.

## 2. Registrar únicamente si aplica

- **Endpoint pendiente:** A la espera de la definición final de las rutas para la obtención de recursos públicos por parte del equipo de Backend.
- **Información faltante del Backend:** Faltan por definir los esquemas de respuesta exactos (DTOs) y los parámetros de paginación o filtros.
- **Contratos aún no documentados:** Los contratos de comunicación entre Frontend y Backend para este módulo todavía no se encuentran especificados en Swagger o Postman.
- **Recomendaciones técnicas para futuras integraciones:**
  - Asegurarse de consumir los recursos a través de la instancia global de Axios (`src/lib/api.ts`).
  - Implementar tipado estricto con TypeScript una vez que se definan los modelos de datos del servidor.

## 3. Actualización Técnica del Sprint

- **Dependencias detectadas:** 
  - `@tanstack/react-query` para la gestión de estados asíncronos y caché de datos.
  - Instancia centralizada de Axios (`src/lib/api.ts`) para las peticiones HTTP.
- **Información pendiente:** 
  - Definición final de los contratos de API y rutas de endpoints en el servidor.
- **Observaciones de integración:** 
  - Se han dejado preparados los servicios y hooks (`useServices`) conectados a la interfaz gráfica manteniendo la estructura visual intacta y sin utilizar mocks locales, listos para recibir datos reales apenas el Backend publique los endpoints.

## 4. Actualización de Módulos: FAQ y Site Settings (SCRUM-176 / SCRUM-177)

- **Información pendiente:** 
  - Esquemas de datos y estructuras de respuesta para las preguntas frecuentes (`faq.service.ts`) y la configuración general del sitio (`siteSettings.service.ts`).
- **Endpoints faltantes:** 
  - Rutas de backend correspondientes para las peticiones de FAQ y Site Settings.
- **Dependencias identificadas:** 
  - Uso obligatorio del cliente HTTP global ubicado en `src/lib/api.ts` para ambos servicios.