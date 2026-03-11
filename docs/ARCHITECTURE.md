# Architecture

## Clean Architecture (Backend)

`Client -> Controller -> Service -> Repository -> PostgreSQL`

Backend modules:
- controllers
- services
- repositories
- models
- middlewares
- routes
- config

## Infrastructure Diagram

```text
User
 ↓
Frontend (React)
 ↓
Backend API
 ↓
Redis Cache
 ↓
PostgreSQL
```

## Deployment Diagram

```text
Developer
↓
GitHub
↓
GitHub Actions
↓
Build Docker Image
↓
Push to Docker Hub
↓
Deploy containers
```
