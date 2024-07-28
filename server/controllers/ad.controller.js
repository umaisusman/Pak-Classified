const Ad = require("../models/advertisements.model");
const User = require("../models/users.model");
const Category = require("../models/advertisementCategories.model");
const CityArea = require("../models/cityAreas.model");
const Status = require("../models/advertisementStatuses.model");
const uploadOnCloud = require("../services/cloudinary.service");
const mongoose = require("mongoose");

// @Route : /api/ads/
// @Method : GET
// @Access : Public

async function getAds(req, res) {
  try {
    const Ads = await Ad.find({
      public: true,
      statusId: "666d3963b8dec9e5cd8e2d51",
    })
      .populate({
        path: "cityAreaId",
        populate: { path: "cityId", model: "City" },
      })
      .populate("statusId categoryId postedById");

    res.status(200).json(Ads);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// @Route : /api/ads/
// @Method : POST
// @Access : User

async function createAd(req, res) {
  const userId = req.user._id;
  try {
    const { name, price, description, categoryId, cityAreaId, image } =
      req.body;

    if (!name || !price || !description || !categoryId || !cityAreaId) {
      res.status(404);
      throw new Error("Please fill all fields correctly");
    }

    const imageLocalPath = req.file?.path;
    if (!imageLocalPath) {
      res.status(400).json({ msg: "image is required" });
    }

    const uploadedImage = await uploadOnCloud(imageLocalPath);

    if (!uploadedImage)
      return res.status(400).json({ msg: "image not uploaded" });

    const newAd = await Ad.create({
      name,
      description,
      price,
      postedById: userId,
      categoryId,
      cityAreaId,
      image: uploadedImage.url,
    });

    if (!newAd) {
      res.status(404);
      throw new Error("Failed to create Ad");
    }
    res.status(201).json(newAd);
  } catch (error) {
    res.json({ message: error.message });
  }
}

// @Route : /api/ads/:id/
// @Method : GET
// @Access : Public

async function getAd(req, res) {
  try {
    const id = req.params.id;
    const allAds = await Ad.findById(id)
    .populate({
      path: "cityAreaId",
      populate: { path: "cityId", model: "City" },
    })
    .populate("statusId categoryId postedById");
;
    res.status(200).json(allAds);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// @Route : /api/ads/user/
// @Method : GET
// @Access : User

async function getUserAds(req, res) {
  try {
    const userId = req.user._id;
    const userAds = await Ad.find({ postedById: userId }).populate("statusId");

    // Calculate sum of impressions and likes
    let impressionsSum = 0;
    let likesSum = 0;

    userAds.forEach((ad) => {
      impressionsSum += ad.impression || 0;
      likesSum += ad.likes.length || 0;
    });

    // Prepare response object with userAds and sums
    const responseData = {
      userAds,
      impressionsSum,
      likesSum,
    };

    res.status(200).json(responseData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// @Route : /api/ads/:id/
// @Method : GET
// @Access : User

async function deleteAd(req, res) {
  try {
    const userId = req.user._id;
    const adId = req.params.id;
    if (!adId) {
      res.status(404);
      throw new Error("Id is required");
    }
    const ad = await Ad.findById(adId).populate("postedById");
    if (!ad) {
      res.status(404);
      throw new Error("Id is invalid");
    }

    if (userId.toString() === ad.postedById._id.toString()) {
      const deletedAd = await Ad.findByIdAndDelete(adId);
      if (!deletedAd) {
        res.status(400);
        throw new Error("Failed to delete ad");
      }
      res.status(200).json(deletedAd);
    } else {
      res.status(400).json({ message: "You are not authrize" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
}

// @Route : /api/ads/:id/
// @Method : GET
// @Access : User

async function updateAd(req, res) {
  try {
    const userId = req.user._id;
    const adId = req.params.id;
    if (!adId) {
      res.status(404);
      throw new Error("Id is required");
    }

    const ad = await Ad.findById(adId).populate("postedById");
    if (!ad) {
      res.status(404);
      throw new Error("Id is invalid");
    }

    if (userId.toString() === ad.postedById._id.toString()) {
      const updatedAd = await Ad.findByIdAndUpdate(adId, req.body, {
        new: true,
      });
      res.status(200).json(updatedAd);
    } else {
      res.status(400).json({ message: "You are not authrize" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
}

async function getAdsByCategory(req, res) {
  try {
    const id = req.body.id;
    const ads = await Ad.find({ categoryId: id });
    if (!ads) {
      res.status(404);
      throw new Error("failed to get ads");
    }
    res.status(200).json(ads);
  } catch (error) {
    res.json({ message: error.message });
  }
}

async function adSearch(req, res) {
  try {
    const { keyword, categoryId, cityId } = req.body;

    const searchCriteria = { statusId: "666d3963b8dec9e5cd8e2d51" };

    // Keyword search
    if (keyword && keyword != "") {
      searchCriteria.$or = [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ];
    }

    // Category ID search
    if (categoryId) {
      searchCriteria.categoryId = categoryId;
    }

    if (cityId) {
      const cityAreas = await CityArea.find({ cityId });

      const cityAreaIds = cityAreas.map((cityArea) => cityArea._id);

      searchCriteria.cityAreaId = { $in: cityAreaIds };
    }
    const ads = await Ad.find(searchCriteria)
      .populate("categoryId")
      .populate("cityAreaId");

    res.status(200).json(ads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function likeAd(req, res) {
  try {
    const ad = await Ad.findById(req.params.id);
    if (!ad) {
      return res.status(404).json({ msg: "Ad not found" });
    }

    if (!req.user || !req.user._id) {
      return res.status(401).json({ msg: "User not authenticated" });
    }

    const userId = req.user._id; // Convert user ID to ObjectId

    if (ad.likes.some((like) => like.user && like.user.equals(userId))) {
      ad.likes = ad.likes.filter(({ user }) => user && !user.equals(userId));
    } else {
      ad.likes.unshift({ user: userId });
    }

    await ad.save();

    res.json(ad.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}

async function saveAd(req, res) {
  try {
    const ad = await Ad.findById(req.params.id);
    if (!ad) {
      return res.status(404).json({ msg: "Ad not found" });
    }

    if (!req.user || !req.user._id) {
      return res.status(401).json({ msg: "User not authenticated" });
    }

    const userId = req.user._id; // Convert user ID to ObjectId

    if (ad.saved.some((save) => save.user && save.user.equals(userId))) {
      ad.saved = ad.saved.filter(({ user }) => user && !user.equals(userId));
    } else {
      
      ad.saved.unshift({ user: userId });
    }

    await ad.save()

    res.json(ad.saved);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}



async function removeSavedAd(req, res) {
  try {
    // Validate req.params.id
    if (!req.params.id) {
      return res.status(400).json({ msg: "Ad ID is required" });
    }

    const ad = await Ad.findById(req.params.id);

    // Check if the ad exists
    if (!ad) {
      return res.status(404).json({ msg: "Ad not found" });
    }

    // Check if the user is authenticated
    if (!req.user || !req.user._id) {
      return res.status(401).json({ msg: "User not authenticated" });
    }

    const userId = req.user._id;

    // Check if the user has saved the ad
    if (ad.saved.some((save) => save.user && save.user.equals(userId))) {
      ad.saved = ad.saved.filter(({ user }) => user && !user.equals(userId));
    } else {
      return res.status(400).json({ msg: "Ad has not been saved by the user" });
    }

    await ad.save();

    res.json(ad.saved);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}



module.exports = {
  createAd,
  getAds,
  deleteAd,
  updateAd,
  getAd,
  getUserAds,
  getAdsByCategory,
  adSearch,
  likeAd,
  saveAd,
  removeSavedAd
};
