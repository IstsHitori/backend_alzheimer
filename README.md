<div align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="NestJS Logo" />
  
  # 🧠 Sistema de Detección y Gestión de Alzheimer
  ### Backend API - Proyecto de Grado Universitario
  
  <p>
    <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS" />
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
    <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
  </p>
  
  <p><em>API REST para gestión clínica de pacientes con Alzheimer</em></p>
  
  > ⚠️ **Nota Importante:** Esta aplicación es solo un apoyo al médico, no una sustitución del profesional de la salud.
</div>

---

## 📋 Contenido

- [Acerca del Proyecto](#-acerca-del-proyecto)
- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Instalación Rápida](#-instalación-rápida)
- [Configuración](#-configuración)
- [API Endpoints](#-api-endpoints)
- [Scripts](#-scripts)

---

## 🎯 Acerca del Proyecto

Backend de un sistema médico para la **detección temprana y gestión del Alzheimer**, desarrollado como proyecto de grado universitario. Permite a profesionales de la salud:

- Centralizar información médica de pacientes
- Analizar imágenes cerebrales (resonancias magnéticas)
- Generar reportes clínicos
- Visualizar estadísticas y métricas

---

## ✨ Características

### 🔐 Autenticación
- JWT (JSON Web Tokens)
- Control de acceso por roles
- Contraseñas encriptadas con bcrypt

### 👥 Gestión de Pacientes
- Datos personales y edad automática
- Historial médico y medicación
- Antecedentes familiares
- Síntomas y evaluaciones cognitivas
- Clasificación de nivel de riesgo

### 🖼️ Análisis de Imágenes
- Diagnósticos: Normal, MCI, Alzheimer (Leve/Moderado/Severo)
- Métricas cerebrales (volumen, hipocampo, grosor cortical, etc.)
- Estimaciones MMSE y MoCA
- Factores de riesgo y recomendaciones
- Almacenamiento en Cloudinary

### 📊 Reportes y Estadísticas
- Generación de reportes médicos
- Dashboard con métricas generales y clínicas

#### Gestión de Imágenes:
- Carga segura a **Cloudinary** (almacenamiento en la nube)
- Organización automática por paciente
- Historial completo de análisis
- Sesiones de análisis agrupadas por fecha

### 📊 **4. Sistema de Reportes Médicos**
- Generación automática de reportes clínicos
- Diferentes tipos según necesidades (análisis, seguimiento, alta)
- Historial completo por paciente
- Exportación de datos para análisis externos

### 📈 **5. Dashboard de Estadísticas**
Dos niveles de información estadística:

**Estadísticas Generales:**
- Total de pacientes registrados
- Análisis realizados
- Usuarios activos en el sistema
- Actividad reciente

**Estadísticas Médicas:**
- Distribución de diagnósticos
- Niveles de riesgo por género y edad
- Evolución de pacientes en el tiempo
- Métricas de efectividad de tratamientos

### 🎯 **6. Gestión de Actividades Terapéuticas**
- Registro de actividades recomendadas
- Seguimiento de adherencia del paciente
- Calendario de terapias y consultas

---

## 🛠️ Tecnologías

| Categoría | Tecnologías |
|-----------|-------------|
| **Framework** | NestJS 11.0.1, TypeScript 5.7.3 |
| **Base de Datos** | PostgreSQL 16.2, TypeORM 0.3.27 |
| **Autenticación** | JWT, Passport, bcrypt |
| **Validación** | class-validator, class-transformer, Joi |
| **Almacenamiento** | Cloudinary, Multer |
| **DevOps** | Docker, Docker Compose |
| **Testing** | Jest, ESLint, Prettier |

---

## 📋 Requisitos Previos

Asegúrate de tener instalado:

- **Node.js** (v18+)
- **npm** (v9+)
- **Docker Desktop**
- **Git**

---

## 🚀 Instalación Rápida

### 1. Clonar el repositorio

```bash
git clone https://github.com/IstsHitori/backend_alzheimer.git
cd backend_alzheimer
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

```bash
# Windows
copy .env.template .env

# Linux/Mac
cp .env.template .env
```

Edita el archivo `.env` con tus credenciales:

```env
# Base de Datos
DB_PASSWORD=tu_contraseña
DB_NAME=alzheimer_db
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres

# Usuario Admin
ADMIN_USERNAME=admin
ADMIN_PASSWORD=Admin123@    # Mínimo 6 caracteres, 1 mayúscula, 1 número, 1 especial
ADMIN_EMAIL=admin@hospital.com

# Cloudinary (obtén gratis en cloudinary.com)
CLOUD_NAME=tu_cloud_name
CLOUD_API_KEY=tu_api_key
CLOUD_API_SECRET=tu_api_secret

# JWT
JWT_SECRET=tu_clave_secreta_super_larga_123456
```

### 4. Levantar la base de datos

```bash
docker-compose up -d
```

### 5. Iniciar la aplicación

```bash
# Modo desarrollo (recomendado)
npm run start:dev

# Modo producción
npm run build
npm run start:prod
```

**¡Listo! La API estará corriendo en:** `http://localhost:3000/api/v1`

---

## 🧪 Prueba Rápida

**Login con usuario admin:**

```bash
POST http://localhost:3000/api/v1/auth/signin
Content-Type: application/json

{
  "userName": "admin",
  "password": "Admin123@"
}
```

**Respuesta:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

Usa el token en las siguientes peticiones:
```
Authorization: Bearer <tu_token>
```

---

## 🌐 API Endpoints

**Base URL:** `http://localhost:3000/api/v1`

| Módulo | Método | Endpoint | Descripción | Auth |
|--------|--------|----------|-------------|------|
| **Auth** | POST | `/auth/signin` | Iniciar sesión | ❌ |
| **Pacientes** | GET | `/patient` | Listar pacientes | ✅ |
| | GET | `/patient/:id` | Obtener por ID | ✅ |
| | POST | `/patient` | Crear paciente | ✅ |
| | PATCH | `/patient/:id` | Actualizar | ✅ |
| | DELETE | `/patient/:id` | Eliminar | ✅ |
| **Análisis** | GET | `/analysis` | Listar análisis | ✅ |
| | POST | `/analysis` | Crear análisis | ✅ |
| | PATCH | `/analysis/:id` | Actualizar | ✅ |
| **Cloudinary** | POST | `/cloudinary/upload` | Subir imágenes | ✅ |
| **Reportes** | GET | `/reports` | Listar reportes | ✅ |
| | POST | `/reports` | Crear reporte | ✅ |
| **Stats** | GET | `/stats/home` | Stats generales | ✅ |
| | GET | `/stats/medical` | Dashboard médico | ✅ |
| **Usuarios** | GET | `/user` | Listar usuarios | ✅ Admin |
| | POST | `/user` | Crear usuario | ✅ Admin |

---

## 📜 Scripts

```bash
# Desarrollo
npm run start:dev      # Modo desarrollo con hot-reload
npm run start:debug    # Modo debug

# Producción
npm run build          # Compilar proyecto
npm run start:prod     # Ejecutar en producción

# Calidad
npm run lint           # Linter (ESLint)
npm run format         # Formatear código (Prettier)

# Testing
npm run test           # Tests unitarios
npm run test:watch     # Tests en modo watch
npm run test:cov       # Reporte de cobertura
npm run test:e2e       # Tests end-to-end
```

---

## 🐛 Problemas Comunes

| Problema | Solución |
|----------|----------|
| Puerto 5432 ocupado | Detener PostgreSQL local o cambiar puerto en `docker-compose.yaml` |
| Cannot find module | `rm -rf node_modules && npm install` |
| JWT Secret missing | Verificar variable `JWT_SECRET` en `.env` |
| Error de BD | `docker ps` y `docker logs backend_alzheimer` |
| Cloudinary error | Verificar credenciales en [Dashboard](https://cloudinary.com/console) |

---

## 👥 Autores

**Francisco Javier Serrano** y **Joan Sebastian Caselles**

Proyecto de Grado - Universidad Popular Del Cesar Seccional Aguachica

Director: Luis Manuel Palmera

---

<div align="center">
  
  ### ⭐ Si este proyecto te fue útil, considera darle una estrella
  
  **Desarrollado con ❤️ para mejorar la detección temprana del Alzheimer**
  
  ---
  
  ![NestJS](https://img.shields.io/badge/Made%20with-NestJS-E0234E?style=for-the-badge&logo=nestjs)
  ![TypeScript](https://img.shields.io/badge/Written%20in-TypeScript-3178C6?style=for-the-badge&logo=typescript)
  
</div>