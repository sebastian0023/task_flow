# Contributing

## Branching

Use GitFlow:
- Create branch from `develop`: `feature/<name>` or `bugfix/<name>`
- Merge feature/bugfix into `develop`
- Release/hotfix merged into `main`

## Development Setup

```bash
docker compose up --build
```

## Testing

Backend unit tests:

```bash
cd backend && npm test
```

Coverage target is 80%+
