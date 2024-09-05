import express from 'express';
import { env } from './utils/env.js';
import pino from 'pino-http';

const PORT = Number(env('PORT', '3000'));

export default function setupServer() {
  const app = express();

  app.use(
    pino({
      transport: { target: 'pino-pretty' },
    }),
  );

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
