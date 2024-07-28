const Status = require("../models/advertisementStatuses.model");

// @Route : /api/statuses
// @Method : POST
// @Access : Admin

async function createStatus(req, res) {
  try {
    const { name } = req.body;

    if (!name) {
    throw new Error("Please fill all fields");
    }

    const statusExists = await Status.findOne({ name: name });

    if (statusExists) {
      throw new Error("Status Already exists");
    }

    const createdStatus = await Status.create({
      name,
    });

    if (!createdStatus) {
      throw new Error("Failed to create status");
    }

    res.status(201).json(createdStatus);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// @Route : /api/statuses
// @Method : GET
// @Access : Public

async function getAllStatuses(req, res) {
  try {
    const allStatuses = await Status.find();
    if (!allStatuses) {
      throw new Error("Failed to get all statuses ");
    }

    res.status(200).json(allStatuses);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// @Route : /api/statuses/:id
// @Method : GET
// @Access : Public

async function getStatusById(req, res) {
  try {
    const id = req.params.id;
    const status = await Status.findById(id);
    if (!status) {
      throw new Error("Failed to get status");
    }
    res.status(200).json(status);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// @Route : /api/statuses/:id
// @Method : PUT
// @Access : Admin

async function updateStatus(req, res) {
  try {
    const id = req.params.id;
    const { name } = req.body;

    const updatedStatus = await Status.findByIdAndUpdate(
      id,
      {
        name: name,
      },
      { new: true }
    );

    if (!updatedStatus) {
      throw new Error("Failed to update status");
    }

    res.status(200).json(updatedStatus);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// @Route : /api/statuses/:id
// @Method : DELETE
// @Access : Admin

async function deleteStatus(req, res) {
  try {
    const id = req.params.id;
    const deletedStatus = await Status.findByIdAndDelete(id);

    if (!deleteStatus) {
      throw new Error("Failed to delete status");
    }

    res.status(200).json(deletedStatus);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = {
  createStatus,
  getAllStatuses,
  getStatusById,
  updateStatus,
  deleteStatus,
};
