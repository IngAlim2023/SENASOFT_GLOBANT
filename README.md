💊 Sistema de Gestión Farmacéutica – SENASoft 2025
📌 Descripción General

Nuestro MVP es un Sistema de Gestión Farmacéutica enfocado en poblaciones vulnerables, especialmente adultos mayores y personas que requieren medicación constante para mantener una vida digna.

El sistema permite a los usuarios:

🏠 Solicitar medicamentos a domicilio.

🚚 Monitorear en tiempo real el estado del pedido y su proceso de entrega.

📜 Consultar el historial de órdenes y tratamientos.

Desde la visión administrativa, se pueden gestionar pacientes, registrar enfermedades y mantener el control del inventario y las entregas.

(En versiones futuras se integrará un módulo de “repartidor” que calculará rutas óptimas mediante IA).

🧩 Arquitectura del Proyecto

El MVP fue construido siguiendo una arquitectura modular con integración de servicios en la nube y soporte para agentes inteligentes.

Frontend:

React + Vite

Componentes escritos en JSX

Estilos gestionados con TailwindCSS (en algunos módulos)

Comunicación con la API mediante Supabase SDK

Backend / Servicios:

Supabase como backend-as-a-service (autenticación, base de datos y API REST automática).

PostgreSQL como motor de base de datos principal.

n8n para la automatización de flujos (creación de pedidos, notificaciones, y conexión con el agente MCP).

Infraestructura:

Proyecto alojado en la nube (Supabase Hosting y despliegue de interfaz en Vercel).

Control de versiones con GitHub (repositorio público para trazabilidad).

🤖 Integración con IA (MCP)

El MVP incluye un agente inteligente basado en el Model Context Protocol (MCP), el cual actúa como asistente de coordinación para las operaciones críticas del sistema.

🧠 Funcionalidades del MCP:

Procesa solicitudes del flujo n8n para priorizar entregas.

Accede a datos del paciente desde Supabase mediante un recurso MCP.

Ejecuta prompts calibrados en un cliente MCP local.

Sugiere acciones automáticas al administrador (por ejemplo, confirmar pedidos o recomendar ajustes de stock).

🧩 Configuración:

Cliente MCP integrado con entorno n8n y Node.js.

Comunicación mediante transporte stdio.

Prompt base definido en mcp/prompts/main.prompt.

(Las claves API y archivos .env fueron excluidos del control de versiones para garantizar seguridad, conforme a los lineamientos de SENASoft).