const Category = require("../models/advertisementCategories.model");
const uploadOnCloud = require("../services/cloudinary.service");

// @Route : /api/categories
// @Method : POST
// @Access : Admin

async function createCategory(req, res) {
   try {
      let { name, image, description } = req.body;

      if (!name) {
         throw new Error("Please fill all fields");
      }

      let categoryExists = await Category.findOne({ name: name });

      if (categoryExists) {
         throw new Error("Category Already exists");
      }
      const imageLocalPath = req.file?.path
      if (!imageLocalPath) {
         res.status(400).json({ msg: "image is required" })
      }

      image = await uploadOnCloud(imageLocalPath)

      if (!image) return res.status(400).json({ msg: "image not uploaded" })

      const createdCategory = await Category.create({
         name,
         image: image.url,
         description
      });

      if (!createdCategory) {
         throw new Error("Failed to create category");
      }

      res.status(201).json(createdCategory);
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
}

// @Route : /api/categories
// @Method : GET
// @Access : Public

async function getAllCategories(req, res) {
   try {
      const categoriesWithAdCount = await Category.aggregate([
         {
            $lookup: {
               from: 'advertisements',
               localField: '_id',
               foreignField: 'categoryId', 
               as: 'ads'
            }
         },
         {
            $project: {
               name: 1,
               description: 1,
               image: 1,
               adCount: { $size: '$ads' } // Calculate the number of ads in the 'ads' array
            }
         }
      ]);

      if (!categoriesWithAdCount) {
         throw new Error("Failed to get categories with ad count");
      }

      res.status(200).json(categoriesWithAdCount);
   } catch (error) {
      console.error("Error fetching categories with ad count: ", error); // Debugging log
      res.status(400).json({ message: error.message });
   }
}


// @Route : /api/categories
// @Method : GET
// @Access : Public

async function getCategoryById(req, res) {
   try {
      const id = req.params.id;
      const category = await Category.findById(id);
      if (!category) {
         throw new Error("Failed to get category");
      }
      res.status(200).json(category);
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
}

// @Route : /api/categories/:id
// @Method : PUT
// @Access : Admin

async function updateCategory(req, res) {
   try {
      const id = req.params.id;
      const { name, description } = req.body;

      const updatedCategory = await Category.findByIdAndUpdate(id, {
         name,
         description

      });

      if (!updatedCategory) {
         throw new Error("Failed to update category");
      }

      res.status(200).json(updatedCategory);
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
}

// @Route : /api/categories/:id
// @Method : DELETE
// @Access : Admin

async function deleteCategory(req, res) {
   try {
      const id = req.params.id;
      const deletedCategory = await Category.findByIdAndDelete(id);

      if (!deleteCategory) {
         throw new Error("Failed to delete category");
      }

      res.status(200).json(deletedCategory);
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
}

module.exports = {
   createCategory,
   getAllCategories,
   getCategoryById,
   updateCategory,
   deleteCategory,
};
