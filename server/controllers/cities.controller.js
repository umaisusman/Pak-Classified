const City = require("../models/cities.model");

// @Route : /api/cities
// @Method : POST
// @Access : Admin

async function createCity(req, res) {
  try {
    const { name, provinceId } = req.body;

    if (!name || !provinceId) {
      throw new Error("Please fill all fields");
    }

    const cityExists = await City.findOne({ name: name });

    if (cityExists) {
      throw new Error("City Already exists");
    }

    const createdCity = await City.create({
      name,
      provinceId
    });

    if (!createdCity) {
      throw new Error("Failed to create city");
    }

    res.status(201).json(createdCity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// @Route : /api/cities
// @Method : GET
// @Access : Public

async function getAllCities(req, res) {
  try {
    const allCities = await City.find();
    if (!allCities) {
      throw new Error("Failed to get all cities ");
    }

    res.status(200).json(allCities);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// @Route : /api/cities/:id
// @Method : GET
// @Access : Public

async function getCityById(req, res) {
  try {
    const {provinceId} = req.query;
    const city = await City.find({provinceId});
    if (!city) {
      throw new Error("Failed to get city");
    }
    res.status(200).json(city);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// @Route : /api/cities/:id
// @Method : PUT
// @Access : Admin

async function updateCity(req, res) {
  try {
    const id = req.params.id;
    const { name , provinceId} = req.body;

    const updatedCity = await City.findByIdAndUpdate(id, {
      name: name,
      provinceId:provinceId
    },{new:true});

    if (!updatedCity) {
      throw new Error("Failed to update city");
    }

    res.status(200).json(updatedCity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// @Route : /api/cities/:id
// @Method : DELETE
// @Access : Admin

async function deleteCity(req, res) {
  try {
    const id = req.params.id;
    const deletedCity = await City.findByIdAndDelete(id);

    if (!deletedCity) {
      throw new Error("Failed to delete city");
    }

    res.status(200).json(deletedCity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = {
  createCity,
  getAllCities,
  getCityById,
  updateCity,
  deleteCity,
};
