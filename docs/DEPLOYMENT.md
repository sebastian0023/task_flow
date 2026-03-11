# Deployment

## Local Deployment

```bash
docker compose up --build
```

## CI/CD Stages

1. install
2. lint
3. test
4. build
5. docker build
6. docker push
7. deploy

## Docker Hub Publishing

Configure secrets:
- `DOCKERHUB_USERNAME`
- `DOCKERHUB_TOKEN`

Workflow pushes:
- `taskflow-backend:latest`
- `taskflow-frontend:latest`
