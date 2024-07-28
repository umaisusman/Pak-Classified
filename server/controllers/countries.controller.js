const Country = require("../models/countries.model");

// @Route : /api/countries
// @Method : POST
// @Access : Admin

async function createCountry(req, res) {
   try {
      const { name, code } = req.body;

      if (!name || !code) {
         throw new Error("Please fill all fields");
      }

      const countryExists = await Country.findOne({ name: name });

      if (countryExists) {
         throw new Error("Country Already exists");
      }

      const countryArea = await Country.create({
         name,
         code,
      });

      if (!countryArea) {
         throw new Error("Failed to create country");
      }
      res.status(201).json(countryArea);
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
}

// @Route : /api/countries
// @Method : GET
// @Access : Public

async function getAllCountries(req, res) {
   try {
      const allCountries = await Country.find();
      if (!allCountries) {
         throw new Error("Failed to get all countries");
      }

      res.status(200).json(allCountries);
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
}

// @Route : /api/countries/:id
// @Method : GET
// @Access : Public

async function getCountryById(req, res) {
   try {
      const id = req.params.id;
      const country = await Country.findById(id);
      if (!country) {
         throw new Error("Failed to get country");
      }
      res.status(200).json(country);
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
}

// @Route : /api/countries/:id
// @Method : PUT
// @Access : Admin

async function updateCountry(req, res) {
   try {
      const id = req.params.id;
      const { name, code } = req.body;

      const updatedCountry = await Country.findByIdAndUpdate(
         id,
         {
            name: name,
            code: code,
         },
         { new: true }
      );

      if (!updatedCountry) {
         throw new Error("Failed to update country");
      }

      res.status(200).json(updatedCountry);
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
}

// @Route : /api/countries/:id
// @Method : DELETE
// @Access : Admin

async function deleteCountry(req, res) {
   try {
      const id = req.params.id;
      const deletedCountry = await Country.findByIdAndDelete(id);

      if (!deletedCountry) {
         throw new Error("Failed to delete country");
      }

      res.status(200).json(deletedCountry);
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
}

module.exports = {
   createCountry,
   getAllCountries,
   getCountryById,
   updateCountry,
   deleteCountry,
};
