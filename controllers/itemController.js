import * as db from '../db/queries.js'; 
import { validationResult } from "express-validator";
import { WEAPON_TYPES } from '../utils/weaponTypes.js';

export const getIndexPage = (req, res) => {
  res.render('index', { title: '** Mini Weapon Shop **' });
};

export const getItemPage = async (req, res, next) => {
  try {
    const { sort = 'id', order = 'asc', search = '', type = '' } = req.query;
    const items = await db.getAllItems(sort, order, search, type);
    console.log(items);
    res.render('items', { 
      title: '** Weapon Inventory **', 
      items, 
      sort, 
      order, 
      search, 
      type, 
      weaponTypes: WEAPON_TYPES 
    });
  } catch (err) {
    next(err);
  }
};

export const createNewItem = async (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.render('new', { 
      title: '** Add Item **',
      errors: errors.array(), 
      formData: req.body,
      weaponTypes: WEAPON_TYPES
    });
  }

  try {
    const { name, type, stock, cost } = req.body;
    await db.insertItem({ name, type, stock, cost });
    res.redirect("/items");
  } catch (err) {
    next(err);
  }
};

export const getNewPage = (req, res) => {
  res.render('new', { title: '** Add Item **', errors: [], formData: {}, weaponTypes: WEAPON_TYPES });
};

export const getEditItemPage = async (req, res, next) => {
  try {
    const itemId = req.params.id;
    const item = await db.getItemById(itemId);
    res.render('edit', 
      { title: '** Edit Item **', 
        item: { id: itemId, ...item }, 
        errors: [], 
        formData: {},
        weaponTypes: WEAPON_TYPES
      });
  } catch (err) {
    next(err);
  }
};

export const editItem = async (req, res, next) => {
  const itemId = req.params.id;
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.render('edit', { 
      title: '** Edit Item **',
      item: { id: itemId, ...req.body }, 
      errors: errors.array(), 
      formData: req.body,
      weaponTypes: WEAPON_TYPES
    });
  }

  try {
    const itemId = req.params.id;
    const { name, type, stock, cost } = req.body;
    await db.editItem(itemId, { name, type, stock, cost });
    res.redirect("/items");
  } catch (err) {
    next(err);
  }
};

export const getDeletePage = async (req, res) => {
  const itemId = req.params.id;
  const item = await db.getItemById(itemId);
  res.render('delete', { title: '** Delete Item **', id: itemId, name: item.name });
};

export const deleteItem = async (req, res, next) => {
  try {
    const itemId = req.params.id;
    await db.deleteItem(itemId);
    res.redirect("/items");
  } catch (err) {
    next(err);
  }
};
