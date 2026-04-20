const adminAuth = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Admins access required" });
  }
  next();
};

export default adminAuth;
