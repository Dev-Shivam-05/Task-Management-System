import { Router } from "express";
import categoryController from "../controllers/category.controller.js";

const categoryRouter = Router();

categoryRouter.get('/', categoryController.getAllCategories);
categoryRouter.post('/', categoryController.createCategory);
categoryRouter.post('/:id/edit', categoryController.updateCategory);
categoryRouter.post('/:id/delete', categoryController.deleteCategory);

export default categoryRouter;

