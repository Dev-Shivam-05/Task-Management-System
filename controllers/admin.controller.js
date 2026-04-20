// Admin routes according to you
// 1. Can See all User
// 2. Can See all Category
// 3. Can See all Task
// 4. Can Delete Any Task
// 5. Can Update Any Task

import categoryModel from "../model/categoryModel.js";
import taskModel from "../model/taskModel.js";
import userModel from "../model/userModel.js";

const adminController = {
  // 1. Can See all User
  adminDashboard: async (req, res) => {
    try {
      // find everything and create a stats object
      const stats = {
        totalUsers: await userModel.countDocuments(),
        totalCategories: await categoryModel.countDocuments({}),
        totalTasks: await taskModel.countDocuments({}),
      };
      const tasks = await taskModel.find();
      const categories = await categoryModel.find();
      const users = await userModel.find();

      res.render("./pages/admin/adminDashboard.ejs", {
        user: req.user,
        stats,
        tasks,
        categories,
        users,
      });
    } catch (error) {
      console.error("Error rendering admin dashboard page:", error);
      res.status(500).send("Internal Server Error");
    }
  },

  // 1. Can See all User
  listAllUsers: async (req, res) => {
    try {
      const users = await userModel.find();
      const totalUsers = await userModel.countDocuments();
      const totalCategories = await categoryModel.countDocuments({});
      const totalTasks = await taskModel.countDocuments({});
      res.render("./pages/admin/listAllUsers.ejs", {
        users,
        success: "List All Users",
        status: "success",
        totalUsers,
        totalCategories,
        totalTasks,
      });
    } catch (error) {
      console.error("Error rendering list all users page:", error);
      res.status(500).send("Internal Server Error");
    }
  },
  // 1. Can Delete Any User
  deleteUser: async (req, res) => {
    try {
      const userId = req.params.id;
      await userModel.findByIdAndDelete(userId);
      res.redirect(req.get("referer") || "/");
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).send("Internal Server Error");
    }
  },
  // 2. Can See all Category
  listAllCategories: async (req, res) => {
    try {
      const categories = await categoryModel.find();
      const totalCategories = await categoryModel.countDocuments({});
      const totalTasks = await taskModel.countDocuments({});
      res.render("./pages/admin/listAllCategories.ejs", {
        categories,
        success: "List All Categories",
        status: "success",
        totalCategories,
        totalTasks,
      });
    } catch (error) {
      console.error("Error rendering list all categories page:", error);
      res.status(500).send("Internal Server Error");
    }
  },
  // 3. Can See all Task
  listAllTasks: async (req, res) => {
    try {
      const tasks = await taskModel.find().populate("creator").populate("assignee").populate("category");
      const totalTasks = await taskModel.countDocuments({});
      const totalCategories = await categoryModel.countDocuments({});
      const categories = await categoryModel.find();
      const users = await userModel.find();
      console.log(tasks);
      res.render("./pages/admin/listAllTasks.ejs", {
        tasks,
        success: "List All Tasks",
        status: "success",
        totalTasks,
        filters: {
          status: req.query.status || "",
          search: req.query.search || "",
          categoryId: req.query.categoryId || "",
        },
        user: req.user,
        totalCategories,
        categories,
        users,
      });
    } catch (error) {
      console.error("Error rendering list all tasks page:", error);
      res.status(500).send("Internal Server Error");
    }
  },
  // 4. Can Delete Any Task
  deleteTask: async (req, res) => {
    try {
      const taskId = req.params.id;
      await taskModel.findByIdAndDelete(taskId);
      res.redirect(req.get("referer") || "/");
    } catch (error) {
      console.error("Error deleting task:", error);
      res.status(500).send("Internal Server Error");
    }
  },
  // 5. Can Update Any Task
  updateTask: async (req, res) => {
    try {
      const taskId = req.params.id;
      const updatedTask = req.body;
      await taskModel.findByIdAndUpdate(taskId, updatedTask);
      res.redirect(req.get("referer") || "/");
    } catch (error) {
      console.error("Error updating task:", error);
      res.status(500).send("Internal Server Error");
    }
  },
};

export default adminController;
