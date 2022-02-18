import express from 'express';

const router = () => {
    const expressRouter = new express.Router();

    expressRouter.get('/', (_req, res) => res.send('Hello World!'));

    return expressRouter;
};

export default router;
