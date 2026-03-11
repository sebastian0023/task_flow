import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: Number(process.env.PORT ?? 4000),
  jwtSecret: process.env.JWT_SECRET ?? 'dev-secret',
  dbUrl:
    process.env.DATABASE_URL ??
    'postgresql://taskflow:taskflow@postgres:5432/taskflow',
  redisUrl: process.env.REDIS_URL ?? 'redis://redis:6379'
};
