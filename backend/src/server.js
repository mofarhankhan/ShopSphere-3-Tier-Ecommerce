import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import routes from './routes/index.js';
import { notFound, errorHandler } from './middleware/error.js';

if (!process.env.DATABASE_URL || !process.env.JWT_SECRET) {
  console.error('DATABASE_URL and JWT_SECRET must be set in backend/.env');
  process.exit(1);
}
const app = express();
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));
app.use('/api', routes);
app.use(notFound);
app.use(errorHandler);
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`ShopSphere API listening on http://localhost:${port}`));
