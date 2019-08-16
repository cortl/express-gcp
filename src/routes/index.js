import express from 'express';
import { logger } from '../logger';

const router = () => {
  const router = express.Router();
  router.get('/', (_req, res) => res.send('Hello World!'));
  router.get('/log/:message', (req, res) => {
    logger().info(`message received: ${req.params.message}`);
    res.status(200).send(req.params.message);
  });
  return router;
};

export default router;
