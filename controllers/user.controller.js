// userRouter.get("/profile", viewUserProfile);
// userRouter.post("/profile", updateUserProfile);
// userRouter.get("/", listAllUsers);
// userRouter.post("/:id/role", updateUserRole);

const userController = {
  // 1. View User Profile METHOD GET
  viewUserProfile: async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await userModel.findById(userId);
        res.render("userProfile", { user });
    } catch (error) {
      console.error("Error rendering user profile page:", error);
      res.status(500).send("Internal Server Error");
    }
  },
  // 2. Update User Profile METHOD POST
  updateUserProfile: async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, email, role } = req.body;
        await userModel.findByIdAndUpdate(userId, { name, email, role });
        return res.redirect("/user/profile");
    } catch (error) {
      console.error("Error rendering update user profile page:", error);
      res.status(500).send("Internal Server Error");
    }
  },
  // 3. List All Users METHOD GET
  listAllUsers: async (req, res) => {
    try {
        const users = await userModel.find();
        res.render("listAllUsers", { users });
    } catch (error) {
      console.error("Error rendering list all users page:", error);
      res.status(500).send("Internal Server Error");
    }
  },
  // 4. Update User Role METHOD POST
  updateUserRole: async (req, res) => {
    try {
        const userId = req.params.id;
        const { role } = req.body;
        await userModel.findByIdAndUpdate(userId, { role });
        return res.redirect(`/user/${userId}/role`);    
    } catch (error) {
      console.error("Error rendering update user role page:", error);
      res.status(500).send("Internal Server Error");
    }
  },
};

export default userController;
