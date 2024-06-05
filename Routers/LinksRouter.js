import express from 'express';

import LinksController from '../Controllers/LinksController.js'

const LinkRouter = express.Router();

LinkRouter.get('/', LinksController.getList);
LinkRouter.get('/:id', LinksController.redirectLink);
LinkRouter.get('/:id/statistics', LinksController.getClickStatistics);
LinkRouter.post('/', LinksController.add);
LinkRouter.put('/:id', LinksController.update);
LinkRouter.delete('/:id', LinksController.delete);

export default LinkRouter;
