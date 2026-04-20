// categoryRouter.get('/', categoryController.getAllCategories);
// categoryRouter.post('/', categoryController.createCategory);
// categoryRouter.post('/:id/edit', categoryController.updateCategory);
// categoryRouter.post('/:id/delete', categoryController.deleteCategory);

import categoryModel from "../model/categoryModel.js";
import taskModel from "../model/taskModel.js";

const categoryController = {
  // 1. Get All Categories METHOD GET
  getAllCategories: async (req, res) => {
    try {
        const categories = await categoryModel.find();
        res.render("./pages/admin/listAllCategories", { categories , success: "List All Categories"});
    } catch (error) {
      console.error("Error rendering list all categories page:", error);
      res.status(500).send("Internal Server Error");
    }
  },
  // 2. Create Category METHOD POST
  createCategory: async (req, res) => {
    try {
        const { name } = req.body;
        const category = new categoryModel({ name });
        await category.save();
        return res.redirect(req.get("referer") || "/");
    } catch (error) {
      console.error("Error rendering create category page:", error);
      res.status(500).send("Internal Server Error");
    }
  },
  // 3. Update Category METHOD POST
  updateCategory: async (req, res) => {
    try {
        const categoryId = req.params.id;
        const { name } = req.body;
        await categoryModel.findByIdAndUpdate(categoryId, { name });
        return res.redirect("/category");
    } catch (error) {
      console.error("Error rendering update category page:", error);
      res.status(500).send("Internal Server Error");
    }
  },
  // 4. Delete Category METHOD POST
  deleteCategory: async (req, res) => {
    try {
        const categoryId = req.params.id;
        await categoryModel.findByIdAndDelete(categoryId);
        return res.redirect("/category");
    } catch (error) {
      console.error("Error rendering delete category page:", error);
      res.status(500).send("Internal Server Error");
    }
  },
};

export default categoryController;
