import { Router } from "express";
import { body } from 'express-validator';
import * as controllers from "../controllers/itemController.js";
import { WEAPON_TYPES } from "../utils/weaponTypes.js";

export const itemsRouter = Router();

const validateItem = [
  body('name')
    .trim()
    .notEmpty().withMessage('** Enter item name **')
    .isLength({ max: 100 }).withMessage('** Name cannot exceed 100 characters **'),
  body('type')
    .trim()
    .notEmpty().withMessage('** Enter item type **')
    .isIn(WEAPON_TYPES).withMessage('** Invalid weapon type **'),
  body('stock')
    .trim()
    .notEmpty().withMessage('** Enter item stock **')
    .isInt({ min: 0, max: 99 }).withMessage('** Stock must be between 0 and 99 **')
    .toInt(),
  body('cost')
    .trim()
    .notEmpty().withMessage('** Enter item cost **')
    .isInt({ min: 0, max: 99999 }).withMessage('** Cost must be between 0 and 99999 **')
    .toInt()
];

itemsRouter.get('/', controllers.getItemPage);
itemsRouter.post('/', validateItem, controllers.createNewItem);
itemsRouter.get('/new', controllers.getNewPage);
itemsRouter.get('/:id/edit', controllers.getEditItemPage);
itemsRouter.post('/:id/edit', validateItem, controllers.editItem);
itemsRouter.get('/:id/delete', controllers.getDeletePage);
itemsRouter.post('/:id/delete', controllers.deleteItem);
