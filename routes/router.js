const express = require("express");
const UserController = require("../controllers/user.controller.js");

const router = express.Router();

router.post("/create-user", UserController.createUser);
router.get("/get-users", UserController.getUsers);
router.delete("/delete-users", UserController.deleteAllUser);
router.delete("/delete-user/:id", UserController.deleteUser);
router.delete("/soft-delete-user/:id", UserController.softDeleteUser);

module.exports = router;
