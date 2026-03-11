# TaskFlow - Task Management Web Application

Production-ready full-stack task management platform with React + Express, PostgreSQL, Redis, Docker, and GitHub Actions.

## Quick Start

```bash
docker compose up --build
```

Services:
- Frontend: http://localhost:5173
- Backend API: http://localhost:4000
- Swagger: http://localhost:4000/docs

## Repository Structure

```text
taskflow/
├── frontend/
├── backend/
├── infrastructure/
├── docker/
├── tests/
├── docs/
├── .github/workflows/
└── docker-compose.yml
```

## API Endpoints

- Auth: `POST /auth/register`, `POST /auth/login`, `GET /auth/me`
- Projects: `POST /projects`, `GET /projects`, `GET /projects/:id`, `DELETE /projects/:id`
- Tasks: `POST /tasks`, `GET /tasks`, `PUT /tasks/:id`, `DELETE /tasks/:id`, `PATCH /tasks/:id/complete`
- Tags: `POST /tags`, `GET /tags`, `DELETE /tags/:id`

## Git Branching Strategy (GitFlow)

- `main`: production
- `develop`: integration
- `feature/*`: new features
- `bugfix/*`: non-critical fixes
- `hotfix/*`: urgent production fixes

Flow: `feature/* -> develop -> main`

## GitHub Project Board

Columns: Backlog, Todo, In Progress, Review, Done

Initial issues:
1. User authentication
2. Project CRUD
3. Task CRUD
4. Tag system
5. Docker setup
6. CI/CD pipeline
7. Unit tests

See docs for detailed architecture and deployment.
