const CityArea = require("../models/cityAreas.model");

// @Route : /api/cityareas
// @Method : POST
// @Access : Admin

async function createCityArea(req, res) {
   try {
      const { name, cityId } = req.body;

      if (!name || !cityId) {
         throw new Error("Please fill all fields");
      }

      const cityAreaExists = await CityArea.findOne({ name: name });

      if (cityAreaExists) {
         throw new Error("City Area Already exists");
      }

      const createdCityArea = await CityArea.create({
         name,
         cityId,
      });

      if (!createdCityArea) {
         throw new Error("Failed to create city area");
      }
      res.status(201).json(createdCityArea);
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
}

// @Route : /api/cityareas
// @Method : GET
// @Access : Public

async function getAllCityAreas(req, res) {
   try {
      const allCityAreas = await CityArea.find();
      if (!allCityAreas) {
         throw new Error("Failed to get all city areas ");
      }

      res.status(200).json(allCityAreas);
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
}

// @Route : /api/cityareas/:id
// @Method : GET
// @Access : Public

async function getCityAreaById(req, res) {
   try {
      const {cityId} = req.query
      const cityArea = await CityArea.find({cityId});
      if (!cityArea) {
         throw new Error("Failed to get city area");
      }
      res.status(200).json(cityArea);
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
}

// @Route : /api/cityareas/:id
// @Method : PUT
// @Access : Admin

async function updateCityArea(req, res) {
   try {
      const id = req.params.id;
      const { name, cityId } = req.body;

      const updatedCityArea = await CityArea.findByIdAndUpdate(
         id,
         {
            name: name,
            cityId: cityId,
         },
         { new: true }
      );

      if (!updatedCityArea) {
         throw new Error("Failed to update city area");
      }

      res.status(200).json(updatedCityArea);
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
}

// @Route : /api/cityareas/:id
// @Method : DELETE
// @Access : Admin

async function deleteCityArea(req, res) {
   try {
      const id = req.params.id;
      const deletedCityArea = await CityArea.findByIdAndDelete(id);

      if (!deletedCityArea) {
         throw new Error("Failed to delete city area");
      }

      res.status(200).json(deletedCityArea);
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
}

module.exports = {
   createCityArea,
   getAllCityAreas,
   getCityAreaById,
   updateCityArea,
   deleteCityArea,
};
