const Role = require("../models/roles.model");

// @Route : /api/roles
// @Method : POST
// @Access : Admin

async function createRole(req, res) {
   try {
      const { name } = req.body;

      if (!name) {
         throw new Error("Please fill all fields");
      }

      const roleExists = await Role.findOne({ name: name });

      if (roleExists) {
         throw new Error("Role Already exists");
      }

      const createdRole = await Role.create({
         name,
      });

      if (!createdRole) {
         throw new Error("Failed to create Role");
      }

      res.status(201).json(createdRole);
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
}

// @Route : /api/roles
// @Method : GET
// @Access : Public

async function getAllRoles(req, res) {
   try {
      const allRoles = await Role.find();
      if (!allRoles) {
         throw new Error("Failed to get all Roles ");
      }

      res.status(200).json(allRoles);
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
}

// @Route : /api/roles/:id
// @Method : GET
// @Access : Public

async function getRoleById(req, res) {
   try {
      const id = req.params.id;
      const role = await Role.findById(id);
      if (!role) {
         throw new Error("Failed to get role");
      }
      res.status(200).json(role);
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
}

// @Route : /api/roles/:id
// @Method : PUT
// @Access : Admin

async function updateRole(req, res) {
   try {
      const id = req.params.id;
      const { name } = req.body;

      const updatedRole = await Role.findByIdAndUpdate(
         id,
         {
            name: name,
         },
         { new: true }
      );

      if (!updatedRole) {
         throw new Error("Failed to update Role");
      }

      res.status(200).json(updatedRole);
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
}

// @Route : /api/roles/:id
// @Method : DELETE
// @Access : Admin

async function deleteRole(req, res) {
   try {
      const id = req.params.id;
      const deletedRole = await Role.findByIdAndDelete(id);

      if (!deletedRole) {
         throw new Error("Failed to delete role");
      }

      res.status(200).json(deletedRole);
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
}

module.exports = {
   createRole,
   getAllRoles,
   getRoleById,
   updateRole,
   deleteRole,
};
