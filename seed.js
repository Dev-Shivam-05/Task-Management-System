import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import userModel from "./model/userModel.js";
import categoryModel from "./model/categoryModel.js";
import taskModel from "./model/taskModel.js";
import envConfig from "./config/envConfig.js";

dotenv.config();

const MONGO_URI =
  envConfig.MONGODB_URL || "mongodb://localhost:27017/atomic_ecommerce";

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const adminIsCreator = await userModel.findOne({ username: "dhaval" });
    // 🗑️ CLEAR ALL EXISTING DATA (critical for clean seed)
    await userModel.deleteMany({});
    await categoryModel.deleteMany({});
    await taskModel.deleteMany({});
    console.log("🗑️ Cleared all collections");

    // 🔒 Hash passwords (REQUIRED for bcrypt compare in login)
    const adminPass = await bcrypt.hash("dhaval123", 10);
    const employeePass = await bcrypt.hash("employee123", 10);

    // 👑 CREATE ADMIN: dhaval
    const admin = await userModel.create({
      username: "dhaval",
      password: adminPass,
      role: "admin",
    });
    console.log("👑 Created Admin: dhaval");

    // 👥 CREATE 5 EMPLOYEES
    const employees = await userModel.insertMany([
      { username: "Shivam", password: employeePass, role: "user" },
      { username: "Nurul", password: employeePass, role: "user" },
      { username: "Julu Vaii", password: employeePass, role: "user" },
      { username: "pratham", password: employeePass, role: "user" },
      { username: "Diya", password: employeePass, role: "user" },
    ]);
    console.log("👥 Created 5 Employees");

    // 📂 CREATE FULL-STACK DEVELOPER CATEGORIES
    const categories = await categoryModel.insertMany([
      {
        name: "Frontend",
      },
      {
        name: "Backend",
      },
      {
        name: "Database",
      },
      {
        name: "DevOps",
      },
      {
        name: "QA / Testing",
      },
      {
        name: "SEO",
      },
      {
        name: "UI/UX Design",
      },
      {
        name: "API Integration",
      },
    ]);
    console.log("📂 Created 8 Full-Stack Categories");

    // ✅ CREATE 12 REALISTIC TASKS (Assigned to employees)
    const tasks = await taskModel.insertMany([
      // Frontend Tasks
      {
        creator: adminIsCreator._id,
        title: "Build Responsive Navbar Component",
        description:
          "Create mobile-first navigation with dropdown menus using Bootstrap 5",
        status: "completed",
        category: categories[0]._id,
        assignedTo: employees[0]._id, // Shivam
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days
      },
      {
        creator: adminIsCreator._id,
        title: "Implement Dark Mode Toggle",
        description: "Add theme switcher with localStorage persistence",
        status: "pending",
        category: categories[0]._id,
        assignedTo: employees[4]._id, // Diya
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      },

      // Backend Tasks
      {
        creator: adminIsCreator._id,
        title: "Setup JWT Authentication Middleware",
        description:
          "Create userAuth.js and adminAuth.js middleware with token validation",
        status: "completed",
        category: categories[1]._id,
        assignedTo: employees[1]._id, // Nurul
        dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // Yesterday
      },
      {
        creator: adminIsCreator._id,
        title: "Create Task CRUD API Endpoints",
        description:
          "Implement POST /api/tasks, GET /api/tasks, PUT /api/tasks/:id, DELETE /api/tasks/:id",
        status: "completed",
        category: categories[1]._id,
        assignedTo: employees[2]._id, // Julu Vaii
        dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      },

      // Database Tasks
      {
        creator: adminIsCreator._id,
        title: "Optimize MongoDB Indexes for Tasks Collection",
        description:
          "Add indexes on status, priority, and assignedTo fields for faster queries",
        status: "pending",
        category: categories[2]._id,
        assignedTo: employees[1]._id, // Nurul
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      },

      // DevOps Tasks
      {
        creator: adminIsCreator._id,
        title: "Configure PM2 for Production Deployment",
        description:
          "Setup ecosystem.config.js and process management for zero-downtime deploys",
        status: "pending",
        category: categories[3]._id,
        assignedTo: employees[3]._id, // pratham
        dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
      },

      // QA Tasks
      {
        creator: adminIsCreator._id,
        title: "Write Unit Tests for Auth Controllers",
        description:
          "Test login, register, and token validation with Jest and Supertest",
        status: "pending",
        category: categories[4]._id,
        assignedTo: employees[4]._id, // Diya
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      },

      // SEO Tasks
      {
        creator: adminIsCreator._id,
        title: "Add Meta Tags for All SSR Pages",
        description: "Inject dynamic",
        status: "pending",
        category: categories[5]._id,
        assignedTo: employees[0]._id, // Shivam
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
      
      // UI/UX Tasks
      {
        creator: adminIsCreator._id,
        title: "Design Task Card Component",
        description:
          "Create reusable Bootstrap card with status badges, priority colors, and assignee avatar",
        status: "completed",
        category: categories[6]._id,
        assignedTo: employees[4]._id, // Diya
        dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },

      // API Integration Tasks
      {
        creator: adminIsCreator._id,
        title: "Integrate Chart.js for Admin Dashboard",
        description:
          "Fetch stats from /api/admin/stats and render bar/doughnut charts",
        status: "pending",
        category: categories[6]._id,
        assignedTo: employees[2]._id, // Julu Vaii
        dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      },

      // Cross-functional Tasks
      {
        creator: adminIsCreator._id,
        title: "Implement Real-Time Task Updates with Socket.io",
        description:
          "Broadcast task status changes to all connected admin clients",
        status: "pending",
        category: categories[1]._id,
        assignedTo: employees[3]._id, // pratham
        dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      },
      {
        creator: adminIsCreator._id,
        title: "Add Export to CSV Feature for Task Reports",
        description: "Allow admin to download filtered task list as CSV file",
        status: "pending",
        category: categories[0]._id,
        assignedTo: employees[0]._id, // Shivam
        dueDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
      },
    ]);
    console.log("✅ Created 12 Sample Tasks");

    console.log("\n🎉 Task Management System seeded successfully!");
    console.log("👑 Admin Login: dhaval / dhaval123");
    console.log(
      "👥 Employee Login: Shivam / employee123 (same password for all)",
    );
    console.log("\n📋 Sample Task Distribution:");
    // employees.forEach((emp) => {
    //   const count = tasks.filter(
    //     (t) => t.assignedTo.toString() === emp._id.toString(),
    //   ).length;
    //   console.log(`   • ${emp.username}: ${count} task(s)`);
    // });
  } catch (error) {
    console.error("❌ Seed Error:", error.message);
    console.error(
      "💡 Tip: Check if username index is unique and seed data has unique usernames",
    );
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
};

seedDatabase();
