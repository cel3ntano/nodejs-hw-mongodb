import express from 'express';
import env from './utils/env.js';
import pino from 'pino-http';
import cors from 'cors';
import { getAllContacts } from './services/contacts.js';

const PORT = Number(env('PORT', '3000'));

export default function setupServer() {
  const app = express();

  app.use(
    pino({
      transport: { target: 'pino-pretty' },
    }),
  );

  app.use(cors());

  app.get('/contacts', async (req, res) => {
    const contacts = await getAllContacts();
    res.status(200).json({ data: contacts });
  });

  app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
