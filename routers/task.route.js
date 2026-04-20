import { Router } from "express";
import adminAuth from "../middleware/adminAuth.js";
import taskController from "../controllers/task.controller.js";
import { userAuth } from "../middleware/userAuth.js";

const taskRouter = Router();

// get all Tasks
taskRouter.get("/", userAuth, taskController.getTasks);

// create Task
taskRouter.post("/", taskController.createTask);

// delete Task
taskRouter.post("/:id/delete", userAuth, taskController.deleteTask);

// complete Task
taskRouter.post("/:id/complete", userAuth, taskController.completeTask);

export default taskRouter;
