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
