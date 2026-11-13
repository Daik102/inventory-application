import { Router } from "express";
import { getIndexPage } from "../controllers/itemController.js";

export const indexRouter = Router();

indexRouter.get('/', getIndexPage);
