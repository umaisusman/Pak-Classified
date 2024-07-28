const Province = require("../models/provinces.model");

// @Route : /api/provinces
// @Method : POST
// @Access : Admin

async function createProvince(req, res) {
   try {
      const { name, countryId } = req.body;

      if (!name || !countryId) {
         throw new Error("Please fill all fields");
      }

      const provinceExists = await Province.findOne({ name: name });

      if (provinceExists) {
         throw new Error("Province Already exists");
      }

      const provinceArea = await Province.create({
         name,
         countryId,
      });

      if (!provinceArea) {
         throw new Error("Failed to create province");
      }
      res.status(201).json(provinceArea);
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
}

// @Route : /api/provinces
// @Method : GET
// @Access : Public

async function getAllProvinces(req, res) {
   try {
      const allProvinces = await Province.find();
      if (!allProvinces) {
         throw new Error("Failed to get all provinces");
      }

      res.status(200).json(allProvinces);
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
}

// @Route : /api/provinces?countryId=id
// @Method : GET
// @Access : Public

async function getProvinceById(req, res) {
   try {
      const {countryId} = req.query
      
      const province = await Province.find({countryId});
      
      if (!province) {
         throw new Error("Failed to get province");
      }
      res.status(200).json(province);
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
}

// @Route : /api/provinces/:id
// @Method : PUT
// @Access : Admin

async function updateProvince(req, res) {
   try {
      const id = req.params.id;
      const { name, countryId } = req.body;

      const updatedProvince = await Province.findByIdAndUpdate(
         id,
         {
            name: name,
            countryId: countryId,
         },
         { new: true }
      );

      if (!updatedProvince) {
         throw new Error("Failed to update province");
      }

      res.status(200).json(updatedProvince);
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
}

// @Route : /api/provinces/:id
// @Method : DELETE
// @Access : Admin

async function deleteProvince(req, res) {
   try {
      const id = req.params.id;
      const deletedProvince = await Province.findByIdAndDelete(id);

      if (!deletedProvince) {
         throw new Error("Failed to delete province");
      }

      res.status(200).json(deletedProvince);
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
}

module.exports = {
   createProvince,
   getAllProvinces,
   getProvinceById,
   updateProvince,
   deleteProvince,
};
