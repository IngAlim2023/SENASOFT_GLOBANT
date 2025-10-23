# 💊 Sistema de Gestión Farmacéutica FarmaIA – SENASoft 2025
## 📌 Descripción General

El <b>Sistema de Gestión Farmacéutica</b> es un aplicativo web diseñado para optimizar la comunicación y gestión de pedidos de medicamentos entre pacientes y administradores de entidades médicas.

El sistema permite:

👩‍⚕️ <b>Pacientes</b>:

- Solicitar medicamentos a domicilio.
- Consultar el estado y progreso de sus pedidos en tiempo real.
- Acceder a su historial de órdenes.

🧑‍💼 <b>Administradores</b>:

- Gestionar información de pacientes.
- Controlar pedidos, inventarios y entregas.
- Administrar datos de la entidad médica mediante un panel seguro.

## 🧩 Arquitectura del Proyecto

El proyecto sigue una arquitectura <b>modular</b>, <b>escalable</b> y <b>basada en servicios</b>, con integración de herramientas de automatización e infraestructura en la nube.

### 🧱 Frontend

- <b>Framework</b>: React + Vite ⚡
- <b>Lenguaje</b>: JavaScript (JSX)
- <b>Estilos</b>: CSS modular / TailwindCSS (en módulos específicos)
- <b>Gestión de estados</b>: Context API
- <b>Comunicación con backend</b>: SDK de Supabase (REST + Auth)

### ⚙️ Backend

- <b>Base de datos</b>: PostgreSQL
- <b>Plataforma backend-as-a-service</b>: Supabase (API REST automática, autenticación, almacenamiento)
- <b>Flujos automatizados</b>: n8n

    - Creación y actualización de pedidos.
    - Notificaciones automáticas.
    - Conexión con el <b>agente inteligente (MCP)</b>.

### ☁️ Infraestructura y despliegue
- <b>Render</b> → Hosting del frontend.
- <b>Supabase</b> → Hosting del backend y base de datos.
- <b>Docker</b> → Contenedorización y gestión del entorno de desarrollo.
- <b>GitHub</b> → Control de versiones y colaboración.
- <b>JIRA</b> → Documentación y gestión de incidencias.

## 🤖 Integración con Inteligencia Artificial (Agente MCP)

El sistema incluye un <b>agente inteligente</b> integrado a través del <b>Model Context Protocol (MCP)</b> y orquestado mediante <b>n8n</b>.

Este agente se comunica con Supabase y otros servicios para <b>automatizar procesos y generar información contextualizada</b> para cada usuario.

### 🧠 Funcionalidades del MCP

- Procesamiento de solicitudes provenientes de n8n.
- Acceso a datos de pacientes y medicamentos desde Supabase.
- Ejecución de prompts personalizados mediante un cliente MCP local.

<b>Configuración técnica</b>:

- Cliente MCP basado en Node.js.
- Comunicación mediante stdio.
- Prompt principal: mcp/prompts/main.prompt.
- Variables sensibles gestionadas en .env (no versionadas por seguridad).

## 🗂️ Estructura del Proyecto

```
src/
│
├── Admin/           # Vistas y componentes para administradores
├── Landing/         # Página de inicio y bienvenida
├── Paciente/        # Módulos y vistas para pacientes
├── Protected/       # Rutas protegidas (autenticación)
│
├── api/             # Servicios y conexiones con Supabase
├── assets/          # Recursos estáticos (iconos, imágenes)
├── common/          # Componentes compartidos
├── context/         # Context API y estados globales
│
├── App.jsx          # Punto de entrada principal de React
├── main.jsx         # Configuración y renderizado raíz
├── index.css        # Estilos globales
└── App.css          # Estilos del componente principal
```

## 🚀 Instalación y Ejecución Local
### 🧰 Requisitos previos

- Node.js `>= 18`
- Docker 
- Cuenta en <b>Supabase</b>
- Variables de entorno configuradas (`.env`)

### 🔧 1. Clonar el repositorio

```bash
git clone https://github.com/<usuario>/<repositorio>.git
cd <repositorio>
```

### 📦 2. Instalar dependencias

```bash
npm install
```

### ⚙️ 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```bash
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_KEY=public-anon-key
VITE_API_URL=http://localhost:3000
```

### 🐳 4. (Opcional) Ejecutar con Docker

```bash
docker build -t gestion-farmaceutica .
docker run -p 5173:5173 gestion-farmaceutica
```

### 🖥️ 5. Iniciar el entorno de desarrollo

```bash
npm run dev
```

La aplicación estará disponible en http://localhost:5173

## 🧩 Despliegue en Producción

El despliegue está automatizado mediante <b>Render</b>.

Los pasos generales para un nuevo despliegue son:

1. Conectar el repositorio de GitHub a Render.
2. Configurar variables de entorno desde el panel de Render.
3. Render detectará el `vite.config.js` y ejecutará el build automáticamente.
4. Verifica el estado del servicio desde el panel.

## 🧾 Documentación y Gestión de Proyecto

| Herramienta         | Uso                                                                 |
|----------------------|---------------------------------------------------------------------|
| **GitHub**           | Control de versiones, *pull requests*, CI/CD                        |
| **JIRA**             | Documentación de requerimientos, seguimiento y *sprints*           |
| **Supabase Studio**  | Visualización y gestión de base de datos                            |
| **n8n Dashboard**    | Automatización de flujos y agentes                                  |
| **Render Dashboard** | Despliegue y monitoreo de frontend                                  |


## 👥 Colaboradores y Créditos

Proyecto desarrollado en el marco de <b>SENASoft 2025</b> por el equipo <b>PowerLead</b>.
Se priorizó la creación de soluciones inclusivas y accesibles para poblaciones vulnerables.


🧠 Futuras Mejoras

- Implementación de módulo de repartidores con cálculo de rutas óptimas mediante IA.
- Dashboard analítico para métricas médicas.
- Sistema de notificaciones push y alertas de medicación.
- Integración con sistemas de facturación y prescripción electrónica.

## 🤖 PowerLead - Equipo
El equipo esta conformado por tres (3) integrantes desarrolladores de <b>FarmaIA</b>:
- Lisseth Monsalve
- Jorge Porras
- Andrés Cabrales
