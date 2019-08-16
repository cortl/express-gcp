import express from 'express';
import { logger } from '../logger';

const router = () => {
  const router = express.Router();
  router.get('/', (_req, res) => res.send('Hello World!'));
  return router;
};

export default router;
