import { Router } from "express";
import { userAuth } from "../middleware/userAuth.js";
import userController from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/profile",userAuth, userController.viewUserProfile);
userRouter.post("/profile",userAuth, userController.updateUserProfile);
userRouter.get("/",userAuth, userController.listAllUsers);
userRouter.post("/:id/role",userAuth, userController.updateUserRole);

export default userRouter;
