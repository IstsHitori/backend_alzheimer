<div align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="NestJS Logo" />
  
  # 🧠 Sistema de Detección y Gestión de Alzheimer
  ### Backend API - Proyecto de Grado Universitario

  ### Esta aplicación es solo un apoyo al médico más no una sustitución a este.
  
  <p>
    <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS" />
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
    <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
    <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT" />
  </p>
  
  <p>
    <em>Sistema integral para profesionales de la salud especializado en el diagnóstico temprano, análisis de imágenes médicas y gestión completa de pacientes con Alzheimer y demencia.</em>
  </p>
</div>

---

## 📋 Tabla de Contenidos

- [Acerca del Proyecto](#-acerca-del-proyecto)
- [Características Principales](#-características-principales)
- [Tecnologías Utilizadas](#️-tecnologías-utilizadas)
- [Arquitectura del Sistema](#-arquitectura-del-sistema)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Configuración](#️-configuración)
- [Ejecución](#-ejecución)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [API Endpoints](#-api-endpoints)
- [Scripts Disponibles](#-scripts-disponibles)
- [Seguridad](#-seguridad)
- [Contribución](#-contribución)
- [Licencia](#-licencia)

---

## 🎯 Acerca del Proyecto

Este proyecto representa el **backend de un sistema médico integral** desarrollado como trabajo de grado universitario, enfocado en revolucionar la forma en que los profesionales de la salud abordan la **detección temprana y gestión del Alzheimer**.

### 🌟 Problema que Resuelve

El Alzheimer es una enfermedad neurodegenerativa progresiva que afecta a millones de personas en todo el mundo. La detección temprana y el seguimiento adecuado son cruciales para mejorar la calidad de vida de los pacientes. Este sistema proporciona:

- ✅ **Centralización de información médica** de pacientes en un solo lugar
- ✅ **Análisis automatizado** de imágenes cerebrales (resonancias magnéticas)
- ✅ **Seguimiento histórico** completo de la evolución del paciente
- ✅ **Métricas y estadísticas** para toma de decisiones clínicas informadas
- ✅ **Generación de reportes** médicos detallados
- ✅ **Gestión de factores de riesgo** y recomendaciones personalizadas

### 🎓 Contexto Académico

Este sistema backend forma parte de un proyecto de grado universitario que busca demostrar la aplicación de tecnologías modernas en el campo de la salud digital, específicamente en la neurología y el cuidado geriátrico.

---

## ✨ Características Principales

### 🔐 **1. Autenticación y Autorización**
- Sistema de autenticación seguro basado en **JWT** (JSON Web Tokens)
- Control de acceso basado en **roles** (Administrador, Doctor, etc.)
- Encriptación de contraseñas con **bcrypt**
- Seed automático de usuario administrador

### 👥 **2. Gestión Integral de Pacientes**
Registro completo de información médica:
- **Datos personales**: Nombre, edad (calculada automáticamente), género, nivel educativo
- **Historial médico**: Condiciones médicas previas y medicación actual
- **Antecedentes familiares**: Información sobre casos de Alzheimer y demencia
- **Síntomas actuales**: 
  - Pérdida de memoria
  - Problemas de lenguaje
  - Dificultad con tareas cotidianas
  - Desorientación espacial y temporal
  - Cambios de personalidad
- **Evaluaciones cognitivas**: Tests MMSE y MoCA
- **Nivel de riesgo**: Clasificación automática (Bajo, Medio, Alto)

### 🖼️ **3. Análisis Avanzado de Imágenes Médicas**
Sistema especializado para resonancias magnéticas cerebrales:

#### Métricas Analizadas:
- 📊 **Diagnóstico**: Normal, Deterioro Cognitivo Leve, Alzheimer (Leve/Moderado/Severo)
- 🎯 **Nivel de confianza**: Porcentaje de certeza del diagnóstico (0-100%)
- 🧪 **Estimaciones cognitivas**: Puntajes estimados de MMSE y MoCA
- 🧠 **Mediciones cerebrales**:
  - Volumen cerebral total
  - Volumen del hipocampo
  - Grosor cortical
  - Lesiones en materia blanca
  - Desviación de parámetros normales
- ⚠️ **Factores de riesgo** identificados
- 💊 **Recomendaciones médicas** personalizadas

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

### ☁️ **7. Almacenamiento Seguro en la Nube**
- Integración con **Cloudinary** para imágenes médicas
- Backup automático de archivos
- URLs públicas seguras para visualización
- Organización jerárquica de recursos

---

## 🛠️ Tecnologías Utilizadas

### **Core Framework**
```
NestJS 11.0.1        - Framework Node.js progresivo y escalable
TypeScript 5.7.3     - JavaScript con tipado estático
Node.js              - Entorno de ejecución JavaScript
```

### **Base de Datos**
```
PostgreSQL 16.2      - Sistema de gestión de base de datos relacional
TypeORM 0.3.27       - ORM (Object-Relational Mapping) para TypeScript
```

### **Autenticación & Seguridad**
```
@nestjs/jwt          - Implementación de JSON Web Tokens
@nestjs/passport     - Estrategias de autenticación
passport-jwt         - Estrategia JWT para Passport
bcryptjs            - Hash seguro de contraseñas
```

### **Validación & Transformación**
```
class-validator      - Validación de datos basada en decoradores
class-transformer    - Transformación y serialización de objetos
joi                  - Validación de esquemas (variables de entorno)
```

### **Almacenamiento & Archivos**
```
cloudinary          - Gestión de imágenes en la nube
multer              - Manejo de multipart/form-data
```

### **DevOps & Contenedores**
```
Docker              - Contenedorización de servicios
Docker Compose      - Orquestación de contenedores
```

### **Desarrollo & Testing**
```
Jest                - Framework de testing
ESLint              - Linter para calidad de código
Prettier            - Formateador automático de código
SWC                 - Compilador ultrarrápido de TS/JS
```

---

## 🏗️ Arquitectura del Sistema

### Diagrama de Módulos

```
┌─────────────────────────────────────────────────────────┐
│                     API Gateway (NestJS)                 │
│                    api/v1/* endpoints                    │
└──────────────────────┬──────────────────────────────────┘
                       │
       ┌───────────────┼───────────────┐
       │               │               │
       ▼               ▼               ▼
┌──────────┐    ┌──────────┐    ┌──────────┐
│   Auth   │    │ Patient  │    │ Analysis │
│  Module  │    │  Module  │    │  Module  │
└──────────┘    └──────────┘    └──────────┘
       │               │               │
       │               ▼               │
       │        ┌──────────┐           │
       │        │ Reports  │           │
       │        │  Module  │           │
       │        └──────────┘           │
       │               │               │
       └───────────────┼───────────────┘
                       │
                       ▼
            ┌──────────────────┐
            │  PostgreSQL DB   │
            │   (TypeORM)      │
            └──────────────────┘
                       
       ┌───────────────┴───────────────┐
       │                               │
       ▼                               ▼
┌──────────────┐              ┌─────────────┐
│  Cloudinary  │              │    Stats    │
│   (Images)   │              │   Module    │
└──────────────┘              └─────────────┘
```

### Flujo de Datos Típico

```
1. 🔑 Autenticación
   └─> Usuario envía credenciales
       └─> Sistema valida y genera JWT
           └─> Token retornado al cliente

2. 👤 Registro de Paciente
   └─> Médico envía datos del paciente
       └─> Validación de DTOs
           └─> Creación en cascada de entidades relacionadas
               └─> Cálculo automático de edad y métricas
                   └─> Persistencia en base de datos

3. 🖼️ Análisis de Imágenes
   └─> Carga de imagen a Cloudinary
       └─> Obtención de URL pública
           └─> Registro de análisis con métricas
               └─> Vinculación con paciente
                   └─> Generación automática de reporte

4. 📊 Consulta de Estadísticas
   └─> Solicitud de dashboard
       └─> Agregación de datos desde múltiples tablas
           └─> Cálculo de métricas en tiempo real
               └─> Retorno de JSON estructurado
```

---

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente en tu sistema:

| Requisito | Versión Mínima | Propósito |
|-----------|----------------|-----------|
| **Node.js** | 18.x o superior | Entorno de ejecución JavaScript |
| **npm** | 9.x o superior | Gestor de paquetes (incluido con Node.js) |
| **Docker Desktop** | 20.x o superior | Contenedorización de PostgreSQL |
| **Git** | 2.x o superior | Control de versiones |

### Verificar Instalaciones

```bash
# Verificar Node.js
node --version

# Verificar npm
npm --version

# Verificar Docker
docker --version

# Verificar Docker Compose
docker-compose --version

# Verificar Git
git --version
```

---

## 🚀 Instalación

### Paso 1️⃣: Clonar el Repositorio

```bash
# Clonar el proyecto
git clone https://github.com/IstsHitori/backend_alzheimer.git

# Navegar al directorio del proyecto
cd backend_alzheimer
```

### Paso 2️⃣: Instalar Dependencias

```bash
# Instalar todas las dependencias del proyecto
npm install
```

Este comando instalará automáticamente todas las librerías necesarias definidas en `package.json`.

**Tiempo estimado:** 2-5 minutos dependiendo de tu conexión a internet.

---

## ⚙️ Configuración

### Paso 3️⃣: Configurar Variables de Entorno

#### 3.1. Crear archivo de configuración

```bash
# En Windows (PowerShell)
copy .env.template .env

# En Linux/Mac
cp .env.template .env
```

#### 3.2. Editar el archivo `.env`

Abre el archivo `.env` con tu editor favorito y configura las siguientes variables:

```env
#━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# 🗄️ CONFIGURACIÓN DE BASE DE DATOS
#━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DB_PASSWORD=tu_contraseña_super_segura
DB_NAME=alzheimer_db
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres

#━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# 👤 USUARIO ADMINISTRADOR POR DEFECTO
#━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ADMIN_USERNAME=admin
ADMIN_PASSWORD=Admin123@
ADMIN_EMAIL=admin@hospital.com

#━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# ☁️ CLOUDINARY (Almacenamiento de Imágenes)
#━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CLOUD_NAME=tu_cloud_name
CLOUD_API_KEY=123456789012345
CLOUD_API_SECRET=tu_api_secret_de_cloudinary

#━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# 🔐 JWT (Autenticación)
#━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
JWT_SECRET=tu_clave_secreta_super_larga_y_segura_123456
```

#### 📝 Notas Importantes sobre la Configuración:

> ⚠️ **Contraseña del Administrador:**
> - Debe tener al menos 6 caracteres
> - Debe incluir al menos una letra mayúscula
> - Debe incluir al menos un número
> - Debe incluir al menos un carácter especial (@, #, $, %, ^, &, +, =, !)

> 🔑 **JWT Secret:**
> - Usa una cadena larga y aleatoria (mínimo 32 caracteres)
> - Puedes generar una aquí: [Random Key Generator](https://randomkeygen.com/)

> ☁️ **Cloudinary:**
> - Regístrate gratis en [cloudinary.com](https://cloudinary.com)
> - Obtén tus credenciales en el Dashboard
> - La cuenta gratuita incluye 25 GB de almacenamiento

---

## 🎮 Ejecución

### Paso 4️⃣: Levantar la Base de Datos

```bash
# Iniciar contenedor de PostgreSQL
docker-compose up -d
```

**¿Qué hace este comando?**
- 📥 Descarga la imagen de PostgreSQL 16.2 (primera vez)
- 🐳 Crea un contenedor llamado `backend_alzheimer`
- 🚀 Inicia PostgreSQL en el puerto 5432
- 💾 Crea la base de datos con las credenciales del `.env`
- 🔄 El flag `-d` ejecuta en segundo plano (detached mode)

**Verificar que el contenedor está corriendo:**

```bash
docker ps
```

Deberías ver algo como:
```
CONTAINER ID   IMAGE           PORTS                    NAMES
abc123def456   postgres:16.2   0.0.0.0:5432->5432/tcp   backend_alzheimer
```

### Paso 5️⃣: Iniciar la Aplicación

#### 🔧 Modo Desarrollo (Recomendado)

```bash
npm run start:dev
```

**Características del modo desarrollo:**
- ♻️ Hot-reload automático al guardar cambios
- 🐛 Logs detallados en consola
- 🔍 Fácil debugging

#### 🚀 Modo Producción

```bash
# 1. Compilar el proyecto
npm run build

# 2. Ejecutar la versión compilada
npm run start:prod
```

### Paso 6️⃣: Verificar que todo funciona

Si todo está correcto, verás en la consola:

```
[Nest] 12345  - 27/10/2025, 10:30:45     LOG [NestApplication] Nest application successfully started +2ms
[Nest] 12345  - 27/10/2025, 10:30:45     LOG [BootstrapAdmin] ✅ Usuario administrador creado exitosamente
```

**🎉 ¡La API está corriendo en:**
```
http://localhost:3000/api/v1
```

---

## 🧪 Prueba Inicial del Sistema

### Primera Autenticación

#### 1. Inicia sesión con el usuario administrador:

**Endpoint:**
```
POST http://localhost:3000/api/v1/auth/signin
```

**Body (JSON):**
```json
{
  "userName": "admin",
  "password": "Admin123@"
}
```

**Respuesta esperada:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjk4..."
}
```

#### 2. Usa el token en las siguientes peticiones:

Agrega el token en el header de autorización:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 📁 Estructura del Proyecto

```
backend/
│
├── 📂 src/                          # Código fuente
│   │
│   ├── 📂 activity/                 # Módulo de actividades terapéuticas
│   │   ├── activity.controller.ts  # Controlador de rutas
│   │   ├── activity.service.ts     # Lógica de negocio
│   │   ├── activity.module.ts      # Definición del módulo
│   │   ├── 📂 dto/                  # Data Transfer Objects
│   │   └── 📂 entities/             # Entidades de TypeORM
│   │
│   ├── 📂 analysis/                 # ⭐ Módulo de análisis de imágenes
│   │   ├── analysis.controller.ts  # Endpoints de análisis
│   │   ├── analysis.service.ts     # Lógica de análisis médico
│   │   ├── 📂 constants/            # Enums y constantes
│   │   │   ├── data-enums.ts       # DIAGNOSIS (Normal, MCI, etc.)
│   │   │   ├── error-messages.ts   # Mensajes de error
│   │   │   └── analysis-messages.ts # Mensajes de éxito
│   │   ├── 📂 dto/                  # DTOs de validación
│   │   │   ├── create-analysis.dto.ts
│   │   │   ├── create-image-analysis.dto.ts
│   │   │   └── create-image.dto.ts
│   │   └── 📂 entities/             # Entidades de base de datos
│   │       ├── analysis.entity.ts  # Sesión de análisis
│   │       ├── image-analysis.entity.ts # Análisis individual
│   │       └── images.entity.ts    # Registro de imágenes
│   │
│   ├── 📂 auth/                     # 🔐 Autenticación y autorización
│   │   ├── auth.controller.ts      # Login, logout
│   │   ├── auth.service.ts         # Validación de credenciales
│   │   ├── 📂 decorators/           # Decoradores personalizados
│   │   │   ├── auth.decorator.ts   # @Auth() combinado
│   │   │   ├── get-user-decorator.ts # @GetUser() obtener usuario
│   │   │   └── role-protected.decorator.ts
│   │   ├── 📂 guards/               # Guards de protección
│   │   │   └── user-role/          # Guard de roles
│   │   ├── 📂 strategies/           # Estrategias de Passport
│   │   │   └── jwt.strategy.ts     # Estrategia JWT
│   │   └── 📂 interfaces/           # Interfaces TypeScript
│   │
│   ├── 📂 cloudinary/               # ☁️ Almacenamiento de imágenes
│   │   ├── cloudinary.controller.ts # Upload de archivos
│   │   ├── cloudinary.service.ts   # Integración con Cloudinary
│   │   └── 📂 providers/            # Proveedor de configuración
│   │
│   ├── 📂 common/                   # 🔧 Utilidades compartidas
│   │   ├── 📂 adapters/             # Adaptadores
│   │   │   └── bcrypt-js.adapter.ts # Hash de contraseñas
│   │   └── 📂 interfaces/           # Interfaces compartidas
│   │
│   ├── 📂 config/                   # ⚙️ Configuración
│   │   └── env.validation.ts       # Validación de .env con Joi
│   │
│   ├── 📂 patient/                  # 👥 Módulo de pacientes
│   │   ├── patient.controller.ts   # CRUD de pacientes
│   │   ├── patient.service.ts      # Lógica de negocio
│   │   ├── 📂 constants/            # Enums y constantes
│   │   │   ├── data-enums.ts       # GENDER, EDUCATION_LEVEL, etc.
│   │   │   ├── error-messages.ts   # Mensajes de validación
│   │   │   └── patient-messages.ts # Mensajes de éxito
│   │   ├── 📂 dto/                  # DTOs complejos
│   │   │   ├── create-patient.dto.ts
│   │   │   ├── create-condition.dto.ts
│   │   │   ├── create-current-medication.dto.ts
│   │   │   ├── create-family-background.dto.ts
│   │   │   └── create-symptoms-present.dto.ts
│   │   ├── 📂 entities/             # Entidades múltiples
│   │   │   ├── patient.entity.ts   # Entidad principal
│   │   │   ├── condition.entity.ts # Condiciones médicas
│   │   │   ├── current-medications.entity.ts
│   │   │   ├── family-backgrounds.entity.ts
│   │   │   ├── symptoms-present.entity.ts
│   │   │   └── cognitive-evaluation.entity.ts
│   │   └── 📂 helpers/              # Funciones auxiliares
│   │       └── get-age.ts          # Calcular edad
│   │
│   ├── 📂 reports/                  # 📊 Módulo de reportes
│   │   ├── reports.controller.ts   # Generación de reportes
│   │   ├── reports.service.ts      # Lógica de reportes
│   │   ├── 📂 constants/            # Tipos de reportes
│   │   ├── 📂 dto/                  # DTOs de reportes
│   │   └── 📂 entities/             # Entidad de reporte
│   │
│   ├── 📂 stats/                    # 📈 Módulo de estadísticas
│   │   ├── stats.controller.ts     # Endpoints de stats
│   │   ├── stats.service.ts        # Orquestador
│   │   ├── 📂 home-stats/           # Estadísticas generales
│   │   └── 📂 medical-stats/        # Estadísticas médicas
│   │
│   ├── 📂 user/                     # 👤 Módulo de usuarios
│   │   ├── user.controller.ts      # CRUD de usuarios
│   │   ├── user.service.ts         # Gestión de usuarios
│   │   ├── 📂 constants/            # ROLE enum
│   │   ├── 📂 dto/                  # DTOs de usuario
│   │   └── 📂 entities/             # user.entity.ts
│   │
│   ├── 📂 seed/                     # 🌱 Datos iniciales
│   │   ├── bootstrap.ts            # Crear admin automáticamente
│   │   └── messages.ts             # Mensajes del seed
│   │
│   ├── app.module.ts                # 🏠 Módulo raíz
│   └── main.ts                      # 🚀 Punto de entrada
│
├── 📂 postgres/                     # 💾 Datos de PostgreSQL (volumen)
│
├── 📄 docker-compose.yaml           # 🐳 Configuración de Docker
├── 📄 package.json                  # 📦 Dependencias del proyecto
├── 📄 tsconfig.json                 # ⚙️ Configuración de TypeScript
├── 📄 nest-cli.json                 # ⚙️ Configuración de NestJS CLI
├── 📄 .env.template                 # 📋 Plantilla de variables
└── 📄 README.md                     # 📖 Este archivo
```

---

## 🌐 API Endpoints

### Base URL
```
http://localhost:3000/api/v1
```

### 🔐 Autenticación

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | `/auth/signin` | Iniciar sesión | ❌ |

### 👥 Pacientes

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/patient` | Listar todos los pacientes | ✅ |
| GET | `/patient/:id` | Obtener paciente por ID | ✅ |
| POST | `/patient` | Crear nuevo paciente | ✅ |
| PATCH | `/patient/:id` | Actualizar paciente | ✅ |
| DELETE | `/patient/:id` | Eliminar paciente | ✅ |

### 🖼️ Análisis

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/analysis` | Listar análisis | ✅ |
| GET | `/analysis/:id` | Obtener análisis por ID | ✅ |
| POST | `/analysis` | Crear nuevo análisis | ✅ |
| PATCH | `/analysis/:id` | Actualizar análisis | ✅ |
| DELETE | `/analysis/:id` | Eliminar análisis | ✅ |

### ☁️ Cloudinary

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | `/cloudinary/upload` | Subir imágenes | ✅ |

### 📊 Reportes

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/reports` | Listar reportes | ✅ |
| POST | `/reports` | Crear reporte | ✅ |

### 📈 Estadísticas

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/stats/home` | Estadísticas generales | ✅ |
| GET | `/stats/medical` | Dashboard médico | ✅ |

### 👤 Usuarios

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/user` | Listar usuarios | ✅ |
| POST | `/user` | Crear usuario | ✅ Admin |
| PATCH | `/user/:id` | Actualizar usuario | ✅ Admin |
| DELETE | `/user/:id` | Eliminar usuario | ✅ Admin |

---

## 📜 Scripts Disponibles

### Desarrollo

```bash
# Iniciar en modo desarrollo (con hot-reload)
npm run start:dev

# Iniciar en modo debug
npm run start:debug

# Compilar el proyecto
npm run build
```

### Producción

```bash
# Iniciar en modo producción (requiere build previo)
npm run start:prod
```

### Calidad de Código

```bash
# Ejecutar linter (ESLint) y corregir automáticamente
npm run lint

# Formatear código con Prettier
npm run format
```

### Testing

```bash
# Ejecutar tests unitarios
npm run test

# Ejecutar tests en modo watch
npm run test:watch

# Generar reporte de cobertura
npm run test:cov

# Ejecutar tests end-to-end
npm run test:e2e

# Ejecutar tests en modo debug
npm run test:debug
```

---

## 🔒 Seguridad

Este proyecto implementa múltiples capas de seguridad:

### 🛡️ Protección de Contraseñas
- **Hash con bcrypt**: Las contraseñas nunca se almacenan en texto plano
- **Salt rounds**: 10 rondas de salt para mayor seguridad
- **Validación de complejidad**: Requisitos mínimos de contraseña

### 🔐 Autenticación JWT
- **Tokens firmados**: Cada token está firmado digitalmente
- **Expiración**: Los tokens tienen tiempo de vida limitado
- **Payload mínimo**: Solo información esencial en el token

### 🚧 Guards y Decoradores
```typescript
// Proteger ruta con autenticación y rol
@Auth(ROLE.DOCTOR)
@Get('patients')
getPatients() { ... }

// Obtener usuario autenticado
@GetUser()
user: User
```

### ✅ Validación de Datos
- **class-validator**: Validación automática de DTOs
- **class-transformer**: Transformación segura de tipos
- **Whitelist**: Solo propiedades permitidas
- **ForbidNonWhitelisted**: Rechaza propiedades no definidas

### 🔍 Validación de Entorno
```typescript
// Joi valida todas las variables de entorno al inicio
ENV_VALIDATION_SCHEMA
```

### 🗄️ Protección de Base de Datos
- **Prepared statements**: TypeORM previene SQL Injection
- **Cascade operations**: Control de eliminación en cascada
- **Transacciones**: Operaciones atómicas

---

## 🐛 Solución de Problemas

### ❌ Error: "Puerto 5432 ya está en uso"

**Problema:** Ya tienes PostgreSQL corriendo localmente.

**Solución:**
```bash
# Opción 1: Detener PostgreSQL local
# Windows (Services)
services.msc # Buscar PostgreSQL y detener

# Opción 2: Cambiar el puerto en docker-compose.yaml
ports:
  - "5433:5432"  # Usar puerto 5433 externamente
```

### ❌ Error: "Cannot find module"

**Problema:** Dependencias no instaladas correctamente.

**Solución:**
```bash
# Limpiar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install
```

### ❌ Error: "JWT Secret must be provided"

**Problema:** Variable `JWT_SECRET` no configurada en `.env`.

**Solución:**
```bash
# Asegúrate de tener el archivo .env con:
JWT_SECRET=tu_clave_secreta_aqui
```

### ❌ Error de conexión a base de datos

**Problema:** Docker no está corriendo o credenciales incorrectas.

**Solución:**
```bash
# Verificar estado de Docker
docker ps

# Ver logs del contenedor
docker logs backend_alzheimer

# Reiniciar contenedor
docker-compose restart
```

### ❌ Error: "Cloudinary credentials invalid"

**Problema:** Credenciales de Cloudinary incorrectas o no configuradas.

**Solución:**
1. Verifica tus credenciales en [Cloudinary Dashboard](https://cloudinary.com/console)
2. Actualiza el archivo `.env` con las credenciales correctas
3. Reinicia la aplicación

---

## 📚 Documentación Adicional

### Recursos Útiles

- 📖 [Documentación de NestJS](https://docs.nestjs.com/)
- 📖 [Documentación de TypeORM](https://typeorm.io/)
- 📖 [Documentación de PostgreSQL](https://www.postgresql.org/docs/)
- 📖 [Documentación de Cloudinary](https://cloudinary.com/documentation)
- 📖 [JWT.io - Debugger de JWT](https://jwt.io/)

### Herramientas Recomendadas

- 🔧 [Postman](https://www.postman.com/) - Testing de APIs
- 🔧 [TablePlus](https://tableplus.com/) - Cliente de base de datos
- 🔧 [VS Code](https://code.visualstudio.com/) - Editor de código recomendado
- 🔧 [Docker Desktop](https://www.docker.com/products/docker-desktop/)

---

## 👨‍💻 Contribución

Este es un proyecto académico de grado universitario. Si deseas contribuir:

1. 🍴 Fork el proyecto
2. 🌿 Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. 💾 Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. 📤 Push a la rama (`git push origin feature/AmazingFeature`)
5. 🔃 Abre un Pull Request

### 📋 Estándares de Código

- ✅ Seguir las convenciones de TypeScript
- ✅ Usar ESLint y Prettier
- ✅ Escribir tests para nuevas funcionalidades
- ✅ Documentar funciones complejas
- ✅ Mensajes de commit descriptivos

---

## 📄 Licencia

Este proyecto es un trabajo académico de grado universitario.

---

## 👥 Autores

- Francisco Javier Serrano
- Joan Sebastian Caselles

**Proyecto de Grado Universitario**

Sistema de Detección y Gestión de Alzheimer

---

## 🙏 Agradecimientos

- 🎓 Universidad Popular Del Cesar Seccional Aguachica
- 👨‍🏫 Director de tesis: Luis Manuel Palmera 
- 🌟 Comunidad de NestJS y TypeScript
- 💻 Todos los contribuidores de las librerías open-source utilizadas

---

<div align="center">
  
  ### ⭐ Si este proyecto te fue útil, considera darle una estrella
  
  **Desarrollado con ❤️ para mejorar la detección temprana del Alzheimer**
  
  ---
  
  ![NestJS](https://img.shields.io/badge/Made%20with-NestJS-E0234E?style=for-the-badge&logo=nestjs)
  ![TypeScript](https://img.shields.io/badge/Written%20in-TypeScript-3178C6?style=for-the-badge&logo=typescript)
  
</div>