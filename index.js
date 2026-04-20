import express from "express";
import envConfig from "./config/envConfig.js";
import db from "./config/database.js";
import bodyParser from "body-parser";
import browserRouter from "./routers/browser.route.js";
import adminRouter from "./routers/admin.route.js";
import taskRouter from "./routers/task.route.js";
import categoryRouter from "./routers/category.route.js";
import userRouter from "./routers/user.route.js";
import cookieParser from "cookie-parser";

const app = express();
const port = envConfig.PORT || 8081;

app.set("view engine", "ejs");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
  cookieParser({
    secret: envConfig.JWT_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
    expires: 24 * 60 * 60 * 1000, // 24 hours
  }),
);

app.use("/tasks", taskRouter);
app.use("/category", categoryRouter);
app.use("/admin", adminRouter);
app.use("/user", userRouter);
app.use("/", browserRouter);

app.listen(port, (err) => {
  if (!err) {
    console.log(`Server is running on port ${port}`);
    console.log(`http://localhost:${port}`);
  }
});
