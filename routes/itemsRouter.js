import { Router } from "express";
import { body } from 'express-validator';
import * as controllers from "../controllers/itemController.js";

export const itemsRouter = Router();

const validateItem = [
  body('name')
    .trim()
    .notEmpty().withMessage('** Enter item name **')
    .isLength({ max: 100 }).withMessage('** Name cannot exceed 100 characters **'),
  body('type')
    .trim()
    .notEmpty().withMessage('** Enter item type **')
    .isLength({ max: 30 }).withMessage('** Type cannot exceed 30 characters **'),
  body('stock')
    .trim()
    .notEmpty().withMessage('** Enter item stock **')
    .isInt({ min: 0 }).withMessage('** Stock must be 0 or greater **')
    .toInt(),
  body('cost')
    .trim()
    .notEmpty().withMessage('** Enter item cost **')
    .isInt({ min: 0 }).withMessage('** Cost must be 0 or greater **')
    .toInt()
];

itemsRouter.get('/', controllers.getItemPage);
itemsRouter.post('/', validateItem, controllers.createNewItem);
itemsRouter.get('/new', controllers.getNewPage);
itemsRouter.get('/:id/edit', controllers.getEditItemPage);
itemsRouter.post('/:id/edit', validateItem, controllers.editItem);
itemsRouter.get('/:id/delete', controllers.getDeletePage);
itemsRouter.post('/:id/delete', controllers.deleteItem);
