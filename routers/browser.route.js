import { Router } from "express";
import browserController from "../controllers/browser.controller.js";
import { userAuth } from "../middleware/userAuth.js";

const browserRouter = Router();

// browserRouter.get('/register', userController.register);

// 1. Register
browserRouter.get('/register', browserController.register);
browserRouter.post('/register', browserController.registerPost);

// 2. Login
browserRouter.get('/', browserController.login);
browserRouter.post('/login', browserController.loginPost);

// 3. Logout
browserRouter.get('/logout', browserController.logoutPost);

export default browserRouter;
