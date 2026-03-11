import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { setupSwagger } from './config/swagger';
import { errorMiddleware } from './middlewares/errorMiddleware';
import router from './routes';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
setupSwagger(app);
app.get('/health', (_req, res) => res.status(200).json({ status: 'ok' }));
app.use(router);
app.use(errorMiddleware);

export default app;
