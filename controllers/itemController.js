import * as db from '../db/queries.js'; 
// import { validationResult } from "express-validator";

export const getIndexPage = (req, res) => {
  res.render('index', { title: 'Mini Weapon Shop' });
};

export const getItemPage = async (req, res, next) => {
  try {
    const items = await db.getAllItems();
    console.log(items);
    res.render('items', { title: 'Weapon Inventory', items });
  } catch (err) {
    next(err);
  }
};

export const createNewItem = async (req, res, next) => {
  /*
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.render('new', { 
      title: 'New Message',
      errors: errors.array(), 
      formData: req.body
    });
  }
  */

  try {
    const { name, type, stock, cost } = req.body;
    await db.insertItem({ name, type, stock, cost });
    res.redirect("/items");
  } catch (err) {
    next(err);
  }
};

export const getNewPage = (req, res) => {
  res.render('new', { title: 'Add Item' });
};

export const getEditItemPage = async (req, res, next) => {
  try {
    const itemId = req.params.id;
    const item = await db.getItemById(itemId);
    res.render('edit', { title: 'Edit Item', id: itemId, item });
  } catch (err) {
    next(err);
  }
};

export const editItem = async (req, res, next) => {
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
  res.render('delete', { title: 'Delete Item', id: itemId });
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
