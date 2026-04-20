import { Router } from "express";
import adminAuth from "../middleware/adminAuth.js";
import adminController from "../controllers/admin.controller.js";
import { userAuth } from "../middleware/userAuth.js";

const adminRouter = Router();

adminRouter.get("/", userAuth, adminAuth, adminController.adminDashboard);
// 1. Can See all User
adminRouter.get("/user", userAuth, adminAuth, adminController.listAllUsers);

// Can Delete Any User
adminRouter.get(
  "/user/:id/delete",
  userAuth,
  adminAuth,
  adminController.deleteUser,
);

// 2. Can See all Category
adminRouter.get(
  "/category",
  userAuth,
  adminAuth,
  adminController.listAllCategories,
);

// 3. Can See all Task
adminRouter.get("/task", userAuth, adminAuth, adminController.listAllTasks);

// 4. Can Delete Any Task
adminRouter.post(
  "/task/:id/delete",
  userAuth,
  adminAuth,
  adminController.deleteTask,
);

// 5. Can Update Any Task
adminRouter.post(
  "/task/:id/update",
  userAuth,
  adminAuth,
  adminController.updateTask,
);

export default adminRouter;

// Admin routes according to you
// 1. Can See all User
// 2. Can See all Category
// 3. Can See all Task
// 4. Can Delete Any Task
// 5. Can Update Any Task
