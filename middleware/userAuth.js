import jwt from "jsonwebtoken";
import envConfig from "../config/envConfig.js";

export const userAuth = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect("/");
  }

  try {
    const decoded = jwt.verify(token, envConfig.JWT_SECRET_KEY);
    req.user = decoded;

    // 4. Make user data available to EJS templates (very helpful!)
    res.locals.user = decoded;

    next();
  } catch (err) {
    // 5. Clean up if the token is bad
    res.clearCookie("token");

    if (err.name === "TokenExpiredError") {
      console.log("Session expired");
    } else {
      console.log("Invalid token detected");
    }

    return res.redirect("/");
  }
};
