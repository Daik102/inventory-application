import { Router } from "express";
import * as controllers from "../controllers/itemController.js";

export const itemsRouter = Router();

itemsRouter.get('/', controllers.getItemPage);
itemsRouter.post('/', controllers.createNewItem);
itemsRouter.get('/new', controllers.getNewPage);
itemsRouter.get('/:id/edit', controllers.getEditItemPage);
itemsRouter.post('/:id/edit', controllers.editItem);
itemsRouter.get('/:id/delete', controllers.getDeletePage);
itemsRouter.post('/:id/delete', controllers.deleteItem);
