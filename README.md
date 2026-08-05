# 🚀 Sistema Rhiscom (Backend + Frontend + Base de Datos)

Este proyecto está preparado para ejecutarse completamente en contenedores utilizando **Docker** y **Docker Compose**, asegurando un entorno reproducible y aislado.

---

## 🛠️ Tecnologías Utilizadas

- **Backend:** Spring Boot 3.2.5 (Java 17) + Maven
- **Frontend:** React + Vite + Bootstrap
- **Base de Datos:** PostgreSQL 15
- **Orquestación:** Docker Compose

---

## 🌐 URLs y Puertos de los Servicios

Una vez que los contenedores estén en ejecución, podrás acceder a la aplicación a través de las siguientes rutas y puertos:

| Servicio | Acceso / URL | Puerto Local |
| :-------- | :----------- | :----------: |
| **Frontend** | http://localhost | `80` |
| **Backend (API REST)** | http://localhost:8080/api/products | `8080` |
| **Base de Datos (PostgreSQL)** | `localhost` | `5432` |

---

## 📋 Requisitos Previos

Asegúrate de tener instalado en tu sistema:

- [Docker](https://www.docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

---

## 🚀 Despliegue del Proyecto

Desde la raíz del proyecto, donde se encuentra el archivo `docker-compose.yml`, ejecuta el siguiente comando:

```bash
docker compose up --build -d
```


Una vez finalizado el proceso, verifica que todos los contenedores estén en ejecución con:

```bash
docker ps
```

Si deseas detener todos los servicios, ejecuta:

```bash
docker compose down
```

---

## ⚙️ Estructura del Proyecto

```text
rhiscom-test/
├── rhiscom-ms/         # Microservicio Backend (Spring Boot)
├── rhiscom-fr/         # Aplicación Frontend (React + Vite)
├── init.sql            # Script de inicialización de la base de datos
└── docker-compose.yml  # Orquestador de servicios
```