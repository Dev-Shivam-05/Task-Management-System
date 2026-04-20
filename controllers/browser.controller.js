import bcrypt from "bcrypt";
import userModel from "../model/userModel.js";
import envConfig from "../config/envConfig.js";
import jwt from "jsonwebtoken";

const browserController = {
  // 1. Login GET
  login: (req, res) => {
    try {
      return res.render("./pages/login.ejs");
    } catch (error) {
      console.error("Error rendering login page:", error);
      return res.status(500).send("Internal Server Error");
    }
  },
  // 2. Register GET
  register: (req, res) => {
    try {
      return res.render("./pages/register.ejs");
    } catch (error) {
      console.error("Error rendering register page:", error);
      return res.status(500).send("Internal Server Error");
    }
  },
  // 3. Register POST
  registerPost: async (req, res) => {
    try {
      const { username, password } = req.body;
      console.log(username, password);
      if (!username || !password) {
        return res.status(400).send("All fields are required");
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new userModel({ username, password: hashedPassword });
      await user.save();
      return res.redirect("/");
    } catch (error) {
      console.error("Error rendering register post page:", error);
      return res.status(500).send("Internal Server Error");
    }
  },
  // 4. Login POST
  loginPost: async (req, res) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).send("All fields are required");
      }

      const user = await userModel.findOne({ username });
      if (!user) {
        return res.status(401).send("Invalid username or password");
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).send("Invalid username or password");
      }

      const payload = { id: user.id, role: user.role };
      const token = jwt.sign(payload, envConfig.JWT_SECRET_KEY, {
        expiresIn: "1d",
      });

      // Set cookie correctly using maxAge
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
      });

      // Redirect based on role
      return user.role === "admin"
        ? res.redirect("/admin")
        : res.redirect("/tasks");
    } catch (error) {
      console.error("Login Error:", error);
      return res.status(500).send("Internal Server Error");
    }
  },
  // 5. Logout POST
  logoutPost: async (req, res) => {
    // 1. Check if cookie exists to avoid "Cannot read properties of undefined"
    if (!req.cookies.token) {
      return res.redirect("/");
    }

    await res.clearCookie("token");
    return res.redirect("/");
  },
};

export default browserController;
