import jwt from "jsonwebtoken";
import envConfig from "../config/envConfig.js";
import categoryModel from "../model/categoryModel.js";
import taskModel from "../model/taskModel.js";
import userModel from "../model/userModel.js";


const taskController = {
  // 1. Get all Tasks
  getTasks: async (req, res) => {
    try {
      const tasks = await taskModel.find();
      const categories = await categoryModel.find();
      const users = await userModel.find();
      return res.render("./pages/taskList.ejs", {
        tasks,
        categories,
        users,
        user: req.user || null,
        success: req.session || null,
      });
    } catch (error) {
      console.error("Error rendering task list page:", error);
      res.status(500).send("Internal Server Error");
    }
  },
  // 2. Create Task
  createTask: async (req, res) => {
    try {
      const { title, status, category } = req.body;
      console.log(req.body);
      if (!title || !status || !category) {
        return res.status(400).send("All fields are required");
      }

      const token = req.cookies.token;
      if (!token) {
        return res.redirect("/");
      }
      const decoded = jwt.verify(token, envConfig.JWT_SECRET_KEY);
      const newTask = await taskModel.create({
        creator: decoded.id,
        category: category,
        status: status,
        title: title,
        description: req.body.description || "",
        assignee: req.body.assignee || "",
      });
      return res.redirect(req.get("referer") || "/");
    } catch (error) {
      console.error("Error creating task:", error);
      res.status(500).send("Internal Server Error");
    }
  },
  // 4. Delete Task
  deleteTask: async (req, res) => {
    try {
      const taskId = req.params.id;
      await taskModel.findByIdAndDelete(taskId);
      return res.redirect("/tasks");
    } catch (error) {
      console.error("Error deleting task:", error);
      res.status(500).send("Internal Server Error");
    }
  },
  // 3. Delete Task
  deleteTask: async (req, res) => {
    try {
      const taskId = req.params.id;
      await taskModel.findByIdAndDelete(taskId);
      return res.redirect("/tasks");
    } catch (error) {
      console.error("Error deleting task:", error);
      res.status(500).send("Internal Server Error");
    }
  },
  // 5. Complete Task
  completeTask: async (req, res) => {
    try {
      const taskId = req.params.id;
      await taskModel.findByIdAndUpdate(taskId, { status: "completed" });
      return res.redirect(req.get("referer") || '/');
    } catch (error) {
      console.error("Error completing task:", error);
      res.status(500).send("Internal Server Error");
    }
  },
};

export default taskController;
